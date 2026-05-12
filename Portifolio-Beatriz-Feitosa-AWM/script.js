
// TOGGLE DE TEMA CLARO / ESCURO

const body         = document.body;
const themeBtn     = document.getElementById('theme-toggle');

// Verifica se o usuário já escolheu um tema antes e salva no localStorage
function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    body.classList.replace('light-mode', 'dark-mode');
  }
}

function toggleTheme() {
  const isDark = body.classList.contains('dark-mode');
  if (isDark) {
    body.classList.replace('dark-mode', 'light-mode');
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.replace('light-mode', 'dark-mode');
    localStorage.setItem('theme', 'dark');
  }
  // Recria as partículas quando o tema muda pra pegar a nova cor
  createParticles();
}

themeBtn.addEventListener('click', toggleTheme);
initTheme();


// MENU RESPONSIVO (HAMBURGUER)

const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu      = document.getElementById('nav-menu');

hamburgerBtn.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  hamburgerBtn.classList.toggle('open', isOpen);
  hamburgerBtn.setAttribute('aria-expanded', isOpen);
});

// Fecha o menu quando clicar em algum link
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburgerBtn.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  });
});



const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

// Observa quais seções estão visíveis e destaca o link correspondente
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(sec => sectionObserver.observe(sec));


// ANIMAÇÃO FADE-IN AO SCROLLAR


const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Para de observar depois que o elemento apareceu
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

fadeElements.forEach(el => fadeObserver.observe(el));


// BOTÃO VOLTAR AO TOPO

const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  // Mostra o botão depois que o usuário rolou mais de 300px
  if (window.scrollY > 300) {
    backToTopBtn.removeAttribute('hidden');
    // pequeno delay pra a transição de opacidade funcionar
    setTimeout(() => backToTopBtn.classList.add('visible'), 10);
  } else {
    backToTopBtn.classList.remove('visible');
    // Esconde depois que a animação termina
    setTimeout(() => backToTopBtn.setAttribute('hidden', ''), 320);
  }
}, { passive: true });

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});



// VALIDAÇÃO DO FORMULÁRIO DE CONTATO

const form       = document.getElementById('contact-form');
const successMsg = document.getElementById('success-msg');

// Mostra mensagem de erro num campo
function showError(inputId, errorId, msg) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  input.classList.add('has-error');
  error.textContent = msg;
}

// limpa erro de um campo
function clearError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  input.classList.remove('has-error');
  error.textContent = '';
}

// Valida o formato de email com uma expressão regular simples
function emailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Remove erro quando o usuário começa a digitar no campo
['nome', 'email', 'mensagem'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    clearError(id, `${id}-error`);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault(); // evita o reload da página

  const nome     = document.getElementById('nome').value.trim();
  const email    = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  let temErro = false;

  // Valida nome
  if (!nome) {
    showError('nome', 'nome-error', 'Por favor, informe seu nome.');
    temErro = true;
  } else {
    clearError('nome', 'nome-error');
  }

  // Valida email
  if (!email) {
    showError('email', 'email-error', 'Por favor, informe seu e-mail.');
    temErro = true;
  } else if (!emailValido(email)) {
    showError('email', 'email-error', 'O e-mail não parece válido. Ex: nome@email.com');
    temErro = true;
  } else {
    clearError('email', 'email-error');
  }

  // Valida mensagem
  if (!mensagem) {
    showError('mensagem', 'mensagem-error', 'Por favor, escreva sua mensagem.');
    temErro = true;
  } else {
    clearError('mensagem', 'mensagem-error');
  }

  // Se tiver algum erro, para aqui
  if (temErro) return;

  // Simula envio: esconde o formulário e mostra mensagem de sucesso
  form.style.opacity = '0';
  form.style.transition = 'opacity 0.3s ease';

  setTimeout(() => {
    form.style.display = 'none';
    successMsg.removeAttribute('hidden');
    // Limpa os campos por segurança
    form.reset();
  }, 300);
});



// particulas

function createParticles() {
  const container = document.getElementById('particles-container');
  container.innerHTML = ''; // limpa antes de recriar

  const isDark = body.classList.contains('dark-mode');
  // Ícones temáticos pra cada modo
  const lightParticles = ['✦', '·', '◦', '⋆', '✧', '◦'];
  const darkParticles  = ['✦', '·', '◦', '⋆', '✧', '·'];
  const symbols = isDark ? darkParticles : lightParticles;

  // Cria 22 partículas em posições aleatórias
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('span');
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const size = Math.random() * 14 + 8;
    const x    = Math.random() * 100;
    const y    = Math.random() * 100;
    const dur  = Math.random() * 18 + 12; // duração da animação entre 12s e 30s
    const del  = Math.random() * -dur;    // delay negativo faz começar no meio da animação

    p.style.cssText = `
      position: absolute;
      font-size: ${size}px;
      left: ${x}%;
      top: ${y}%;
      opacity: 0;
      animation: particleDrift ${dur}s ${del}s linear infinite;
      color: var(--particle-color);
      pointer-events: none;
      user-select: none;
    `;
    container.appendChild(p);
  }
}

// Injeta a animação das partículas no head (via tag style)
function injectParticleAnimation() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleDrift {
      0%   { opacity: 0;    transform: translateY(0) rotate(0deg); }
      10%  { opacity: 0.6; }
      90%  { opacity: 0.4; }
      100% { opacity: 0;    transform: translateY(-120px) rotate(20deg); }
    }
  `;
  document.head.appendChild(style);
}

injectParticleAnimation();
createParticles();




// Já configurado via CSS com scroll-padding-top no html
// ajuste manual pra links que possam ter comportamento diferente
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    const target   = document.querySelector(targetId);
    if (!target) return;
  
  });
});