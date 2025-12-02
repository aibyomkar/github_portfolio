// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    if(!href || href === '#') return;
    const target = document.querySelector(href);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});

// Theme toggle (swap a few variables)
const themeToggle = document.getElementById('themeToggle');
let dark = true;
if(themeToggle){
  themeToggle.addEventListener('click', ()=>{
    if(dark){
      document.documentElement.style.setProperty('--bg','#f7fafc');
      document.documentElement.style.setProperty('--text','#082032');
      document.documentElement.style.setProperty('--muted','#475569');
      themeToggle.textContent = '🌞';
      // optional light tweaks
      document.body.style.background = 'linear-gradient(180deg,#ffffff,#f3f7fb)';
    } else {
      document.documentElement.style.setProperty('--bg','#0b1220');
      document.documentElement.style.setProperty('--text','#e9f2fb');
      document.documentElement.style.setProperty('--muted','#9bb0c8');
      themeToggle.textContent = '🌙';
      document.body.style.background = 'radial-gradient(1000px 500px at 10% 10%, rgba(96,165,250,0.04), transparent), linear-gradient(180deg,#041028 0%, #071428 100%)';
    }
    dark = !dark;
  });
}

// Project modal
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalLinks = document.getElementById('modalLinks');
const modalClose = document.querySelector('.modal-close');

function openModal(title, desc, links){
  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  modalLinks.innerHTML = '';
  (links || []).forEach(l=>{
    const a = document.createElement('a');
    a.href = l.url; a.textContent = l.label; a.target = '_blank'; a.rel='noopener';
    modalLinks.appendChild(a);
  });
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
function closeModal(){ modal.setAttribute('aria-hidden','true'); document.body.style.overflow = ''; }

document.querySelectorAll('.project-card').forEach(card=>{
  card.addEventListener('click', ()=>{
    const title = card.dataset.title || 'Project';
    const desc = card.dataset.desc || '';
    let links = [];
    try{ links = JSON.parse(card.dataset.links || '[]'); } catch(e){ links = []; }
    openModal(title, desc, links);
  });
});
modalClose?.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle?.addEventListener('click', ()=>{
  if(!nav) return;
  if(nav.style.display === 'flex') nav.style.display = 'none';
  else nav.style.display = 'flex';
});

// Accessibility: show focus outlines after keyboard navigation
document.addEventListener('keyup', (e)=>{
  if(e.key === 'Tab') document.body.classList.add('user-is-tabbing');
});
