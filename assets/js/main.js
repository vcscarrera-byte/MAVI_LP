/* ======================================================
   MAVI — Landing Page Scripts
   Menu mobile, smooth scroll, FAQ, form, lead submission
   ====================================================== */

(function () {
  'use strict';

  // ── Config ──────────────────────────────────────────
  // Set your webhook URL here (Make / Zapier / n8n / Google Sheets).
  // Leave empty to use WhatsApp / mailto fallback.
  const LEAD_ENDPOINT = '';

  // WhatsApp fallback (Brazilian format)
  const WA_NUMBER = '5511999999999';
  const WA_MESSAGE_TEMPLATE = (data) =>
    `Olá! Sou ${data.name} (${data.profile}). Email: ${data.email}. WhatsApp: ${data.phone}. ${data.message ? 'Mensagem: ' + data.message : ''}`;

  // Mailto fallback
  const MAILTO_ADDRESS = 'contato@mavi.com.br';

  // ── DOM references ──────────────────────────────────
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.navbar__toggle');
  const navLinks = document.querySelector('.navbar__links');
  const modalOverlay = document.getElementById('leadModal');
  const leadForm = document.getElementById('leadForm');
  const formSuccess = document.querySelector('.form__success');
  const faqItems = document.querySelectorAll('.faq__item');

  // ── Navbar scroll effect ────────────────────────────
  function handleScroll() {
    if (!navbar) return;
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ── Mobile menu toggle ──────────────────────────────
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Smooth scroll for anchor links ──────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = 80; // navbar height
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ── FAQ Accordion ───────────────────────────────────
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq__question');
    var answer = item.querySelector('.faq__answer');
    if (!question || !answer) return;

    question.addEventListener('click', function () {
      var isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(function (other) {
        other.classList.remove('active');
        var otherAnswer = other.querySelector('.faq__answer');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
        var otherBtn = other.querySelector('.faq__question');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      // Open current if it was closed
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ── Modal ───────────────────────────────────────────
  function openModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Focus first input
    var firstInput = modalOverlay.querySelector('input, select, textarea');
    if (firstInput) setTimeout(function () { firstInput.focus(); }, 200);
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    resetForm();
  }

  // Open modal on CTA clicks
  document.querySelectorAll('[data-open-modal]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });

  // Close modal
  document.querySelectorAll('[data-close-modal]').forEach(function (btn) {
    btn.addEventListener('click', closeModal);
  });

  // Close on overlay click
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  // ── Form validation & submission ────────────────────
  function validateField(input) {
    var group = input.closest('.form-group');
    if (!group) return true;

    var value = input.value.trim();
    var isValid = true;

    if (input.hasAttribute('required') && !value) {
      isValid = false;
    }

    if (input.type === 'email' && value) {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
    }

    if (input.name === 'phone' && value) {
      var phoneClean = value.replace(/\D/g, '');
      isValid = phoneClean.length >= 10 && phoneClean.length <= 13;
    }

    if (isValid) {
      group.classList.remove('has-error');
    } else {
      group.classList.add('has-error');
    }

    return isValid;
  }

  function resetForm() {
    if (!leadForm) return;
    leadForm.reset();
    leadForm.querySelectorAll('.form-group').forEach(function (g) {
      g.classList.remove('has-error');
    });
    leadForm.style.display = '';
    if (formSuccess) formSuccess.classList.remove('active');
  }

  // Real-time validation
  if (leadForm) {
    leadForm.querySelectorAll('input, select').forEach(function (input) {
      input.addEventListener('blur', function () { validateField(this); });
    });
  }

  // Phone mask (Brazilian format)
  var phoneInput = document.getElementById('leadPhone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function () {
      var val = this.value.replace(/\D/g, '');
      if (val.length > 11) val = val.slice(0, 11);
      if (val.length > 6) {
        this.value = '(' + val.slice(0, 2) + ') ' + val.slice(2, 7) + '-' + val.slice(7);
      } else if (val.length > 2) {
        this.value = '(' + val.slice(0, 2) + ') ' + val.slice(2);
      } else if (val.length > 0) {
        this.value = '(' + val;
      }
    });
  }

  // Submit
  if (leadForm) {
    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var inputs = leadForm.querySelectorAll('input[required], select[required]');
      var allValid = true;

      inputs.forEach(function (input) {
        if (!validateField(input)) allValid = false;
      });

      if (!allValid) return;

      var formData = {
        name: document.getElementById('leadName').value.trim(),
        email: document.getElementById('leadEmail').value.trim(),
        phone: document.getElementById('leadPhone').value.trim(),
        profile: document.getElementById('leadProfile').value,
        message: document.getElementById('leadMessage').value.trim(),
        source: window.location.pathname,
        timestamp: new Date().toISOString()
      };

      if (LEAD_ENDPOINT) {
        submitToWebhook(formData);
      } else {
        submitFallback(formData);
      }
    });
  }

  function submitToWebhook(data) {
    var submitBtn = leadForm.querySelector('.form__submit');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
    }

    fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Erro no envio');
        showSuccess();
      })
      .catch(function () {
        // Fallback on error
        submitFallback(data);
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Agendar demo';
        }
      });
  }

  function submitFallback(data) {
    var waText = encodeURIComponent(WA_MESSAGE_TEMPLATE(data));
    var waUrl = 'https://wa.me/' + WA_NUMBER + '?text=' + waText;
    window.open(waUrl, '_blank', 'noopener');
    showSuccess();
  }

  function showSuccess() {
    if (!leadForm || !formSuccess) return;
    leadForm.style.display = 'none';
    formSuccess.classList.add('active');
  }

  // ── Scroll animations (Intersection Observer) ──────
  var animatedElements = document.querySelectorAll('[data-animate]');

  if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    animatedElements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // Style for animated elements
  var style = document.createElement('style');
  style.textContent = '.animated { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  // ── Analytics-ready data attributes ─────────────────
  document.querySelectorAll('[data-track]').forEach(function (el) {
    el.addEventListener('click', function () {
      var event = this.getAttribute('data-track');
      // Ready for GA4/Pixel integration
      // Example: gtag('event', event, { ... });
    });
  });

})();
