document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.primary-nav');
  const navLinks = document.querySelectorAll('.nav-list a');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('nav-open');
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('nav-open')) {
        navMenu.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const form = document.getElementById('contact-form');
  const fields = {
    name: {
      input: document.getElementById('name'),
      error: document.getElementById('error-name'),
      message: 'Please enter your name.'
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('error-email'),
      message: 'Please enter a valid email address.'
    },
    phone: {
      input: document.getElementById('phone'),
      error: document.getElementById('error-phone'),
      message: 'Please enter a valid phone number.'
    },
    message: {
      input: document.getElementById('message'),
      error: document.getElementById('error-message'),
      message: 'Please share a brief message so we can support you.'
    }
  };

  if (form) {
    form.addEventListener('submit', (event) => {
      let valid = true;

      Object.values(fields).forEach(({ input, error, message }) => {
        if (!input.checkValidity()) {
          valid = false;
          error.textContent = message;
          input.setAttribute('aria-invalid', 'true');
        } else {
          error.textContent = '';
          input.removeAttribute('aria-invalid');
        }
      });

      if (!valid) {
        event.preventDefault();
      } else {
        alert('Thank you! Your message has been received. We will get back to you shortly.');
        form.reset();
        event.preventDefault();
      }
    });
  }
});
