// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',function(e){
    const href = this.getAttribute('href');
    if(!href || href === '#') return;
    const target = document.querySelector(href);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
    }
  })
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
let dark = true;
if(themeToggle){
  themeToggle.addEventListener('click', ()=>{
    if(dark){
      document.documentElement.style.setProperty('--bg','#f7fafc');
      document.documentElement.style.setProperty('--text','#082032');
      document.documentElement.style.setProperty('--muted','#475569');
      themeToggle.textContent = '🌞';
    } else {
      document.documentElement.style.setProperty('--bg','#0b1020');
      document.documentElement.style.setProperty('--text','#e6eef8');
      document.documentElement.style.setProperty('--muted','#9fb0c8');
      themeToggle.textContent = '🌙';
    }
    dark = !dark;
  })
}

// Modal for projects
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalLinks = document.getElementById('modalLinks');
const modalClose = document.querySelector('.modal-close');

function openModal(title, desc, links){
  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  modalLinks.innerHTML = '';
  links.forEach(l=>{
    const a = document.createElement('a');
    a.href = l.url; a.textContent = l.label; a.target = '_blank';
    modalLinks.appendChild(a);
  });
  modal.setAttribute('aria-hidden','false');
}
function closeModal(){ modal.setAttribute('aria-hidden','true'); }

document.querySelectorAll('.project-card').forEach(card=>{
  card.addEventListener('click', ()=>{
    const title = card.dataset.title;
    const desc = card.dataset.desc;
    let links = JSON.parse(card.dataset.links);
    openModal(title, desc, links);
  });
});
modalClose?.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });

// Show focus outlines when keyboard is used
document.addEventListener('keyup', (e)=>{
  if(e.key === 'Tab') document.body.classList.add('user-is-tabbing');
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle?.addEventListener('click', ()=>{
  if(nav.style.display === 'flex') nav.style.display = 'none';
  else nav.style.display = 'flex';
});
