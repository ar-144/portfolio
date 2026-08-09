const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

const menuToggle = $('#menuToggle');
const navLinks = $('#navLinks');
menuToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));
$$('.nav-links a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

const themeToggle = $('#themeToggle');
const savedTheme = localStorage.getItem('arul-theme');
if (savedTheme === 'light') document.body.classList.add('light');
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('arul-theme', document.body.classList.contains('light') ? 'light' : 'dark');
  themeToggle.textContent = document.body.classList.contains('light') ? '☾' : '☼';
});
if (document.body.classList.contains('light')) themeToggle.textContent = '☾';

const cursorGlow = $('.cursor-glow');
window.addEventListener('pointermove', e => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold: .12});
$$('.reveal').forEach(el => observer.observe(el));

const filters = $$('.filter');
const projects = $$('.project-card');
filters.forEach(filter => filter.addEventListener('click', () => {
  filters.forEach(f => f.classList.remove('active'));
  filter.classList.add('active');
  const wanted = filter.dataset.filter;
  projects.forEach(card => {
    card.classList.toggle('hidden', wanted !== 'all' && card.dataset.category !== wanted);
  });
}));

const projectData = {
  banksim: {
    kicker: '01 / PYTHON · FULL-STACK',
    title: 'BankSim v2',
    text: 'A banking account simulation project developed around persistent user data, authentication, account operations, transaction history, card management and savings features. The project is designed as a practical demonstration of Python application structure and database-backed workflows.',
    tags: ['Python', 'SQLite', 'Authentication', 'Transactions', 'Cards', 'Savings']
  },
  tabs: {
    kicker: '02 / DATA STRUCTURES',
    title: 'Browser Tab Navigation',
    text: 'A data-structures project that models browser tab movement with a doubly linked list. It demonstrates node creation, insertion/deletion concepts and forward/backward navigation.',
    tags: ['C', 'Doubly Linked List', 'Pointers', 'DSA']
  },



  agent: {
    kicker: '06 / AI · APP BUILDING',
    title: 'AI Agent Project',
    text: 'An AI-agent project created using Base44, exploring how an idea can be turned into an interactive application with AI-assisted workflows and a user-facing interface.',
    tags: ['AI', 'Base44', 'Agent', 'Automation']
  }
};

const modal = $('#modal');
const modalTitle = $('#modalTitle');
const modalText = $('#modalText');
const modalKicker = $('#modalKicker');
const modalTags = $('#modalTags');

function openModal(data) {
  modalKicker.textContent = data.kicker;
  modalTitle.textContent = data.title;
  modalText.textContent = data.text;
  modalTags.innerHTML = data.tags.map(t => `<span>${t}</span>`).join('');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
$$('.project-detail').forEach(btn => btn.addEventListener('click', () => openModal(projectData[btn.dataset.project])));
$$('[data-close]').forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

const certData = {
  excel: ['CERTIFICATION', 'Getting Started with Microsoft Excel', 'A certificate listed on the provided LinkedIn profile. Add the credential URL or certificate image when you publish the site.', ['Microsoft Excel', 'Productivity']],
  python: ['CERTIFICATION', 'Python Basics', 'A certificate listed on the provided LinkedIn profile. Add the credential URL or certificate image when you publish the site.', ['Python', 'Programming']],
  agile: ['CERTIFICATION', 'Agile Project Management', 'A certificate listed on the provided LinkedIn profile. Add the credential URL or certificate image when you publish the site.', ['Agile', 'Project Management']]
};
$$('.cert-card').forEach(card => card.addEventListener('click', () => {
  const [kicker, title, text, tags] = certData[card.dataset.cert];
  openModal({kicker, title, text, tags});
}));
