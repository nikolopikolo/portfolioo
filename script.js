/**
 * ==============================================================================
 * GEOLAB HOMEWORK - JAVASCRIPT
 * Features:
 * 1. Responsive accessible mobile navigation (Hamburger Menu)
 * 2. Active navigation section scrollspy
 * 3. Dynamic Employees fetching from JSONPlaceholder API (/users)
 * 4. Dynamic Posts fetching with "Load More" from JSONPlaceholder API (/posts)
 * 5. Clipboard email helper
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initActiveNavHighlight();
  initEmailCopyHelper();
  fetchEmployees();
  initPosts();
});

/* ==============================================================================
   TASK 1: RESPONSIVE MOBILE NAVIGATION
   ============================================================================== */
function initMobileNavigation() {
  const burgerBtn = document.getElementById('burger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (!burgerBtn || !mobileNav) return;

  function toggleMenu(forceClose = false) {
    const isCurrentlyExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
    const shouldOpen = forceClose ? false : !isCurrentlyExpanded;

    burgerBtn.setAttribute('aria-expanded', String(shouldOpen));
    burgerBtn.setAttribute('aria-label', shouldOpen ? 'მენიუს დახურვა' : 'მენიუს გახსნა');

    if (shouldOpen) {
      mobileNav.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    } else {
      mobileNav.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  // Toggle button click
  burgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Clicking any mobile navigation link navigates and closes the menu
  const mobileLinks = mobileNav.querySelectorAll('a');
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleMenu(true);
    });
  });

  // Escape key closes the menu and returns focus to the toggle button
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      toggleMenu(true);
      burgerBtn.focus();
    }
  });

  // Clicking outside the mobile menu closes it
  document.addEventListener('click', (e) => {
    if (mobileNav.classList.contains('is-open')) {
      const isInsideMenu = mobileNav.contains(e.target);
      const isInsideBurger = burgerBtn.contains(e.target);
      if (!isInsideMenu && !isInsideBurger) {
        toggleMenu(true);
      }
    }
  });

  // Automatically reset menu when screen is resized past tablet breakpoint (768px)
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && mobileNav.classList.contains('is-open')) {
      toggleMenu(true);
    }
  });
}

/* ==============================================================================
   SCROLLSPY: ACTIVE NAVIGATION HIGHLIGHT
   ============================================================================== */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav .mobile-nav-link');

  if (!sections.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        // Update desktop links
        desktopLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--text-primary)';
          } else {
            link.style.color = '';
          }
        });

        // Update mobile links
        mobileLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
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

/* ==============================================================================
   TASK 2: EMPLOYEES SECTION (JSONPlaceholder /users)
   Uses async/await and safe DOM creation (textContent) - No innerHTML for data
   ============================================================================== */
async function fetchEmployees() {
  const employeesGrid = document.getElementById('employees-grid');
  const employeesStatus = document.getElementById('employees-status');

  if (!employeesGrid || !employeesStatus) return;

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error(`სერვერის შეცდომა (სტატუსი: ${response.status})`);
    }

    const users = await response.json();

    // Clear loading state
    employeesStatus.style.display = 'none';
    employeesGrid.textContent = ''; // safe clear

    // Build cards for all 10 employees using safe DOM manipulation
    users.forEach((user) => {
      const card = document.createElement('article');
      card.className = 'employee-card';

      // Header container
      const header = document.createElement('div');
      header.className = 'employee-header';

      // Employee Name
      const nameEl = document.createElement('h3');
      nameEl.className = 'employee-name';
      nameEl.textContent = user.name || 'უცნობი თანამშრომელი';

      // Username
      const usernameEl = document.createElement('span');
      usernameEl.className = 'employee-username';
      usernameEl.textContent = user.username ? `@${user.username}` : '';

      // Company Name
      const companyEl = document.createElement('p');
      companyEl.className = 'employee-company';
      const companyLabel = document.createElement('span');
      companyLabel.className = 'employee-company-label';
      companyLabel.textContent = 'კომპანია:';
      const companyName = document.createTextNode(` ${user.company && user.company.name ? user.company.name : 'N/A'}`);
      companyEl.appendChild(companyLabel);
      companyEl.appendChild(companyName);

      header.appendChild(nameEl);
      header.appendChild(usernameEl);
      header.appendChild(companyEl);

      // Contact details list
      const detailsList = document.createElement('div');
      detailsList.className = 'employee-details';

      // Email
      const emailItem = document.createElement('div');
      emailItem.className = 'employee-detail-item';
      const emailLabel = document.createElement('span');
      emailLabel.className = 'employee-detail-label';
      emailLabel.textContent = 'Email:';
      const emailLink = document.createElement('a');
      emailLink.className = 'employee-detail-link';
      emailLink.href = `mailto:${user.email || ''}`;
      emailLink.textContent = user.email || 'N/A';
      emailItem.appendChild(emailLabel);
      emailItem.appendChild(emailLink);

      // Phone
      const phoneItem = document.createElement('div');
      phoneItem.className = 'employee-detail-item';
      const phoneLabel = document.createElement('span');
      phoneLabel.className = 'employee-detail-label';
      phoneLabel.textContent = 'Phone:';
      const phoneLink = document.createElement('a');
      phoneLink.className = 'employee-detail-link';
      phoneLink.href = `tel:${user.phone ? user.phone.replace(/[^0-9+]/g, '') : ''}`;
      phoneLink.textContent = user.phone || 'N/A';
      phoneItem.appendChild(phoneLabel);
      phoneItem.appendChild(phoneLink);

      // Website
      const webItem = document.createElement('div');
      webItem.className = 'employee-detail-item';
      const webLabel = document.createElement('span');
      webLabel.className = 'employee-detail-label';
      webLabel.textContent = 'Web:';
      const webLink = document.createElement('a');
      webLink.className = 'employee-detail-link';
      const rawWeb = user.website || '';
      webLink.href = rawWeb.startsWith('http') ? rawWeb : `https://${rawWeb}`;
      webLink.target = '_blank';
      webLink.rel = 'noopener noreferrer';
      webLink.textContent = rawWeb || 'N/A';
      webItem.appendChild(webLabel);
      webItem.appendChild(webLink);

      detailsList.appendChild(emailItem);
      detailsList.appendChild(phoneItem);
      detailsList.appendChild(webItem);

      card.appendChild(header);
      card.appendChild(detailsList);

      employeesGrid.appendChild(card);
    });

  } catch (error) {
    // Show error message
    employeesStatus.className = 'api-status api-status-error';
    employeesStatus.textContent = ''; // clear spinner

    const errorMsg = document.createElement('span');
    errorMsg.textContent = `თანამშრომლების ჩატვირთვა ვერ მოხერხდა: ${error.message}`;
    employeesStatus.appendChild(errorMsg);
  }
}

/* ==============================================================================
   TASK 3: POSTS SECTION WITH LOAD MORE (JSONPlaceholder /posts)
   Fetches initial 6 posts, appends 6 more when "Load More" is clicked
   ============================================================================== */
function initPosts() {
  const postsGrid = document.getElementById('posts-grid');
  const postsStatus = document.getElementById('posts-status');
  const loadMoreBtn = document.getElementById('load-more-posts-btn');

  if (!postsGrid || !postsStatus || !loadMoreBtn) return;

  let currentPage = 1;
  const POSTS_LIMIT = 6;
  let isLoading = false;

  async function loadPosts(page) {
    if (isLoading) return;
    isLoading = true;

    // Visual loading state
    if (page === 1) {
      postsStatus.style.display = 'flex';
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.disabled = true;
      loadMoreBtn.textContent = 'იტვირთება...';
    }

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${POSTS_LIMIT}`
      );

      if (!response.ok) {
        throw new Error(`სერვერის შეცდომა (სტატუსი: ${response.status})`);
      }

      const posts = await response.json();

      if (page === 1) {
        postsStatus.style.display = 'none';
      }

      if (posts.length === 0) {
        loadMoreBtn.style.display = 'none';
        return;
      }

      // Render posts safely with DOM methods
      posts.forEach((post) => {
        const postCard = document.createElement('article');
        postCard.className = 'post-card';

        // Post meta
        const metaEl = document.createElement('div');
        metaEl.className = 'post-meta';

        const idBadge = document.createElement('span');
        idBadge.className = 'post-id';
        idBadge.textContent = `POST #${post.id}`;
        metaEl.appendChild(idBadge);

        // Title
        const titleEl = document.createElement('h3');
        titleEl.className = 'post-title';
        titleEl.textContent = post.title;

        // Body
        const bodyEl = document.createElement('p');
        bodyEl.className = 'post-body';
        bodyEl.textContent = post.body;

        postCard.appendChild(metaEl);
        postCard.appendChild(titleEl);
        postCard.appendChild(bodyEl);

        postsGrid.appendChild(postCard);
      });

      // Update button state
      if (posts.length < POSTS_LIMIT) {
        loadMoreBtn.style.display = 'none';
      } else {
        loadMoreBtn.style.display = 'inline-flex';
        loadMoreBtn.disabled = false;
        loadMoreBtn.textContent = 'მეტის ჩატვირთვა (Load More)';
      }

    } catch (error) {
      if (page === 1) {
        postsStatus.className = 'api-status api-status-error';
        postsStatus.textContent = '';
        const errorMsg = document.createElement('span');
        errorMsg.textContent = `პოსტების ჩატვირთვა ვერ მოხერხდა: ${error.message}`;
        postsStatus.appendChild(errorMsg);
      } else {
        loadMoreBtn.disabled = false;
        loadMoreBtn.textContent = 'შეცდომა! სცადეთ თავიდან';
      }
    } finally {
      isLoading = false;
    }
  }

  // Load initial 6 posts
  loadPosts(currentPage);

  // Load More button click handler
  loadMoreBtn.addEventListener('click', () => {
    currentPage += 1;
    loadPosts(currentPage);
  });
}

/* ==============================================================================
   CLIPBOARD HELPER
   ============================================================================== */
function initEmailCopyHelper() {
  const emailItem = document.querySelector('[data-copy-email]');
  if (!emailItem) return;

  emailItem.addEventListener('click', async () => {
    const email = emailItem.getAttribute('data-copy-email');
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      const label = emailItem.querySelector('.contact-label');
      if (label) {
        const originalText = label.textContent;
        label.textContent = 'დაკოპირდა!';
        label.style.color = 'var(--accent)';
        setTimeout(() => {
          label.textContent = originalText;
          label.style.color = '';
        }, 2000);
      }
    } catch {
      // Fallback: normal mailto action takes place
    }
  });
}

