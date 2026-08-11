/* G2tM — contenido: senseis, preguntas, figuras.
   Todo el "juego" vive acá. Para agregar un planeta, agregá un nodo a NODOS. */

const FIGURAS = [
  { id: 'espantapajaros', icon: '🎃', name: 'El Espantapájaros',
    desc: 'Te muestra el criterio del sensei antes de que respondas. No te dice la respuesta. Te dice qué está mirando.',
    power: 'criterio' },
  { id: 'cuervo', icon: '🐦‍⬛', name: 'El Cuervo',
    desc: 'Se para en tu hombro y grazna distinto según cómo te fue en la pregunta anterior.',
    power: 'feedback' },
  { id: 'perro', icon: '🐕', name: 'El Perro',
    desc: 'Te siguió desde la primera muerte. Una vez por región, te deja repetir una pregunta.',
    power: 'retry' },
  { id: 'reloj', icon: '🕰️', name: 'El Reloj Roto',
    desc: 'Atrasa. Justo por eso te da más tiempo donde el tiempo importa.',
    power: 'tiempo' },
  { id: 'espejo', icon: '🪞', name: 'El Espejo',
    desc: 'No hace nada. Te mira responder. Algunos jugadores dicen que es la peor figura del juego.',
    power: 'nada' },
  { id: 'nino', icon: '🧒', name: 'El Niño',
    desc: 'Pregunta "¿por qué?" después de cada respuesta tuya. Molesta. Y a veces te salva: descarta una opción mala por región.',
    power: 'descarte' },
  { id: 'faro', icon: '🗼', name: 'El Faro',
    desc: 'No se mueve de la Tierra, pero desde cualquier planeta lo ves. Si morís de nuevo, no perdés progreso.',
    power: 'ancla' }
];

const NODOS = [

  /* ═══════════════ TIERRA ═══════════════ */

  {
    id: 'india', zone: 'tierra', region: 'India', coords: '20°N 77°E',
    sensei: 'Siddhārtha', title: 'El Despierto', icon: '☸',
    mode: 'choice', pass: 2,
    criterio: 'Mira si tu respuesta alimenta al que responde.',
    intro: 'Está sentado. No se levanta cuando llegás. "Tres preguntas", dice. "Después seguís caminando, para donde sea."',
    questions: [
      {
        q: 'Un hombre recibe un flechazo envenenado. ¿Qué es lo primero que hay que hacer?',
        options: [
          { t: 'Averiguar quién disparó.', s: -1, r: 'Murió mientras averiguabas. Sabía el nombre del arquero.' },
          { t: 'Sacar la flecha.', s: 1, r: 'Sí. Lo demás es conversación sobre un cadáver.' },
          { t: 'Identificar el veneno para elegir el antídoto correcto.', s: 0, r: 'Prudente. También lento. La prudencia a veces es miedo con título universitario.' },
          { t: 'Aceptarla. El dolor también es camino.', s: -1, r: 'Eso lo dice alguien que no tiene una flecha encima.' }
        ]
      },
      {
        q: 'Te ofrezco la iluminación ahora. Completa, gratis, sin esfuerzo. ¿La tomás?',
        options: [
          { t: 'Sí, obviamente.', s: -1, r: 'El deseo de terminar con el deseo sigue siendo deseo.' },
          { t: 'No, quiero ganármela.', s: -1, r: 'Peor. Ahora estás apegado al camino además de a la meta.' },
          { t: '¿Qué perdería?', s: 0, r: 'Buena pregunta comercial. Mala pregunta espiritual.' },
          { t: '¿Quién la tomaría?', s: 1, r: '…' }
        ]
      },
      {
        q: 'Tu casa se incendia. Podés sacar una sola cosa. ¿Cuál?',
        options: [
          { t: 'A quien esté adentro.', s: 1, r: 'No preguntaste qué cosa. Bien.' },
          { t: 'Nada. Todo arde igual.', s: 0, r: 'El desapego que se anuncia es apego con mejor ropa.' },
          { t: 'Mis escritos. Sirven a otros.', s: -1, r: 'Tus escritos. Tuyos. Ahí está la palabra.' },
          { t: 'El fuego. Me lo llevo puesto.', s: 0, r: 'Ingenioso. La astucia también es una casa que se incendia.' }
        ]
      }
    ],
    pasa: 'Asiente una vez. No te felicita. Eso, acá, es aprobar.',
    falla: 'No dice nada. Sigue sentado. Vos ya no estás.'
  },

  {
    id: 'grecia', zone: 'tierra', region: 'Grecia', coords: '37°N 23°E',
    sensei: 'Sócrates', title: 'El Tábano', icon: '⚱️',
    mode: 'choice', pass: 2,
    criterio: 'Mira si aceptás la premisa sin revisarla.',
    intro: 'Te para en la calle. Descalzo. "¿Vos sabés algo? Yo no. Charlemos."',
    questions: [
      {
        q: '¿Qué es peor: sufrir una injusticia o cometerla?',
        options: [
          { t: 'Cometerla.', s: 1, r: 'Entonces el que hace daño se daña primero. Seguimos.' },
          { t: 'Sufrirla. El daño real es el que te hacen.', s: -1, r: 'Entonces preferís ser un tirano feliz antes que una víctima justa. Decilo así, a ver si te gusta.' },
          { t: 'Depende del tamaño de la injusticia.', s: 0, r: '¿Y dónde está la línea? Mostrámela y te creo.' },
          { t: 'Ninguna. Hay que evitar ambas.', s: -1, r: 'Eso no es una respuesta, es una salida. Te pregunté cuál es peor.' }
        ]
      },
      {
        q: 'Definí "justicia" en una frase.',
        options: [
          { t: 'Dar a cada uno lo suyo.', s: 0, r: '¿Y qué es "lo suyo"? Volvimos al principio, pero con más palabras.' },
          { t: 'Lo que manda la ley.', s: -1, r: 'Entonces cuando la ley mandó matar a los tuyos, fue justo. ¿Firmás eso?' },
          { t: 'No puedo definirla. Y me molesta no poder.', s: 1, r: 'Ahí. Esa molestia es lo único que enseño.' },
          { t: 'Lo que yo siento que es justo.', s: -1, r: 'Cómodo. Tu estómago no es un tribunal.' }
        ]
      },
      {
        q: 'Decís que solo sabés que no sabés nada. ¿Eso es saber algo?',
        options: [
          { t: 'Sí, y por eso sé más que vos.', s: -1, r: 'Ahí se te cayó todo, justo al final.' },
          { t: 'No, es una manera de hablar.', s: 0, r: 'Cuidado: las maneras de hablar son donde la gente esconde lo que no pensó.' },
          { t: 'Si lo es me contradigo; si no lo es, tampoco lo sé.', s: 1, r: 'Y ahí te quedás parado, incómodo. Bienvenido.' },
          { t: 'Es una paradoja sin salida. Sigamos.', s: -1, r: 'La salida era quedarse.' }
        ]
      }
    ],
    pasa: 'Se ríe. "No aprendiste nada conmigo. Perfecto."',
    falla: 'Se encoge de hombros. "Yo tampoco sé. Pero yo lo digo antes."'
  },

  {
    id: 'china', zone: 'tierra', region: 'China', coords: '34°N 108°E',
    sensei: 'Lao Tsé', title: 'El Viejo Maestro', icon: '☯',
    mode: 'choice', pass: 2,
    criterio: 'Mira cuánta fuerza usás para cosas que se hacen solas.',
    intro: 'Estaba por irse del reino montado en un buey. El guardia lo frenó para que dejara algo escrito. A vos te frena para preguntarte algo.',
    questions: [
      {
        q: 'Un río encuentra una roca. ¿Qué hace el río?',
        options: [
          { t: 'La rodea.', s: 1, r: 'Y en mil años la roca no está y el río sí.' },
          { t: 'La erosiona hasta partirla.', s: 0, r: 'Cierto. Pero lo dijiste como si el río se esforzara.' },
          { t: 'Se detiene y forma un lago.', s: 1, r: 'También. No todo obstáculo es un enemigo; algunos son una orilla.' },
          { t: 'Junta caudal y la arrastra.', s: -1, r: 'Eso es lo que haría un hombre con un río a cargo.' }
        ]
      },
      {
        q: 'De todo lo que hiciste este año, ¿qué salió mejor?',
        options: [
          { t: 'Lo que más me costó.', s: -1, r: 'El costo no es una medida de calidad. Es una medida de tu resistencia.' },
          { t: 'Lo que no hice.', s: 1, r: 'El gobernante sabio se conoce por las guerras que no empezó.' },
          { t: 'Lo que salió sin que yo interviniera.', s: 1, r: 'Wu wei. Actuaste sin dejar huella de haber actuado.' },
          { t: 'Lo que planifiqué y ejecuté exacto.', s: -1, r: 'Un plan cumplido al milímetro suele significar que el mundo no participó.' }
        ]
      },
      {
        q: '¿Para qué sirve una taza?',
        options: [
          { t: 'Para contener líquido.', s: 0, r: 'Describís la pared y te olvidás de la habitación.' },
          { t: 'El vacío de adentro es lo que sirve.', s: 1, r: 'La arcilla la hace. El hueco la usa.' },
          { t: 'Para beber.', s: 0, r: 'Correcto y vacío. Y no del vacío que sirve.' },
          { t: 'Para romperse y enseñar impermanencia.', s: -1, r: 'Esa es la escuela de al lado, y encima la citás mal.' }
        ]
      }
    ],
    pasa: 'Sube al buey. No mira atrás. Podés seguir.',
    falla: 'Sube al buey igual. La diferencia es que vos te quedás.'
  },

  {
    id: 'egipto', zone: 'tierra', region: 'Egipto', coords: '25°N 32°E',
    sensei: 'El Escriba de Maat', title: 'El que pesa', icon: '𓂀',
    mode: 'choice', pass: 2,
    criterio: 'Mira la exactitud. Exagerar para arriba o para abajo pesa igual.',
    intro: 'Una balanza. De un lado tu corazón. Del otro, una pluma. El escriba moja la caña y espera.',
    questions: [
      {
        q: 'Antes de pesarlo: ¿cuánto pesa tu corazón?',
        options: [
          { t: 'Menos que la pluma. Viví bien.', s: -1, r: 'Anoto: "declara ser liviano". Eso ya pesa.' },
          { t: 'No lo sé. Nunca lo pesé.', s: 1, r: 'Anoto: "no sabe". Es lo único que nadie puede desmentir.' },
          { t: 'Más. Hice daño.', s: 0, r: 'La confesión rápida también es una forma de acomodar la balanza.' },
          { t: 'Exactamente lo mismo que la pluma.', s: 0, r: 'Qué cómodo te queda el equilibrio.' }
        ]
      },
      {
        q: '¿Cuántas veces mentiste hoy?',
        options: [
          { t: 'Ninguna.', s: -1, r: 'Una.' },
          { t: 'No llevo la cuenta.', s: 0, r: 'Yo sí. Ese es mi trabajo.' },
          { t: 'Más de las que noté.', s: 1, r: 'Anotado sin corrección.' },
          { t: 'Solo las necesarias.', s: 0, r: '"Necesarias" es la palabra más pesada del idioma.' }
        ]
      },
      {
        q: 'Falta un grano de trigo en el granero del faraón. Sos vos el escriba. ¿Qué anotás?',
        options: [
          { t: 'Nada. Es un grano.', s: -1, r: 'El primer grano siempre es un grano.' },
          { t: '"Falta un grano".', s: 1, r: 'Correcto.' },
          { t: '"Inventario completo, dentro del margen".', s: -1, r: 'Inventaste el margen para no escribir la falta.' },
          { t: '"Falta un grano" — y anoto quién contó.', s: 1, r: 'Correcto y además prolijo. Vas a llegar lejos o te van a matar.' }
        ]
      }
    ],
    pasa: 'La balanza no se mueve. El escriba sopla la tinta para secarla.',
    falla: 'La balanza se inclina. Del otro lado hay algo esperando, y no vas a querer verlo.'
  },

  {
    id: 'japon', zone: 'tierra', region: 'Japón', coords: '35°N 138°E',
    sensei: 'Hakuin', title: 'El del Koan', icon: '⛩',
    mode: 'choice', pass: 2,
    criterio: 'Mira si explicás en vez de responder. Explicar es fallar.',
    intro: 'Un cuarto vacío, un palo apoyado en la pared. "Si contestás con filosofía", dice señalando el palo, "usamos esto".',
    questions: [
      {
        q: '¿Cuál es el sonido de una sola mano?',
        options: [
          { t: 'El silencio.', s: -1, r: 'Cambiaste un concepto por otro concepto. El palo.' },
          { t: 'No existe: hacen falta dos manos.', s: -1, r: 'Trajiste física a un cuarto vacío.' },
          { t: '(levantás la mano)', s: 1, r: '…' },
          { t: 'Es una pregunta sin respuesta, ese es el punto.', s: 0, r: 'Entendiste el mecanismo. No entendiste nada.' }
        ]
      },
      {
        q: '¿Tenés la naturaleza de Buddha?',
        options: [
          { t: 'Sí.', s: 0, r: '¿Quién habla?' },
          { t: 'No.', s: 0, r: '¿Quién no la tiene?' },
          { t: 'Mu.', s: -1, r: 'Repetís a Zhaozhou. Te sabés la respuesta de otro. ¿Y vos?' },
          { t: '¿Me lo preguntás a mí?', s: 1, r: 'Ah. Estabas ahí.' }
        ]
      },
      {
        q: 'El pueblo entero te acusa de algo que no hiciste. Vienen a tu puerta. ¿Qué decís?',
        options: [
          { t: '"¿Ah, sí?"', s: 1, r: 'Y cuando dos años después descubran que era mentira, decís lo mismo.' },
          { t: 'Me defiendo con pruebas.', s: 0, r: 'Vas a ganar el juicio y perder los dos años.' },
          { t: 'Los perdono públicamente.', s: -1, r: 'Te subiste al escenario que te armaron.' },
          { t: 'Me voy del pueblo.', s: 0, r: 'El pueblo viaja con vos.' }
        ]
      }
    ],
    pasa: 'Deja el palo en el piso. Te da la espalda: seguís vivo.',
    falla: 'Ni levanta el palo. No hace falta.'
  },

  {
    id: 'texas', zone: 'tierra', region: 'Texas, EE.UU.', coords: '29°N 95°W',
    sensei: 'Hank Rayburn', title: 'Ingeniero de vuelo', icon: '🚀',
    mode: 'choice', pass: 2,
    criterio: 'No le importa lo que pensás. Le importa si el cohete sube.',
    intro: 'Sala de control. Café frío. Te mira los papeles de las cinco regiones anteriores y los tira en la papelera. "Nada de esto sirve acá arriba. Tres preguntas."',
    questions: [
      {
        q: 'Faltan 40 segundos para el despegue y un sensor de presión da una lectura rara. ¿Qué hacés?',
        options: [
          { t: 'Aborto.', s: 1, r: 'Correcto. El cohete espera. El muerto no.' },
          { t: 'Medito sobre la naturaleza de la duda.', s: -1, r: 'Meditá en el hospital.' },
          { t: 'Despego. Ese sensor ya falló otras veces.', s: -1, r: '"Ya falló otras veces" está escrito en la lápida de mucha gente.' },
          { t: 'Pido una segunda lectura.', s: 0, r: 'Treinta y ocho segundos. Treinta y siete.' }
        ]
      },
      {
        q: '¿Quién tiene razón: el que sabe o el que llega?',
        options: [
          { t: 'El que sabe.', s: -1, r: 'Tengo un cajón lleno de tipos que sabían.' },
          { t: 'El que llega.', s: 1, r: 'Ajá.' },
          { t: 'Los dos.', s: 0, r: 'Esa respuesta no mueve un cohete un centímetro.' },
          { t: 'El que vuelve.', s: 1, r: '(te mira distinto) Repetilo en la sala de al lado.' }
        ]
      },
      {
        q: 'Última. ¿Para qué querés ir a la Luna?',
        options: [
          { t: 'Para entenderme a mí mismo.', s: -1, r: 'Eso lo hacés acá abajo y sale cuatro mil millones más barato.' },
          { t: 'Porque está ahí.', s: 0, r: 'Frase linda. La usó uno que se murió en una montaña.' },
          { t: 'Porque alguien tiene que probar si se puede.', s: 1, r: 'Sí. Y va a ser un tipo cualquiera, no un elegido.' },
          { t: 'No sé. Pero ya estoy sentado adentro.', s: 1, r: 'Honesto. Ponete el casco.' }
        ]
      }
    ],
    pasa: 'Se para. "Bueno." Aprieta un botón sin ceremonia.',
    falla: 'Cierra la carpeta. "Volvé cuando el sensor te importe más que la respuesta."'
  },

  /* ═══════════════ ESPACIO ═══════════════ */

  {
    id: 'luna', zone: 'espacio', region: 'La Luna', coords: 'Mare Tranquillitatis',
    sensei: '—', title: 'no dice su nombre', icon: '🌑',
    mode: 'timed', time: 12, pass: 2,
    criterio: 'Le sobra el tiempo. Le molesta que lo llenes con palabras.',
    intro: 'Bajás. No hay nadie. Igual algo pregunta.\n\nAcá el tiempo corre. Si no contestás, eso también es una respuesta.',
    questions: [
      {
        q: '…',
        options: [
          { t: '¿Qué? No escuché nada.', s: -1, r: 'Sí escuchaste.' },
          { t: 'Sí.', s: 0, r: '¿A qué?' },
          { t: '(quedarte callado)', s: 1, r: '' },
          { t: 'No entiendo la pregunta.', s: -1, r: 'No había pregunta hasta que la pediste.' }
        ]
      },
      {
        q: '¿Qué se escucha desde acá?',
        options: [
          { t: 'Nada. No hay aire.', s: 0, r: 'Técnicamente sos impecable.' },
          { t: 'A mí.', s: 1, r: 'Sí. Por eso viene poca gente.' },
          { t: 'El zumbido del traje.', s: 1, r: 'Bien. Lo único que hay es lo que trajiste.' },
          { t: 'El eco de la Tierra.', s: -1, r: 'No hay eco. Estás recitando una postal.' }
        ]
      },
      {
        q: 'Mirá la Tierra desde acá. ¿Qué cambió?',
        options: [
          { t: 'Nada. Sigue igual.', s: 0, r: 'Correcto y aburrido.' },
          { t: 'El tamaño.', s: 0, r: 'El tamaño de qué.' },
          { t: 'Yo.', s: 1, r: '' },
          { t: 'Todo. Ahora veo lo insignificantes que somos.', s: -1, r: 'Eso lo dijiste antes de subir. Volvé a mirar.' }
        ]
      }
    ],
    pasa: 'Nada responde. Pero la escotilla se abre.',
    falla: 'El silencio se queda con vos. Cae la Tierra encima.'
  },

  {
    id: 'marte', zone: 'espacio', region: 'Marte', coords: 'Valles Marineris',
    sensei: 'AUTÓMATA-7', title: 'El que no parpadea', icon: '🔴',
    mode: 'text', pass: 1,
    criterio: 'No acepta párrafos. Una palabra. Elegila.',
    intro: 'Una máquina vieja, enterrada hasta la mitad. Se enciende cuando te acercás.\n\n"RESPUESTA: UNA PALABRA. TEXTO LIBRE. NO HAY OPCIONES."',
    questions: [
      {
        q: 'Esta frase es falsa. ¿Verdadera o falsa? Una palabra.',
        good: ['ninguna','ni','ambas','las dos','indecidible','no','nada','ninguno','tampoco','ni una','circular','bucle','loop','depende','ninguna de las dos','falsoyverdadero'],
        bad: ['verdadera','falsa','verdadero','falso','si','sí','v','f'],
        rGood: 'PROCESANDO… ACEPTADO. NO CAÍSTE ADENTRO.',
        rBad: 'RECHAZADO. ELEGISTE UN LADO DE UNA MONEDA SIN LADOS.',
        rMeh: 'REGISTRADO. NO ES UN ERROR. TAMPOCO ES UNA RESPUESTA.'
      },
      {
        q: 'Te reemplazo una neurona por un circuito. Después otra. Después otra. ¿Cuándo dejás de ser vos? Una palabra.',
        good: ['nunca','ninguna','siempre','ya','antes','gradual','continuo','todo el tiempo','desde el principio','constantemente','hoy','ayer'],
        bad: ['cuando','mitad','50%','final','ultima','última','primera','al final'],
        rGood: 'ACEPTADO. NO BUSCASTE UNA LÍNEA QUE NO EXISTE.',
        rBad: 'RECHAZADO. PUSISTE UNA FRONTERA DONDE HAY UNA PENDIENTE.',
        rMeh: 'REGISTRADO. SIN VEREDICTO.'
      },
      {
        q: '¿Cuál es tu error más probable? Una palabra.',
        good: ['yo','este','confianza','certeza','seguridad','creerme','orgullo','suponer','apuro','soberbia','ego','vanidad','prisa','asumir','confiar'],
        bad: ['ninguno','nada','no se','no sé','ninguna','ninguno.','n/a'],
        rGood: 'ACEPTADO. LO NOMBRASTE ANTES DE COMETERLO.',
        rBad: 'RECHAZADO. ESA RESPUESTA ES EL ERROR.',
        rMeh: 'REGISTRADO. INSUFICIENTE PARA ABSOLVER. INSUFICIENTE PARA CONDENAR.'
      }
    ],
    pasa: 'AUTÓMATA-7 SE APAGA. LA RAMPA BAJA.',
    falla: 'ERROR. SUJETO DEVUELTO AL PUNTO DE ORIGEN.'
  },

  {
    id: 'jupiter', zone: 'espacio', region: 'Júpiter', coords: 'La Gran Mancha Roja',
    sensei: 'La Tormenta', title: 'lleva 300 años hablando', icon: '🟠',
    mode: 'multi', pass: 2,
    criterio: 'No busca la verdad. Busca dos verdades que no se lleven bien.',
    intro: 'No hay suelo. Hay una tormenta que gira desde antes de que existiera la palabra "año".\n\n"Elegí DOS. Que sean las dos ciertas. Que se peleen entre ellas."',
    questions: [
      {
        q: 'Elegí dos que sean verdad al mismo tiempo.',
        options: [
          { t: 'Sos libre de elegir.', k: 'a' },
          { t: 'Todo lo que elegiste venía de antes tuyo.', k: 'a' },
          { t: 'Nada importa a escala del universo.', k: 'b' },
          { t: 'Lo que hagas hoy importa.', k: 'b' }
        ],
        pairs: [['0','1'], ['2','3']],
        rGood: 'Sí. Las dos entran y no se destruyen. Eso es vivir acá adentro.',
        rBad: 'Elegiste dos que se dan la mano. Buscá las que se muerden.'
      },
      {
        q: 'Otra vez. Dos verdades enemigas.',
        options: [
          { t: 'Perdonar es fuerza.', k: 'a' },
          { t: 'Hay cosas que no se perdonan.', k: 'a' },
          { t: 'Hay que decir siempre la verdad.', k: 'b' },
          { t: 'Hay verdades que destruyen sin arreglar nada.', k: 'b' }
        ],
        pairs: [['0','1'], ['2','3']],
        rGood: 'Las dos son tuyas. Cargá con las dos.',
        rBad: 'Juntaste dos que ya estaban de acuerdo. Eso no es una tormenta, es un charco.'
      },
      {
        q: 'La última. Y esta es sobre vos.',
        options: [
          { t: 'Llegaste hasta acá por mérito propio.', k: 'a' },
          { t: 'Llegaste hasta acá por suerte.', k: 'a' },
          { t: 'Sabés lo que estás haciendo.', k: 'b' },
          { t: 'No tenés idea de lo que estás haciendo.', k: 'b' }
        ],
        pairs: [['0','1'], ['2','3']],
        rGood: 'Las dos. Siempre fueron las dos.',
        rBad: 'Elegiste la versión cómoda. Acá adentro no hay versión cómoda.'
      }
    ],
    pasa: 'La tormenta no se calma. Simplemente te deja pasar por el ojo.',
    falla: 'Trescientos años de viento te devuelven de un manotazo.'
  },

  {
    id: 'saturno', zone: 'espacio', region: 'Saturno', coords: 'División de Cassini',
    sensei: 'El Anillo', title: 'vuelve siempre al mismo punto', icon: '🪐',
    mode: 'choice', pass: 2, echo: true,
    criterio: 'Cada respuesta tuya vuelve y se te aplica.',
    intro: 'Un anillo de hielo y piedra dando vueltas sin llegar nunca a ningún lado.\n\n"Lo que contestes te lo voy a devolver."',
    questions: [
      {
        q: '¿Confiás en tu propio juicio?',
        options: [
          { t: 'Sí.', s: 0, r: 'Ese juicio también juzgó que confiaba. Se aprobó solo.' },
          { t: 'No.', s: 0, r: '¿Y con qué juzgaste que no?' },
          { t: 'A veces. Depende de si me conviene el resultado.', s: 1, r: 'Ahí. Esa es la respuesta que no se escapa del anillo.' },
          { t: 'Confío en el método, no en mí.', s: -1, r: 'El método lo elegiste vos.' }
        ]
      },
      {
        q: 'Dijiste "{PREV}". ¿Lo dijiste porque lo pensás, o porque sonaba bien acá?',
        options: [
          { t: 'Porque lo pienso.', s: 0, r: 'Todos los que mienten dicen exactamente eso.' },
          { t: 'Porque sonaba bien.', s: 1, r: 'Gracias. Es la primera cosa cara que decís.' },
          { t: 'Las dos.', s: 1, r: 'Sí. Casi siempre son las dos.' },
          { t: 'No me acuerdo qué dije.', s: -1, r: 'Hace once segundos.' }
        ]
      },
      {
        q: 'Cruzaste seis regiones y tres mundos contestando lo que cada uno quería escuchar. ¿Eso es sabiduría o es cálculo?',
        options: [
          { t: 'Sabiduría: cada lugar tiene su verdad.', s: 0, r: 'Cómodo. Muy cómodo.' },
          { t: 'Cálculo. Vine a aprobar.', s: 1, r: 'Al fin alguien lo dice en voz alta.' },
          { t: 'Empezó como cálculo y en algún planeta se convirtió en otra cosa.', s: 1, r: '¿En cuál? …No contestes. Guardátelo.' },
          { t: 'Ninguna de las dos. Yo fui sincero siempre.', s: -1, r: 'Volvé a leer las seis regiones.' }
        ]
      }
    ],
    pasa: 'El anillo se abre un instante — justo el ancho de una nave.',
    falla: 'Diste una vuelta completa y estás donde empezaste. Literalmente.'
  },

  {
    id: 'vacio', zone: 'espacio', region: 'El borde', coords: 'sin coordenadas',
    sensei: 'Vos', title: 'el último sensei', icon: '🕳',
    mode: 'final', pass: 0,
    criterio: 'No hay criterio. Ese es el examen.',
    intro: 'Se acabaron los planetas. Hay una silla, y está vacía.\n\nNadie te va a examinar acá. Tenés que decidir vos si aprobás.',
    questions: [
      {
        q: '¿Aprobaste?',
        options: [
          { t: 'Sí.', s: 1, r: '', end: 'si' },
          { t: 'No.', s: 1, r: '', end: 'no' },
          { t: 'No es una pregunta que me corresponda contestar.', s: 1, r: '', end: 'esquiva' },
          { t: '(sentarte en la silla vacía)', s: 1, r: '', end: 'silla' }
        ]
      }
    ],
    finales: {
      si: { t: 'Aprobaste.', d: 'Y ahora te toca a vos aprobar a otros. Ese es el castigo. Ningún sensei eligió serlo: todos llegaron hasta acá y dijeron que sí.' },
      no: { t: 'No aprobaste.', d: 'Buena señal. El único que sale del borde es el que todavía tiene una pregunta. Los que aprueban se quedan de guardia.' },
      esquiva: { t: 'No contestaste.', d: 'Seis regiones, cuatro mundos, y en el único examen que importaba pediste que lo corrigiera otro. Sócrates te lo dijo en la calle: la salida era quedarse.' },
      silla: { t: 'Te sentaste.', d: 'La silla estaba vacía porque el puesto está vacante. No aprobaste ni desaprobaste: ocupaste el lugar. Mañana llega alguien con tres preguntas y vas a tener que mirarlo a los ojos.' }
    },
    pasa: '', falla: ''
  }
];
