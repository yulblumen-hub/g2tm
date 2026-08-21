/* G2tM — motor */

const SAVE = 'g2tm.v3';
const $ = id => document.getElementById(id);

/* Quién ve las pistas. No es seguridad: el código es público y cualquiera que
   lo lea encuentra el nombre. Es un secreto de cortesía, nada más. */
const DUENOS = ['yul', 'yulian', 'yuli'];

let S = load();
let cur = null;      // maestro actual
let ronda = [];      // índices de las preguntas de esta ronda
let qi = 0;
let pts = 0;
let usedRetry = false;
let ultimoToque = -1;

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(SAVE))
      || JSON.parse(localStorage.getItem('g2tm.v2'));   // rescata la partida vieja
    if (raw && Array.isArray(raw.done)) return Object.assign({ vistas: {}, usuario: '' }, raw);
  } catch (e) {}
  return { done: [], figuras: [], deaths: 0, vistas: {}, usuario: '', seen: false };
}
function save() { try { localStorage.setItem(SAVE, JSON.stringify(S)); } catch (e) {} }

const norm = s => (s || '').toLowerCase().trim().normalize('NFD').replace(/[̀-ͯ]/g, '');
const has = p => S.figuras.some(f => FIGURAS.find(x => x.id === f)?.power === p);
const hecho = id => S.done.includes(id);
const azar = a => a[Math.floor(Math.random() * a.length)];
const conPistas = () => DUENOS.includes(norm(S.usuario)) || /[?&]hints/.test(location.search);

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
    <button class="quien-btn" id="quien-btn" title="¿quién es?">¿quién es?</button>
    <div class="dialogo" id="dialogo"></div>`;
  const fig = cont.querySelector('.fig');
  fig.addEventListener('click', () => tocar(m, cont, fig));
  $('quien-btn').onclick = () => abrirFicha(m);
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

/* ═══════════ FICHA: quién fue cada uno ═══════════ */

function abrirFicha(m) {
  const f = m.ficha;
  if (!f) return;
  $('ficha-cuerpo').innerHTML = `
    <div class="ficha-cab">
      <svg class="ficha-fig" viewBox="0 0 200 260">${RETRATOS[m.id] || ''}</svg>
      <div>
        <h2>${f.quien}</h2>
        <p class="dim small">${f.cuando} · ${f.donde}</p>
      </div>
    </div>
    <ul class="ficha-datos">${f.datos.map(d => `<li>${d}</li>`).join('')}</ul>
    ${f.frase ? `<p class="ficha-frase">“${f.frase}”</p>` : ''}`;
  $('ficha-modal').classList.add('on');
}
function cerrarFicha() { $('ficha-modal').classList.remove('on'); }

/* ═══════════ MAPA NAVEGABLE ═══════════ */

const MAPA_W = 1500, MAPA_H = 2600;
let vx = 0, vy = 0, k = .62;

function posNodo(i) {
  const total = MAESTROS.length;
  const y = MAPA_H - 240 - i * ((MAPA_H - 520) / (total - 1));
  const x = MAPA_W / 2 + Math.sin(i * .85) * 330;
  return { x, y };
}

function fondoMapa() {
  const puntos = MAESTROS.map((_, i) => posNodo(i));
  const camino = puntos.map((p, i) => (i ? 'L' : 'M') + p.x + ' ' + p.y).join(' ');
  const estrellas = Array.from({ length: 90 }, () => {
    const x = Math.random() * MAPA_W, y = Math.random() * (MAPA_H - 700);
    return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(Math.random() * 1.4 + .4).toFixed(1)}" fill="#fff" opacity="${(Math.random() * .6 + .2).toFixed(2)}"/>`;
  }).join('');
  const corte = MAESTROS.findIndex(m => m.zona === 'espacio');
  const yCorte = posNodo(corte).y + 90;

  return `<svg class="mapa-bg" viewBox="0 0 ${MAPA_W} ${MAPA_H}" preserveAspectRatio="none">
    <defs>
      <linearGradient id="cielo" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#01020a"/><stop offset=".45" stop-color="#061024"/>
        <stop offset=".78" stop-color="#1b2a3f"/><stop offset="1" stop-color="#3a3a48"/>
      </linearGradient>
      <radialGradient id="atmos" cx=".5" cy="1" r=".7">
        <stop offset="0" stop-color="#6ba6d6" stop-opacity=".55"/><stop offset="1" stop-color="#6ba6d6" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${MAPA_W}" height="${MAPA_H}" fill="url(#cielo)"/>
    ${estrellas}
    <ellipse cx="${MAPA_W / 2}" cy="${MAPA_H + 320}" rx="1100" ry="760" fill="url(#atmos)"/>
    <ellipse cx="${MAPA_W / 2}" cy="${MAPA_H + 360}" rx="980" ry="700" fill="#1e5a3a"/>
    <ellipse cx="${MAPA_W / 2}" cy="${MAPA_H + 380}" rx="980" ry="700" fill="#2563a8" opacity=".55"/>
    <path d="M${MAPA_W / 2 - 700} ${MAPA_H - 120}c120-60 240-40 340 10s220 30 320-20 240-40 340 20v600H${MAPA_W / 2 - 700}z" fill="#2f6b46" opacity=".8"/>
    <path d="${camino}" fill="none" stroke="#e8dcc8" stroke-width="3" stroke-dasharray="2 14" stroke-linecap="round" opacity=".45"/>
    <line x1="60" y1="${yCorte}" x2="${MAPA_W - 60}" y2="${yCorte}" stroke="#4fd6e8" stroke-width="2" stroke-dasharray="10 10" opacity=".5"/>
    <text x="${MAPA_W / 2}" y="${yCorte - 16}" text-anchor="middle" fill="#4fd6e8" font-size="26" letter-spacing="8" opacity=".75" font-family="monospace">LÍNEA DE KÁRMÁN</text>
  </svg>`;
}

function renderMap() {
  tema();
  const p = proximo();
  $('map-title').textContent = enEspacio() ? 'El sistema' : 'Tierra';
  $('map-sub').textContent = p
    ? `${S.done.length} de ${MAESTROS.length} · ${S.deaths} ${S.deaths === 1 ? 'caída' : 'caídas'}${S.figuras.length ? ' · ' + S.figuras.length + (S.figuras.length === 1 ? ' figura' : ' figuras') : ''}`
    : 'Terminaste.';

  const lienzo = $('lienzo');
  lienzo.style.width = MAPA_W + 'px';
  lienzo.style.height = MAPA_H + 'px';
  lienzo.innerHTML = fondoMapa();

  MAESTROS.forEach((m, i) => {
    const { x, y } = posNodo(i);
    const done = hecho(m.id);
    const now = !done && p && p.id === m.id;
    const el = document.createElement('div');
    el.className = 'pin ' + (done ? 'done' : now ? 'now' : 'lock');
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.innerHTML = `
      <div class="disco">
        ${done || now
          ? `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">${FONDOS[m.id] || ''}</svg>
             <svg class="pf" viewBox="0 0 200 260">${RETRATOS[m.id] || ''}</svg>`
          : '<span class="cerrado">?</span>'}
      </div>
      <div class="etiqueta">
        <b>${done || now ? m.region : '???'}</b>
        <span>${done || now ? m.nombre : 'sin datos'}</span>
      </div>
      ${done ? '<div class="tilde">✓</div>' : ''}`;
    if (now || done) { el.classList.add('clickable'); el._accion = () => (now ? entrar(m) : abrirFicha(m)); }
    lienzo.appendChild(el);
  });

  const idx = p ? MAESTROS.indexOf(p) : MAESTROS.length - 1;
  show('s-map');
  // el encuadre se calcula recién cuando el marco ya tiene tamaño real
  centrarEn(idx);
  requestAnimationFrame(() => centrarEn(idx));
}

/* — zoom y arrastre — */
let arrastro = false;

/* nunca dejamos ver el borde del lienzo: el zoom mínimo es el que llena el
   marco a lo ancho, y el paneo se recorta contra los bordes */
function kMinimo() { return $('mapa-zoom').clientWidth / MAPA_W; }
function limitarK(v) { return Math.min(2.2, Math.max(kMinimo(), v)); }
function recortar() {
  const cont = $('mapa-zoom');
  vx = Math.min(0, Math.max(cont.clientWidth - MAPA_W * k, vx));
  vy = Math.min(0, Math.max(cont.clientHeight - MAPA_H * k, vy));
}
function aplicarVista() {
  recortar();
  $('lienzo').style.transform = `translate(${vx}px, ${vy}px) scale(${k})`;
}
function centrarEn(i) {
  const cont = $('mapa-zoom'), p = posNodo(i);
  k = limitarK(Math.max(k, kMinimo()));
  vx = cont.clientWidth / 2 - p.x * k;
  vy = cont.clientHeight * .58 - p.y * k;
  aplicarVista();
}
function zoomEn(px, py, factor) {
  const nk = limitarK(k * factor);
  const r = nk / k;
  vx = px - (px - vx) * r;
  vy = py - (py - vy) * r;
  k = nk;
  aplicarVista();
}

(function controlesMapa() {
  const cont = $('mapa-zoom');
  const punteros = new Map();
  let dist0 = 0, movido = 0;

  cont.addEventListener('wheel', e => {
    e.preventDefault();
    const r = cont.getBoundingClientRect();
    zoomEn(e.clientX - r.left, e.clientY - r.top, e.deltaY < 0 ? 1.12 : 1 / 1.12);
  }, { passive: false });

  cont.addEventListener('pointerdown', e => {
    cont.setPointerCapture(e.pointerId);
    punteros.set(e.pointerId, { x: e.clientX, y: e.clientY });
    movido = 0; arrastro = false;
    if (punteros.size === 2) {
      const [a, b] = [...punteros.values()];
      dist0 = Math.hypot(a.x - b.x, a.y - b.y);
    }
  });

  cont.addEventListener('pointermove', e => {
    const prev = punteros.get(e.pointerId);
    if (!prev) return;
    const dx = e.clientX - prev.x, dy = e.clientY - prev.y;
    punteros.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (punteros.size === 2) {
      const [a, b] = [...punteros.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist0) {
        const r = cont.getBoundingClientRect();
        zoomEn((a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top, d / dist0);
      }
      dist0 = d; arrastro = true;
      return;
    }
    vx += dx; vy += dy;
    movido += Math.abs(dx) + Math.abs(dy);
    if (movido > 8) arrastro = true;          // fue arrastre, no clic
    aplicarVista();
  });

  const soltar = e => {
    const eraClic = !arrastro && punteros.size === 1;
    punteros.delete(e.pointerId);
    if (punteros.size < 2) dist0 = 0;
    if (eraClic) {
      const bajo = document.elementFromPoint(e.clientX, e.clientY);
      const pin = bajo && bajo.closest('.pin');
      if (pin && pin._accion) pin._accion();
    }
    setTimeout(() => { if (!punteros.size) arrastro = false; }, 60);
  };
  cont.addEventListener('pointerup', soltar);
  cont.addEventListener('pointercancel', soltar);

  $('zoom-mas').onclick = () => zoomEn(cont.clientWidth / 2, cont.clientHeight / 2, 1.3);
  $('zoom-menos').onclick = () => zoomEn(cont.clientWidth / 2, cont.clientHeight / 2, 1 / 1.3);
  // los botones no deben arrastrar el mapa
  $('mapa-controles').addEventListener('pointerdown', e => e.stopPropagation());

  const dondeEstoy = () => { const p = proximo(); centrarEn(p ? MAESTROS.indexOf(p) : MAESTROS.length - 1); };
  $('zoom-yo').onclick = dondeEstoy;
  addEventListener('resize', () => { if ($('s-map').classList.contains('on')) dondeEstoy(); });
})();

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
    <p class="tip small dim">Tocá al maestro: cada uno reacciona a su manera. Y si querés saber quién fue, tenés el botón arriba.</p>
    <button class="cta" id="go">${m.final ? 'SENTARSE' : 'EMPEZAR'}</button>`;
  $('go').onclick = pregunta;
  show('s-exam');
}

/* pista: se arma sola con los pesos del maestro, así nunca queda desactualizada */
const ETIQUETAS = {
  breve: 'contestar corto (6 palabras o menos)',
  larga: 'extenderte (28 palabras o más)',
  yo: 'hablar de vos (yo, mi, me, tengo, quiero)',
  otro: 'que aparezca otra persona',
  pregunta: 'contestar con una pregunta',
  duda: 'dudar ("no sé", "capaz", "depende")',
  absoluto: 'usar absolutos (siempre, nunca, todos, nada)',
  accion: 'decir una acción concreta (hago, reviso, salgo)',
  eco: 'repetir con otras palabras lo que él te preguntó'
};

function panelPista(m) {
  const e = m.juicio.ejes || {};
  const suma = [], resta = [];
  Object.keys(ETIQUETAS).forEach(key => {
    const v = e[key];
    if (!v) return;
    (v > 0 ? suma : resta).push(`${ETIQUETAS[key]} <b>(${v > 0 ? '+' : ''}${v})</b>`);
  });
  const lista = a => a.length ? a.slice(0, 12).map(w => `<code>${w}</code>`).join(' ') : '—';
  return `
    <details class="pista">
      <summary>🔑 pista de ${m.nombre} <span class="dim small">(solo vos ves esto)</span></summary>
      <div class="pista-cuerpo">
        ${m.juicio.requiere ? `<p class="ojo">Obligatorio: tiene que aparecer ${m.juicio.requiere.map(w => `<code>${w.trim()}</code>`).join(' o ')}, si no es −1 directo.</p>` : ''}
        <p><b>Suma:</b> ${suma.join(' · ') || '—'}</p>
        <p><b>Resta:</b> ${resta.join(' · ') || '—'}</p>
        <p><b>Palabras que suman (+1.2):</b><br>${lista(m.juicio.pos)}</p>
        <p><b>Palabras que hunden (−1.2):</b><br>${lista(m.juicio.neg)}</p>
        <p class="dim small">Se suma todo: +1 o más aprueba la respuesta, −1 o menos la hunde.
        Para pasar la región necesitás <b>${m.pass > 0 ? '+' + m.pass : m.pass}</b> en total entre las ${m.preguntasPorRonda}.</p>
      </div>
    </details>`;
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

  if (conPistas() && !m.final) b.insertAdjacentHTML('beforeend', panelPista(m));

  const ta = $('ta');
  if (has('soplo') && (m.juicio.pos || []).length) {
    b.insertAdjacentHTML('beforeend',
      `<p class="small dim soplo">👅 La Lengua te sopla una palabra: “${azar(m.juicio.pos)}…”. Hacé lo que quieras con eso.</p>`);
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
    aplicar(v.s, v.replica);
  };
  $('env').onclick = enviar;
}

function aplicar(s, replica) {
  pts += s;
  const b = $('e-body');

  const d = document.createElement('div');
  d.className = 'reply ' + (s > 0 ? 'p' : s < 0 ? 'n' : '');
  d.innerHTML = `<p class="quien">${cur.nombre}</p><p class="dice">${replica}</p>`
    + (has('feedback') || conPistas()
      ? `<p class="small dim" style="margin:10px 0 0">${has('feedback') ? '🐦‍⬛ El Cuervo: ' : '🔑 '}${s > 0 ? 'sumaste' : s < 0 ? 'restaste' : 'ni ahí'} (${s > 0 ? '+' : ''}${s}) · vas ${pts > 0 ? '+' : ''}${pts} de ${cur.pass > 0 ? '+' + cur.pass : cur.pass}</p>`
      : '');
  b.appendChild(d);

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
  $('v-retrato').innerHTML = `<svg viewBox="0 0 200 260">${RETRATOS[cur.id] || ''}</svg>`;
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
  nada: { t: 'No escribiste nada.', d: 'Todos esos maestros, cuatro mundos, y en el único examen que importaba dejaste el renglón vacío. Hakuin te aplaudiría. Sócrates te perseguiría por la calle hasta que contestes.' },
  otro: { t: 'Contestaste otra cosa.', d: 'No dijiste ni sí ni no: dijiste lo tuyo. La silla sigue vacía y vos seguís parado al lado. Es la única manera conocida de irse del borde sin quedarse de guardia.' }
};

function final(texto) {
  const t = norm(texto);
  let key = 'otro';
  if (!t) key = 'nada';
  else if (/^(si|sip|claro|obvio|obviamente|aprobe|por supuesto|totalmente|dale)\b/.test(t)) key = 'si';
  else if (/^(no|nop|nunca|todavia no|para nada|jamas|ni ahi)\b/.test(t)) key = 'no';
  const f = FINALES[key];

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

/* ═══════════ ESTRELLAS DE FONDO ═══════════ */

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
  const usuario = S.usuario;
  S = { done: [], figuras: [], deaths: 0, vistas: {}, usuario, seen: false };
  save();
  document.body.classList.remove('espacio');
  alTitulo ? show('s-title') : renderMap();
}

function guardarUsuario() {
  S.usuario = $('usuario').value.trim().slice(0, 24);
  save();
  const hola = S.usuario ? `Hola ${S.usuario}. ` : '';
  $('quien-sos').textContent = conPistas() ? hola + 'Tenés las pistas activadas.' : hola;
}

$('usuario').value = S.usuario || '';
$('usuario').addEventListener('input', guardarUsuario);
guardarUsuario();

$('btn-start').onclick = () => { S.seen = true; guardarUsuario(); renderMap(); };
$('btn-reset-title').onclick = () => reset(true);
$('btn-reset').onclick = () => { if (confirm('¿Borrar todo? Perdés regiones, figuras y el registro de preguntas ya vistas.')) reset(false); };
$('btn-figs').onclick = renderFigs;
$('btn-back').onclick = renderMap;
$('btn-again').onclick = () => reset(true);
$('ficha-cerrar').onclick = cerrarFicha;
$('ficha-modal').addEventListener('click', e => { if (e.target.id === 'ficha-modal') cerrarFicha(); });
addEventListener('keydown', e => { if (e.key === 'Escape') cerrarFicha(); });

tema();
if (S.done.length || S.deaths) renderMap();
