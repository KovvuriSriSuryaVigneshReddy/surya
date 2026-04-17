/* ── CONTACT FORM ── */
function sendContactForm() {
  const name    = document.getElementById('cf-name').value.trim();
  const email   = document.getElementById('cf-email').value.trim();
  const message = document.getElementById('cf-message').value.trim();
  const errEl   = document.getElementById('cf-error');
  const btn     = document.getElementById('cf-btn');
  const success = document.getElementById('cf-success');

  // Validate
  errEl.style.display = 'none';
  if (!name) { showErr('▸ NAME IS REQUIRED'); return; }
  if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) { showErr('▸ VALID EMAIL IS REQUIRED'); return; }
  if (!message) { showErr('▸ MESSAGE CANNOT BE EMPTY'); return; }

  function showErr(msg) {
    errEl.textContent = msg;
    errEl.style.display = 'block';
    document.getElementById('cf-' + (msg.includes('NAME') ? 'name' : msg.includes('EMAIL') ? 'email' : 'message')).style.borderColor = 'var(--neon3)';
  }

  // Build mailto
  const subject = encodeURIComponent('Portfolio Contact from ' + name);
  const body    = encodeURIComponent(
    'Name: ' + name + '\n' +
    'Email: ' + email + '\n\n' +
    'Message:\n' + message
  );
  const mailto = 'mailto:kovvuri.srisuryavigneshreddy@gmail.com?subject=' + subject + '&body=' + body;

  // Visual feedback
  btn.style.display = 'none';
  success.style.display = 'block';

  // Reset border colors
  ['cf-name','cf-email','cf-message'].forEach(id => {
    document.getElementById(id).style.borderColor = '';
  });

  // Open mail client
  window.location.href = mailto;

  // Reset form after 4s
  setTimeout(() => {
    document.getElementById('cf-name').value = '';
    document.getElementById('cf-email').value = '';
    document.getElementById('cf-message').value = '';
    success.style.display = 'none';
    btn.style.display = 'block';
  }, 4000);
}

// Reset border on input
['cf-name','cf-email','cf-message'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', () => { el.style.borderColor = ''; });
});

/* ── LOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2200);
});

/* ── CURSOR ── */
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursor-trail');
const spot   = document.getElementById('spotlight');
let mx = 0, my = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
  trail.style.left  = mx + 'px';
  trail.style.top   = my + 'px';
  spot.style.background = `radial-gradient(circle 350px at ${mx}px ${my}px, rgba(0,212,255,0.05) 0%, transparent 70%)`;
});

document.querySelectorAll('a,button,.btn,.skill-chip,.cert-card,.timeline-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.background = 'var(--neon2)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    cursor.style.background = 'var(--neon)';
  });
});

/* ── SCROLL PROGRESS + ACTIVE NAV ── */
window.addEventListener('scroll', () => {
  const el = document.getElementById('progress-bar');
  const s = window.scrollY;
  const h = document.body.scrollHeight - window.innerHeight;
  el.style.width = (s / h * 100) + '%';

  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', s > 50);

  // Active nav link
  const sections = ['home','about','skills','education','certifications','contact'];
  let current = 'home';
  sections.forEach(id => {
    const sec = document.getElementById(id);
    if (sec && window.scrollY >= sec.offsetTop - 120) current = id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

/* ── THREE.JS BACKGROUND ── */
(function() {
  const canvas = document.getElementById('bg-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.z = 600;

  // Stars
  const starGeo = new THREE.BufferGeometry();
  const count = 3500;
  const pos = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    pos[i]   = (Math.random() - 0.5) * 2000;
    pos[i+1] = (Math.random() - 0.5) * 2000;
    pos[i+2] = (Math.random() - 0.5) * 2000;
    const t = Math.random();
    if (t < 0.33) { colors[i]=0; colors[i+1]=0.83; colors[i+2]=1; }
    else if (t < 0.66) { colors[i]=0.48; colors[i+1]=0.18; colors[i+2]=1; }
    else { colors[i]=1; colors[i+1]=0.18; colors[i+2]=0.47; }
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const starMat = new THREE.PointsMaterial({ size: 1.6, vertexColors: true, transparent: true, opacity: 0.7 });
  scene.add(new THREE.Points(starGeo, starMat));

  // Grid
  const gridGeo = new THREE.PlaneGeometry(3000, 3000, 40, 40);
  const gridMat = new THREE.MeshBasicMaterial({
    color: 0x001a33, wireframe: true, transparent: true, opacity: 0.08
  });
  const grid = new THREE.Mesh(gridGeo, gridMat);
  grid.rotation.x = -Math.PI / 2.5;
  grid.position.y = -300;
  scene.add(grid);

  // Floating tetra
  const shapes = [];
  for (let i = 0; i < 12; i++) {
    const g = new THREE.OctahedronGeometry(Math.random() * 18 + 6, 0);
    const m = new THREE.MeshBasicMaterial({
      color: i % 3 === 0 ? 0x00d4ff : i % 3 === 1 ? 0x7b2fff : 0xff2d78,
      wireframe: true, transparent: true, opacity: 0.25
    });
    const mesh = new THREE.Mesh(g, m);
    mesh.position.set(
      (Math.random() - 0.5) * 1200,
      (Math.random() - 0.5) * 800,
      (Math.random() - 0.5) * 600
    );
    mesh.userData = {
      rx: (Math.random() - 0.5) * 0.006,
      ry: (Math.random() - 0.5) * 0.006,
      tz: (Math.random() - 0.5) * 0.3
    };
    scene.add(mesh);
    shapes.push(mesh);
  }

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function animate() {
    requestAnimationFrame(animate);
    const t = Date.now() * 0.0004;

    shapes.forEach(s => {
      s.rotation.x += s.userData.rx;
      s.rotation.y += s.userData.ry;
      s.position.z += s.userData.tz;
      if (s.position.z > 400) s.position.z = -400;
      if (s.position.z < -400) s.position.z = 400;
    });

    camera.position.x += (mouseX * 60 - camera.position.x) * 0.03;
    camera.position.y += (-mouseY * 40 - camera.position.y) * 0.03;
    camera.lookAt(scene.position);

    starMat.opacity = 0.55 + Math.sin(t) * 0.15;
    grid.rotation.z = t * 0.04;

    renderer.render(scene, camera);
  }
  animate();
})();

/* ── 3D CARD TILT ── */
document.querySelectorAll('.glass').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const cx = r.width / 2;
    const cy = r.height / 2;
    const rx = ((y - cy) / cy) * 8;
    const ry = ((x - cx) / cx) * -8;
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── SCROLL REVEAL ── */
const reveals = document.querySelectorAll('.reveal, .reveal-left');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

/* ── PARALLAX HERO ── */
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  document.querySelectorAll('.float-el').forEach((el, i) => {
    const d = (i % 2 === 0 ? 1 : -1) * 0.4;
    el.style.transform = `translateY(calc(${Math.sin(Date.now()*0.001)*15}px + ${y*d}px)) translateX(${x*d*0.5}px)`;
  });
  document.querySelectorAll('.orb').forEach((orb, i) => {
    const s = (i + 1) * 0.3;
    orb.style.transform = `translate(${x*s}px, ${y*s}px)`;
  });
});