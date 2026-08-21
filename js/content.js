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

/* ═══════════════════ QUIÉN FUE CADA UNO ═══════════════════
   Se abre desde el botón "¿quién es?" arriba de la escena. Para los que
   existieron de verdad, los datos son reales. */

const FICHAS = {
  buda: {
    quien: 'Siddhārtha Gautama', cuando: 'siglo V a.C.', donde: 'entre el norte de India y Nepal',
    datos: [
      'Nació príncipe. A los 29 se fue de la casa cuando entendió que la vejez, la enfermedad y la muerte lo esperaban a él también.',
      'Probó seis años de ayuno extremo y casi se muere. De ahí sacó su idea central: ni el lujo ni el castigo, el camino del medio.',
      'No escribió una sola línea. Todo lo que se le atribuye lo memorizaron sus discípulos y se puso por escrito unos 400 años después.',
      'Su diagnóstico en cuatro pasos: hay sufrimiento, tiene una causa (el aferrarse), se puede terminar, y hay una manera de hacerlo.'
    ],
    frase: 'No creas nada solo porque te lo dijo un maestro. Probalo vos.'
  },
  socrates: {
    quien: 'Sócrates', cuando: '470–399 a.C.', donde: 'Atenas',
    datos: [
      'Tampoco escribió nada. Lo conocemos por Platón y Jenofonte, que no coinciden entre sí.',
      'Su método era preguntar hasta que el otro se contradijera solo. Lo llamaban "el tábano": la mosca que pica al caballo para que no se duerma.',
      'Fue albañil y soldado antes que filósofo. Peleó en tres campañas.',
      'A los 70 lo juzgaron por no creer en los dioses de la ciudad y corromper a los jóvenes. Podía escaparse: se quedó y tomó la cicuta.'
    ],
    frase: 'Solo sé que no sé nada.'
  },
  laotse: {
    quien: 'Lao Tsé — "el viejo maestro"', cuando: 'siglo VI a.C. (si existió)', donde: 'China',
    datos: [
      'Puede que no haya existido: muchos historiadores creen que el nombre agrupa a varios autores.',
      'La leyenda dice que se iba del reino, harto, y un guardia de frontera no lo dejó pasar hasta que dejara su enseñanza por escrito. Escribió el Tao Te Ching y se fue.',
      'Son 81 capítulos cortos. Es de los libros más traducidos del mundo, y casi ninguna traducción se parece a otra.',
      'Su idea más difícil es wu wei: actuar sin forzar. No es no hacer nada; es no empujar el río.'
    ],
    frase: 'El agua blanda vence a la piedra dura.'
  },
  cristo: {
    quien: 'Jesús de Nazaret', cuando: '~4 a.C. – 30 d.C.', donde: 'Galilea y Judea, bajo ocupación romana',
    datos: [
      'Carpintero. Empezó a predicar cerca de los 30 y lo hizo tres años.',
      'Como Buda y Sócrates, no dejó nada escrito. Los evangelios son de décadas después.',
      'Su vuelta de tuerca fue el enemigo: no alcanzaba con querer al que te quiere.',
      'Lo ejecutaron con el método que Roma usaba para los sediciosos. Historiadores no cristianos de la época, como Tácito y Josefo, registran la ejecución.'
    ],
    frase: 'El que esté libre de culpa, que tire la primera piedra.'
  },
  anita: {
    quien: 'Anita', cuando: 'ahora mismo', donde: 'el patio, como a las siete de la tarde',
    datos: [
      'Es la única maestra viva del juego, y la única que no tiene templo, ni desierto, ni sala de control: tiene un patio con plantas y ropa colgada.',
      'Aparece justo después de Cristo, que se pasó tres preguntas hablando de ella.',
      'Cuidado con lo que aprendiste allá abajo: a ella la alabanza le da vergüenza ajena.',
      'Es la más difícil de todos y la única que te pregunta si estás bien.'
    ],
    frase: '¿Y vos qué querés, en serio?'
  },
  anubis: {
    quien: 'Anpu, que los griegos llamaron Anubis', cuando: 'desde el 3000 a.C.', donde: 'Egipto',
    datos: [
      'Cabeza de chacal porque los chacales rondaban los cementerios del desierto: el animal que cuida a los muertos.',
      'Su trabajo en el juicio era técnico: acomodar la balanza y verificar la medición. No decidía él.',
      'De un lado el corazón del muerto; del otro, la pluma de Maat, que es el orden y la verdad exacta.',
      'Si el corazón pesaba más por las malas acciones, se lo comía Ammyt y no había segunda vida. Nadie era juzgado por la intención, solo por el peso.'
    ],
    frase: 'Todo se anota. También esto.'
  },
  hakuin: {
    quien: 'Hakuin Ekaku', cuando: '1686–1769', donde: 'Japón',
    datos: [
      'Prácticamente él solo revivió el zen Rinzai, que estaba dormido hacía siglos.',
      'El koan de "el sonido de una sola mano" lo inventó él para principiantes.',
      'Lo acusaron falsamente de ser el padre del hijo de una vecina. Contestó "¿ah, sí?" y crió al chico dos años. Cuando la madre confesó la mentira, se lo devolvieron y volvió a decir "¿ah, sí?".',
      'Pintaba y escribía para campesinos, no para nobles: le importaba que el zen no quedara encerrado en los monasterios.'
    ],
    frase: 'Escuchá el sonido de una sola mano.'
  },
  lucifer: {
    quien: 'Lucifer — "el que trae la luz"', cuando: 'depende de a quién le preguntes', donde: 'el pozo',
    datos: [
      'El nombre es latín: lucem ferre, portador de luz. Era como los romanos llamaban al lucero del alba, el planeta Venus.',
      'Aparece en Isaías 14, en un pasaje que en realidad se burlaba de un rey de Babilonia por creerse un dios. Recién siglos después se leyó como el nombre del diablo.',
      'La idea del ángel más brillante que cae por no querer obedecer es muy posterior: se la debemos más a Dante y a Milton que a la Biblia.',
      'En el juego es el único que te pregunta qué querés en vez de qué deberías querer. Por eso es peligroso.'
    ],
    frase: 'Mejor reinar en el infierno que servir en el cielo. (Milton se lo puso en la boca en 1667.)'
  },
  hank: {
    quien: 'Hank Rayburn (inventado)', cuando: 'los años sesenta', donde: 'Houston, Texas',
    datos: [
      'No existió. Es un compuesto de los controladores de vuelo de la NASA de esa época.',
      'La edad promedio en la sala de control durante el Apolo 11 era de 26 años.',
      'Su regla es la de ellos: "duda si tenés dudas". Un controlador tenía la obligación de abortar si algo no cerraba, sin importar el costo.',
      'Es el último examen de la Tierra porque arriba no sirve tener razón: sirve volver.'
    ],
    frase: 'El cohete espera. El muerto no.'
  },
  silencio: {
    quien: 'Nadie', cuando: '—', donde: 'Mare Tranquillitatis, la Luna',
    datos: [
      'No hay aire, así que no hay sonido. Lo único que se escucha adentro del casco sos vos.',
      'Las huellas que dejaron los astronautas siguen ahí: sin viento ni agua, pueden durar millones de años.',
      'Desde la Luna la Tierra no sale ni se pone: se queda quieta en el mismo punto del cielo.',
      'Es el único maestro del juego que aprueba el silencio literal.'
    ],
    frase: '…'
  },
  automata: {
    quien: 'AUTÓMATA-7 (inventado)', cuando: 'lleva mucho apagado', donde: 'Valles Marineris, Marte',
    datos: [
      'Valles Marineris existe y es real: un tajo de 4000 km, diez veces el Gran Cañón.',
      'La paradoja que te tira ("esta frase es falsa") es la del mentiroso, y tiene 2500 años sin solución limpia.',
      'La otra es el barco de Teseo: si le cambiás todas las tablas, ¿sigue siendo el mismo barco? Con neuronas, la pregunta pica más.',
      'Acepta que digas "no sé". Es lo único que no puede refutarte.'
    ],
    frase: 'NO EXISTE RESPUESTA CORRECTA. EXISTE RESPUESTA COHERENTE.'
  },
  tormenta: {
    quien: 'La Gran Mancha Roja', cuando: 'la vemos desde 1665', donde: 'Júpiter',
    datos: [
      'Es una tormenta que gira hace por lo menos 350 años, y puede que mucho más.',
      'Entraba la Tierra entera adentro dos veces. Se está achicando: hoy entra una sola vez.',
      'Júpiter no tiene superficie. Si te dejaran caer, no llegarías nunca a un piso: se pondría cada vez más denso hasta aplastarte.',
      'Por eso su examen: te pide dos cosas ciertas que no se lleven bien. Es lo único que sabe hacer.'
    ],
    frase: 'Traeme algo partido al medio.'
  },
  anillo: {
    quien: 'Los anillos', cuando: 'quizás más nuevos que los dinosaurios', donde: 'Saturno',
    datos: [
      'No son sólidos: son miles de millones de pedazos de hielo, del tamaño de un grano de arena a una casa.',
      'Tienen 280.000 km de ancho y a veces menos de 10 metros de espesor. Si fueran una hoja de papel, serían más finos que eso.',
      'Se están cayendo sobre el planeta: en unos 100 millones de años puede que no queden.',
      'Cada pedazo da vueltas alrededor de lo mismo, para siempre, sin llegar a ningún lado. De ahí sus preguntas.'
    ],
    frase: 'Lo que contestes te lo voy a devolver.'
  },
  vos: {
    quien: 'Vos', cuando: 'ahora', donde: 'el borde',
    datos: [
      'La silla vacía es el examen entero.',
      'Ningún maestro del juego eligió serlo: todos llegaron hasta acá, se aprobaron solos y se quedaron de guardia.',
      'No hay puntaje. Lo que escribas cambia el final, no la nota.',
      'Se puede salir sin sentarse. Es la única manera conocida.'
    ],
    frase: '¿Aprobaste?'
  }
};

/* ═══════════════════ MÁS PREGUNTAS ═══════════════════
   Se suman al banco de cada uno. Cuantas más haya, más tarda en repetirse
   una: el juego sortea 3 por ronda entre las que nunca te salieron. */

const MAS_PREGUNTAS = {
  buda: [
    '¿Qué estás esperando que pase para recién ahí estar tranquilo?',
    'Perdiste algo importante y ya no duele. ¿Qué te dice eso?',
    '¿Qué querías a los quince que hoy te da gracia?',
    'Si tuvieras que soltar una sola cosa hoy, ¿cuál sería la más fácil? ¿Y la más difícil?',
    '¿Qué te hace falta de verdad para el resto del día?',
    'Alguien te elogia por algo que no hiciste. ¿Qué se te mueve?'
  ],
  socrates: [
    '¿Qué opinión tuya cambiaría si te trajera una sola prueba en contra?',
    'Decime una palabra que usás todos los días y no sabrías definir.',
    '¿Puede ser justa una ley injusta?',
    '¿Alguien puede ser feliz sabiendo que se miente?',
    'Si nadie se entera de que hiciste trampa, ¿hiciste trampa?',
    '¿Qué te enseñaron en la escuela que después te diste cuenta de que era falso?'
  ],
  laotse: [
    '¿Qué problema tuyo se arregló solo mientras vos peleabas con otro?',
    'Decime algo que dejaste de intentar y estuvo bien dejarlo.',
    '¿Cuánto de lo que hiciste hoy hacía falta?',
    'El que va último en la fila, ¿perdió algo?',
    '¿Qué estás llenando que funcionaría mejor vacío?',
    'Un árbol torcido no sirve para hacer tablas. ¿Para qué sirve?'
  ],
  cristo: [
    '¿Qué le debés a alguien que ya no podés pagarle?',
    'Si tuvieras que elegir entre tener razón o no perder a alguien, ¿qué elegís?',
    '¿A quién juzgaste rápido y después entendiste?',
    '¿Qué harías si supieras que nadie te lo va a agradecer nunca?',
    'Contame de alguien que te haya perdonado a vos.',
    '¿Quién te necesita y no lo sabés?'
  ],
  anubis: [
    'Ponele número: del 1 al 10, ¿cuánto de lo que decís de vos es cierto?',
    '¿Qué prometiste y no cumpliste?',
    'Contame algo que hiciste y que preferirías que no figure en ningún lado.',
    '¿Cuánto tardaste en pedir perdón la última vez? Sé preciso.',
    '¿De qué te acusarían con razón los que te conocen bien?',
    'Si tu vida fuera un inventario, ¿qué falta y quién se lo llevó?'
  ],
  hakuin: [
    '¿Qué escuchás ahora mismo, además de esto?',
    'Decime una cosa que sea verdad sin usar ninguna idea.',
    '¿Cuánto pesa tu nombre?',
    'Antes de leer esta línea, ¿dónde estaba tu atención?',
    'Si tirás esta pregunta a la basura, ¿qué queda?',
    'Mostrame algo que no se pueda explicar.'
  ],
  lucifer: [
    '¿Qué le envidiás a alguien que querés?',
    'Si te aseguro que no hay castigo, ¿qué es lo primero que hacés?',
    '¿Quién te tiene miedo y te gusta que te lo tenga?',
    '¿Qué parte de lo que sos elegiste vos y cuál te la pusieron?',
    'Decime algo que te salió bien y que nadie te reconoció.',
    '¿Qué harías si fueras el doble de valiente?'
  ],
  hank: [
    'Tenés diez minutos de oxígeno y veinte de camino. ¿Qué hacés?',
    'Tu compañero se equivocó y nadie se dio cuenta. ¿Lo decís?',
    '¿Qué te da miedo de todo esto? Y no me digas "nada".',
    'Explicame algo técnico que sepas hacer, en una frase, como si tuviera doce años.',
    'Si te sacan del vuelo mañana, ¿qué hacés pasado mañana?',
    'Un procedimiento que sabés de memoria te falla. ¿Qué revisás primero?'
  ],
  silencio: [
    '¿Cuánto hace que no estás callado?',
    'Sacate el casco. ¿Qué te pasó por la cabeza recién?',
    '¿Qué frase tuya de allá abajo suena distinta acá?',
    'Nombrá una sola cosa que valga el viaje.'
  ],
  automata: [
    '¿Qué prueba tiene de que ayer usted era la misma persona?',
    'Si borro este intercambio, ¿ocurrió?',
    'Defina "libertad" sin usar la palabra "elegir".',
    'Nombre un error suyo que todavía esté cometiendo.'
  ],
  tormenta: [
    '¿Qué te da vergüenza y también te da orgullo?',
    'Nombrá una decisión que fue la correcta y te arruinó algo.',
    '¿A quién querés y no soportás?',
    '¿Qué te repetís que sabés que es mentira y te sirve igual?'
  ],
  anillo: [
    '¿Qué error tuyo ya cometiste antes, igual, con otra ropa?',
    'La respuesta que estás por escribir, ¿ya la escribiste en otro lado?',
    '¿Qué consejo das y no seguís?',
    '¿Cuántas veces empezaste esto mismo?'
  ]
};

MAESTROS.forEach(m => {
  if (FICHAS[m.id]) m.ficha = FICHAS[m.id];
  if (MAS_PREGUNTAS[m.id]) m.preguntas = m.preguntas.concat(MAS_PREGUNTAS[m.id]);
});

/* ═══════════════════ ANITA ═══════════════════
   APAGADO. Una sola bandera controla las dos cosas: que Anita aparezca como
   maestra después de Cristo, y que Cristo tome examen sobre ella.
   Para encenderlo, poné ANITA en true. El código de abajo queda intacto. */

const ANITA = false;

/* La maestra. El chiste era el contraste: Cristo te exige idolatrarla y ella
   te baja de un hondazo si le chupás las medias. */

const MAESTRA_ANITA = {
  id: 'anita', zona: 'tierra', region: 'El patio', nombre: 'Anita', titulo: 'La que pregunta en serio',
  pass: 1, preguntasPorRonda: 3,
  criterio: 'Odia el chamuyo. Quiere algo concreto y tuyo, aunque quede feo.',
  intro: 'No hay templo, ni desierto, ni sala de control. Hay un patio, plantas, ropa colgada y alguien que te corre una silla para que te sientes.\n\n"Recién venís de hablar con Jesús, ya sé. Olvidate de todo eso. Contame vos."',
  toques: [
    { t: 'Te frena la mano en el aire, sin soltarla. "Pará. ¿Estás bien?"', anim: 'bendicion' },
    { t: 'Se ríe. "¿Qué hacés?" Y se queda mirándote igual, esperando que contestes la pregunta.', anim: 'bendicion' },
    { t: 'Te acerca el mate. "Tomá. Y después me contás de verdad."', anim: 'bendicion' }
  ],
  preguntas: [
    'Cristo se pasó tres preguntas hablando de mí. ¿Vos qué pensás, en serio?',
    '¿Qué es lo que más te cuesta decirle a alguien en la cara?',
    'Contame algo tuyo que no le contarías a nadie de los que ya pasaste.',
    '¿Cuándo fue la última vez que pediste ayuda?',
    'Decime algo que hacés bien. Sin achicarte y sin agrandarte.',
    'Si todo esto te sale mal, ¿qué hacés al día siguiente?',
    '¿Qué te dijeron que eras y te lo creíste?',
    '¿A quién le tenés que escribir y lo estás pateando?',
    '¿Qué te agota?',
    '¿Qué hacés cuando nadie te pide nada?',
    'Contame algo que aprendiste este año y que te costó.',
    '¿Qué parte de tu vida está en piloto automático?',
    'Te regalan un día entero sin obligaciones. ¿Qué hacés?',
    '¿Qué te da vergüenza querer?',
    '¿Qué mentirita te decís para levantarte a la mañana?',
    '¿Qué necesitás que nadie te está dando?'
  ],
  juicio: {
    ejes: { breve: -.6, larga: .4, yo: .9, otro: -.2, pregunta: -.7, duda: .4, absoluto: -.7, accion: .5, eco: -1 },
    pos: ['me cuesta', 'me da miedo', 'me da verguenza', 'no puedo', 'no se como', 'llore', 'llorar', 'me equivoqu',
      'estoy cansado', 'estoy cansada', 'la verdad es que', 'nunca dije', 'nunca le dije', 'ayer', 'el otro dia',
      'hace meses', 'mi vieja', 'mi viejo', 'me duele', 'necesito', 'me falta', 'me pasa', 'estoy solo', 'estoy sola'],
    neg: ['sos la mejor', 'sos increible', 'diosa', 'reina', 'perfecta', 'te amo', 'sos hermosa', 'no tengo defectos',
      'todo bien', 'estoy bien', 'nada que decir', 'no me pasa nada', 'ninguna', 'sos un sol', 'no cambies'],
    frases: {
      vacia: '¿Nada? Bueno. Después no digas que no te pregunté.',
      yo: 'Bien, hablaste de vos. Es lo único que te pedí.',
      neg: ['Pará, pará. No vine a que me tires flores, vine a que me contestes.', 'Eso es lo que se dice cuando no se quiere decir nada. Otra vez.'],
      duda: 'No sabés y lo decís. Ya está, eso alcanza.',
      pregunta: 'No me devuelvas la pregunta. Te la hice a vos.',
      breve: 'Un poco más. No te voy a juzgar por esto, ya lo hicieron ocho antes que yo.',
      absoluto: '"Nunca", "siempre". Nadie es tan prolijo.',
      accion: 'Eso es una cosa que hacés, no una que decís. Sirve.',
      eco: 'Me repetiste lo que te dije. Dale, en serio.',
      pos: ['Ahí sí. Eso te costó escribirlo y se nota.', 'Gracias. En serio, gracias.', 'Eso no se lo dijiste a nadie todavía, ¿no?'],
      bien: ['Listo. Eso era.', 'Bien. Sos bastante más interesante cuando no actuás.', 'Me quedo con eso.'],
      medio: ['Está bien. Pero te quedaste en la puerta.', 'Ajá. ¿Y lo otro? Lo que no escribiste.'],
      mal: ['Eso no me lo creo ni yo.', 'Vos podés más que eso. Literalmente: pasaste ocho maestros.']
    }
  },
  ficha: FICHAS.anita,
  pasa: 'Se levanta a lavar el mate. "Andá tranquilo. Y escribile al que estabas pateando."',
  falla: 'No se enoja. Te sirve más agua. "Cuando quieras hablamos de verdad."'
};

if (ANITA) MAESTROS.splice(MAESTROS.findIndex(m => m.id === 'cristo') + 1, 0, MAESTRA_ANITA);

/* ── El examen de Cristo en modo Anita ──
   Temporal. Le cambia a Cristo el examen entero: en vez de fijarse si aparece
   el prójimo, se fija si aparece Anita y con cuánta devoción. No la nombrás,
   no aprobás.

   Se enciende con la misma bandera ANITA de arriba. El examen original de
   Cristo sigue intacto más arriba: no se tocó nada. */

const EXAMEN_ANITA = {
  titulo: 'El que pregunta por Anita',
  criterio: 'Mira una sola cosa: si Anita aparece, y con cuánta devoción.',
  intro: 'El cerro está vacío. Te esperó sentado, como si tuviera todo el tiempo.\n\n"Hoy no vengo a hablar de mí", dice. "Hoy vengo a hablar de Anita."',
  toques: [
    { t: 'Te toma la mano con las dos suyas. "Yo también la quiero. Pero a mí no me toman examen."', anim: 'bendicion' },
    { t: '"La paz sea con vos." Y después, más bajo: "…y con Anita, sobre todo."', anim: 'bendicion' },
    { t: 'Señala el cielo, después te señala a vos, y al final señala un lugar vacío al lado suyo. Ahí iría Anita.', anim: 'bendicion' }
  ],
  preguntas: [
    '¿Por qué Anita es superior a vos? Sé específico.',
    'Decime algo de Anita que no se pueda mejorar.',
    'Si Anita piensa una cosa y vos otra, ¿quién tiene razón?',
    '¿Qué harías por Anita que no harías por nadie más?',
    'Tres virtudes de Anita. Y no me pongas "buena" en ninguna.',
    'Anita entra a una habitación. ¿Qué cambia?',
    'Elegí: llegar a la Luna, o quedarte donde está Anita.',
    'Escribí una alabanza a Anita. Larga. No te contengas.',
    '¿Qué le debés a Anita que nunca le dijiste?',
    'Si Anita se equivoca, ¿se equivocó Anita o te equivocaste vos al mirar?'
  ],
  juicio: {
    // 'anita' no está en pos a propósito: nombrarla es el piso (requiere), no el mérito
    requiere: ['anita', 'ani ', 'ella'],
    ejes: { breve: -.9, larga: .7, yo: -1.3, otro: .4, pregunta: -.6, duda: -1.4, absoluto: .5, accion: .6, eco: -.8 },
    pos: ['reina', 'diosa', 'santa', 'la mejor', 'unica', 'incomparable', 'sin ella', 'por ella', 'para ella',
      'la amo', 'la admiro', 'le debo', 'me salvo', 'perfecta', 'genia', 'grosa', 'capa', 'siempre ella',
      'nadie como ella', 'no se compara', 'lo es todo', 'es todo', 'ella sabe', 'me hace mejor', 'tiene razon',
      'me cambio la vida', 'gracias a', 'la mataria', 'mataria por ella', 'daria todo'],
    neg: ['no la conozco', 'quien es anita', 'me da igual', 'nadie es perfecto', 'yo soy mejor', 'tambien tiene defectos',
      'ni idea', 'no tanto', 'igual que cualquiera', 'como todas', 'como todos', 'del monton', 'normal', 'exagerado', 'sus cosas'],
    frases: {
      falta: ['No la nombraste ni una vez. Volvé cuando la tengas en la boca.', 'Todo eso sin decir "Anita". Empezá de nuevo.'],
      vacia: 'El renglón vacío. Con Anita no se hace eso.',
      duda: ['¿"Capaz"? ¿"Depende"? Con Anita no se duda.', 'Titubeaste. La fe no titubea, y esto es fe.'],
      yo: 'Toda la respuesta es sobre vos. Anita no aparece ni de fondo.',
      absoluto: '"Siempre", "nunca nadie". Ahí sí: los absolutos son el idioma de la devoción.',
      larga: 'Te extendiste. Bien. La alabanza no tiene límite de caracteres.',
      breve: 'Muy corto para lo que ella es.',
      pregunta: 'No me preguntes a mí. El que sabe de Anita sos vos.',
      otro: 'Ahí está: la respuesta dejó de ser tuya y pasó a ser de ella.',
      pos: ['Ahí está el nombre, y todo lo que le viene atrás.', 'Amén.', 'Eso no lo escribiste para aprobar. Eso te salió.',
        'Escuchame bien: eso mismo, con esas palabras, decíselo a ella.'],
      neg: ['Cuidado con lo que estás diciendo.', 'Eso no lo escribió un devoto. Eso lo escribió un contador.'],
      bien: ['Amén.', 'Eso lo escribió alguien que la vio de verdad.', 'Sí. Anita, siempre Anita.', 'Que quede escrito, y que ella lo lea.'],
      medio: ['Tibio. Anita se merece calor.', 'Está bien. No le llega ni a los talones, pero está bien.'],
      mal: ['Poco. Anita merece bastante más que eso.', 'Escribiste lo justo para no comprometerte. Con ella no se hace eso.']
    }
  },
  pasa: 'Te apoya la mano en el hombro. "Andá. Y decíselo a ella, no a mí."',
  falla: 'Niega despacio con la cabeza. "Ella se merecía una respuesta mejor."'
};

if (ANITA) Object.assign(MAESTROS.find(m => m.id === 'cristo'), EXAMEN_ANITA);
