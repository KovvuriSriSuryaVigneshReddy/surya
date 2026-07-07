/* ══════════════════════════════════════════
   CONTACT FORM  — must be global (called via onclick in HTML)
   ══════════════════════════════════════════ */
function sendContactForm() {
  const name    = document.getElementById('cf-name').value.trim();
  const email   = document.getElementById('cf-email').value.trim();
  const message = document.getElementById('cf-message').value.trim();
  const errEl   = document.getElementById('cf-error');
  const btn     = document.getElementById('cf-btn');
  const success = document.getElementById('cf-success');

  errEl.style.display = 'none';

  function showErr(msg) {
    errEl.textContent = msg;
    errEl.style.display = 'block';
    const fieldId = msg.includes('NAME') ? 'cf-name' : msg.includes('EMAIL') ? 'cf-email' : 'cf-message';
    document.getElementById(fieldId).style.borderColor = 'var(--neon3)';
  }

  if (!name)   { showErr('▸ NAME IS REQUIRED'); return; }
  if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) { showErr('▸ VALID EMAIL IS REQUIRED'); return; }
  if (!message){ showErr('▸ MESSAGE CANNOT BE EMPTY'); return; }

  const subject = encodeURIComponent('Portfolio Contact from ' + name);
  const body    = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);
  const mailto  = 'mailto:kovvuri.srisuryavigneshreddy@gmail.com?subject=' + subject + '&body=' + body;

  btn.style.display     = 'none';
  success.style.display = 'block';
  ['cf-name','cf-email','cf-message'].forEach(id => { document.getElementById(id).style.borderColor = ''; });

  window.location.href = mailto;

  setTimeout(() => {
    document.getElementById('cf-name').value    = '';
    document.getElementById('cf-email').value   = '';
    document.getElementById('cf-message').value = '';
    success.style.display = 'none';
    btn.style.display     = 'block';
  }, 4000);
}

/* ══════════════════════════════════════════
   MAIN APP  — runs after full page + scripts load
   ══════════════════════════════════════════ */
window.addEventListener('load', function () {

  /* ── LOADER ── */
  setTimeout(function() {
    var loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 2200);

  /* ── CURSOR ── */
  var cursor = document.getElementById('cursor');
  var trail  = document.getElementById('cursor-trail');
  var spot   = document.getElementById('spotlight');

  if (cursor && trail && spot) {
    document.addEventListener('mousemove', function(e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
      trail.style.left  = e.clientX + 'px';
      trail.style.top   = e.clientY + 'px';
      spot.style.background = 'radial-gradient(circle 350px at ' + e.clientX + 'px ' + e.clientY + 'px, rgba(0,212,255,0.05) 0%, transparent 70%)';
    });

    document.querySelectorAll('a,button,.btn,.skill-chip,.cert-card,.timeline-card').forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        cursor.style.width      = '20px';
        cursor.style.height     = '20px';
        cursor.style.background = 'var(--neon2)';
      });
      el.addEventListener('mouseleave', function() {
        cursor.style.width      = '12px';
        cursor.style.height     = '12px';
        cursor.style.background = 'var(--neon)';
      });
    });
  }

  /* ── SCROLL PROGRESS + ACTIVE NAV ── */
  window.addEventListener('scroll', function() {
    var bar = document.getElementById('progress-bar');
    var nav = document.getElementById('navbar');
    var s   = window.scrollY;
    var h   = document.body.scrollHeight - window.innerHeight;

    if (bar) bar.style.width = (s / h * 100) + '%';
    if (nav) nav.classList.toggle('scrolled', s > 50);

    var sections = ['home','about','skills','education','projects','certifications','contact'];
    var current  = 'home';
    sections.forEach(function(id) {
      var sec = document.getElementById(id);
      if (sec && s >= sec.offsetTop - 120) current = id;
    });
    document.querySelectorAll('.nav-links a').forEach(function(a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  });

  /* ── THREE.JS BACKGROUND ── */
  (function() {
    if (typeof THREE === 'undefined') { console.warn('Three.js not loaded'); return; }

    var canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    var scene  = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 600;

    /* Stars */
    var starGeo = new THREE.BufferGeometry();
    var count   = 3500;
    var pos     = new Float32Array(count * 3);
    var cols    = new Float32Array(count * 3);
    for (var i = 0; i < count * 3; i += 3) {
      pos[i]   = (Math.random() - 0.5) * 2000;
      pos[i+1] = (Math.random() - 0.5) * 2000;
      pos[i+2] = (Math.random() - 0.5) * 2000;
      var t = Math.random();
      if      (t < 0.33) { cols[i]=0;    cols[i+1]=0.83; cols[i+2]=1;    }
      else if (t < 0.66) { cols[i]=0.48; cols[i+1]=0.18; cols[i+2]=1;    }
      else               { cols[i]=1;    cols[i+1]=0.18; cols[i+2]=0.47; }
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(pos,  3));
    starGeo.setAttribute('color',    new THREE.BufferAttribute(cols, 3));
    var starMat = new THREE.PointsMaterial({ size: 1.6, vertexColors: true, transparent: true, opacity: 0.7 });
    scene.add(new THREE.Points(starGeo, starMat));

    /* Grid */
    var grid = new THREE.Mesh(
      new THREE.PlaneGeometry(3000, 3000, 40, 40),
      new THREE.MeshBasicMaterial({ color: 0x001a33, wireframe: true, transparent: true, opacity: 0.08 })
    );
    grid.rotation.x = -Math.PI / 2.5;
    grid.position.y = -300;
    scene.add(grid);

    /* Floating shapes */
    var shapes = [];
    for (var j = 0; j < 12; j++) {
      var mesh = new THREE.Mesh(
        new THREE.OctahedronGeometry(Math.random() * 18 + 6, 0),
        new THREE.MeshBasicMaterial({
          color:     j % 3 === 0 ? 0x00d4ff : j % 3 === 1 ? 0x7b2fff : 0xff2d78,
          wireframe: true, transparent: true, opacity: 0.25
        })
      );
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

    var mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', function(e) {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener('resize', function() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function animate() {
      requestAnimationFrame(animate);
      var t = Date.now() * 0.0004;

      shapes.forEach(function(s) {
        s.rotation.x += s.userData.rx;
        s.rotation.y += s.userData.ry;
        s.position.z += s.userData.tz;
        if (s.position.z >  400) s.position.z = -400;
        if (s.position.z < -400) s.position.z =  400;
      });

      camera.position.x += (mouseX * 60  - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 40 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      starMat.opacity = 0.55 + Math.sin(t) * 0.15;
      grid.rotation.z = t * 0.04;

      renderer.render(scene, camera);
    }
    animate();
  })();

  /* ── 3D CARD TILT ── */
  document.querySelectorAll('.glass').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var r  = card.getBoundingClientRect();
      var rx = ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) *  8;
      var ry = ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) * -8;
      card.style.transform = 'perspective(800px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateZ(8px) translateY(-4px)';
    });
    card.addEventListener('mouseleave', function() { card.style.transform = ''; });
  });

  /* ── SCROLL REVEAL ── */
  var reveals  = document.querySelectorAll('.reveal, .reveal-left');
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function() { entry.target.classList.add('visible'); }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach(function(el) { observer.observe(el); });

  /* ── PARALLAX HERO ── */
  document.addEventListener('mousemove', function(e) {
    var x = (e.clientX / window.innerWidth  - 0.5) * 20;
    var y = (e.clientY / window.innerHeight - 0.5) * 20;
    document.querySelectorAll('.float-el').forEach(function(el, i) {
      var d = (i % 2 === 0 ? 1 : -1) * 0.4;
      el.style.transform = 'translateY(' + (y * d) + 'px) translateX(' + (x * d * 0.5) + 'px)';
    });
    document.querySelectorAll('.orb').forEach(function(orb, i) {
      var s = (i + 1) * 0.3;
      orb.style.transform = 'translate(' + (x * s) + 'px, ' + (y * s) + 'px)';
    });
  });

  /* ── FORM INPUT BORDER RESET ── */
  ['cf-name','cf-email','cf-message'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', function() { el.style.borderColor = ''; });
  });

}); // end window load
