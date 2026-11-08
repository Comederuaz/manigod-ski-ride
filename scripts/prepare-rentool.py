#!/usr/bin/env python3
"""Prepare the complete public site for Rentool's 8 MiB MCP import."""

import argparse
import base64
import hashlib
import json
from pathlib import Path
import subprocess

from PIL import Image, ImageOps


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    output = args.output.resolve()
    if output == root or root in output.parents:
        parser.error("Choose an output directory outside the repository.")
    if output.exists() and any(output.iterdir()):
        parser.error("The output directory must be empty.")

    tracked = subprocess.check_output(
        ["git", "ls-files", "-z"], cwd=root
    ).decode().split("\0")
    pages = [p for p in tracked if p.endswith(".html")]
    text_files = pages + ["css/site.css", "js/site-header.js", "robots.txt", "sitemap.xml"]
    sources = {p: (root / p).read_text() for p in text_files}
    # Only assets actually referenced by the public pages and shared styles.
    images = [p for p in tracked if p.startswith("images/") and
              Path(p).suffix.lower() != ".csv" and
              any(p in source for source in sources.values())]
    renamed = {p: str(Path(p).with_suffix(".webp")) for p in images
               if Path(p).suffix.lower() in {".jpg", ".jpeg", ".png"}}
    destinations = text_files + [renamed.get(p, p) for p in images]
    if len(destinations) != len(set(destinations)):
        raise ValueError("Asset names collide after WebP conversion.")

    output.mkdir(parents=True, exist_ok=True)
    for name, content in sources.items():
        for original, converted in renamed.items():
            content = content.replace(original, converted)
        target = output / name
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content)
    for name in images:
        target = output / renamed.get(name, name)
        target.parent.mkdir(parents=True, exist_ok=True)
        if name in renamed:
            with Image.open(root / name) as original:
                image = ImageOps.exif_transpose(original)
                if original.format == "PNG":
                    image.save(target, "WEBP", lossless=True, method=6)
                else:
                    image.thumbnail((1440, 1440), Image.Resampling.LANCZOS)
                    image.save(target, "WEBP", quality=70, method=6)
        else:
            target.write_bytes((root / name).read_bytes())

    exported = sorted(p for p in output.rglob("*") if p.is_file())
    total = sum(p.stat().st_size for p in exported)
    if total > 8 * 1024 * 1024:
        raise ValueError(f"Export exceeds the MCP limit: {total} bytes.")
    payload_files = [{"path": p.relative_to(output).as_posix(),
                      "encoding": "utf8" if p.suffix in {".html", ".css", ".js", ".txt", ".xml", ".svg"} else "base64",
                      "content": p.read_text() if p.suffix in {".html", ".css", ".js", ".txt", ".xml", ".svg"}
                      else base64.b64encode(p.read_bytes()).decode()} for p in exported]
    request_bytes = len(json.dumps({"files": payload_files, "idempotencyKey": "x" * 128},
                                  ensure_ascii=False, separators=(",", ":")).encode())
    # The current HTTP proxy also buffers at most 10 MiB, including JSON/base64.
    if request_bytes > 10 * 1024 * 1024 - 8192:
        raise ValueError(f"Export exceeds the current HTTP transfer budget: {request_bytes} bytes.")
    digest = hashlib.sha256()
    for path in exported:
        digest.update(path.relative_to(output).as_posix().encode() + b"\0")
        digest.update(path.read_bytes())
    print(json.dumps({"output": str(output), "files": len(exported),
                      "pages": len(pages), "bytes": total, "requestBytes": request_bytes,
                      "sha256": digest.hexdigest()}))


if __name__ == "__main__":
    main()
