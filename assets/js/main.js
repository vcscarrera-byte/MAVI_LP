/* ======================================================
   MAVI — Landing Page Scripts
   Variant switching, menu, smooth scroll, FAQ, forms,
   UTM capture, localStorage fallback, dataLayer, sticky CTA
   ====================================================== */

(function () {
  'use strict';

  // ── Config ──────────────────────────────────────────
  // Set your webhook URL here (Make / Zapier / n8n / Google Sheets).
  // Leave empty to use localStorage fallback.
  var LEAD_ENDPOINT = '';

  // ── dataLayer init ────────────────────────────────
  window.dataLayer = window.dataLayer || [];

  // ── URL params ────────────────────────────────────
  var params = new URLSearchParams(window.location.search);
  var pageVariant = params.get('v') || 'a';

  // ── Variant switching ─────────────────────────────
  var variantElements = document.querySelectorAll('[data-variant]');
  variantElements.forEach(function (el) {
    if (el.dataset.variant === pageVariant) {
      el.removeAttribute('hidden');
    } else {
      el.setAttribute('hidden', '');
    }
  });

  // ── UTM capture ───────────────────────────────────
  var utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  var utmValues = {};

  utmKeys.forEach(function (key) {
    var val = params.get(key);
    if (val) utmValues[key] = val;
  });

  // Populate all hidden UTM fields across all forms
  function populateUTMFields() {
    utmKeys.forEach(function (key) {
      var val = utmValues[key] || '';
      document.querySelectorAll('input[name="' + key + '"]').forEach(function (input) {
        input.value = val;
      });
    });
    // Set page variant in hidden fields
    document.querySelectorAll('input[name="page_variant"]').forEach(function (input) {
      input.value = pageVariant;
    });
  }

  populateUTMFields();

  // ── DOM references ──────────────────────────────────
  var navbar = document.querySelector('.navbar');
  var navToggle = document.querySelector('.navbar__toggle');
  var navLinks = document.querySelector('.navbar__links');
  var modalOverlay = document.getElementById('leadModal');
  var inlineForm = document.getElementById('inlineLeadForm');
  var modalForm = document.getElementById('modalLeadForm');
  var inlineSuccess = document.getElementById('inlineFormSuccess');
  var modalSuccess = document.getElementById('modalFormSuccess');
  var faqItems = document.querySelectorAll('.faq__item');
  var stickyCta = document.querySelector('.sticky-cta');
  var heroSection = document.getElementById('hero');

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
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
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
  function openModal(opts) {
    if (!modalOverlay) return;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Pre-check founder checkbox if triggered from founders CTA
    if (opts && opts.founder) {
      var founderCb = document.getElementById('modalFounder');
      if (founderCb) founderCb.checked = true;
    }

    // Focus first input
    var firstInput = modalOverlay.querySelector('input, select, textarea');
    if (firstInput) setTimeout(function () { firstInput.focus(); }, 200);
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    resetForm(modalForm, modalSuccess);
  }

  // Open modal on CTA clicks
  document.querySelectorAll('[data-open-modal]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var isFounder = this.hasAttribute('data-founder');
      openModal({ founder: isFounder });
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

  // ── Form validation ─────────────────────────────────
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

  function resetForm(form, successEl) {
    if (!form) return;
    form.reset();
    form.querySelectorAll('.form-group').forEach(function (g) {
      g.classList.remove('has-error');
    });
    form.style.display = '';
    if (successEl) successEl.classList.remove('active');
    // Re-populate UTM fields after reset
    populateUTMFields();
  }

  // Real-time validation on blur for both forms
  [inlineForm, modalForm].forEach(function (form) {
    if (!form) return;
    form.querySelectorAll('input[required], select[required]').forEach(function (input) {
      input.addEventListener('blur', function () { validateField(this); });
    });
  });

  // ── Phone mask (Brazilian format) ───────────────────
  function applyPhoneMask(input) {
    if (!input) return;
    input.addEventListener('input', function () {
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

  applyPhoneMask(document.getElementById('inlinePhone'));
  applyPhoneMask(document.getElementById('modalPhone'));

  // ── Form submission ─────────────────────────────────
  function collectFormData(form) {
    return {
      name: form.querySelector('[name="name"]').value.trim(),
      email: form.querySelector('[name="email"]').value.trim(),
      phone: (form.querySelector('[name="phone"]').value || '').trim(),
      specialty: form.querySelector('[name="specialty"]').value || '',
      founder: form.querySelector('[name="founder"]').checked,
      utm_source: form.querySelector('[name="utm_source"]').value,
      utm_medium: form.querySelector('[name="utm_medium"]').value,
      utm_campaign: form.querySelector('[name="utm_campaign"]').value,
      utm_content: form.querySelector('[name="utm_content"]').value,
      utm_term: form.querySelector('[name="utm_term"]').value,
      page_variant: form.querySelector('[name="page_variant"]').value,
      source: window.location.href,
      timestamp: new Date().toISOString()
    };
  }

  function handleFormSubmit(form, successEl) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var inputs = form.querySelectorAll('input[required], select[required]');
      var allValid = true;

      inputs.forEach(function (input) {
        if (!validateField(input)) allValid = false;
      });

      if (!allValid) return;

      var formData = collectFormData(form);

      if (LEAD_ENDPOINT) {
        submitToWebhook(formData, form, successEl);
      } else {
        saveToLocalStorage(formData);
        showSuccess(form, successEl);
      }

      // dataLayer push
      window.dataLayer.push({
        event: 'mavi_lead_captured',
        lead_specialty: formData.specialty,
        lead_founder: formData.founder,
        page_variant: formData.page_variant,
        utm_source: formData.utm_source,
        utm_medium: formData.utm_medium,
        utm_campaign: formData.utm_campaign
      });
    });
  }

  function submitToWebhook(data, form, successEl) {
    var submitBtn = form.querySelector('.form__submit');
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
        showSuccess(form, successEl);
      })
      .catch(function () {
        // Fallback to localStorage on error
        saveToLocalStorage(data);
        showSuccess(form, successEl);
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Entrar na lista de espera';
        }
      });
  }

  function saveToLocalStorage(data) {
    try {
      var leads = JSON.parse(localStorage.getItem('mavi_leads') || '[]');
      leads.push(data);
      localStorage.setItem('mavi_leads', JSON.stringify(leads));
    } catch (e) {
      // localStorage unavailable — silent fail
    }
  }

  function showSuccess(form, successEl) {
    if (!form || !successEl) return;
    form.style.display = 'none';
    successEl.classList.add('active');
  }

  // Attach submit handlers
  if (inlineForm) handleFormSubmit(inlineForm, inlineSuccess);
  if (modalForm) handleFormSubmit(modalForm, modalSuccess);

  // ── Founder CTA → scroll to form with checkbox pre-checked ──
  document.querySelectorAll('[data-founder]').forEach(function (btn) {
    // For non-modal founder CTAs (anchor links)
    if (!btn.hasAttribute('data-open-modal')) {
      btn.addEventListener('click', function () {
        var founderCb = document.getElementById('inlineFounder');
        if (founderCb) founderCb.checked = true;
      });
    }
  });

  // ── Sticky mobile CTA ──────────────────────────────
  function handleStickyCta() {
    if (!stickyCta || !heroSection) return;

    var heroBottom = heroSection.getBoundingClientRect().bottom;
    var footerTop = document.querySelector('.footer');
    var isFooterVisible = footerTop && footerTop.getBoundingClientRect().top < window.innerHeight;

    if (heroBottom < 0 && !isFooterVisible) {
      stickyCta.classList.add('visible');
    } else {
      stickyCta.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleStickyCta, { passive: true });

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

  // ── Analytics — dataLayer push on CTA clicks ──────
  document.querySelectorAll('[data-track]').forEach(function (el) {
    el.addEventListener('click', function () {
      var eventName = this.getAttribute('data-track');
      window.dataLayer.push({
        event: 'mavi_cta_click',
        cta_name: eventName,
        page_variant: pageVariant
      });
    });
  });

})();
