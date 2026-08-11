/* G2tM — motor */

const SAVE = 'g2tm.v1';
const $ = id => document.getElementById(id);

let S = load();
let cur = null;      // nodo actual
let qi = 0;          // índice de pregunta
let pts = 0;         // puntos de la región
let prevChoice = ''; // para el eco de Saturno
let usedRetry = false, usedDescarte = false;
let tmr = null;

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(SAVE));
    if (raw && Array.isArray(raw.done)) return raw;
  } catch (e) {}
  return { done: [], figuras: [], deaths: 0, seen: false };
}
function save() { try { localStorage.setItem(SAVE, JSON.stringify(S)); } catch (e) {} }

const has = p => S.figuras.some(f => FIGURAS.find(x => x.id === f)?.power === p);
const nodo = id => NODOS.find(n => n.id === id);
const hecho = id => S.done.includes(id);

function proximo() { return NODOS.find(n => !hecho(n.id)); }
function enEspacio() { const p = proximo(); return p ? p.zone === 'espacio' : true; }

function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('on'));
  $(id).classList.add('on');
  window.scrollTo(0, 0);
}
function tema() { document.body.classList.toggle('espacio', enEspacio()); }

/* ═══════════ MAPA ═══════════ */

function renderMap() {
  clearTimer();
  tema();
  const espacio = enEspacio();
  $('map-title').textContent = espacio ? 'El sistema' : 'Tierra';
  const p = proximo();
  $('map-sub').textContent = p
    ? `${S.done.length} de ${NODOS.length} aprobadas · ${S.deaths} ${S.deaths === 1 ? 'caída' : 'caídas'}${S.figuras.length ? ' · ' + S.figuras.length + (S.figuras.length === 1 ? ' figura' : ' figuras') : ''}`
    : 'Terminaste.';

  const m = $('map'); m.innerHTML = '';
  let puestoDivisor = false;
  NODOS.forEach(n => {
    if (n.zone === 'espacio' && !puestoDivisor) {
      puestoDivisor = true;
      const d = document.createElement('div');
      d.className = 'divider';
      d.textContent = hecho('texas') ? 'órbita' : 'fuera de alcance';
      m.appendChild(d);
    }
    const done = hecho(n.id);
    const now = !done && p && p.id === n.id;
    const el = document.createElement('div');
    el.className = 'node ' + (done ? 'done' : now ? 'now' : 'lock');
    el.innerHTML = `
      <div class="ico">${done || now ? n.icon : '·'}</div>
      <div class="meta">
        <div class="rg">${done || now ? n.region : '???'}</div>
        <div class="sn">${done || now ? n.sensei + ' — ' + n.title : 'sin datos'}</div>
      </div>
      <div class="st">${done ? 'aprobado' : now ? 'acá estás' : 'cerrado'}</div>`;
    if (now) el.onclick = () => entrar(n);
    m.appendChild(el);
  });
  show('s-map');
}

/* ═══════════ EXAMEN ═══════════ */

function entrar(n) {
  cur = n; qi = 0; pts = 0; prevChoice = '';
  usedRetry = false; usedDescarte = false;
  $('e-ico').textContent = n.icon;
  $('e-nm').textContent = n.sensei;
  $('e-tt').textContent = n.title;
  intro(n);
}

function intro(n) {
  $('e-prog').textContent = '';
  $('e-body').innerHTML = `
    <p class="pre">${n.intro}</p>
    <div style="margin-top:26px"><button class="cta" id="go">${n.mode === 'final' ? 'SENTARSE' : 'EMPEZAR'}</button></div>`;
  $('go').onclick = () => pregunta();
  show('s-exam');
}

function pregunta() {
  clearTimer();
  const n = cur, q = n.questions[qi];
  $('e-prog').textContent = n.questions.length > 1 ? `${qi + 1}/${n.questions.length}` : '';
  const b = $('e-body');
  b.innerHTML = '';

  // texto de la pregunta (con eco de Saturno)
  let texto = q.q;
  if (n.echo && texto.includes('{PREV}')) {
    texto = texto.replace('{PREV}', prevChoice.replace(/\.$/, ''));
  }

  if (n.mode === 'timed') {
    const seg = n.time + (has('tiempo') ? 6 : 0);
    const t = document.createElement('div');
    t.className = 'timer';
    t.innerHTML = '<i></i>';
    b.appendChild(t);
    correrReloj(t, seg, seTermino);
  }

  const h = document.createElement('div');
  h.className = 'q';
  h.textContent = texto;
  b.appendChild(h);

  if (has('criterio')) {
    const c = document.createElement('div');
    c.className = 'criterio';
    c.innerHTML = `<b>🎃 El Espantapájaros:</b> ${n.criterio}`;
    b.appendChild(c);
  }

  if (n.mode === 'text') return modoTexto(b, q);
  if (n.mode === 'multi') return modoMulti(b, q);
  return modoOpciones(b, q);
}

/* — opciones simples (y timed y final) — */
function modoOpciones(b, q) {
  const box = document.createElement('div');
  box.className = 'opts';
  const descartar = has('descarte') && !usedDescarte
    ? q.options.findIndex(o => o.s === -1) : -1;
  if (descartar > -1) usedDescarte = true;

  q.options.forEach((o, i) => {
    const bt = document.createElement('button');
    bt.textContent = o.t;
    if (i === descartar) { bt.classList.add('dead'); bt.disabled = true; bt.title = 'El Niño la descartó'; }
    bt.onclick = () => { bt.classList.add('sel'); elegir(o, box); };
    box.appendChild(bt);
  });
  b.appendChild(box);
  if (descartar > -1) {
    const nt = document.createElement('p');
    nt.className = 'dim small';
    nt.style.marginTop = '10px';
    nt.textContent = '🧒 El Niño tachó una. No dice por qué.';
    b.appendChild(nt);
  }
}

function elegir(o, box) {
  clearTimer();
  box.querySelectorAll('button').forEach(x => x.disabled = true);
  prevChoice = o.t;
  if (cur.mode === 'final') return final(o.end);
  aplicar(o.s, o.r);
}

function seTermino() {
  const b = $('e-body');
  b.querySelectorAll('.opts button').forEach(x => x.disabled = true);
  const q = cur.questions[qi];
  const callado = q.options.find(o => /callado|callar/i.test(o.t));
  if (callado) { prevChoice = callado.t; aplicar(callado.s, callado.r || 'No dijiste nada. Acá eso vale.'); }
  else { prevChoice = '(silencio)'; aplicar(-1, 'Se acabó el tiempo. El silencio no siempre alcanza.'); }
}

/* — texto libre (Marte) — */
function modoTexto(b, q) {
  const w = document.createElement('div');
  w.className = 'txt';
  w.innerHTML = `<input id="ti" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="una palabra"><button id="tb">ENVIAR</button>`;
  b.appendChild(w);
  const inp = $('ti');
  inp.focus();
  const enviar = () => {
    const v = norm(inp.value);
    if (!v) return;
    inp.disabled = true; $('tb').disabled = true;
    prevChoice = inp.value;
    if (q.good.some(g => match(v, norm(g)))) aplicar(1, q.rGood);
    else if (q.bad.some(g => match(v, norm(g)))) aplicar(-1, q.rBad);
    else aplicar(0, q.rMeh);
  };
  $('tb').onclick = enviar;
  inp.onkeydown = e => { if (e.key === 'Enter') enviar(); };
}
const norm = s => (s || '').toLowerCase().trim()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9% ]/g, '').replace(/\s+/g, ' ');
const match = (v, g) => v === g || v.split(' ').includes(g) || (g.includes(' ') && v.includes(g));

/* — doble selección (Júpiter) — */
function modoMulti(b, q) {
  const sel = [];
  const box = document.createElement('div');
  box.className = 'opts';
  q.options.forEach((o, i) => {
    const bt = document.createElement('button');
    bt.textContent = o.t;
    bt.onclick = () => {
      const k = String(i);
      const at = sel.indexOf(k);
      if (at > -1) { sel.splice(at, 1); bt.classList.remove('sel'); }
      else if (sel.length < 2) { sel.push(k); bt.classList.add('sel'); }
      conf.disabled = sel.length !== 2;
    };
    box.appendChild(bt);
  });
  b.appendChild(box);
  const conf = document.createElement('button');
  conf.className = 'cta';
  conf.style.marginTop = '20px';
  conf.textContent = 'CONFIRMAR LAS DOS';
  conf.disabled = true;
  conf.onclick = () => {
    box.querySelectorAll('button').forEach(x => x.disabled = true);
    conf.disabled = true;
    const ok = q.pairs.some(p => p.every(k => sel.includes(k)));
    prevChoice = sel.map(i => q.options[+i].t).join(' + ');
    aplicar(ok ? 1 : -1, ok ? q.rGood : q.rBad);
  };
  b.appendChild(conf);
}

/* — resolución de una pregunta — */
function aplicar(s, r) {
  pts += s;
  const b = $('e-body');
  const d = document.createElement('div');
  d.className = 'reply ' + (s > 0 ? 'p' : s < 0 ? 'n' : '');
  d.innerHTML = (r ? `<p style="margin:0">${r}</p>` : `<p class="dim" style="margin:0">(no dice nada)</p>`)
    + (has('feedback') ? `<p class="small dim" style="margin:8px 0 0">🐦‍⬛ El Cuervo: ${s > 0 ? 'sumaste' : s < 0 ? 'restaste' : 'ni ahí'} (${s > 0 ? '+' : ''}${s})</p>` : '');
  b.appendChild(d);

  const nav = document.createElement('div');
  nav.style.marginTop = '20px';
  const sig = document.createElement('button');
  sig.className = 'cta';
  sig.textContent = qi + 1 < cur.questions.length ? 'SIGUIENTE' : 'VER VEREDICTO';
  sig.onclick = () => { qi++; qi < cur.questions.length ? pregunta() : veredicto(); };
  nav.appendChild(sig);

  if (has('retry') && !usedRetry && cur.mode !== 'final') {
    const rt = document.createElement('button');
    rt.className = 'ghost';
    rt.style.margin = '10px auto 0';
    rt.style.display = 'block';
    rt.textContent = '🐕 el perro te deja repetir esta pregunta';
    rt.onclick = () => { usedRetry = true; pts -= s; pregunta(); };
    nav.appendChild(rt);
  }
  b.appendChild(nav);
  nav.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* reloj por frames: si el jugador cambia de pestaña se pausa solo */
function correrReloj(box, seg, fin) {
  const bar = box.querySelector('i');
  let t0 = null;
  const paso = ts => {
    if (t0 === null) t0 = ts;
    const p = Math.min(1, (ts - t0) / (seg * 1000));
    bar.style.width = (100 - p * 100).toFixed(2) + '%';
    box.classList.toggle('low', p > .72);
    if (p < 1) tmr = requestAnimationFrame(paso);
    else { tmr = null; fin(); }
  };
  tmr = requestAnimationFrame(paso);
}

function clearTimer() { if (tmr) { cancelAnimationFrame(tmr); tmr = null; } }

/* ═══════════ VEREDICTO ═══════════ */

function veredicto() {
  const ok = pts >= cur.pass;
  const box = $('v-box');
  box.className = 'verdict ' + (ok ? 'ok' : 'no');
  $('v-stamp').textContent = ok ? 'aprobado' : 'reprobado';
  $('v-score').textContent = `${pts} / ${cur.questions.length} · necesitabas ${cur.pass}`;
  $('v-text').textContent = ok ? cur.pasa : cur.falla;
  $('v-extra').innerHTML = '';

  if (ok) {
    if (!hecho(cur.id)) S.done.push(cur.id);
    save();
    const esUltimoTierra = cur.id === 'texas';
    $('btn-next').textContent = esUltimoTierra ? 'IR A LA PLATAFORMA' : 'SEGUIR';
    $('btn-next').onclick = esUltimoTierra ? lanzamiento : renderMap;
  } else {
    S.deaths++;
    const fig = darFigura();
    const quitar = id => { const i = S.done.indexOf(id); if (i > -1) S.done.splice(i, 1); };
    quitar(cur.id);
    // El Faro te sostiene el progreso. Sin él, la caída es literal: volvés a la Tierra
    // y tenés que convencer a Hank de nuevo para despegar.
    if (!has('ancla')) {
      if (cur.zone === 'espacio') quitar('texas');
      else { const prev = S.done[S.done.length - 1]; if (prev) quitar(prev); }
    }
    save();
    const caida = cur.zone === 'espacio' && !has('ancla')
      ? 'Caés. Atravesás todo lo que subiste y aterrizás en Texas, en el mismo galpón. Hank te mira sin sorpresa.'
      : 'Volvés a caer en la Tierra. No caés solo.';
    if (fig) {
      $('v-extra').innerHTML = `
        <p class="dim small">${caida}</p>
        <div class="figura">
          <div class="ico">${fig.icon}</div>
          <div class="nm">${fig.name}</div>
          <div class="ds">${fig.desc}</div>
        </div>`;
    } else {
      $('v-extra').innerHTML = `<p class="dim small">Volvés a caer en la Tierra. Ya no quedan figuras para darte.</p>`;
    }
    $('btn-next').textContent = 'LEVANTARSE';
    $('btn-next').onclick = renderMap;
  }
  show('s-verdict');
}

function darFigura() {
  const libres = FIGURAS.filter(f => !S.figuras.includes(f.id));
  if (!libres.length) return null;
  const f = libres[Math.floor(Math.random() * libres.length)];
  S.figuras.push(f.id);
  return f;
}

/* ═══════════ LANZAMIENTO ═══════════ */

function lanzamiento() {
  const L = $('launch'), inner = $('launch-inner'), txt = $('launch-txt');
  L.classList.add('on');
  let n = 5;
  txt.textContent = 'SECUENCIA INICIADA';
  const tick = () => {
    if (n > 0) {
      inner.innerHTML = `<div class="count">${n}</div>`;
      n--; setTimeout(tick, 700);
    } else {
      inner.innerHTML = `<div class="count go">DESPEGUE</div>`;
      txt.textContent = 'EL FORMATO CAMBIA A PARTIR DE ACÁ';
      setTimeout(() => {
        inner.innerHTML = `<div class="rocket">🚀</div>`;
        txt.textContent = 'ARRIBA NO HAY SENSEIS CON NOMBRE';
        document.body.classList.add('espacio');
        setTimeout(() => { L.classList.remove('on'); renderMap(); }, 2600);
      }, 1100);
    }
  };
  tick();
}

/* ═══════════ FINAL ═══════════ */

function final(key) {
  const f = cur.finales[key];
  if (!hecho(cur.id)) S.done.push(cur.id);
  save();
  $('end-t').textContent = f.t;
  $('end-d').textContent = f.d;
  $('end-stats').textContent = `${S.done.length} regiones aprobadas · ${S.deaths} ${S.deaths === 1 ? 'caída' : 'caídas'} · ${S.figuras.length} figuras: ${S.figuras.map(id => FIGURAS.find(x => x.id === id).icon).join(' ') || '—'}`;
  show('s-end');
}

/* ═══════════ FIGURAS ═══════════ */

function renderFigs() {
  const l = $('figs-list');
  l.innerHTML = S.figuras.length ? '' : '<p class="dim">Ninguna todavía. Eso quiere decir que no te caíste nunca — o que no jugaste.</p>';
  S.figuras.forEach(id => {
    const f = FIGURAS.find(x => x.id === id);
    l.insertAdjacentHTML('beforeend',
      `<div class="figura"><div class="ico">${f.icon}</div><div class="nm">${f.name}</div><div class="ds">${f.desc}</div></div>`);
  });
  const faltan = FIGURAS.length - S.figuras.length;
  if (faltan > 0) l.insertAdjacentHTML('beforeend', `<p class="dim small" style="margin-top:16px">Faltan ${faltan}. Se consiguen de una sola manera.</p>`);
  show('s-figs');
}

/* ═══════════ ESTRELLAS ═══════════ */

(function stars() {
  const c = $('stars'), x = c.getContext('2d');
  let ps = [];
  const fit = () => {
    c.width = innerWidth; c.height = innerHeight;
    ps = Array.from({ length: Math.min(190, Math.round(innerWidth / 7)) }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      r: Math.random() * 1.25 + .2, v: Math.random() * .12 + .02, a: Math.random()
    }));
  };
  addEventListener('resize', fit); fit();
  (function loop() {
    x.clearRect(0, 0, c.width, c.height);
    ps.forEach(p => {
      p.y += p.v; if (p.y > c.height) { p.y = 0; p.x = Math.random() * c.width; }
      p.a += .012;
      x.globalAlpha = .28 + Math.abs(Math.sin(p.a)) * .55;
      x.fillStyle = '#cfe6ff';
      x.beginPath(); x.arc(p.x, p.y, p.r, 0, 7); x.fill();
    });
    requestAnimationFrame(loop);
  })();
})();

/* ═══════════ ARRANQUE ═══════════ */

function reset(vuelveAlTitulo) {
  S = { done: [], figuras: [], deaths: 0, seen: false };
  save();
  document.body.classList.remove('espacio');
  vuelveAlTitulo ? show('s-title') : renderMap();
}

$('btn-start').onclick = () => { S.seen = true; save(); renderMap(); };
$('btn-reset-title').onclick = () => reset(true);
$('btn-reset').onclick = () => { if (confirm('¿Borrar todo? Perdés regiones y figuras.')) reset(false); };
$('btn-figs').onclick = renderFigs;
$('btn-back').onclick = renderMap;
$('btn-again').onclick = () => reset(true);

tema();
if (S.done.length || S.deaths) renderMap();
