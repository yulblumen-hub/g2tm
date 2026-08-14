# G2tM — Get to the Moon

Un examen escrito. En cada región hay un maestro dibujado en su propio escenario: Buda abajo de la higuera, Sócrates en el ágora, Lucifer en el pozo, Anubis con la balanza, Hank en la sala de control. Te hacen tres preguntas y **las contestás escribiendo**. No hay opciones.

Cada maestro juzga distinto. Lo que a Buda le suma —soltar, no ponerte en el centro, contestar corto— a Lucifer le da asco: él quiere que digas lo que querés de verdad. Sócrates premia que dudes; Hank te baja del cohete si dudás.

**Tocá al maestro.** Buda no se inmuta, Cristo te da la paz, Lucifer se enfurece y tiembla la pantalla, Hakuin te pega con el palo, el Anillo te devuelve el toque a vos. Ninguno reacciona igual.

Aprobás las ocho regiones de la Tierra y despega el cohete: ahí cambia el formato y los maestros dejan de tener cara. Si pifiás, caés a la Tierra y te llevás una **figura** encima. Las preguntas no se repiten hasta agotar el banco de cada maestro.

## Cómo juzga (esto no es IA)

No hay modelo de lenguaje ni servidor: hay un **analizador de reglas** en `js/juez.js`. De lo que escribís saca señales —cuántas palabras usaste, cuánto hablás de vos, si aparece otra persona, si dudás, si preguntás, si usás absolutos, si repetís la pregunta, qué vocabulario elegiste— y cada maestro pondera esas señales a su gusto en su bloque `juicio`.

Acierta bastante y falla a veces: no *entiende* la respuesta, la mide. Es el precio de que el juego no cueste un peso ni dependa de nadie.

## En el celular

Desde el navegador: *Compartir → Agregar a inicio* (iPhone) o *Instalar app* (Android). Queda con su ícono, abre a pantalla completa y **funciona sin internet**.

> Si cambiás cualquier archivo del juego, subí el número de `CACHE` en `sw.js`. Si no, los celulares que ya la tienen instalada siguen abriendo la versión vieja.

## Cómo está hecho

HTML + CSS + JS a mano. Sin dependencias, sin build, sin backend, sin costo. El progreso y las preguntas ya vistas se guardan en `localStorage`.

- `js/art.js` — los 13 retratos y los 13 escenarios, SVG dibujado a mano.
- `js/juez.js` — el analizador que lee lo que escribís.
- `js/content.js` — el elenco: preguntas, léxico, reacciones al toque, frases de cada maestro.
- `js/game.js` — el motor: mapa, escena, rondas sin repetición, veredictos, caídas, lanzamiento.
- `css/styles.css` — dos temas (Tierra y espacio) y una animación de reacción por maestro.
- `sw.js` + `manifest.webmanifest` — lo que la vuelve instalable y offline.

## Agregar un maestro

Un objeto en `MAESTROS` (`js/content.js`) y sus dos SVG en `RETRATOS` y `FONDOS` (`js/art.js`), con la misma clave `id`.

| campo | qué hace |
|---|---|
| `preguntas` | el banco. Se sortean `preguntasPorRonda` sin repetir entre partidas |
| `pass` | puntos necesarios para aprobar (cada respuesta da +1, 0 o -1) |
| `criterio` | qué mira (lo revela la figura del Espantapájaros) |
| `juicio.ejes` | cuánto pesa cada señal, de -1.5 a 1.5 |
| `juicio.pos` / `neg` | raíces de palabras que premia o castiga: `'suelt'` pesca soltar y soltó |
| `juicio.frases` | qué contesta según la señal dominante (`yo`, `duda`, `eco`, `vacia`…) |
| `toques` | qué hace si lo tocás, con su animación en `css/styles.css` (`.r-<anim>`) |

El orden del array es el orden del mapa. Los maestros con `zona: 'espacio'` se juegan después del despegue.
