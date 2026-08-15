/* G2tM — el juez.
   No hay IA acá: hay un analizador de reglas. Lee la respuesta escrita, saca
   señales (cuánto hablás de vos, si dudás, si te la jugás, si repetís la
   pregunta, qué vocabulario usás) y cada maestro pondera esas señales a su
   gusto. Lo que a Buda le suma, a Lucifer le resta.
   juzgar(texto, maestro) → { s: -1 | 0 | 1, replica: '...' } */

const VACIAS = ['no se', 'nose', 'ni idea', 'nada', 'ninguna', 'ninguno', 'si', 'no',
  'ok', 'dale', 'x', 'asd', 'jaja', 'jajaja', 'nse', 'nspi', 'paso', 'nada que ver'];

const VACIAS_STOP = ['que', 'de', 'la', 'el', 'y', 'a', 'en', 'un', 'una', 'los', 'las',
  'por', 'con', 'para', 'es', 'se', 'lo', 'del', 'al', 'su', 'sus', 'o', 'como', 'mas',
  'pero', 'si', 'no', 'te', 'me', 'le', 'ya', 'muy', 'esta', 'este', 'eso', 'hay'];

const limpiar = t => (t || '').toLowerCase().trim()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9¿?¡!.,\s]/g, ' ').replace(/\s+/g, ' ').trim();

const tiene = (t, lista) => lista.some(p => new RegExp(`(^|\\s)${p}(\\s|$|[.,?!])`).test(t));
const cuenta = (t, lista) => lista.reduce((n, p) =>
  n + (t.match(new RegExp(`(^|\\s)${p}(\\s|$|[.,?!])`, 'g')) || []).length, 0);

/* ── lectura del texto: qué hay acá adentro ── */
function analizar(texto, pregunta) {
  const t = limpiar(texto);
  const pal = t ? t.split(' ').filter(Boolean) : [];
  const n = pal.length;

  const primera = cuenta(t, ['yo', 'mi', 'me', 'mis', 'conmigo', 'mio', 'mia', 'soy', 'estoy', 'tengo', 'quiero', 'siento', 'creo', 'pienso']);
  const otro = cuenta(t, ['vos', 'usted', 'ustedes', 'ellos', 'otro', 'otros', 'nadie', 'alguien', 'gente', 'todos', 'projimo',
    'mi viejo', 'mi vieja', 'mi padre', 'mi madre', 'mi hermano', 'mi hermana', 'mi amigo', 'mi amiga',
    'mi hijo', 'mi hija', 'mi mujer', 'mi marido', 'mi novia', 'mi novio', 'mi jefe', 'mi ex', 'mi abuela', 'mi abuelo']);

  // ¿está repitiendo la pregunta con otras palabras?
  const pq = limpiar(pregunta || '').split(' ').filter(w => w.length > 3 && !VACIAS_STOP.includes(w));
  const repetidas = pq.length ? pal.filter(w => w.length > 3 && pq.includes(w)).length : 0;
  const eco = pq.length && n ? repetidas / Math.min(n, pq.length) : 0;

  return {
    n,
    texto: t,
    vacia: n === 0 || (n <= 3 && VACIAS.includes(t.replace(/[.,?!]/g, ''))),
    breve: n > 0 && n <= 6,
    larga: n >= 28,
    yo: n ? primera / n : 0,
    otro: n ? otro / n : 0,
    // "porque…" en español abre una explicación, no una pregunta: no cuenta
    pregunta: /\?\s*$/.test(texto.trim()) || /^(por que |para que |quien |cual |acaso |y vos)/.test(t),
    duda: tiene(t, ['no se', 'quiza', 'quizas', 'tal vez', 'capaz', 'puede ser', 'depende', 'creo', 'supongo', 'no estoy seguro', 'a veces']),
    absoluto: cuenta(t, ['siempre', 'nunca', 'jamas', 'todo', 'todos', 'nada', 'nadie', 'obviamente', 'claramente', 'seguro']),
    accion: tiene(t, ['hago', 'haria', 'hacer', 'voy', 'iria', 'agarro', 'saco', 'corto', 'empiezo', 'pruebo',
      'aborto', 'sigo', 'salgo', 'elijo', 'decido', 'reviso', 'chequeo', 'aviso', 'llamo', 'arreglo', 'freno', 'bajo', 'vuelvo']),
    eco
  };
}

/* ── el veredicto ── */
function juzgar(texto, m, pregunta) {
  const a = analizar(texto, pregunta);
  const j = m.juicio || {};
  const t = a.texto;

  const elegir = x => Array.isArray(x) ? x[Math.floor(Math.random() * x.length)] : x;

  // sin respuesta no hay examen
  if (a.vacia) return { s: -1, replica: elegir(j.frases && j.frases.vacia) || 'Eso no es una respuesta. Es una manera de irte.' };

  // algunos maestros exigen que aparezca algo sí o sí
  if (j.requiere && !j.requiere.some(w => t.includes(w)))
    return { s: -1, replica: elegir(j.frases && j.frases.falta) || 'Te faltó lo único que te pedí.' };

  let p = 0;
  let motivo = null;
  const marcar = (cond, key, val) => { if (cond) { p += val; if (val && (!motivo || Math.abs(val) > Math.abs(motivo[1]))) motivo = [key, val]; } };

  const e = j.ejes || {};
  marcar(a.breve, 'breve', e.breve || 0);
  marcar(a.larga, 'larga', e.larga || 0);
  marcar(a.yo > .14, 'yo', e.yo || 0);
  marcar(a.otro > .05, 'otro', e.otro || 0);
  marcar(a.pregunta, 'pregunta', e.pregunta || 0);
  marcar(a.duda, 'duda', e.duda || 0);
  marcar(a.absoluto >= 1, 'absoluto', e.absoluto || 0);
  marcar(a.accion, 'accion', e.accion || 0);
  marcar(a.eco > .5, 'eco', e.eco != null ? e.eco : -1);

  // vocabulario que este maestro premia o castiga
  const pos = (j.pos || []).filter(w => t.includes(w)).length;
  const neg = (j.neg || []).filter(w => t.includes(w)).length;
  if (pos) { p += Math.min(pos, 2) * 1.2; if (!motivo || 1.2 >= Math.abs(motivo[1])) motivo = ['pos', 1.2]; }
  if (neg) { p -= Math.min(neg, 2) * 1.2; motivo = ['neg', -1.2]; }

  const s = p >= 1 ? 1 : p <= -1 ? -1 : 0;
  const f = j.frases || {};
  // la frase puntual solo si tira para el mismo lado que el veredicto:
  // si no, el maestro te felicitaría por algo y encima te reprobaría
  const coincide = motivo && ((s > 0 && motivo[1] > 0) || (s < 0 && motivo[1] < 0));
  const banco = coincide ? f[motivo[0]] : null;
  const generica = s > 0 ? f.bien : s < 0 ? f.mal : f.medio;

  return { s, replica: elegir(banco) || elegir(generica) || '…' };
}
