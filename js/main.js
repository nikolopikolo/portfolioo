/**
 * ==============================================================================
 * DEVELOPER PORTFOLIO - VANILLA JAVASCRIPT
 * Handles mobile hamburger navigation, accessibility states, and smooth scrolling.
 * No external dependencies.
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initActiveNavHighlight();
  initEmailCopyHelper();
});

/**
 * Mobile Navigation (Hamburger Menu)
 * Manages toggle states, ARIA attributes, keyboard escape handling, and click-away.
 */
function initMobileNavigation() {
  const burgerBtn = document.getElementById('burger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (!burgerBtn || !mobileNav) return;

  // Toggle mobile menu
  function toggleMenu(forceClose = false) {
    const isCurrentlyExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
    const shouldOpen = forceClose ? false : !isCurrentlyExpanded;

    burgerBtn.setAttribute('aria-expanded', String(shouldOpen));
    burgerBtn.setAttribute('aria-label', shouldOpen ? 'Close navigation menu' : 'Open navigation menu');
    
    if (shouldOpen) {
      mobileNav.classList.add('is-open');
      document.body.style.overflow = 'hidden'; // Prevent background scroll while menu is open
    } else {
      mobileNav.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  // Click on hamburger button
  burgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close menu when clicking on any navigation link
  const mobileLinks = mobileNav.querySelectorAll('a');
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleMenu(true);
    });
  });

  // Close menu when pressing Escape key (WCAG compliance)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      toggleMenu(true);
      burgerBtn.focus();
    }
  });

  // Close menu when clicking outside of header and mobile nav
  document.addEventListener('click', (e) => {
    if (mobileNav.classList.contains('is-open')) {
      const isInsideMenu = mobileNav.contains(e.target);
      const isInsideBurger = burgerBtn.contains(e.target);
      if (!isInsideMenu && !isInsideBurger) {
        toggleMenu(true);
      }
    }
  });

  // Reset menu state when viewport is resized past tablet/desktop breakpoint (768px)
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && mobileNav.classList.contains('is-open')) {
      toggleMenu(true);
    }
  });
}

/**
 * Scrollspy / Active Navigation Highlighting
 * Observes page sections using IntersectionObserver and subtly highlights
 * the current section in the desktop navigation bar.
 */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.style.color = 'var(--text-primary)';
          } else {
            link.style.color = '';
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

/**
 * Optional Helper: Copy Email to Clipboard
 * Allows quick copying of the placeholder email with visual feedback.
 */
function initEmailCopyHelper() {
  const emailItem = document.querySelector('[data-copy-email]');
  if (!emailItem) return;

  emailItem.addEventListener('click', async (e) => {
    const email = emailItem.getAttribute('data-copy-email');
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      const label = emailItem.querySelector('.contact-label');
      if (label) {
        const originalText = label.textContent;
        label.textContent = 'COPIED TO CLIPBOARD!';
        label.style.color = 'var(--accent)';
        setTimeout(() => {
          label.textContent = originalText;
          label.style.color = '';
        }, 2000);
      }
    } catch {
      // Fallback: normal mailto action occurs
    }
  });
}

