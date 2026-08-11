# G2tM — Get to the Moon

Un juego de examen. Cada región tiene un sensei y tres preguntas capciosas. No hay respuestas correctas: hay respuestas que *ese* sensei aprueba. Lo que te salva con Buddha te hunde en Texas.

Aprobás las seis regiones de la Tierra y despega el cohete. Ahí el juego cambia de formato: la Luna tiene reloj, Marte pide una sola palabra escrita, Júpiter te obliga a elegir dos verdades que se contradicen, Saturno te devuelve tus propias respuestas. El último examen no lo toma nadie.

Si pifiás, caés a la Tierra y te llevás una **figura** encima. Las figuras se acumulan y algunas cambian cómo se juega. Una no hace absolutamente nada.

## Jugar

Está online en GitHub Pages. También funciona abriendo `index.html`, o con cualquier server estático:

```bash
python3 -m http.server 8080
```

## En el celular

Desde el navegador: *Compartir → Agregar a inicio* (iPhone) o *Instalar app* (Android). Queda con su ícono y su nombre, abre a pantalla completa y **funciona sin internet**.

> Si cambiás cualquier archivo del juego, subí el número de `CACHE` en `sw.js`. Si no, los celulares que ya la tienen instalada siguen abriendo la versión vieja.

## Cómo está hecho

HTML + CSS + JS a mano. Sin dependencias, sin build, sin backend, sin costo. El progreso se guarda en `localStorage`.

- `js/content.js` — todo el juego: senseis, preguntas, puntajes, réplicas, figuras.
- `js/game.js` — el motor: mapa, modos de pregunta, veredictos, caídas, lanzamiento.
- `css/styles.css` — dos temas (Tierra y espacio) que cambian solos al despegar.
- `sw.js` + `manifest.webmanifest` — lo que la vuelve instalable y offline.
- `icon.svg` (pestaña), `icon-app.svg` y los `icon-*.png` (ícono de la app instalada).

## Agregar un planeta

Agregá un objeto a `NODOS` en `js/content.js`. Los campos que importan:

| campo | qué hace |
|---|---|
| `mode` | `choice`, `timed` (reloj), `text` (escribir), `multi` (elegir dos), `final` |
| `pass` | puntos necesarios para aprobar |
| `criterio` | qué mira el sensei (lo revela la figura del Espantapájaros) |
| `questions[].options[].s` | `1` aprueba, `0` neutro, `-1` hunde |
| `questions[].options[].r` | lo que te contesta el sensei |
| `echo: true` | permite usar `{PREV}` en una pregunta para citar tu respuesta anterior |

El orden del array es el orden del mapa. Los nodos con `zone: 'espacio'` se juegan después del despegue.
