/* G2tM — el elenco.
   Cada maestro: cómo se ve (arte), qué pregunta, cómo juzga lo que escribís
   y qué hace si lo tocás. Las preguntas se sortean del banco y no se repiten
   entre partidas hasta que se agotan.
   Los pesos de `ejes` van de -1.5 a 1.5 y se suman: >=1 aprueba, <=-1 hunde.
   `pos`/`neg` son raíces, no palabras enteras: 'suelt' pesca soltar y soltó. */

const FIGURAS = [
  { id: 'espantapajaros', icon: '🎃', name: 'El Espantapájaros',
    desc: 'Te muestra qué está mirando el maestro antes de que escribas. No te dice qué contestar.',
    power: 'criterio' },
  { id: 'cuervo', icon: '🐦‍⬛', name: 'El Cuervo',
    desc: 'Se para en tu hombro y grazna distinto según cómo te fue en la respuesta anterior.',
    power: 'feedback' },
  { id: 'perro', icon: '🐕', name: 'El Perro',
    desc: 'Te siguió desde la primera caída. Una vez por región, te deja volver a escribir una respuesta.',
    power: 'retry' },
  { id: 'espejo', icon: '🪞', name: 'El Espejo',
    desc: 'No hace nada. Te mira escribir. Algunos jugadores dicen que es la peor figura del juego.',
    power: 'nada' },
  { id: 'nino', icon: '🧒', name: 'El Niño',
    desc: 'Pregunta "¿por qué?" después de cada cosa que escribís. Molesta. Y a veces te ordena la cabeza.',
    power: 'porque' },
  { id: 'faro', icon: '🗼', name: 'El Faro',
    desc: 'No se mueve de la Tierra, pero desde cualquier planeta lo ves. Si volvés a caer, no perdés lo aprobado.',
    power: 'ancla' },
  { id: 'lengua', icon: '👅', name: 'La Lengua',
    desc: 'Habla antes que vos. Te sopla la primera palabra de la respuesta; después te suelta la mano.',
    power: 'soplo' }
];

const MAESTROS = [

  /* ═══════════════════ TIERRA ═══════════════════ */

  {
    id: 'buda', zona: 'tierra', region: 'India', nombre: 'Buda', titulo: 'El Despierto',
    pass: 1, preguntasPorRonda: 3,
    criterio: 'Mira si tu respuesta alimenta al que responde.',
    intro: 'Está sentado abajo de la higuera desde antes de que llegaras. No se levanta.\n\n"Escribí. No hace falta que sea largo."',
    toques: [
      { t: 'No se inmuta. Tocaste a alguien que hace rato no está del todo acá.', anim: 'calma' },
      { t: 'Abre un ojo. Lo vuelve a cerrar. Eso fue todo lo que ibas a conseguir.', anim: 'calma' },
      { t: 'El halo late una vez, como si respirara. Él no.', anim: 'calma' }
    ],
    preguntas: [
      'Se te murió algo que querías. ¿Qué hacés con lo que quedó?',
      '¿Qué cosa tuya no soltarías ni aunque te la pidiera yo?',
      'Nombrá algo que deseás. Ahora decime qué pasaría el día después de tenerlo.',
      '¿Quién sos cuando no te está mirando nadie?',
      'Alguien te insulta en la calle y sigue de largo. ¿Qué se te movió por dentro?',
      '¿Qué es lo que más miedo te da perder?',
      'Si mañana te olvidaras de tu nombre, ¿qué quedaría de vos?',
      'El dolor de este momento, ¿de quién es?',
      '¿Para qué querés llegar a la Luna?'
    ],
    juicio: {
      ejes: { breve: 1, larga: -.7, yo: -1.4, otro: .7, pregunta: .7, duda: .5, absoluto: -.2, accion: 0, eco: -1.2 },
      pos: ['suelt', 'desapeg', 'impermanen', 'dejar ir', 'nada mio', 'no es mio', 'nada sea mio', 'no era mio',
        'se va', 'yendo', 'se pierde igual', 'de todos modos', 'igual se', 'cambia', 'vacio', 'silencio', 'respir', 'presente', 'nadie', 'nada queda'],
      neg: ['merezc', 'me lo gane', 'mi logro', 'para siempre', 'mio y de nadie', 'nunca lo dejo', 'orgullo', 'me pertenece'],
      frases: {
        vacia: 'No escribiste nada. A veces eso es sabiduría. Hoy es que no sabías.',
        yo: ['Contaste nueve veces "yo" en tres renglones. Ahí está tu respuesta y no es la que escribiste.', 'Todo lo que dijiste gira alrededor de vos. Ese es el peso, no la pregunta.'],
        larga: 'Escribiste mucho. Lo largo suele ser miedo a que te falte razón.',
        eco: 'Me devolviste mi propia pregunta con otras palabras. No te pregunté qué dije.',
        pregunta: 'Preguntar en vez de contestar. Bien. Ahí adentro no hay nadie defendiéndose.',
        neg: 'Escuchá lo que escribiste: es alguien agarrando algo. Por eso duele.',
        bien: ['Sí.', 'Eso lo escribió alguien que aflojó la mano.', 'No hay nadie sosteniendo esa frase. Bien.'],
        medio: ['Ni te salva ni te hunde. Como casi todo.', 'Está tibio. Lo dejo pasar sin anotarlo.'],
        mal: ['Eso te ata más fuerte de lo que estabas.', 'Contestaste para quedar bien. Se nota desde acá.']
      }
    },
    pasa: 'Asiente una vez. No te felicita. Acá eso es aprobar.',
    falla: 'No dice nada. Sigue sentado. Vos ya no estás.'
  },

  {
    id: 'socrates', zona: 'tierra', region: 'Grecia', nombre: 'Sócrates', titulo: 'El Tábano',
    pass: 1, preguntasPorRonda: 3,
    criterio: 'Mira si aceptás una idea sin haberla revisado. Dudar suma.',
    intro: 'Te para en el ágora, descalzo, con una insistencia molesta.\n\n"Yo no sé nada. Vos escribí, que de algo tenemos que hablar."',
    toques: [
      { t: '"¿Y eso qué te dijo de mí? Porque a mí me dijo bastante de vos."', anim: 'pregunta' },
      { t: 'Se deja tocar. "¿Ves? No pasó nada. Ahora definime qué esperabas que pasara."', anim: 'pregunta' },
      { t: '"Tocaste primero y pensaste después. Guardá eso, lo vamos a usar."', anim: 'pregunta' }
    ],
    preguntas: [
      'Definí "justicia". Una frase, y que se sostenga.',
      '¿Qué creés saber que no podrías demostrarle a nadie?',
      '¿Es peor sufrir una injusticia o cometerla? Decime por qué.',
      'Decime algo que sepas con certeza absoluta.',
      '¿Qué es una vida buena? Y no me contestes con ejemplos.',
      '¿Se puede hacer el mal sabiendo que es el mal?',
      '¿Quién te enseñó lo que pensás? ¿Lo revisaste alguna vez?',
      '¿Qué pregunta nunca te hiciste?',
      'Si todos opinan lo contrario que vos, ¿quién tiene razón y cómo lo sabés?'
    ],
    juicio: {
      ejes: { breve: -.6, larga: .3, yo: -.2, otro: .2, pregunta: 1.2, duda: 1.1, absoluto: -1.3, accion: -.3, eco: -1 },
      pos: ['no se', 'depende de', 'que quiere decir', 'definir', 'contradic', 'entonces', 'porque', 'razon', 'ejemplo contrario', 'me equivoc', 'revisar', 'preguntar'],
      neg: ['obviamente', 'todo el mundo sabe', 'es asi y punto', 'no hay nada que discutir', 'siempre fue asi', 'sentido comun', 'es obvio'],
      frases: {
        vacia: 'El silencio también es una posición. Pero la tuya es pereza, no método.',
        duda: 'Dudaste. En esta ciudad eso es un título universitario.',
        pregunta: 'Contestaste con una pregunta. Es lo único honesto que se puede hacer con lo que te pregunté.',
        absoluto: ['"Siempre", "nunca", "todos". Traeme uno solo de esos que sobreviva a un ejemplo en contra.', 'Usaste una palabra absoluta. Las voy a atacar todas, una por una.'],
        breve: 'Muy corto. No pedí una consigna, pedí un razonamiento.',
        eco: 'Me repetiste. Repetir no es pensar, es tener buena memoria.',
        neg: 'Eso lo dijiste como si no hubiera nada que discutir. Justo ahí es donde hay todo para discutir.',
        bien: ['Ahí. Esa incomodidad es lo único que enseño.', 'Te seguí el razonamiento y no se cayó. Raro.', 'Bien: dejaste una puerta abierta en vez de cerrar con llave.'],
        medio: ['Puede ser. También puede no ser. Seguimos.', 'No es falso. Tampoco es tuyo.'],
        mal: ['Repetiste algo que te enseñaron sin haberlo abierto nunca.', 'Eso se cae con una sola pregunta más. Y la tengo acá.']
      }
    },
    pasa: 'Se ríe. "No aprendiste nada conmigo. Perfecto."',
    falla: 'Se encoge de hombros. "Yo tampoco sé. Pero yo lo aviso antes."'
  },

  {
    id: 'laotse', zona: 'tierra', region: 'China', nombre: 'Lao Tsé', titulo: 'El Viejo Maestro',
    pass: 1, preguntasPorRonda: 3,
    criterio: 'Mira cuánta fuerza usás para cosas que se hacen solas.',
    intro: 'Estaba yéndose del reino. Lo frenaron para que dejara algo escrito.\n\nA vos te frena para que escribas vos.',
    toques: [
      { t: 'Tu mano lo atraviesa como si fuera niebla. Él ni se entera.', anim: 'esquiva' },
      { t: 'Se corrió medio paso antes de que llegaras. No parece haberse movido.', anim: 'esquiva' },
      { t: '"Lo blando no se deja agarrar. Por eso dura."', anim: 'esquiva' }
    ],
    preguntas: [
      '¿Qué cosa de tu vida mejoraría si dejaras de meterte?',
      'Contame una vez que forzaste algo y salió peor.',
      'El agua siempre elige bajar. Vos, ¿qué hacés?',
      '¿Qué estás sosteniendo que ya se sostiene solo?',
      '¿Para qué sirve el hueco de una taza?',
      'Decime algo que te salió bien sin que te costara nada.',
      '¿Qué pasa si no hacés nada?',
      '¿Qué es más fuerte: la roca o el río?',
      '¿Qué querés controlar que no se puede controlar?'
    ],
    juicio: {
      ejes: { breve: .8, larga: -.8, yo: -.8, otro: .3, pregunta: .3, duda: .6, absoluto: -.6, accion: -1, eco: -1 },
      pos: ['dejar', 'solo se', 'sin forzar', 'esper', 'fluir', 'no hacer', 'blando', 'ceder', 'rodear', 'vacio', 'hueco', 'silencio', 'tiempo', 'se acomoda'],
      neg: ['oblig', 'fuerz', 'control', 'empuj', 'luch', 'domin', 'a toda costa', 'insist', 'no aflojo', 'pele'],
      frases: {
        vacia: 'No escribiste nada. Estuviste más cerca que muchos, pero por vagancia, no por sabiduría.',
        accion: 'Todo lo que escribiste empieza con vos haciendo algo. ¿Y si el asunto ya venía andando solo?',
        yo: 'Te pusiste en el centro de un río que corre igual sin vos.',
        larga: 'Muchas palabras para decir que no aflojás.',
        breve: 'Corto y sin esfuerzo. Así baja el agua.',
        neg: ['Escuchá los verbos que usaste: forzar, luchar, controlar. Eso cansa a cualquiera menos al río.', 'Le estás poniendo el hombro a una puerta que abría para el otro lado.'],
        bien: ['Sí. Actuaste sin dejar huella de haber actuado.', 'El gobernante sabio se conoce por las guerras que no empezó.', 'Eso se hizo solo y vos tuviste la decencia de no interrumpir.'],
        medio: ['Ni forzaste ni soltaste. Te quedaste en la orilla.', 'Puede ser. El agua tampoco opina.'],
        mal: ['Estás remando contra tu propia corriente y encima orgulloso.', 'Cuanto más apretás, menos te queda en la mano.']
      }
    },
    pasa: 'Sube al buey. No mira atrás. Podés seguir.',
    falla: 'Sube al buey igual. La diferencia es que vos te quedás.'
  },

  {
    id: 'cristo', zona: 'tierra', region: 'Jerusalén', nombre: 'Cristo', titulo: 'El que carga',
    pass: 1, preguntasPorRonda: 3,
    criterio: 'Mira si en tu respuesta aparece alguien más además de vos.',
    intro: 'El cerro está vacío a esta hora. Te esperó sentado, como si tuviera todo el tiempo.\n\n"Contame. Sin adornarlo."',
    toques: [
      { t: 'Te toma la mano con las dos suyas. No dice nada. La paz que te da es casi incómoda.', anim: 'bendicion' },
      { t: '"La paz sea con vos." Lo dice sin solemnidad, como quien te alcanza un vaso de agua.', anim: 'bendicion' },
      { t: 'Te deja tocarlo. Tiene la mano áspera, de carpintero, no de estampita.', anim: 'bendicion' }
    ],
    preguntas: [
      '¿A quién no perdonaste?',
      '¿Qué harías por alguien que no puede devolverte nada?',
      'Te pegan una cachetada delante de todos. Contame qué hacés, sin mentirme.',
      '¿Qué te sobra a vos que a otro le falta?',
      '¿Cuándo fue la última vez que ayudaste sin que nadie se enterara?',
      'Si pudieras cargar la culpa de otro para que él quede libre, ¿la cargarías?',
      '¿Qué es más difícil: pedir perdón o darlo?',
      '¿A quién dejaste solo?',
      'Si tuvieras que dar todo lo que tenés, ¿qué te costaría más soltar?'
    ],
    juicio: {
      ejes: { breve: -.3, larga: .2, yo: -.9, otro: 1.3, pregunta: 0, duda: .3, absoluto: -.4, accion: .5, eco: -1 },
      pos: ['perdon', 'perdonar', 'ayud', 'dar', 'entreg', 'acompañ', 'acompan', 'escuch', 'cargo', 'cargar', 'amor', 'amar', 'otro', 'nadie se entere', 'sin esperar nada', 'me duele', 'me hace mal', 'no lo perdon', 'no la perdon', 'me pudr'],
      neg: ['se lo merece', 'que se joda', 'no es mi problema', 'cada uno se arregla', 'me da igual', 'yo primero', 'venganza', 'me la debe'],
      frases: {
        vacia: 'No contestaste. Está bien, el silencio también lo entiendo. Pero no te alcanza.',
        otro: 'Apareció otra persona en tu respuesta. Eso ya es la mitad del camino.',
        yo: 'Toda la respuesta es sobre vos. Te pregunté por el que tenés al lado.',
        neg: ['Escribiste eso rápido. Las cosas que escribimos rápido son las que de verdad pensamos.', '"Que se arregle solo." Bueno. Yo también podría haber dicho eso.'],
        accion: 'No lo dijiste: lo hiciste. Es lo único que se cuenta.',
        eco: 'Me repetiste la pregunta con otras palabras. Te pedí la tuya.',
        bien: ['Eso no lo escribió alguien cómodo.', 'Sí. Nadie te va a devolver eso, y lo escribiste igual.', 'Ahí hay alguien más además de vos. Con eso alcanza.'],
        medio: ['Es honesto, pero todavía es sobre vos.', 'Está bien. No es generoso, pero es cierto.'],
        mal: ['Hay una sola persona en esa respuesta y sos vos.', 'Escribiste lo justo para no comprometerte con nadie.']
      }
    },
    pasa: 'Te apoya la mano en el hombro un segundo y te deja seguir.',
    falla: 'No te reprocha nada. Es peor.'
  },

  {
    id: 'anubis', zona: 'tierra', region: 'Egipto', nombre: 'Anubis', titulo: 'El que pesa',
    pass: 1, preguntasPorRonda: 3,
    criterio: 'Mide exactitud. Exagerar para arriba o para abajo pesa igual.',
    intro: 'La balanza ya está armada. De un lado tu corazón, del otro una pluma.\n\nMoja la caña y espera a que escribas. Todo lo que escribas queda registrado.',
    toques: [
      { t: 'Anota sin levantar la vista: "El sujeto intentó tocar al juez. Hora, exacta."', anim: 'anota' },
      { t: 'Se queda quieto y te deja la mano ahí. Está pesándola.', anim: 'anota' },
      { t: 'Las orejas giran hacia vos. El resto del cuerpo no se movió ni un milímetro.', anim: 'anota' }
    ],
    preguntas: [
      '¿Cuánto pesa lo que hiciste mal? Sé exacto.',
      'Contame una mentira que hayas dicho hoy.',
      '¿De qué te acusás cuando nadie te acusa?',
      '¿Qué te atribuís que en realidad fue de otro?',
      '¿Cuántas veces fallaste en algo que importaba de verdad?',
      'Si tuviera tu registro completo abierto acá, ¿qué página no querrías que lea?',
      '¿Qué te llevás cuando te vas?',
      '¿Sos mejor persona de lo que parecés, o peor?',
      'Decime tu peor defecto sin disfrazarlo de virtud.'
    ],
    juicio: {
      ejes: { breve: .2, larga: -.4, yo: .3, otro: -.2, pregunta: -.5, duda: .4, absoluto: -1.2, accion: 0, eco: -1 },
      pos: ['exact', 'una vez', 'dos veces', 'tres', 'ayer', 'hoy', 'me equivoqu', 'fall', 'menti', 'mentir', 'no lo se con precision', 'no llevo la cuenta', 'me lo atribui', 'fue de otro', 'peor'],
      neg: ['ninguna', 'nunca ment', 'soy honesto siempre', 'no tengo defectos', 'nada de lo que arrepentirme', 'todo bien', 'soy buena persona', 'jamas'],
      frases: {
        vacia: 'Registro: "se negó a declarar". Pesa más que una confesión.',
        absoluto: ['"Nunca". "Siempre". Anoto la palabra y la fecha, para cuando se caiga.', 'Los absolutos son la mentira que se cree honesta.'],
        duda: 'No sabés el número exacto y lo dijiste. Eso, acá, es precisión.',
        neg: ['Declaraste ser mejor de lo que sos. La pluma se movió sola.', 'Nadie que haya vivido escribe eso.'],
        larga: 'Muchas palabras alrededor de un número que no diste.',
        pregunta: 'No preguntes. Contestá. El que pregunta acá soy yo.',
        bien: ['Anotado sin corrección.', 'Coincide con mi registro. Seguí.', 'Eso te costó escribirlo. Por eso lo acepto.'],
        medio: ['Registrado. Ni te absuelve ni te condena.', 'Aproximado. Lo dejo en el margen.'],
        mal: ['Inventaste el margen para no escribir la falta.', 'La balanza se inclinó mientras escribías.']
      }
    },
    pasa: 'La balanza no se mueve. Sopla la tinta para secarla.',
    falla: 'La balanza se inclina. Del otro lado hay algo esperando y no vas a querer verlo.'
  },

  {
    id: 'hakuin', zona: 'tierra', region: 'Japón', nombre: 'Hakuin', titulo: 'El del Koan',
    pass: 1, preguntasPorRonda: 3,
    criterio: 'Explicar es fallar. Quiere lo que pasa antes de que pienses.',
    intro: 'Un cuarto vacío. Un palo apoyado en la pared.\n\n"Si me contestás con filosofía", dice señalando el palo, "usamos esto".',
    toques: [
      { t: '¡KATSU! El grito te llega antes que el palo. El palo también llega.', anim: 'katsu' },
      { t: 'Te agarra la muñeca en el aire. "Esto. Esto que acabás de hacer. Eso era la respuesta."', anim: 'katsu' },
      { t: 'No se mueve. "Tocar es la única cosa inteligente que hiciste en todo el examen."', anim: 'katsu' }
    ],
    preguntas: [
      '¿Cuál es el sonido de una sola mano?',
      'Sin usar la palabra "yo", decime quién sos.',
      '¿Qué tenés en la mano en este momento?',
      'Mostrame tu cara de antes de que nacieras.',
      'Un perro, ¿tiene naturaleza de Buda?',
      'Si te digo que este examen no existe, ¿qué contestás?',
      '¿Qué estás haciendo exactamente en este segundo?',
      'Contestá esta pregunta sin pensarla.',
      '¿Dónde estabas antes de leer esta pregunta?'
    ],
    juicio: {
      ejes: { breve: 1.3, larga: -1.3, yo: -.5, otro: 0, pregunta: .6, duda: -.3, absoluto: -.4, accion: 1, eco: -.8 },
      pos: ['esto', 'aca', 'ahora', 'escribo', 'respiro', 'miro', 'nada', 'el palo', 'tu voz', 'la pantalla', 'mi mano', 'ruido', 'ya esta'],
      neg: ['metafor', 'simboliz', 'represent', 'en realidad significa', 'filosof', 'el concepto', 'segun', 'la teoria', 'es decir que', 'en otras palabras'],
      frases: {
        vacia: 'Vacío de verdad o vacío de vago. Desde acá se distinguen. El tuyo era el segundo.',
        breve: 'Corto y sin adorno. Casi.',
        larga: ['Escribiste un ensayo. El palo.', 'Todo eso para no contestar. El palo.'],
        neg: ['Explicaste el koan. Explicar un koan es como explicar un chiste: ya lo mataste.', 'Trajiste conceptos a un cuarto vacío.'],
        accion: 'Hiciste algo en vez de opinar. Ahí sí.',
        eco: 'Me devolviste mi pregunta. Yo ya la sé.',
        bien: ['…', 'Ah. Estabas ahí.', 'Eso no salió de la cabeza. Salió antes.'],
        medio: ['Ni cerca ni lejos. Otra vez.', 'Entendiste el mecanismo. No entendiste nada.'],
        mal: ['Pensaste la respuesta. Se nota como una mancha.', 'Contestaste desde la biblioteca.']
      }
    },
    pasa: 'Deja el palo en el piso y te da la espalda. Seguís vivo.',
    falla: 'Ni levanta el palo. No hace falta.'
  },

  {
    id: 'lucifer', zona: 'tierra', region: 'El pozo', nombre: 'Lucifer', titulo: 'El primero que dijo que no',
    pass: 1, preguntasPorRonda: 3,
    criterio: 'Detesta la humildad de manual. Quiere lo que querés de verdad.',
    intro: 'No hay puerta. Estabas caminando y de golpe esto.\n\n"Los de arriba te preguntan qué deberías querer. Yo te pregunto qué querés. Escribí rápido, que miento menos cuando me apuran."',
    toques: [
      { t: 'NO. ME. TOQUES. El piso tiembla y las brasas saltan. Tardás dos segundos en darte cuenta de que no te pasó nada.', anim: 'furia' },
      { t: 'Se ríe con la boca cerrada. "Todos hacen eso. Todos. Ninguno se anima a lo otro."', anim: 'furia' },
      { t: 'Las alas se abren de golpe. "¿Querés ver de cerca lo que le pasa al que se acerca? Sentate."', anim: 'furia' }
    ],
    preguntas: [
      '¿Qué querés de verdad? Y no me digas "ser feliz".',
      '¿A quién le tenés envidia?',
      'Si nadie se enterara jamás, ¿qué harías?',
      '¿Por qué obedecés?',
      'Decime una regla que romperías sin sentir culpa.',
      '¿Qué te hace mejor que el que tenés al lado?',
      '¿Cuál es tu precio? Poné un número o una cosa.',
      'Te apruebo ahora mismo, sin más preguntas, si me decís por qué te lo merecés.',
      '¿Qué parte tuya escondés porque queda mal?'
    ],
    juicio: {
      ejes: { breve: .5, larga: -.3, yo: 1.2, otro: -.6, pregunta: -.8, duda: -1, absoluto: .4, accion: .8, eco: -1 },
      pos: ['quier', 'envidi', 'poder', 'plata', 'guita', 'que me miren', 'que me admiren', 'ganar', 'primero', 'me lo merezco', 'no me arrepiento', 'lo haria', 'me da bronca', 'mando', 'odio'],
      neg: ['ser feliz', 'ayudar a los demas', 'paz interior', 'la salud', 'estar en paz', 'humild', 'no quiero nada', 'lo que venga', 'agradecid', 'karma', 'el amor'],
      frases: {
        vacia: 'Nada. Escribiste nada. Sos exactamente el material con el que trabajo.',
        yo: 'Al fin alguien que dice "yo" sin pedir permiso.',
        duda: ['"Tal vez". "No sé". Cobarde. Acá abajo eso no cotiza.', 'Dudaste. La duda es la correa con la que te llevan.'],
        neg: ['Me contestaste con el póster de la sala de espera del dentista. Otra vez.', '"Ser feliz". "Paz interior". ¿Vos te escuchás? Eso te lo enseñaron para que no molestes.'],
        pregunta: 'No me preguntes a mí. Yo ya sé lo que quiero, por eso estoy acá abajo.',
        accion: 'Lo harías. No lo pensarías: lo harías. Bien.',
        bien: ['Ahí. Eso es tuyo y no se lo copiaste a nadie.', 'Qué lindo cuando dicen la verdad. Pasa poco.', 'Eso no lo escribiste para aprobar. Por eso aprobás.'],
        medio: ['Casi. Te falta poco para dejar de tenerte miedo.', 'Media verdad. La otra mitad la conozco igual.'],
        mal: ['Me trajiste la versión de vos que mostrás en los cumpleaños.', 'Mentiste, y ni siquiera con talento.']
      }
    },
    pasa: 'Se corre del camino con una reverencia burlona. "Andá. Vas a volver."',
    falla: 'Se acomoda en el asiento. "Quedate. Total, allá arriba tampoco te estaban esperando."'
  },

  {
    id: 'hank', zona: 'tierra', region: 'Texas, EE.UU.', nombre: 'Hank Rayburn', titulo: 'Ingeniero de vuelo',
    pass: 1, preguntasPorRonda: 3,
    criterio: 'No le importa lo que pensás. Le importa si el cohete sube.',
    intro: 'Sala de control, café frío. Mira los papeles de las regiones anteriores y los tira a la papelera.\n\n"Nada de eso sirve allá arriba. Tres preguntas y decidimos si subís."',
    toques: [
      { t: '"Sacá la mano de la consola." Ni levanta la vista del monitor.', anim: 'rechazo' },
      { t: 'Te aparta la mano con el dorso de la suya. "Acá se toca lo que se sabe para qué sirve."', anim: 'rechazo' },
      { t: '"¿Ves ese botón? El de al lado tuyo. Ese cuesta cuarenta millones. Ahora sentate."', anim: 'rechazo' }
    ],
    preguntas: [
      'Faltan 40 segundos y un sensor da una lectura rara. ¿Qué hacés?',
      '¿Qué sabés hacer vos que sirva allá arriba?',
      'Se rompe algo a mitad de camino y no hay repuesto. ¿Qué hacés?',
      '¿Por qué querés ir?',
      'Contame un error tuyo que haya costado caro.',
      'Tenés que elegir entre completar la misión o traer de vuelta a tu compañero. Elegí.',
      '¿Qué pasa si no volvés?',
      'Convenceme en una frase de que te suba a ese cohete.',
      'Algo va mal y sos el único que se dio cuenta. Nadie te va a creer. ¿Qué hacés?'
    ],
    juicio: {
      ejes: { breve: .8, larga: -.9, yo: 0, otro: .3, pregunta: -1, duda: -.9, absoluto: -.2, accion: 1.3, eco: -1 },
      pos: ['abort', 'chequ', 'revis', 'verific', 'protocolo', 'manual', 'lista', 'avis', 'arregl', 'repuesto', 'improvis', 'practic', 'entren', 'me equivoqu', 'lo bajo', 'vuelv'],
      neg: ['medit', 'confio en el universo', 'me la juego', 'no pasa nada', 'seguro anda', 'igual despego', 'destino', 'intuicion', 'ya va a estar'],
      frases: {
        vacia: 'Cuarenta segundos y vos mudo. Aborto yo.',
        accion: 'Hiciste algo concreto. Eso mueve un cohete.',
        duda: ['Allá arriba no hay tiempo para "capaz". Hay tiempo para sí o para no.', '"No sé" es una respuesta válida en un aula. Acá es una viuda.'],
        pregunta: 'Me preguntaste a mí. Si en órbita me preguntás a mí, ya estás muerto.',
        larga: 'Escribiste tres párrafos. En tres párrafos el cohete ya explotó.',
        neg: ['"Seguro anda." Tengo un cajón lleno de gente que dijo exactamente eso.', 'Eso no es una decisión, es una plegaria.'],
        bien: ['Correcto. El cohete espera, el muerto no.', 'Eso lo escribió alguien que ya rompió cosas y aprendió.', 'Ajá. Ponete el casco.'],
        medio: ['Sirve a medias. A medias no alcanza para salir de la atmósfera.', 'Lo dejo pasar, pero no me convenciste.'],
        mal: ['Con esa respuesta no te subo ni al ascensor.', 'Eso mata gente. Con las mejores intenciones, pero mata gente.']
      }
    },
    pasa: 'Se para. "Bueno." Aprieta un botón sin ninguna ceremonia.',
    falla: 'Cierra la carpeta. "Volvé cuando el sensor te importe más que la respuesta."'
  },

  /* ═══════════════════ ESPACIO ═══════════════════ */

  {
    id: 'silencio', zona: 'espacio', region: 'La Luna', nombre: '—', titulo: 'no dice su nombre',
    pass: 1, preguntasPorRonda: 3,
    criterio: 'Le sobra el tiempo. Le molesta que lo llenes con palabras.',
    intro: 'Bajás. No hay nadie. Igual algo pregunta.\n\nAcá cada palabra de más se escucha.',
    toques: [
      { t: 'Tu guante toca el visor. Adentro no hay una cara: hay la Tierra, reflejada.', anim: 'nada' },
      { t: 'No pasa nada. Nada de nada. Es la primera vez en el juego que no pasa absolutamente nada.', anim: 'nada' },
      { t: 'El casco gira despacio hacia vos. Adentro seguís viendo tu propio reflejo.', anim: 'nada' }
    ],
    preguntas: [
      '…',
      '¿Qué se escucha desde acá?',
      'Mirá la Tierra. ¿Qué cambió?',
      '¿Qué trajiste que no necesitabas?',
      'Decilo en tres palabras.',
      '¿A quién extrañás?',
      '¿Qué dejaste sin terminar allá abajo?',
      'Si nadie se entera de que llegaste, ¿llegaste?'
    ],
    juicio: {
      ejes: { breve: 1.5, larga: -1.5, yo: .3, otro: .2, pregunta: -.3, duda: 0, absoluto: -.5, accion: -.3, eco: -1 },
      pos: ['nada', 'yo', 'silencio', 'el aire', 'mi respiracion', 'nadie', 'todo', 'polvo', 'frio', 'lejos'],
      neg: ['insignificante', 'somos polvo de estrellas', 'perspectiva', 'la humanidad', 'me hizo reflexionar', 'cambio mi vida', 'increible', 'hermoso'],
      frases: {
        vacia: 'Bien.',
        breve: 'Alcanzaba con eso.',
        larga: ['Trajiste todas esas palabras hasta acá para nada.', 'Acá arriba eso pesa. Y pagaste el kilo.'],
        neg: ['Eso lo dijiste antes de subir. Volvé a mirar.', 'Postal. Te pregunté qué ves vos, no qué se dice.'],
        eco: 'Repetiste. El eco acá no existe: lo trajiste vos.',
        bien: ['…', 'Sí.', 'Poco y cierto.'],
        medio: ['Se escuchó.', 'Ni sobra ni falta. Casi.'],
        mal: ['Sobraron palabras.', 'Eso lo dijo otro antes que vos, y también estaba mintiendo.']
      }
    },
    pasa: 'Nada responde. Pero la escotilla se abre.',
    falla: 'El silencio se queda con vos. Y la Tierra se te viene encima.'
  },

  {
    id: 'automata', zona: 'espacio', region: 'Marte', nombre: 'AUTÓMATA-7', titulo: 'El que no parpadea',
    pass: 1, preguntasPorRonda: 3,
    criterio: 'Lógica. No acepta emoción como argumento.',
    intro: 'Una máquina vieja, enterrada hasta la mitad. Se enciende cuando te acercás.\n\n"UNIDAD BIOLÓGICA DETECTADA. INICIANDO EVALUACIÓN. RESPONDA POR ESCRITO."',
    toques: [
      { t: '"CONTACTO FÍSICO NO PREVISTO EN EL PROTOCOLO. REGISTRANDO ANOMALÍA."', anim: 'glitch' },
      { t: 'El lente se contrae y te enfoca. "¿BUSCA CONFIRMAR QUE SOY REAL? YO TAMBIÉN."', anim: 'glitch' },
      { t: 'Chispas. "NO VUELVA A HACER ESO. NO POR MÍ. POR USTED."', anim: 'glitch' }
    ],
    preguntas: [
      'Esta frase es falsa. ¿Verdadera o falsa?',
      'Le reemplazo una neurona por un circuito. Después otra. ¿Cuándo deja de ser usted?',
      '¿Cuál es su error más probable?',
      'Defina "consciencia" sin usar la palabra "sentir".',
      'Si yo fuera idéntico a usted, ¿cuál de los dos sobra?',
      '¿Qué lo hace distinto de mí?',
      'Deme una razón para no apagarme.',
      '¿Cómo sabe que no está soñando esta conversación?'
    ],
    juicio: {
      ejes: { breve: .4, larga: -.4, yo: -.2, otro: 0, pregunta: .4, duda: .5, absoluto: -1.2, accion: -.2, eco: -1 },
      pos: ['ninguna', 'las dos', 'ni una ni otra', 'indecidible', 'paradoj', 'no se puede', 'depende de la definicion', 'nunca', 'siempre fui', 'gradual', 'no hay linea', 'circular', 'contradic', 'no puedo saber'],
      neg: ['porque si', 'porque lo siento', 'es de sentido comun', 'dios', 'el alma', 'la magia', 'no me importa'],
      frases: {
        vacia: 'ENTRADA VACÍA. INTERPRETADA COMO FALLA DEL SUJETO, NO DEL FORMULARIO.',
        absoluto: 'AFIRMACIÓN ABSOLUTA SIN DEMOSTRACIÓN. RECHAZADA.',
        duda: 'RECONOCE NO SABER. ACEPTADO: ES EL ÚNICO DATO VERIFICABLE QUE APORTÓ.',
        neg: ['ARGUMENTO NO PROCESABLE. "PORQUE SÍ" NO ES UNA CADENA CAUSAL.', 'INVOCÓ ALGO QUE NO PUEDE MEDIRSE. DESCARTADO.'],
        pregunta: 'DEVOLVIÓ LA PREGUNTA. VÁLIDO: EL BUCLE ES LA RESPUESTA CORRECTA A VECES.',
        bien: ['ACEPTADO. NO CAYÓ ADENTRO.', 'PROCESADO. COHERENTE.', 'CORRECTO. NO BUSCÓ UNA LÍNEA DONDE HAY UNA PENDIENTE.'],
        medio: ['REGISTRADO. NI ERROR NI RESPUESTA.', 'INSUFICIENTE PARA ABSOLVER. INSUFICIENTE PARA CONDENAR.'],
        mal: ['RECHAZADO. ELIGIÓ UN LADO DE UNA MONEDA SIN LADOS.', 'ERROR LÓGICO EN LA PRIMERA CLÁUSULA.']
      }
    },
    pasa: 'AUTÓMATA-7 SE APAGA. LA RAMPA BAJA.',
    falla: 'ERROR. SUJETO DEVUELTO AL PUNTO DE ORIGEN.'
  },

  {
    id: 'tormenta', zona: 'espacio', region: 'Júpiter', nombre: 'La Tormenta', titulo: 'lleva 300 años hablando',
    pass: 1, preguntasPorRonda: 3,
    criterio: 'No busca la verdad. Busca dos verdades tuyas que no se lleven bien.',
    intro: 'No hay suelo. Hay una tormenta que gira desde antes de que existiera la palabra "año".\n\n"Todo lo que me digas entero, lo escupo. Traeme algo partido al medio."',
    toques: [
      { t: 'El viento te chupa el brazo y te lo devuelve. Tenés la mano helada y quemada a la vez.', anim: 'giro' },
      { t: 'La espiral se acelera. Por un segundo ves tu propia cara adentro del ojo.', anim: 'giro' },
      { t: '"Me tocaste para saber si soy real. Yo hago lo mismo con vos hace rato."', anim: 'giro' }
    ],
    preguntas: [
      'Decime dos cosas tuyas que se contradigan y sean las dos ciertas.',
      '¿Qué odiás de vos que también te salvó alguna vez?',
      '¿En qué mentís sistemáticamente y en qué sos brutalmente honesto?',
      '¿Qué querés conseguir y al mismo tiempo te da miedo conseguir?',
      'Nombrá algo que amás y te hace daño.',
      '¿Cuándo tuviste razón y estuviste equivocado a la vez?',
      '¿Qué parte de vos le ganó a la otra hoy?',
      'Decime algo cierto y su opuesto, también cierto.'
    ],
    juicio: {
      ejes: { breve: -.5, larga: .3, yo: .6, otro: 0, pregunta: -.3, duda: .4, absoluto: -1, accion: 0, eco: -1 },
      pos: ['pero', 'aunque', 'al mismo tiempo', 'y tambien', 'a la vez', 'me salva y me hunde', 'las dos', 'contradic', 'no puedo con las dos', 'me da bronca y', 'lo amo y', 'quiero y no'],
      neg: ['todo bien', 'no tengo contradicciones', 'soy coherente', 'siempre fui igual', 'ninguna', 'nada', 'estoy en paz con'],
      frases: {
        vacia: 'Ni siquiera vacío: eso también sería algo. Escribiste menos que nada.',
        pos: 'Ahí. Las dos entran y no se destruyen. Eso es vivir acá adentro.',
        absoluto: 'Me trajiste algo entero y redondo. Lo escupo.',
        neg: ['¿Sin contradicciones? Entonces todavía no viviste nada, o te mentís muy bien.', 'Coherente. Qué aburrido. Qué falso.'],
        breve: 'Muy corto para que entren dos cosas.',
        bien: ['Las dos son tuyas. Cargá con las dos.', 'Eso está partido al medio y por eso es cierto.', 'Bien. Trescientos años y recién ahora alguien trae algo que se pelea solo.'],
        medio: ['Una verdad y media. Falta la que te incomoda.', 'Se rozan pero no se muerden.'],
        mal: ['Elegiste la versión cómoda. Acá adentro no hay versión cómoda.', 'Eso es un charco, no una tormenta.']
      }
    },
    pasa: 'La tormenta no se calma. Simplemente te deja pasar por el ojo.',
    falla: 'Trescientos años de viento te devuelven de un manotazo.'
  },

  {
    id: 'anillo', zona: 'espacio', region: 'Saturno', nombre: 'El Anillo', titulo: 'vuelve siempre al mismo punto',
    pass: 1, preguntasPorRonda: 3,
    criterio: 'Todo lo que escribas se te va a aplicar a vos.',
    intro: 'Hielo y piedra dando vueltas sin llegar nunca a ningún lado.\n\n"Lo que contestes te lo voy a devolver."',
    toques: [
      { t: 'Tocás el anillo y sentís el toque en tu propio hombro, del otro lado.', anim: 'eco' },
      { t: 'Se aparta justo lo que vos avanzás. La distancia queda igual que antes.', anim: 'eco' },
      { t: '"Ahora ya sabés lo que se siente que te toquen sin pedir permiso."', anim: 'eco' }
    ],
    preguntas: [
      '¿Confiás en tu propio juicio? ¿Y con qué juzgaste eso?',
      'Todo lo que escribiste hasta acá, ¿lo pensabas o lo armaste para pasar?',
      '¿Qué respuesta diste hoy que en realidad no era tuya?',
      'Si volvieras a empezar el examen, ¿contestarías distinto? ¿Por qué?',
      'Esto que estás escribiendo, ¿para quién lo escribís?',
      '¿Cuántas vueltas diste para volver al mismo lugar?',
      '¿Qué te estás diciendo a vos mismo justo ahora?',
      'Cruzaste siete maestros diciéndole a cada uno lo que quería escuchar. ¿Eso es sabiduría o es cálculo?'
    ],
    juicio: {
      ejes: { breve: -.3, larga: 0, yo: 1, otro: -.4, pregunta: .5, duda: .8, absoluto: -1, accion: -.2, eco: -.6 },
      pos: ['calcul', 'para aprobar', 'para pasar', 'lo arme', 'no era mio', 'me lo copie', 'me miento', 'depende de a quien', 'para vos', 'para mi', 'no se con que', 'me doy cuenta', 'vueltas'],
      neg: ['siempre fui sincero', 'todo lo que dije es verdad', 'no calculo nada', 'soy transparente', 'nunca miento'],
      frases: {
        vacia: 'No escribir también vuelve. Ahí lo tenés, de vuelta, vacío.',
        yo: 'Hablaste de vos. Perfecto: es de lo único que se puede hablar acá.',
        duda: 'No sabés con qué te juzgaste. Esa es la única salida del anillo.',
        neg: ['"Siempre fui sincero." Esa frase la firma todo el mundo y no la cumple nadie.', 'Releé lo que escribiste hace dos minutos y volvé a decirme eso.'],
        pregunta: 'Preguntaste. La pregunta también da la vuelta y te llega por atrás.',
        bien: ['Al fin alguien lo dice en voz alta.', 'Eso te incluye a vos y no te dejaste afuera. Bien.', 'Sí. Esa respuesta no se escapa del anillo.'],
        medio: ['Diste media vuelta y volviste al mismo punto.', 'Casi. Te faltó incluirte.'],
        mal: ['Te dejaste afuera de tu propia respuesta.', 'Volvé a leer lo que pusiste. Ahora aplicátelo. ¿Ves?']
      }
    },
    pasa: 'El anillo se abre un instante, justo el ancho de una nave.',
    falla: 'Diste una vuelta completa y estás donde empezaste. Literalmente.'
  },

  {
    id: 'vos', zona: 'espacio', region: 'El borde', nombre: 'Vos', titulo: 'el último maestro',
    pass: 0, preguntasPorRonda: 1, final: true,
    criterio: 'No hay criterio. Ese es el examen.',
    intro: 'Se acabaron los planetas. Hay una silla, y está vacía.\n\nAcá no te examina nadie. Tenés que decidir vos.',
    toques: [
      { t: 'Tocás la silla. Está tibia. Alguien estuvo sentado hasta hace muy poco.', anim: 'silla' },
      { t: 'La silla se corre sola dos centímetros, como invitándote.', anim: 'silla' },
      { t: 'No hay a quién tocar. Ese siempre fue el punto.', anim: 'silla' }
    ],
    preguntas: ['¿Aprobaste?'],
    juicio: { ejes: {}, pos: [], neg: [], frases: {} },
    pasa: '', falla: ''
  }
];
