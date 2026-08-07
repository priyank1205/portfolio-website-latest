/**
 * Microsoft Clarity Custom Events & Telemetry Tracking
 * Priyank Agarwal - Portfolio Analytics Instrumentation
 */

(function () {
  'use strict';

  // Safely invoke Clarity methods
  function clarityEvent(eventName) {
    try {
      if (typeof window.clarity === 'function') {
        window.clarity('event', eventName);
      }
    } catch (e) {
      // Ignore errors if Clarity is blocked
    }
  }

  function claritySet(key, value) {
    try {
      if (typeof window.clarity === 'function') {
        window.clarity('set', key, String(value));
      }
    } catch (e) {
      // Ignore errors if Clarity is blocked
    }
  }

  // Identify Page & Project Context
  function initPageContext() {
    const path = window.location.pathname.toLowerCase();
    let pageType = 'home';
    let projectId = 'none';

    if (path.includes('/projects/')) {
      pageType = 'case_study';
      if (path.includes('sedp-dashboard')) projectId = 'ashoka_sedp_dashboard';
      else if (path.includes('getmega')) projectId = 'getmega_mobile_app';
      else if (path.includes('khiladipro-redesign')) projectId = 'khiladipro_redesign';
      else if (path.includes('khiladipro')) projectId = 'khiladipro_sports_tech';
      else if (path.includes('mega-poker')) projectId = 'mega_poker';
      else if (path.includes('ecometer')) projectId = 'ecometer_agrimarket';
      else projectId = path.split('/').pop().replace('.html', '');
    } else if (path.includes('about')) {
      pageType = 'about';
    }

    claritySet('page_type', pageType);
    if (projectId !== 'none') {
      claritySet('project_id', projectId);
    }

    return { pageType, projectId };
  }

  // Scroll Depth & Engagement Tracker
  function initScrollDepth(pageType) {
    const thresholds = [25, 50, 75, 100];
    const fired = {};

    function checkScroll() {
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - winHeight;
      if (docHeight <= 0) return;

      const scrollTop = window.scrollY || window.pageYOffset;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      thresholds.forEach((thresh) => {
        if (scrollPercent >= thresh && !fired[thresh]) {
          fired[thresh] = true;
          clarityEvent(`scroll_${thresh}`);
          claritySet('max_scroll_depth', `${thresh}%`);
        }
      });
    }

    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
        checkScroll();
      }, 200);
    }, { passive: true });

    // Time-on-page deep reading signals
    setTimeout(() => {
      clarityEvent('deep_reader_30s');
    }, 30000);

    if (pageType === 'case_study') {
      setTimeout(() => {
        clarityEvent('case_study_deep_read_60s');
      }, 60000);
    }
  }

  // Event Delegation for Clicks & Links
  function initClickTracking() {
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a, button, [data-copy-email], .marquee-item, [data-track]');
      if (!target) return;

      const href = target.getAttribute('href') || '';
      const text = (target.textContent || '').trim().toLowerCase();

      // Email Clicks or Copy
      if (href.startsWith('mailto:') || target.hasAttribute('data-copy-email') || text.includes('email me')) {
        clarityEvent('email_copied');
        claritySet('recruiter_signal', 'email_interaction');
      }

      // Resume Downloads / Drive Links
      if (href.includes('drive.google.com') || href.includes('resume') || text.includes('resume')) {
        clarityEvent('resume_clicked');
        claritySet('recruiter_signal', 'resume_download');
      }

      // LinkedIn Profile Clicks
      if (href.includes('linkedin.com')) {
        clarityEvent('linkedin_clicked');
        claritySet('recruiter_signal', 'linkedin_view');
      }

      // Case Studies / Projects Clicked
      if (href.includes('projects/') || target.dataset.caseStudy) {
        let caseName = 'unknown';
        if (href.includes('sedp-dashboard') || text.includes('ashoka')) {
          caseName = 'ashoka_sedp_dashboard';
          clarityEvent('ashoka_case_study_opened');
        } else if (href.includes('getmega')) {
          caseName = 'getmega_mobile_app';
        } else if (href.includes('khiladipro-redesign')) {
          caseName = 'khiladipro_redesign';
        } else if (href.includes('khiladipro')) {
          caseName = 'khiladipro_sports_tech';
        } else if (href.includes('mega-poker')) {
          caseName = 'mega_poker';
        } else if (href.includes('ecometer')) {
          caseName = 'ecometer_agrimarket';
        }

        clarityEvent('case_study_opened');
        claritySet('last_opened_case_study', caseName);
      }

      // Marquee Experience Links
      if (target.classList.contains('marquee-item')) {
        clarityEvent('marquee_item_clicked');
      }

      // Project Footer Navigation
      if (target.closest('.project-foot-nav') || target.closest('.next-project')) {
        clarityEvent('next_project_clicked');
      }
    });
  }

  // Keyboard & Custom Event Hooks
  function initCustomEventHooks() {
    // Custom DOM events from main.js
    window.addEventListener('portfolio:email_copied', () => {
      clarityEvent('email_copied');
      claritySet('recruiter_signal', 'email_copied');
    });

    window.addEventListener('portfolio:hire_typed', () => {
      clarityEvent('terminal_hire_typed');
      claritySet('high_intent', 'terminal_hire');
    });

    window.addEventListener('portfolio:command_palette', () => {
      clarityEvent('command_palette_opened');
    });
  }

  // Initialize all telemetry tracking when DOM is ready
  function init() {
    const { pageType } = initPageContext();
    initScrollDepth(pageType);
    initClickTracking();
    initCustomEventHooks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
