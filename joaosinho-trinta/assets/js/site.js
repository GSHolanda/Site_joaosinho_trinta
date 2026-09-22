/* Instituto Joãosinho Trinta · motor da página */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const smoothstep = (p, e0, e1) => { const t = clamp((p - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };
  const easeInOut = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  function rng(seed) { let s = seed >>> 0; return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296; }
  const RM = matchMedia('(prefers-reduced-motion: reduce)');
  const NARROW = matchMedia('(max-width: 720px)');

  /* ---------- 1. divisão de texto (uma vez, com semente) ---------- */
  function splitText(el) {
    const text = el.textContent.trim().replace(/\s+/g, ' ');
    const fx = el.dataset.fx;
    const r = rng(+el.dataset.seed || 1);
    el.textContent = '';
    const sr = document.createElement('span');
    sr.className = 'sr';
    sr.textContent = text;
    const vis = document.createElement('span');
    vis.setAttribute('aria-hidden', 'true');
    const words = text.split(' ');
    words.forEach((w, wi) => {
      const ws = document.createElement('span');
      ws.className = 'w';
      if (fx === 'rise') ws.style.setProperty('--th', (wi / words.length * 0.55).toFixed(3));
      for (const ch of w) {
        const cs = document.createElement('span');
        cs.className = 'c';
        cs.textContent = ch;
        if (fx === 'sequin') {
          cs.style.setProperty('--th', (r() * 0.5).toFixed(3));
          cs.style.setProperty('--jr', ((r() - .5) * 46).toFixed(1) + 'deg');
        } else if (fx === 'scatter') {
          cs.style.setProperty('--th', (r() * 0.55).toFixed(3));
          cs.style.setProperty('--jx', ((r() - .5) * 170).toFixed(0) + 'px');
          cs.style.setProperty('--jy', ((r() - .5) * 130).toFixed(0) + 'px');
          cs.style.setProperty('--jr', ((r() - .5) * 90).toFixed(0) + 'deg');
        }
        ws.appendChild(cs);
      }
      vis.appendChild(ws);
      if (wi < words.length - 1) vis.appendChild(document.createTextNode(' '));
    });
    el.append(sr, vis);
  }
  $$('.split').forEach(splitText);

  /* ---------- 2. rasgos de plástico entre atos ---------- */
  $$('.tear').forEach((el, n) => {
    const r = rng(101 + n * 17);
    const pts = ['0% 0%', '100% 0%'];
    let x = 100;
    while (x > 0) {
      const y = r() < .12 ? 88 + r() * 12 : 30 + r() * 48;
      pts.push(`${x.toFixed(2)}% ${y.toFixed(1)}%`);
      x -= 0.8 + r() * 3.2;
    }
    pts.push(`0% ${(40 + r() * 30).toFixed(1)}%`);
    el.style.clipPath = `polygon(${pts.join(',')})`;
  });

  /* ---------- 3. o hero: o plástico rasga com o scroll ---------- */
  const hero = $('.hero');
  const photo = $('.photo');
  const glow = $('.seam-glow');
  const shL = $('.shroud-l');
  const shR = $('.shroud-r');
  const cue = $('.cue');
  const dust = $('.dust');
  const dctx = dust.getContext('2d');
  const bands = $$('.band').map((el, i, all) => ({
    el, a: +el.dataset.a, b: +el.dataset.b, ramp: +el.dataset.ramp || 0,
    first: i === 0, last: i === all.length - 1, op: -1, k: -1, vis: null
  }));
  const cache = { photo: '', l: '', r: '', glow: -1, cue: null, dust: -1 };

  let target = 0, shown = 0, rafId = null, lastTick = 0, heroOnScreen = true;
  let loadK = 0, loadStart = 0, heroInit = false, scrubOn = false;

  function heroProgress() {
    const r = hero.getBoundingClientRect();
    const range = hero.offsetHeight - innerHeight;
    return range > 0 ? clamp(-r.top / range, 0, 1) : 0;
  }

  function buildSeam() {
    const r = rng(1989);
    const seam = [];
    for (let y = 0; y <= 100.01; y += 1.6 + r() * 2.2) {
      const spike = r() < .1 ? (r() - .5) * 7 : 0;
      seam.push([50 + (r() - .5) * 2.6 + spike, Math.min(100, y)]);
    }
    seam[seam.length - 1][1] = 100;
    const edge = (dx) => seam.map(([x, y]) => `${(x + dx).toFixed(2)}% ${y.toFixed(2)}%`);
    const L = (dx) => `polygon(0% 0%, ${edge(dx).join(',')}, 0% 100%)`;
    const R = (dx) => `polygon(${edge(dx).join(',')}, 100% 100%, 100% 0%)`;
    $('.rim', shL).style.clipPath = L(0.28);
    $('.skin', shL).style.clipPath = L(0);
    $('.rim', shR).style.clipPath = R(-0.28);
    $('.skin', shR).style.clipPath = R(0);
  }

  // poeira dourada: função pura do progresso, então rolar para cima desfaz
  const DUST_N = 170;
  const motes = (() => {
    const r = rng(77);
    return Array.from({ length: DUST_N }, () => ({
      y0: .08 + r() * .84, b: .06 + r() * .56, life: .12 + r() * .22,
      side: r() < .5 ? -1 : 1, vx: .03 + r() * .16, vy: .04 + r() * .2,
      size: .6 + r() * 1.9, wob: r() * 6.28, bright: .5 + r() * .5, f: .25 + r() * .75
    }));
  })();
  let dW = 0, dH = 0, dDpr = 1;
  function sizeDust() {
    dDpr = Math.min(1.5, devicePixelRatio || 1);
    dW = dust.clientWidth; dH = dust.clientHeight;
    dust.width = Math.round(dW * dDpr); dust.height = Math.round(dH * dDpr);
    cache.dust = -1;
  }
  function drawDust(p) {
    if (Math.abs(p - cache.dust) < 0.0003) return;
    cache.dust = p;
    dctx.setTransform(dDpr, 0, 0, dDpr, 0, 0);
    dctx.clearRect(0, 0, dW, dH);
    if (p < .05 || p > .95) return;
    dctx.globalCompositeOperation = 'lighter';
    for (const m of motes) {
      const age = (p - m.b) / m.life;
      if (age <= 0 || age >= 1) continue;
      const tb = smoothstep(m.b, 0.08, 0.62);
      const ex = .5 + m.side * (.006 + .64 * tb) * m.f;
      const x = (ex + m.side * m.vx * age) * dW + Math.sin(m.wob + age * 5) * 8;
      const y = (m.y0 - m.vy * age) * dH;
      const a = Math.pow(Math.sin(Math.PI * age), .8) * m.bright;
      dctx.fillStyle = `rgba(255,214,130,${(a * .16).toFixed(3)})`;
      dctx.beginPath(); dctx.arc(x, y, m.size * 3.2, 0, 6.283); dctx.fill();
      dctx.fillStyle = `rgba(255,236,180,${(a * .9).toFixed(3)})`;
      dctx.beginPath(); dctx.arc(x, y, m.size, 0, 6.283); dctx.fill();
    }
    dctx.globalCompositeOperation = 'source-over';
  }

  function renderHero(p) {
    const t = smoothstep(p, 0.08, 0.62);
    const s = 1.04 + 0.16 * easeInOut(p);
    const ph = `scale(${s.toFixed(4)}) translate3d(0,${(1.6 * p).toFixed(3)}%,0)`;
    if (ph !== cache.photo) { photo.style.transform = ph; cache.photo = ph; }
    const off = (0.6 + 64 * t).toFixed(3), rot = (7 * t).toFixed(3), sc = (1 + 0.06 * t).toFixed(4);
    const l = `translate3d(-${off}%,0,0) rotate(${rot}deg) scale(${sc})`;
    const rr = `translate3d(${off}%,0,0) rotate(-${rot}deg) scale(${sc})`;
    if (l !== cache.l) { shL.style.transform = l; cache.l = l; }
    if (rr !== cache.r) { shR.style.transform = rr; cache.r = rr; }
    const g = +clamp(1 - t * 1.15, 0, 1).toFixed(3);
    if (g !== cache.glow) { glow.style.opacity = g; cache.glow = g; }
    const gone = p > 0.03;
    if (gone !== cache.cue) { cue.classList.toggle('gone', gone); cache.cue = gone; }
    drawDust(p);
    updateCaptions(p);
  }

  function updateCaptions(p) {
    for (const b of bands) {
      const f = Math.min(0.02, (b.b - b.a) / 3);
      let op = (b.first ? 1 : smoothstep(p, b.a, b.a + f)) * (b.last ? 1 : 1 - smoothstep(p, b.b - f, b.b));
      op = +op.toFixed(3);
      let k = clamp((p - b.a) / (b.ramp || Math.min(0.045, (b.b - b.a) * 0.35)), 0, 1);
      if (b.first) k = Math.max(k, easeOut(loadK));
      k = +k.toFixed(3);
      if (op !== b.op) {
        b.el.style.opacity = op;
        b.op = op;
        const vis = op > 0.01;
        if (vis !== b.vis) { b.el.style.visibility = vis ? 'visible' : 'hidden'; b.vis = vis; }
      }
      if (Math.abs(k - b.k) >= 0.008 || (k !== b.k && (k === 0 || k === 1))) {
        b.el.style.setProperty('--k', k);
        b.k = k;
      }
    }
  }

  function tick(now) {
    const dt = Math.min(100, now - (lastTick || now));
    lastTick = now;
    const kk = 0.14;
    shown += (target - shown) * (1 - Math.pow(1 - kk, dt / 16.667));
    let busy = true;
    if (Math.abs(target - shown) < 0.0004) { shown = target; busy = false; }
    if (loadK < 1) { loadK = clamp((now - loadStart) / 1700, 0, 1); busy = true; }
    renderHero(shown);
    if (busy && scrubOn) rafId = requestAnimationFrame(tick);
    else { rafId = null; lastTick = 0; }
  }
  function kick() { if (rafId === null && scrubOn) rafId = requestAnimationFrame(tick); }
  function onScroll() { target = heroProgress(); if (heroOnScreen) kick(); }

  new IntersectionObserver(([e]) => {
    heroOnScreen = e.isIntersecting;
    if (heroOnScreen) onScroll();
  }).observe(hero);

  function initHeroOnce() {
    if (heroInit) return;
    heroInit = true;
    sizeDust();
    loadStart = performance.now();
  }
  function clearHeroInline() {
    photo.style.transform = ''; shL.style.transform = ''; shR.style.transform = ''; glow.style.opacity = '';
    cache.photo = cache.l = cache.r = ''; cache.glow = -1; cache.cue = null; cache.dust = -1;
    dctx.clearRect(0, 0, dust.width, dust.height);
  }

  /* ---------- 4. os cinco portões do hero estático, vivos ---------- */
  const GATES = [
    '(max-width: 720px)',
    '(orientation: portrait) and (max-width: 1024px)',
    '(orientation: portrait) and (pointer: coarse)',
    '(orientation: landscape) and (pointer: coarse) and (max-height: 560px)',
    '(prefers-reduced-motion: reduce)'
  ];
  const MQLS = GATES.map(q => matchMedia(q));
  function enableScrub() {
    if (scrubOn) return;
    scrubOn = true;
    initHeroOnce();
    addEventListener('scroll', onScroll, { passive: true });
    bands.forEach(b => { b.op = -1; b.k = -1; b.vis = null; });
    cache.photo = cache.l = cache.r = ''; cache.glow = -1; cache.cue = null; cache.dust = -1;
    unpinFinalStates();
    shown = target = heroProgress();
    updateCaptions(shown);
    onScroll();
    kick();
  }
  function disableScrub() {
    if (!scrubOn) return;
    scrubOn = false;
    removeEventListener('scroll', onScroll);
    if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
    clearHeroInline();
  }
  function applyHeroMode() {
    if (MQLS.some(m => m.matches)) disableScrub();
    else enableScrub();
  }
  // no modo estático o rasgo ainda precisa das bordas
  buildSeam();

  /* ---------- 5. entradas e aposentadoria dos atrasos ---------- */
  const reveals = $$('.reveal');
  const stampSlot = $('.stamp-slot');
  const raw = $('.raw');
  let io = null;
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target;
        if (el === stampSlot) { raw.classList.add('stamped'); io.unobserve(el); continue; }
        el.classList.add('in');
        delete el.dataset.pinned;
        io.unobserve(el);
        setTimeout(() => el.classList.add('done'), 1500);
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
    io.observe(stampSlot);
  } else {
    document.documentElement.classList.add('no-io');
    raw.classList.add('stamped');
  }

  /* ---------- 6. galeria: deriva de profundidade leve ---------- */
  const gItems = $$('.g-img').map(el => ({ el, fig: el.parentElement, speed: +el.dataset.speed || 0, py: null, on: false }));
  let gRaf = null;
  const galleryIO = new IntersectionObserver(entries => {
    for (const e of entries) { const it = gItems.find(i => i.fig === e.target); if (it) it.on = e.isIntersecting; }
    queueGallery();
  }, { rootMargin: '20% 0px' });
  gItems.forEach(i => galleryIO.observe(i.fig));
  function galleryActive() { return !RM.matches && !NARROW.matches; }
  function runGallery() {
    gRaf = null;
    if (!galleryActive()) return;
    const mid = innerHeight / 2;
    for (const it of gItems) {
      if (!it.on) continue;
      const r = it.fig.getBoundingClientRect();
      const lim = r.height * .055;
      const py = Math.round(clamp((r.top + r.height / 2 - mid) * it.speed, -lim, lim) * 2) / 2;
      if (py !== it.py) { it.el.style.setProperty('--py', py + 'px'); it.py = py; }
    }
  }
  function queueGallery() { if (gRaf === null) gRaf = requestAnimationFrame(runGallery); }
  addEventListener('scroll', queueGallery, { passive: true });
  function clearGallery() { gItems.forEach(it => { it.el.style.removeProperty('--py'); it.py = null; }); }
  NARROW.addEventListener('change', () => { if (!galleryActive()) clearGallery(); else queueGallery(); });

  /* ---------- 7. letreiro de valores ---------- */
  const track = $('.marquee-track');
  const VALUES = ['Compromisso com a cultura', 'com o desenvolvimento', 'com a sociedade'];
  const unit = VALUES.map(v => `<span>${v}</span><span class="dot">◆</span>`).join('');
  track.innerHTML = unit.repeat(4) + unit.repeat(4);
  const marquee = $('.marquee');
  new IntersectionObserver(([e]) => marquee.classList.toggle('anim', e.isIntersecting)).observe(marquee);

  const titulos = $('.titulos');
  new IntersectionObserver(([e]) => titulos.classList.toggle('anim', e.isIntersecting)).observe(titulos);

  /* ---------- 8. LIXO vira LUXO (o momento interativo) ---------- */
  const seg = $('.segredo');
  const cvs = $('.alchemy-canvas');
  const actx = cvs.getContext('2d');
  const hold = $('.hold');
  const holdLabel = $('.hold-label');
  const live = $('#hold-live');
  const HOLD_MS = 2300;
  const A = { W: 0, H: 0, dpr: 1, parts: [], prog: 0, holding: false, done: false, resetting: false, raf: null, last: 0, glintUntil: 0, ready: false, pinned: false, hp: -1, sprites: [] };
  const SCRAP = ['#4b4e52', '#3a3c40', '#5d6064', '#2e3033', '#6b6f73', '#44474b', '#5a4b3c', '#3e4b40', '#3b4553', '#6a5a48'];

  function makeSprites(r) {
    A.sprites = [];
    for (let i = 0; i < 6; i++) {
      const b = i / 5;
      const c = document.createElement('canvas');
      const s = Math.ceil(r * 2 * A.dpr) + 2;
      c.width = c.height = s;
      const g = c.getContext('2d');
      const R = s / 2 - 1;
      const grd = g.createLinearGradient(0, 0, s, s);
      grd.addColorStop(0, `rgb(${255},${Math.round(226 + 26 * b)},${Math.round(150 + 80 * b)})`);
      grd.addColorStop(.45, `rgb(${Math.round(190 + 40 * b)},${Math.round(146 + 40 * b)},${Math.round(40 + 20 * b)})`);
      grd.addColorStop(1, `rgb(${Math.round(90 + 40 * b)},${Math.round(62 + 30 * b)},${Math.round(16 + 10 * b)})`);
      g.fillStyle = grd;
      g.beginPath(); g.arc(s / 2, s / 2, R, 0, 6.283); g.fill();
      g.fillStyle = 'rgba(30,20,6,.8)';
      g.beginPath(); g.arc(s / 2, s / 2, R * .2, 0, 6.283); g.fill();
      A.sprites.push(c);
    }
  }

  function sampleWord(word, W, H, fs, stroke) {
    const oc = document.createElement('canvas');
    oc.width = W; oc.height = H;
    const o = oc.getContext('2d');
    o.textAlign = 'center'; o.textBaseline = 'middle';
    o.font = `600 ${fs}px "Noto Serif Display", Georgia, serif`;
    if ('fontStretch' in o) o.fontStretch = 'extra-condensed';
    o.fillStyle = '#fff';
    o.strokeStyle = '#fff';
    o.lineWidth = stroke;
    o.lineJoin = 'round';
    o.fillText(word, W / 2, H * .54);
    o.strokeText(word, W / 2, H * .54);
    return o.getImageData(0, 0, W, H).data;
  }
  function fontSizeFor(W, H) {
    const o = document.createElement('canvas').getContext('2d');
    let fs = H * .98;
    const set = () => { o.font = `600 ${fs}px "Noto Serif Display", Georgia, serif`; if ('fontStretch' in o) o.fontStretch = 'extra-condensed'; };
    set();
    const w = Math.max(o.measureText('LIXO').width, o.measureText('LUXO').width);
    if (w > W * .9) { fs *= W * .9 / w; set(); }
    return fs;
  }

  function buildAlchemy() {
    A.dpr = Math.min(2, devicePixelRatio || 1);
    A.W = cvs.clientWidth; A.H = cvs.clientHeight;
    if (!A.W || !A.H) return;
    cvs.width = Math.round(A.W * A.dpr); cvs.height = Math.round(A.H * A.dpr);
    const W = Math.round(A.W), H = Math.round(A.H);
    const fs = fontSizeFor(W, H);
    const target = NARROW.matches ? 650 : 1250;
    const step = Math.max(3, Math.sqrt((W * H * .2) / target));
    const pick = (data) => {
      const pts = [];
      for (let y = step / 2; y < H; y += step) {
        for (let x = step / 2; x < W; x += step) {
          if (data[(Math.floor(y) * W + Math.floor(x)) * 4 + 3] > 140) pts.push([x, y]);
        }
      }
      return pts;
    };
    const Pa = pick(sampleWord('LIXO', W, H, fs, step * 1.1));
    const Pb = pick(sampleWord('LUXO', W, H, fs, step * 1.1));
    const r = rng(2011);
    const fill = (arr, n) => { while (arr.length < n) { const q = arr[Math.floor(r() * arr.length)]; arr.push([q[0] + (r() - .5) * step * .6, q[1] + (r() - .5) * step * .6]); } };
    const N = Math.max(Pa.length, Pb.length);
    fill(Pa, N); fill(Pb, N);
    const key = p => p[0] + p[1] * .015;
    Pa.sort((a, b) => key(a) - key(b));
    Pb.sort((a, b) => key(a) - key(b));
    const sr = step * .5;
    A.parts = Pa.map((a, i) => {
      const b = Pb[i];
      const nv = 4 + Math.floor(r() * 2);
      const verts = Array.from({ length: nv }, (_, j) => {
        const ang = j / nv * 6.283 + (r() - .5) * .9;
        const rad = sr * (.55 + r() * .75);
        return [Math.cos(ang) * rad, Math.sin(ang) * rad];
      });
      const ang = r() * 6.283, dist = 30 + r() * 110;
      return {
        ax: a[0] + (r() - .5) * step * .5, ay: a[1] + (r() - .5) * step * .5,
        bx: b[0] + (r() - .5) * step * .3, by: b[1] + (r() - .5) * step * .3,
        sx: Math.cos(ang) * dist, sy: Math.sin(ang) * dist - 40,
        delay: r() * .32, rot: r() * 6.283, spin: (r() - .5) * 6,
        verts, color: SCRAP[Math.floor(Math.pow(r(), 1.6) * SCRAP.length)],
        spr: Math.floor(Math.pow(r(), 1.8) * 6), glint: r(), sr: sr * (.9 + r() * .2)
      };
    });
    makeSprites(sr * 1.15);
    A.ready = true;
    drawAlchemy(A.prog, performance.now());
  }

  function drawAlchemy(prog, now) {
    const g = actx;
    g.setTransform(A.dpr, 0, 0, A.dpr, 0, 0);
    g.clearRect(0, 0, A.W, A.H);
    const glinting = now < A.glintUntil;
    for (const p of A.parts) {
      const m = easeInOut(clamp((prog - p.delay) / .68, 0, 1));
      const lift = Math.sin(Math.PI * m);
      const x = p.ax + (p.bx - p.ax) * m + p.sx * lift;
      const y = p.ay + (p.by - p.ay) * m + p.sy * lift;
      const aScrap = 1 - smoothstep(m, .3, .7);
      const aSeq = smoothstep(m, .3, .7);
      if (aScrap > 0.01) {
        const rt = p.rot + p.spin * m;
        const c = Math.cos(rt), s = Math.sin(rt);
        g.globalAlpha = aScrap;
        g.fillStyle = p.color;
        g.beginPath();
        p.verts.forEach(([vx, vy], j) => { const X = x + vx * c - vy * s, Y = y + vx * s + vy * c; j ? g.lineTo(X, Y) : g.moveTo(X, Y); });
        g.closePath(); g.fill();
      }
      if (aSeq > 0.01) {
        const spr = A.sprites[p.spr];
        const d = p.sr * 2.3 * (.6 + .4 * aSeq);
        g.globalAlpha = aSeq;
        g.drawImage(spr, x - d / 2, y - d / 2, d, d);
        if (glinting && p.glint > .93) {
          const tt = (now % 1400) / 1400;
          const fl = Math.max(0, Math.sin((tt + p.glint * 7) * 6.283));
          if (fl > .2) {
            g.globalCompositeOperation = 'lighter';
            g.globalAlpha = fl * .7;
            g.fillStyle = 'rgba(255,240,200,1)';
            g.beginPath(); g.arc(x, y, p.sr * 1.5 * fl, 0, 6.283); g.fill();
            g.globalCompositeOperation = 'source-over';
          }
        }
      }
    }
    g.globalAlpha = 1;
  }

  function alchTick(now) {
    const dt = Math.min(64, now - (A.last || now));
    A.last = now;
    if (A.resetting) {
      A.prog = Math.max(0, A.prog - dt / 900);
      if (A.prog === 0) A.resetting = false;
    } else if (A.holding && !A.done) {
      A.prog = Math.min(1, A.prog + dt / HOLD_MS);
    } else if (!A.done) {
      A.prog = Math.max(0, A.prog - dt / 1500);
    }
    if (A.prog >= 1 && !A.done && !A.resetting) completeAlchemy(now);
    drawAlchemy(A.prog, now);
    const hp = +(A.done ? 1 : A.prog).toFixed(3);
    if (hp !== A.hp) { hold.style.setProperty('--hp', hp); A.hp = hp; }
    const active = A.resetting || A.holding || (!A.done && A.prog > 0) || now < A.glintUntil;
    if (active) A.raf = requestAnimationFrame(alchTick);
    else { A.raf = null; A.last = 0; if (A.done) drawAlchemy(1, 0); }
  }
  function alchKick() { if (A.raf === null && A.ready) A.raf = requestAnimationFrame(alchTick); }
  function completeAlchemy(now) {
    A.done = true; A.holding = false;
    hold.classList.remove('holding');
    seg.classList.add('done');
    holdLabel.textContent = 'Ver de novo';
    live.textContent = 'Pronto. LIXO virou LUXO.';
    A.glintUntil = now + 2800;
  }
  function startHold() {
    if (!A.ready) return;
    if (A.done) {
      A.done = false; A.resetting = true;
      seg.classList.remove('done');
      holdLabel.textContent = 'Segure para transformar';
      live.textContent = '';
      alchKick();
      return;
    }
    A.holding = true; A.resetting = false;
    hold.classList.add('holding');
    alchKick();
  }
  function endHold() {
    if (!A.holding) return;
    A.holding = false;
    hold.classList.remove('holding');
    alchKick();
  }
  hold.addEventListener('pointerdown', e => { if (e.button !== 0) return; e.preventDefault(); try { hold.setPointerCapture(e.pointerId); } catch (_) {} startHold(); });
  hold.addEventListener('pointerup', endHold);
  hold.addEventListener('pointercancel', endHold);
  hold.addEventListener('lostpointercapture', endHold);
  hold.addEventListener('contextmenu', e => e.preventDefault());
  hold.addEventListener('keydown', e => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); startHold(); } else if (e.key === ' ' || e.key === 'Enter') e.preventDefault(); });
  hold.addEventListener('keyup', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); endHold(); } });
  hold.addEventListener('click', e => e.preventDefault());

  async function initAlchemy() {
    try { await document.fonts.load('600 100px "Noto Serif Display"'); } catch (_) {}
    try { await document.fonts.ready; } catch (_) {}
    buildAlchemy();
    if (RM.matches) pinAlchemy();
  }
  let alchStarted = false;
  new IntersectionObserver(([e]) => {
    seg.classList.toggle('anim', e.isIntersecting);
    if (e.isIntersecting && !alchStarted) { alchStarted = true; initAlchemy(); }
  }, { rootMargin: '40% 0px' }).observe(seg);
  let rzT = 0;
  addEventListener('resize', () => {
    clearTimeout(rzT);
    rzT = setTimeout(() => {
      if (A.ready) buildAlchemy();
      if (heroInit) { sizeDust(); if (scrubOn) renderHero(shown); }
      queueGallery();
    }, 150);
  });
  function pinAlchemy() {
    if (A.done) return;
    A.pinned = true;
    A.prog = 1; A.done = true; A.holding = false; A.resetting = false;
    if (A.raf !== null) { cancelAnimationFrame(A.raf); A.raf = null; }
    seg.classList.add('done');
    holdLabel.textContent = 'Ver de novo';
    hold.style.setProperty('--hp', 1);
    if (A.ready) drawAlchemy(1, 0);
  }
  function unpinAlchemy() {
    if (!A.pinned) return;
    A.pinned = false;
    A.prog = 0; A.done = false; A.hp = -1;
    seg.classList.remove('done');
    holdLabel.textContent = 'Segure para transformar';
    hold.style.setProperty('--hp', 0);
    if (A.ready) drawAlchemy(0, 0);
  }

  /* ---------- 9. movimento reduzido, ao vivo e nas duas direções ---------- */
  function pinToFinalStates() {
    reveals.forEach(el => { if (!el.classList.contains('in')) { el.dataset.pinned = '1'; el.classList.add('in', 'done'); } });
    raw.classList.add('stamped');
    marquee.classList.remove('anim');
    clearGallery();
    pinAlchemy();
  }
  function unpinFinalStates() {
    if (RM.matches) return;
    reveals.forEach(el => {
      if (el.dataset.pinned) {
        delete el.dataset.pinned;
        el.classList.remove('in', 'done');
        if (io) io.observe(el);
      }
    });
    unpinAlchemy();
    queueGallery();
  }
  RM.addEventListener('change', e => {
    if (e.matches) pinToFinalStates();
    else applyHeroMode();
  });
  MQLS.forEach(m => m.addEventListener('change', applyHeroMode));
  if (RM.matches) pinToFinalStates();
  applyHeroMode();

  /* ---------- 10. navegação sólida depois do hero ---------- */
  const nav = $('#nav');
  let navSolid = null, navRaf = null;
  function checkNav() {
    navRaf = null;
    const end = hero.offsetTop + hero.offsetHeight - innerHeight * (scrubOn ? 1 : .15);
    const s = scrollY > end;
    if (s !== navSolid) { nav.classList.toggle('solid', s); navSolid = s; }
  }
  addEventListener('scroll', () => { if (navRaf === null) navRaf = requestAnimationFrame(checkNav); }, { passive: true });
  checkNav();

  /* ---------- 11. aba escondida pausa tudo ---------- */
  document.addEventListener('visibilitychange', () => document.body.classList.toggle('paused', document.hidden));

  /* ---------- 12. formulário: abre o e-mail do visitante ---------- */
  const form = $('#form');
  const err = $('#form-err');
  const ok = $('#form-ok');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const nome = form.nome.value.trim(), email = form.email.value.trim(), msg = form.mensagem.value.trim(), perfil = form.perfil.value;
    [form.nome, form.email, form.mensagem].forEach(f => f.removeAttribute('aria-invalid'));
    const missing = [[form.nome, nome], [form.email, email], [form.mensagem, msg]].filter(([, v]) => !v);
    if (missing.length) {
      missing.forEach(([f]) => f.setAttribute('aria-invalid', 'true'));
      err.textContent = 'Preencha nome, e-mail e mensagem para a gente poder responder.';
      missing[0][0].focus();
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      form.email.setAttribute('aria-invalid', 'true');
      err.textContent = 'Confira o e-mail. Parece que falta alguma parte.';
      form.email.focus();
      return;
    }
    err.textContent = '';
    const body = `Nome: ${nome}\nE-mail: ${email}\nPerfil: ${perfil}\n\n${msg}`;
    location.href = 'mailto:contato@institutojoaosinhotrinta.com.br?subject=' + encodeURIComponent('Contato pelo site: ' + perfil) + '&body=' + encodeURIComponent(body);
    form.classList.add('sent');
    setTimeout(() => ok.focus(), 50);
  });
})();
