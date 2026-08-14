/* G2tM — motor */

const SAVE = 'g2tm.v2';
const $ = id => document.getElementById(id);

let S = load();
let cur = null;      // maestro actual
let ronda = [];      // índices de las preguntas de esta ronda
let qi = 0;
let pts = 0;
let usedRetry = false;
let ultimoToque = -1;

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(SAVE));
    if (raw && Array.isArray(raw.done)) return Object.assign({ vistas: {} }, raw);
  } catch (e) {}
  return { done: [], figuras: [], deaths: 0, vistas: {}, seen: false };
}
function save() { try { localStorage.setItem(SAVE, JSON.stringify(S)); } catch (e) {} }

const has = p => S.figuras.some(f => FIGURAS.find(x => x.id === f)?.power === p);
const maestro = id => MAESTROS.find(m => m.id === id);
const hecho = id => S.done.includes(id);
const azar = a => a[Math.floor(Math.random() * a.length)];

function proximo() { return MAESTROS.find(m => !hecho(m.id)); }
function enEspacio() { const p = proximo(); return p ? p.zona === 'espacio' : true; }

function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('on'));
  $(id).classList.add('on');
  window.scrollTo(0, 0);
}
function tema() { document.body.classList.toggle('espacio', enEspacio()); }

/* ═══════════ ESCENA ═══════════ */

function pintarEscena(m, cont) {
  cont.innerHTML = `
    <svg class="bg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${FONDOS[m.id] || ''}</svg>
    <svg class="fig" viewBox="0 0 200 260" role="img" aria-label="${m.nombre}">${RETRATOS[m.id] || ''}</svg>
    <div class="dialogo" id="dialogo"></div>`;
  const fig = cont.querySelector('.fig');
  fig.addEventListener('click', () => tocar(m, cont, fig));
  cont.classList.add('tocable');
}

function tocar(m, cont, fig) {
  let i = Math.floor(Math.random() * m.toques.length);
  if (m.toques.length > 1 && i === ultimoToque) i = (i + 1) % m.toques.length;
  ultimoToque = i;
  const t = m.toques[i];

  fig.classList.remove(...[...fig.classList].filter(c => c.startsWith('r-')));
  void fig.offsetWidth;                 // reinicia la animación aunque sea la misma
  fig.classList.add('r-' + t.anim);
  cont.classList.remove('sacude');
  void cont.offsetWidth;
  if (t.anim === 'furia' || t.anim === 'katsu') cont.classList.add('sacude');

  const d = $('dialogo');
  if (d) {
    d.textContent = t.t;
    d.classList.remove('on'); void d.offsetWidth; d.classList.add('on');
    clearTimeout(d._t);
    d._t = setTimeout(() => d.classList.remove('on'), 5200);
  }
}

/* ═══════════ MAPA ═══════════ */

function renderMap() {
  tema();
  const espacio = enEspacio();
  $('map-title').textContent = espacio ? 'El sistema' : 'Tierra';
  const p = proximo();
  $('map-sub').textContent = p
    ? `${S.done.length} de ${MAESTROS.length} · ${S.deaths} ${S.deaths === 1 ? 'caída' : 'caídas'}${S.figuras.length ? ' · ' + S.figuras.length + (S.figuras.length === 1 ? ' figura' : ' figuras') : ''}`
    : 'Terminaste.';

  const cont = $('map'); cont.innerHTML = '';
  let divisor = false;
  MAESTROS.forEach(m => {
    if (m.zona === 'espacio' && !divisor) {
      divisor = true;
      const d = document.createElement('div');
      d.className = 'divider';
      d.textContent = hecho('hank') ? 'órbita' : 'fuera de alcance';
      cont.appendChild(d);
    }
    const done = hecho(m.id);
    const now = !done && p && p.id === m.id;
    const el = document.createElement('div');
    el.className = 'node ' + (done ? 'done' : now ? 'now' : 'lock');
    el.innerHTML = `
      <div class="mini">${done || now ? `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">${FONDOS[m.id] || ''}</svg><svg class="mf" viewBox="0 0 200 260">${RETRATOS[m.id] || ''}</svg>` : ''}</div>
      <div class="meta">
        <div class="rg">${done || now ? m.region : '???'}</div>
        <div class="sn">${done || now ? m.nombre + ' — ' + m.titulo : 'sin datos'}</div>
      </div>
      <div class="st">${done ? 'aprobado' : now ? 'acá estás' : 'cerrado'}</div>`;
    if (now) el.onclick = () => entrar(m);
    cont.appendChild(el);
  });
  show('s-map');
}

/* ═══════════ EXAMEN ═══════════ */

function sortear(m) {
  const total = m.preguntas.length;
  let vistas = S.vistas[m.id] || [];
  let libres = [...Array(total).keys()].filter(i => !vistas.includes(i));
  if (libres.length < m.preguntasPorRonda) {   // se agotó el banco: vuelve a empezar
    vistas = []; libres = [...Array(total).keys()];
  }
  const elegidas = [];
  while (elegidas.length < Math.min(m.preguntasPorRonda, libres.length)) {
    const i = Math.floor(Math.random() * libres.length);
    elegidas.push(libres.splice(i, 1)[0]);
  }
  S.vistas[m.id] = vistas.concat(elegidas);
  save();
  return elegidas;
}

function entrar(m) {
  cur = m; qi = 0; pts = 0; usedRetry = false; ultimoToque = -1;
  ronda = sortear(m);
  $('e-nombre').textContent = m.nombre;
  $('e-titulo').textContent = m.titulo;
  pintarEscena(m, $('e-escena'));
  $('e-prog').textContent = '';
  $('e-body').innerHTML = `
    <p class="pre intro">${m.intro}</p>
    <p class="tip small dim">Tocá al maestro. Cada uno reacciona a su manera.</p>
    <button class="cta" id="go">${m.final ? 'SENTARSE' : 'EMPEZAR'}</button>`;
  $('go').onclick = pregunta;
  show('s-exam');
}

function pregunta() {
  const m = cur, q = m.preguntas[ronda[qi]];
  $('e-prog').textContent = ronda.length > 1 ? `${qi + 1}/${ronda.length}` : '';
  const b = $('e-body');
  b.innerHTML = '';

  if (has('criterio')) {
    const c = document.createElement('div');
    c.className = 'criterio';
    c.innerHTML = `<b>🎃 El Espantapájaros:</b> ${m.criterio}`;
    b.appendChild(c);
  }

  const h = document.createElement('div');
  h.className = 'q';
  h.textContent = q;
  b.appendChild(h);

  const w = document.createElement('div');
  w.className = 'escribir';
  w.innerHTML = `
    <textarea id="ta" rows="3" placeholder="Escribí tu respuesta…" autocomplete="off" spellcheck="false"></textarea>
    <div class="barra">
      <span class="dim small" id="cuenta"></span>
      <button class="cta" id="env">RESPONDER</button>
    </div>`;
  b.appendChild(w);

  const ta = $('ta');
  if (has('soplo')) {
    const pos = (m.juicio.pos || []);
    if (pos.length) {
      const s = document.createElement('p');
      s.className = 'small dim soplo';
      s.textContent = `👅 La Lengua te sopla una palabra: "${azar(pos)}…". Hacé lo que quieras con eso.`;
      b.appendChild(s);
    }
  }

  const contar = () => {
    const n = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0;
    $('cuenta').textContent = n ? `${n} ${n === 1 ? 'palabra' : 'palabras'}` : '';
    if (has('porque') && n) {
      const a = analizar(ta.value, q);
      $('cuenta').textContent += a.eco > .5 ? ' · 🧒 "eso ya lo dijo él"' : n <= 2 ? ' · 🧒 "¿por qué?"' : '';
    }
  };
  ta.addEventListener('input', contar);
  ta.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviar(); }
  });
  setTimeout(() => ta.focus(), 60);

  const enviar = () => {
    ta.disabled = true; $('env').disabled = true;
    if (cur.final) return final(ta.value);
    const v = juzgar(ta.value, cur, q);
    aplicar(v.s, v.replica, ta.value);
  };
  $('env').onclick = enviar;
}

function aplicar(s, replica, escrito) {
  pts += s;
  const b = $('e-body');

  const d = document.createElement('div');
  d.className = 'reply ' + (s > 0 ? 'p' : s < 0 ? 'n' : '');
  d.innerHTML = `<p class="quien">${cur.nombre}</p><p class="dice">${replica}</p>`
    + (has('feedback') ? `<p class="small dim" style="margin:10px 0 0">🐦‍⬛ El Cuervo: ${s > 0 ? 'sumaste' : s < 0 ? 'restaste' : 'ni ahí'} (${s > 0 ? '+' : ''}${s})</p>` : '');
  b.appendChild(d);

  // el maestro reacciona con la cara, no solo con el texto
  const fig = $('e-escena').querySelector('.fig');
  if (fig) {
    fig.classList.remove('v-bien', 'v-mal');
    void fig.offsetWidth;
    fig.classList.add(s > 0 ? 'v-bien' : s < 0 ? 'v-mal' : 'v-medio');
  }

  const nav = document.createElement('div');
  nav.className = 'nav';
  const sig = document.createElement('button');
  sig.className = 'cta';
  sig.textContent = qi + 1 < ronda.length ? 'SIGUIENTE' : 'VER VEREDICTO';
  sig.onclick = () => { qi++; qi < ronda.length ? pregunta() : veredicto(); };
  nav.appendChild(sig);

  if (has('retry') && !usedRetry) {
    const rt = document.createElement('button');
    rt.className = 'ghost';
    rt.textContent = '🐕 el perro te deja escribirla de nuevo';
    rt.onclick = () => { usedRetry = true; pts -= s; pregunta(); };
    nav.appendChild(rt);
  }
  b.appendChild(nav);
  nav.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ═══════════ VEREDICTO ═══════════ */

function veredicto() {
  const ok = pts >= cur.pass;
  const box = $('v-box');
  box.className = 'verdict ' + (ok ? 'ok' : 'no');
  $('v-stamp').textContent = ok ? 'aprobado' : 'reprobado';
  $('v-score').textContent = `${pts > 0 ? '+' : ''}${pts} · necesitabas ${cur.pass > 0 ? '+' + cur.pass : cur.pass}`;
  $('v-text').textContent = ok ? cur.pasa : cur.falla;
  $('v-extra').innerHTML = '';

  if (ok) {
    if (!hecho(cur.id)) S.done.push(cur.id);
    save();
    const ultimoTierra = cur.id === 'hank';
    $('btn-next').textContent = ultimoTierra ? 'IR A LA PLATAFORMA' : 'SEGUIR';
    $('btn-next').onclick = ultimoTierra ? lanzamiento : renderMap;
  } else {
    S.deaths++;
    const fig = darFigura();
    const quitar = id => { const i = S.done.indexOf(id); if (i > -1) S.done.splice(i, 1); };
    quitar(cur.id);
    if (!has('ancla')) {
      if (cur.zona === 'espacio') quitar('hank');
      else { const prev = S.done[S.done.length - 1]; if (prev) quitar(prev); }
    }
    save();
    const caida = cur.zona === 'espacio' && !has('ancla')
      ? 'Caés. Atravesás todo lo que subiste y aterrizás en Texas, en el mismo galpón. Hank te mira sin sorpresa.'
      : 'Volvés a caer en la Tierra. No caés solo.';
    $('v-extra').innerHTML = fig
      ? `<p class="dim small">${caida}</p>
         <div class="figura"><div class="ico">${fig.icon}</div><div class="nm">${fig.name}</div><div class="ds">${fig.desc}</div></div>`
      : `<p class="dim small">${caida} Ya no quedan figuras para darte.</p>`;
    $('btn-next').textContent = 'LEVANTARSE';
    $('btn-next').onclick = renderMap;
  }
  show('s-verdict');
}

function darFigura() {
  const libres = FIGURAS.filter(f => !S.figuras.includes(f.id));
  if (!libres.length) return null;
  const f = azar(libres);
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
      txt.textContent = 'DE ACÁ EN ADELANTE LOS MAESTROS NO TIENEN CARA';
      setTimeout(() => {
        inner.innerHTML = `<div class="rocket">🚀</div>`;
        document.body.classList.add('espacio');
        setTimeout(() => { L.classList.remove('on'); renderMap(); }, 2600);
      }, 1100);
    }
  };
  tick();
}

/* ═══════════ FINAL ═══════════ */

const FINALES = {
  si: { t: 'Dijiste que sí.', d: 'Y ahora te toca a vos aprobar a otros. Ese es el castigo. Ningún maestro eligió serlo: todos llegaron hasta esta silla, dijeron que sí, y se quedaron de guardia.' },
  no: { t: 'Dijiste que no.', d: 'Buena señal. El único que sale del borde es el que todavía tiene una pregunta. Los que se aprueban se quedan sentados para siempre, corrigiendo a los que llegan.' },
  nada: { t: 'No escribiste nada.', d: 'Ocho maestros, cuatro mundos, y en el único examen que importaba dejaste el renglón vacío. Hakuin te aplaudiría. Sócrates te perseguiría por la calle hasta que contestes.' },
  otro: { t: 'Contestaste otra cosa.', d: 'No dijiste ni sí ni no: dijiste lo tuyo. La silla sigue vacía y vos seguís parado al lado. Es la única manera conocida de irse del borde sin quedarse de guardia.' }
};

function final(texto) {
  const t = (texto || '').toLowerCase().trim().normalize('NFD').replace(/[̀-ͯ]/g, '');
  let k = 'otro';
  if (!t) k = 'nada';
  else if (/^(si|sip|claro|obvio|obviamente|aprobe|por supuesto|totalmente|dale)\b/.test(t)) k = 'si';
  else if (/^(no|nop|nunca|todavia no|para nada|jamas|ni ahi)\b/.test(t)) k = 'no';
  const f = FINALES[k];

  if (!hecho(cur.id)) S.done.push(cur.id);
  save();
  $('end-t').textContent = f.t;
  $('end-d').textContent = f.d;
  $('end-eco').textContent = t ? `“${(texto || '').trim()}”` : '';
  $('end-stats').textContent = `${S.done.length} regiones · ${S.deaths} ${S.deaths === 1 ? 'caída' : 'caídas'} · ${S.figuras.length ? S.figuras.map(id => FIGURAS.find(x => x.id === id).icon).join(' ') : 'sin figuras'}`;
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

function reset(alTitulo) {
  S = { done: [], figuras: [], deaths: 0, vistas: {}, seen: false };
  save();
  document.body.classList.remove('espacio');
  alTitulo ? show('s-title') : renderMap();
}

$('btn-start').onclick = () => { S.seen = true; save(); renderMap(); };
$('btn-reset-title').onclick = () => reset(true);
$('btn-reset').onclick = () => { if (confirm('¿Borrar todo? Perdés regiones, figuras y el registro de preguntas ya vistas.')) reset(false); };
$('btn-figs').onclick = renderFigs;
$('btn-back').onclick = renderMap;
$('btn-again').onclick = () => reset(true);

tema();
if (S.done.length || S.deaths) renderMap();
