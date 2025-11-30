// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
a.addEventListener('click',function(e){
const target = document.querySelector(this.getAttribute('href'));
if(target){
e.preventDefault();
target.scrollIntoView({behavior:'smooth',block:'start'});
}
})
});


// Simple theme toggle (light/dark via CSS variables swap)
const themeToggle = document.getElementById('themeToggle');
let dark = true;
themeToggle?.addEventListener('click', ()=>{
if(dark){
document.documentElement.style.setProperty('--bg','#ffffff');
document.documentElement.style.setProperty('--text','#0b1220');
document.documentElement.style.setProperty('--muted','#4b5563');
document.documentElement.style.setProperty('--card','#f8fafc');
themeToggle.textContent = '🌞';
} else {
document.documentElement.style.setProperty('--bg','#0f1724');
document.documentElement.style.setProperty('--text','#e6eef8');
document.documentElement.style.setProperty('--muted','#9fb0c8');
document.documentElement.style.setProperty('--card','#0b1220');
themeToggle.textContent = '🌙';
}
dark = !dark;
});


// Tiny accessibility improvement: focus outline for keyboard users
document.addEventListener('keyup', (e)=>{
if(e.key === 'Tab') document.body.classList.add('user-is-tabbing');
});