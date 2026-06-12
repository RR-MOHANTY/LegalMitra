// ====== MOBILE MENU TOGGLE ======
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
  hamburger.setAttribute('aria-expanded', !expanded);
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ====== ACTIVE LINK HIGHLIGHT ON SCROLL ======
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ====== SCROLL PROGRESS BAR ======
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (scrollTop / scrollHeight) * 100;
  progressBar.style.width = scrolled + '%';
});

// ====== BACK TO TOP BUTTON ======
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ====== SCROLL REVEAL ANIMATIONS ======
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ====== COUNTER ANIMATION FOR STATISTICS ======
const statNumbers = document.querySelectorAll('.stat-number');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.getAttribute('data-target');
      if (el.classList.contains('counted')) return;
      el.classList.add('counted');

      if (target === 24) {
        el.textContent = '24';
        const suffix = el.nextElementSibling;
        if (suffix && suffix.classList.contains('stat-suffix')) {
          suffix.style.opacity = '1';
        }
        return;
      }

      const duration = 2000;
      const start = performance.now();
      const update = (timestamp) => {
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);
        el.textContent = current.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target.toLocaleString();
          const suffix = el.nextElementSibling;
          if (suffix && suffix.classList.contains('stat-suffix')) {
            suffix.style.opacity = '1';
          }
        }
      };
      requestAnimationFrame(update);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(num => {
  const suffix = num.nextElementSibling;
  if (suffix && suffix.classList.contains('stat-suffix')) {
    suffix.style.opacity = '0';
    suffix.style.transition = 'opacity 0.3s';
  }
  countObserver.observe(num);
});

// ====== AI DEMO INTERACTIVITY ======
const typingIndicator = document.getElementById('typingIndicator');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;
  const bubble = document.createElement('div');
  bubble.className = `bubble ${sender}-bubble`;
  bubble.textContent = text;
  messageDiv.appendChild(bubble);
  chatBody.appendChild(messageDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function simulateAIResponse() {
  typingIndicator.style.display = 'flex';
  chatBody.scrollTop = chatBody.scrollHeight;
  setTimeout(() => {
    typingIndicator.style.display = 'none';
    addMessage("Thank you for your question. Based on our legal knowledge base, I would suggest documenting all communication and consulting a relevant authority. Would you like a draft complaint letter?", 'ai');
  }, 2000);
}

sendBtn.addEventListener('click', () => {
  const text = chatInput.value.trim();
  if (text) {
    addMessage(text, 'user');
    chatInput.value = '';
    simulateAIResponse();
  }
});

chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendBtn.click();
});

// ====== FAQ ACCORDION ======
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
    if (!isActive) faqItem.classList.add('active');
  });
});

// ====== FORM SUBMISSIONS ======
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('Thank you for your message! We will get back to you soon.');
  e.target.reset();
});

document.getElementById('newsletterForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('Thank you for subscribing!');
  e.target.reset();
});

// ====== PLACEHOLDER BUTTONS ======
document.getElementById('loginBtn').addEventListener('click', () => alert('Login feature coming soon!'));
document.getElementById('signupBtn').addEventListener('click', () => alert('Sign up feature coming soon!'));