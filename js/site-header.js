// Shared navigation and public partner context for the static FR/EN pages.
document.querySelectorAll('.site-header').forEach((header) => {
  const burger = header.querySelector('.burger');
  const services = header.querySelector('.nav-services');
  const servicesToggle = header.querySelector('.nav-services__toggle');
  const servicesMenu = header.querySelector('.nav-services__menu');
  const navigation = header.querySelector('.site-nav');

  function syncNavigationAccess() {
    navigation.inert = window.innerWidth <= 1100 && !header.classList.contains('open');
  }

  function closeServices() {
    services.classList.remove('open');
    servicesToggle.setAttribute('aria-expanded', 'false');
    servicesMenu.inert = true;
  }

  function closeNavigation() {
    header.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    closeServices();
    syncNavigationAccess();
  }

  burger.addEventListener('click', () => {
    const open = !header.classList.contains('open');
    header.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    syncNavigationAccess();
    if (!open) closeServices();
  });

  servicesToggle.addEventListener('click', () => {
    const open = !services.classList.contains('open');
    services.classList.toggle('open', open);
    servicesToggle.setAttribute('aria-expanded', String(open));
    servicesMenu.inert = !open;
  });

  services.addEventListener('focusout', (event) => {
    if (!services.contains(event.relatedTarget)) closeServices();
  });

  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) closeNavigation();
    else if (!services.contains(event.target)) closeServices();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const wasOpen = services.classList.contains('open') || header.classList.contains('open');
      closeNavigation();
      if (wasOpen) (window.innerWidth <= 1100 ? burger : servicesToggle).focus();
    }
  });

  // Keep the original space in the document when the header follows an upward scroll.
  const spacer = document.createElement('div');
  spacer.className = 'site-header-spacer';
  spacer.setAttribute('aria-hidden', 'true');
  header.after(spacer);
  let previousY = window.scrollY;
  let movement = 0;
  let scheduled = false;

  function syncHeaderHeight() {
    document.documentElement.style.setProperty('--site-header-height', `${header.offsetHeight}px`);
    if (header.classList.contains('is-sticky')) spacer.style.height = `${header.offsetHeight}px`;
  }

  // Keyboard users must be able to see any control that receives focus.
  header.addEventListener('focusin', () => {
    if (header.classList.contains('is-sticky')) header.classList.add('is-visible');
    movement = 0;
  });

  function updateStickyHeader() {
    scheduled = false;
    const y = Math.max(0, window.scrollY);
    const delta = y - previousY;
    previousY = y;

    if (y <= 1) {
      header.classList.remove('is-sticky', 'is-visible');
      spacer.style.height = '0px';
      movement = 0;
      return;
    }

    if (y <= header.offsetHeight + 80 && !header.classList.contains('is-sticky')) return;
    if (!header.classList.contains('is-sticky')) {
      spacer.style.height = `${header.offsetHeight}px`;
      header.classList.add('is-sticky');
    }

    if (Math.sign(delta) !== Math.sign(movement)) movement = delta;
    else movement += delta;
    if (movement >= 14) {
      header.classList.remove('is-visible');
      closeNavigation();
      movement = 0;
    } else if (movement <= -14) {
      header.classList.add('is-visible');
      movement = 0;
    }
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1100 && header.classList.contains('open')) closeNavigation();
    syncNavigationAccess();
    syncHeaderHeight();
  });

  window.addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(updateStickyHeader);
  }, { passive: true });
  updateStickyHeader();
  syncNavigationAccess();
  syncHeaderHeight();
  document.fonts.ready.then(syncHeaderHeight);
});

const partnerRef = new URLSearchParams(window.location.search).get('ref');
if (partnerRef) {
  document.querySelectorAll('rentool-rental-widget, rentool-cart-widget').forEach((widget) => {
    widget.setAttribute('partner-ref', partnerRef);
  });
}

const bookingTargets = ['reserver', 'catalogue'].map((id) => document.getElementById(id)).filter(Boolean);
const mobileBookingLink = document.getElementById('fab-reserver');
if (bookingTargets.length && mobileBookingLink && 'IntersectionObserver' in window) {
  const visibleBookingTargets = new Set();
  const bookingObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visibleBookingTargets.add(entry.target);
      else visibleBookingTargets.delete(entry.target);
    });
    mobileBookingLink.classList.toggle('is-hidden', visibleBookingTargets.size > 0);
  }, { threshold: 0 });
  bookingTargets.forEach((target) => bookingObserver.observe(target));
}

// Size the search frame only when Rentool confirms its final bar is ready.
document.addEventListener('rentool-ready', (event) => {
  if (event.target.matches?.('rentool-rental-search')) {
    event.target.classList.add('is-ready');
  }
});
