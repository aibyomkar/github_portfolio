// Smooth scroll for internal links + close mobile nav
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
      if(window.innerWidth < 980 && nav && nav.style.display === 'flex') {
        nav.style.display = 'none';
        document.querySelector('.menu-toggle')?.setAttribute('aria-expanded','false');
      }
    }
  });
});

// Reveal on scroll (IntersectionObserver)
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
},{threshold: 0.12});
reveals.forEach(r => io.observe(r));

// Animated mini-stats counter
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target || el.textContent || 0, 10);
    let start = 0;
    const duration = 800;
    const step = (timestamp) => {
      if(!el._startTime) el._startTime = timestamp;
      const progress = Math.min((timestamp - el._startTime) / duration, 1);
      el.textContent = Math.round(progress * target);
      if(progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}
const statsObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      animateCounters();
      obs.disconnect();
    }
  });
},{threshold:0.3});
const statsEl = document.querySelector('.mini-stats');
if(statsEl) statsObserver.observe(statsEl);

// Project tilt effect (pointer move)
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('pointermove', e => {
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - rect.left) - rect.width/2;
    const dy = (e.clientY - rect.top) - rect.height/2;
    const rx = (-dy / rect.height) * 6;
    const ry = (dx / rect.width) * 8;
    card.style.transform = `perspective(900px) translateZ(6px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
  });
  card.addEventListener('pointerleave', ()=> {
    card.style.transform = '';
    card.style.transition = 'transform .45s cubic-bezier(.2,.9,.3,1)';
    setTimeout(()=> card.style.transition = '', 500);
  });
});

// Modal for projects (keyboard accessible)
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
  modalClose.focus();
}
function closeModal(){ modal.setAttribute('aria-hidden','true'); document.body.style.overflow = ''; }

// clicking project opens modal (Details button or entire card)
document.querySelectorAll('.project-card').forEach(card=>{
  card.addEventListener('click', (ev) => {
    // if click target is a button, ignore here (buttons may have own handlers)
    if(ev.target.tagName.toLowerCase() === 'button') return;
    const title = card.dataset.title || 'Project';
    const desc = card.dataset.desc || '';
    let links = [];
    try{ links = JSON.parse(card.dataset.links || '[]'); } catch(e){ links = []; }
    openModal(title, desc, links);
  });
  // allow Enter to open
  card.addEventListener('keydown', (e)=>{ if(e.key === 'Enter'){ card.click(); }});
  // Details buttons
  card.querySelectorAll('button[data-open="modal"]').forEach(b => {
    b.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const title = card.dataset.title || 'Project';
      const desc = card.dataset.desc || '';
      let links = [];
      try{ links = JSON.parse(card.dataset.links || '[]'); } catch(e){ links = []; }
      openModal(title, desc, links);
    });
  });
});
modalClose?.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });

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
