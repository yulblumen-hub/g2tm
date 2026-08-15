# G2tM — Get to the Moon

Un examen escrito. Cada región tiene un maestro dibujado, con su escenario y su carácter: Buda abajo de la higuera, Sócrates en el ágora, Anubis con la balanza, Lucifer en el pozo, Hank en la sala de control. Te hacen tres preguntas y las contestás **escribiendo**. No hay opciones.

Cada maestro juzga distinto. Con Buda, hablar de vos te hunde y una respuesta de cuatro palabras te salva. Con Hank, "no sé" te baja del cohete. Con Lucifer, la humildad de manual es lo único que no perdona.

**Tocá al maestro.** Todos reaccionan y ninguno reacciona igual: Cristo te da la paz, Lucifer se enfurece, Hakuin te pega con el palo, Lao Tsé se corre antes de que llegues, el Silencio no hace absolutamente nada.

Aprobás las ocho regiones de la Tierra y despega el cohete. Ahí cambia el formato: arriba los maestros ya no tienen cara. Si pifiás, caés a la Tierra y te llevás una **figura** encima.

## Jugar

Online en GitHub Pages. También abriendo `index.html`, o con cualquier server estático:

```bash
python3 -m http.server 8080
```

## En el celular

Desde el navegador: *Compartir → Agregar a inicio* (iPhone) o *Instalar app* (Android). Queda con su ícono y su nombre, abre a pantalla completa y **funciona sin internet**.

> Si cambiás cualquier archivo del juego, subí el número de `CACHE` en `sw.js`. Si no, los celulares que ya la tienen instalada siguen abriendo la versión vieja.

## Cómo está hecho

HTML + CSS + JS a mano. Sin dependencias, sin build, sin backend, sin costo. El progreso y las preguntas ya vistas se guardan en `localStorage`.

- `js/content.js` — el elenco: qué pregunta cada maestro, cómo juzga, qué hace si lo tocás.
- `js/art.js` — los 13 retratos y los 13 escenarios, todo SVG dibujado a mano.
- `js/juez.js` — el que lee tus respuestas.
- `js/game.js` — el motor: mapa, rondas, veredictos, caídas, lanzamiento.
- `css/styles.css` — dos temas (Tierra y espacio) y una animación de reacción por maestro.

## Cómo juzga el juez

No hay IA: hay reglas. `juez.js` lee lo que escribiste y saca señales — largo, cuánta primera persona, si dudás, si contestás con una pregunta, si repetís la pregunta, si usás absolutos, si describís una acción concreta. Después cada maestro pondera esas señales a su gusto en `juicio.ejes`, y suma o resta según su vocabulario propio (`pos` / `neg`, que son raíces: `suelt` pesca *soltar* y *soltó*).

El total decide: **≥ +1 aprueba, ≤ −1 hunde**, el resto es neutro. Con `requiere` un maestro puede exigir que aparezca una palabra sí o sí.

Para cambiarle el carácter a alguien, tocá sus pesos. Para agregar un maestro, sumá un objeto a `MAESTROS` y su retrato y fondo a `RETRATOS` / `FONDOS` con el mismo `id`.

## Modo Anita

Al final de `js/content.js` hay un bloque que le cambia a Cristo el examen entero: en vez de preguntar por el prójimo, pregunta por Anita, y no aprueba a quien no la nombre.

Para volver al juego normal:

```js
const MODO_ANITA = false;
```

El examen original de Cristo queda intacto arriba; la bandera solo lo pisa mientras esté en `true`.
