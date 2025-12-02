// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',function(e){
    const href = this.getAttribute('href');
    if(!href || href === '#') return;
    const target = document.querySelector(href);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
      // close mobile nav if open
      const nav = document.querySelector('.nav');
      if(window.innerWidth < 980 && nav && nav.style.display === 'flex') nav.style.display = 'none';
      document.querySelector('.menu-toggle')?.setAttribute('aria-expanded','false');
    }
  });
});

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
  (links || []).forEach(l=>{
    const a = document.createElement('a');
    a.href = l.url; a.textContent = l.label; a.target = '_blank'; a.rel = 'noopener';
    modalLinks.appendChild(a);
  });
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
function closeModal(){ modal.setAttribute('aria-hidden','true'); document.body.style.overflow = ''; }

document.querySelectorAll('.project-card').forEach(card=>{
  card.addEventListener('click', ()=> {
    const title = card.dataset.title || 'Project';
    const desc = card.dataset.desc || '';
    let links = [];
    try{ links = JSON.parse(card.dataset.links || '[]'); } catch(e){ links = []; }
    openModal(title, desc, links);
  });
  // allow Enter key to open modal when focused
  card.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') card.click(); });
});
modalClose?.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle?.addEventListener('click', ()=>{
  if(!nav) return;
  const open = nav.style.display === 'flex';
  nav.style.display = open ? 'none' : 'flex';
  nav.style.flexDirection = 'column';
  nav.style.gap = '8px';
  menuToggle.setAttribute('aria-expanded', String(!open));
});

// Accessibility: show focus outlines after keyboard navigation
document.addEventListener('keyup', (e)=>{
  if(e.key === 'Tab') document.body.classList.add('user-is-tabbing');
});

// small improvement: replace dead repo/demo links text if "#"
document.querySelectorAll('.project-card').forEach(card=>{
  try {
    const links = JSON.parse(card.dataset.links || '[]');
    links.forEach(l=>{
      if(l.url === '#') l.url = '#'; // leave placeholder, but could be replaced later
    });
  } catch(e){}
});