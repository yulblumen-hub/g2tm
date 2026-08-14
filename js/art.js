/* G2tM — arte: cada maestro tiene retrato y escenario propios.
   Todo SVG a mano, sin imágenes externas: pesa nada y escala a cualquier pantalla.
   RETRATOS[id] → busto (viewBox 0 0 200 260)
   FONDOS[id]   → escenario (viewBox 0 0 400 300, preserveAspectRatio slice) */

const RETRATOS = {

  /* ───────── BUDA ───────── */
  buda: `
  <g class="cuerpo">
    <!-- halo -->
    <circle class="aura" cx="100" cy="96" r="78" fill="none" stroke="#f4c542" stroke-width="1.5" opacity=".5"/>
    <circle class="aura2" cx="100" cy="96" r="66" fill="#f4c542" opacity=".10"/>
    <!-- manto -->
    <path d="M100 176c-46 0-74 26-80 62h160c-6-36-34-62-80-62z" fill="#c2410c"/>
    <path d="M100 176c-16 0-30 3-42 9l42 53 42-53c-12-6-26-9-42-9z" fill="#ea580c"/>
    <path d="M74 196c10 22 16 34 26 42M126 196c-10 22-16 34-26 42" stroke="#9a3412" stroke-width="2" fill="none" opacity=".7"/>
    <!-- cuello -->
    <path d="M82 150h36v28c0 8-36 8-36 0z" fill="#c98f3c"/>
    <path d="M82 158c10 8 26 8 36 0" stroke="#a8752c" stroke-width="2" fill="none"/>
    <!-- cara -->
    <ellipse cx="100" cy="100" rx="52" ry="58" fill="#e8b75c"/>
    <!-- orejas largas (marca de Buda: le pesan de tanto oír) -->
    <path d="M50 94c-10 2-13 24-8 40 4 12 14 14 16 4 2-10 0-32-8-44z" fill="#e0a94b"/>
    <path d="M150 94c10 2 13 24 8 40-4 12-14 14-16 4-2-10 0-32 8-44z" fill="#e0a94b"/>
    <path d="M50 104c-4 8-4 22-1 30M150 104c4 8 4 22 1 30" stroke="#b3822f" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M100 42c-29 0-52 26-52 58 0 6 1 12 2 17 4-30 24-53 50-53s46 23 50 53c1-5 2-11 2-17 0-32-23-58-52-58z" fill="#f0c674" opacity=".55"/>
    <!-- ushnisha + rizos -->
    <path d="M100 28c-15 0-25 11-25 24 15-7 35-7 50 0 0-13-10-24-25-24z" fill="#312e2b"/>
    <path d="M52 76c6-26 24-40 48-40s42 14 48 40c-14-15-30-21-48-21s-34 6-48 21z" fill="#312e2b"/>
    <g fill="#4b4642">
      <circle cx="64" cy="66" r="5.4"/><circle cx="78" cy="56" r="5.4"/><circle cx="94" cy="50" r="5.4"/>
      <circle cx="110" cy="50" r="5.4"/><circle cx="126" cy="57" r="5.4"/><circle cx="139" cy="68" r="5.4"/>
      <circle cx="86" cy="41" r="5"/><circle cx="104" cy="39" r="5"/><circle cx="120" cy="44" r="5"/>
      <circle cx="95" cy="30" r="4.4"/><circle cx="110" cy="31" r="4.4"/>
    </g>
    <g fill="#6b6560" opacity=".85">
      <circle cx="70" cy="61" r="2"/><circle cx="86" cy="51" r="2"/><circle cx="102" cy="45" r="2"/>
      <circle cx="118" cy="46" r="2"/><circle cx="132" cy="53" r="2"/>
    </g>
    <!-- urna: el punto entre las cejas -->
    <circle class="urna" cx="100" cy="84" r="5.5" fill="#f4c542"/>
    <circle cx="100" cy="84" r="5.5" fill="none" stroke="#a8752c" stroke-width="1"/>
    <!-- cejas y ojos cerrados -->
    <path d="M72 96c6-7 18-8 25-3M103 93c7-5 19-4 25 3" stroke="#7c5a1e" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path class="ojoI" d="M74 106c6 7 17 7 23 1" stroke="#5b4310" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path class="ojoD" d="M103 107c6 6 17 6 23-1" stroke="#5b4310" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- nariz y boca -->
    <path d="M100 108v16c0 3-3 5-6 5" stroke="#b3822f" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path class="boca" d="M88 140c7 6 17 6 24 0" stroke="#8a5a1c" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  </g>`,

  /* ───────── CRISTO ───────── */
  cristo: `
  <g class="cuerpo">
    <circle class="aura" cx="100" cy="92" r="74" fill="#fcd34d" opacity=".13"/>
    <circle class="aura2" cx="100" cy="92" r="74" fill="none" stroke="#fcd34d" stroke-width="2" opacity=".55"/>
    <path d="M100 18v148M26 92h148" stroke="#fcd34d" stroke-width="5" opacity=".35"/>
    <!-- túnica y manto cruzado -->
    <path d="M100 172c-44 0-72 26-78 62h156c-6-36-34-62-78-62z" fill="#7f1d1d"/>
    <path d="M100 172c-14 0-27 3-38 8l38 54 38-54c-11-5-24-8-38-8z" fill="#991b1b"/>
    <path d="M62 180c-20 10-34 30-40 54h34c-2-24 2-42 6-54z" fill="#1e3a8a"/>
    <path d="M64 182c14 22 26 40 36 52-4 12-8 12-14 0-10-18-20-34-30-46z" fill="#1d4ed8" opacity=".85"/>
    <path d="M86 234c4-14 8-24 14-32" stroke="#7f1d1d" stroke-width="2" fill="none" opacity=".6"/>
    <!-- pelo detrás -->
    <path d="M100 30c-32 0-52 24-52 58 0 26 4 50 10 66 4-30 2-58 6-74 10 6 24 9 36 9s26-3 36-9c4 16 2 44 6 74 6-16 10-40 10-66 0-34-20-58-52-58z" fill="#5c3a21"/>
    <!-- cuello -->
    <path d="M84 146h32v26c0 8-32 8-32 0z" fill="#d9a273"/>
    <!-- cara -->
    <ellipse cx="100" cy="98" rx="42" ry="52" fill="#e8bb8d"/>
    <!-- pelo: raya al medio, cae por las sienes sin tocar la frente -->
    <path d="M100 44c-24 1-40 20-42 44-1 14 0 28 2 40 3-14 3-28 5-40 3-16 12-26 25-32 4-2 8-6 10-12z" fill="#6b4423"/>
    <path d="M100 44c24 1 40 20 42 44 1 14 0 28-2 40-3-14-3-28-5-40-3-16-12-26-25-32-4-2-8-6-10-12z" fill="#6b4423"/>
    <path d="M76 60c-8 8-12 20-13 32 4-14 10-24 19-30zM124 60c8 8 12 20 13 32-4-14-10-24-19-30z" fill="#5c3a21"/>
    <!-- ojos -->
    <ellipse cx="84" cy="98" rx="7" ry="5" fill="#fff"/>
    <ellipse cx="116" cy="98" rx="7" ry="5" fill="#fff"/>
    <circle class="pupI" cx="84" cy="98" r="3.4" fill="#4a2c12"/>
    <circle class="pupD" cx="116" cy="98" r="3.4" fill="#4a2c12"/>
    <path class="parpI" d="M77 98c4-5 10-5 14 0" stroke="#4a2c12" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path class="parpD" d="M109 98c4-5 10-5 14 0" stroke="#4a2c12" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M74 88c5-4 12-4 16-1M110 87c4-3 11-3 16 1" stroke="#5c3a21" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <!-- nariz -->
    <path d="M100 100v18c0 3-3 5-6 5" stroke="#c2915f" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <!-- bigote y barba -->
    <path d="M100 130c-8 0-14 2-18 5 5 1 12 2 18 2s13-1 18-2c-4-3-10-5-18-5z" fill="#6b4423"/>
    <path class="boca" d="M90 134c6 3 14 3 20 0" stroke="#8a4b32" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M74 122c2 24 12 40 26 40s24-16 26-40c2 22-6 46-26 46s-28-24-26-46z" fill="#6b4423"/>
  </g>`,

  /* ───────── LUCIFER ───────── */
  lucifer: `
  <g class="cuerpo">
    <!-- alas de membrana: la izquierda quemada, la derecha todavía entera -->
    <path class="alaI" d="M76 128C50 106 16 104 0 120c12-2 24 2 30 10-14 2-24 10-28 22 12-8 26-8 36-2-12 8-20 20-20 34 12-16 30-26 48-30z" fill="#450a0a"/>
    <path class="alaI" d="M74 132C52 116 26 112 6 122M70 154c-14-4-28 0-38 8M70 178c-10 2-18 8-24 16" stroke="#991b1b" stroke-width="2.4" fill="none" opacity=".9"/>
    <path class="alaD" d="M124 128c26-22 60-24 76-8-12-2-24 2-30 10 14 2 24 10 28 22-12-8-26-8-36-2 12 8 20 20 20 34-12-16-30-26-48-30z" fill="#7f1d1d"/>
    <path class="alaD" d="M126 132c22-16 48-20 68-10M130 154c14-4 28 0 38 8M130 178c10 2 18 8 24 16" stroke="#dc2626" stroke-width="2.4" fill="none" opacity=".8"/>
    <!-- cuerpo -->
    <path d="M100 176c-42 0-70 26-76 64h152c-6-38-34-64-76-64z" fill="#171717"/>
    <path d="M100 176c-12 0-24 2-34 7l34 57 34-57c-10-5-22-7-34-7z" fill="#292524"/>
    <path d="M100 188l-9 28 9 11 9-11z" fill="#dc2626" opacity=".85"/>
    <!-- cuernos: salen de arriba de la frente y suben curvándose -->
    <path class="cuernoI" d="M72 48C60 30 52 16 44 0c18 14 32 26 42 40-6 2-11 5-14 8z" fill="#3b2f28"/>
    <path class="cuernoI" d="M74 44C64 30 58 20 52 10c12 10 22 20 30 30-3 1-6 2-8 4z" fill="#5c4a3e"/>
    <path class="cuernoD" d="M128 48c12-18 20-32 28-48-18 14-32 26-42 40 6 2 11 5 14 8z" fill="#3b2f28"/>
    <path class="cuernoD" d="M126 44c10-14 16-24 22-34-12 10-22 20-30 30 3 1 6 2 8 4z" fill="#5c4a3e"/>
    <g stroke="#241c17" stroke-width="1.6" fill="none" opacity=".8">
      <path d="M58 20c5 4 9 8 12 13M52 32c5 3 9 7 12 11M142 20c-5 4-9 8-12 13M148 32c-5 3-9 7-12 11"/>
    </g>
    <!-- cuello -->
    <path d="M86 150h28v28c0 8-28 8-28 0z" fill="#b8aeaa"/>
    <!-- cara afilada -->
    <path d="M100 36c-28 0-46 20-46 48 0 18 6 34 15 48 9 14 20 26 31 26s22-12 31-26c9-14 15-30 15-48 0-28-18-48-46-48z" fill="#cfc7c3"/>
    <path d="M100 36c-28 0-46 20-46 48 0 7 1 14 3 21 3-28 20-47 43-47s40 19 43 47c2-7 3-14 3-21 0-28-18-48-46-48z" fill="#e0dad7" opacity=".7"/>
    <path d="M60 96c6 14 12 22 18 26-10 0-18-10-18-26zM140 96c-6 14-12 22-18 26 10 0 18-10 18-26z" fill="#a89f9b" opacity=".5"/>
    <!-- pelo peinado hacia atrás -->
    <path d="M56 82c4-28 20-46 44-46s40 18 44 46c-8-20-24-30-44-30s-36 10-44 30z" fill="#171717"/>
    <path d="M78 52c-8 6-14 16-17 28 6-14 12-22 20-26zM122 52c8 6 14 16 17 28-6-14-12-22-20-26z" fill="#292524"/>
    <!-- cejas quebradas -->
    <path class="cejaI" d="M68 84l26 10" stroke="#171717" stroke-width="4.5" stroke-linecap="round"/>
    <path class="cejaD" d="M132 84l-26 10" stroke="#171717" stroke-width="4.5" stroke-linecap="round"/>
    <!-- ojos de pupila vertical -->
    <path d="M70 102c7-8 19-8 26 0-7 8-19 8-26 0z" fill="#fde047"/>
    <path d="M104 102c7-8 19-8 26 0-7 8-19 8-26 0z" fill="#fde047"/>
    <ellipse class="pupI" cx="83" cy="102" rx="2.6" ry="7.5" fill="#0a0a0a"/>
    <ellipse class="pupD" cx="117" cy="102" rx="2.6" ry="7.5" fill="#0a0a0a"/>
    <!-- nariz + sonrisa ladeada -->
    <path d="M100 108v20l-8 4" stroke="#9c918c" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path class="boca" d="M83 142c11 7 24 4 33-5" stroke="#7f1d1d" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>`,

  /* ───────── SÓCRATES ───────── */
  socrates: `
  <g class="cuerpo">
    <!-- túnica -->
    <path d="M100 176c-44 0-72 26-78 62h156c-6-36-34-62-78-62z" fill="#d6d3d1"/>
    <path d="M100 176c-14 0-26 3-36 8l36 54 36-54c-10-5-22-8-36-8z" fill="#e7e5e4"/>
    <path d="M64 190c-6 20-8 34-8 48M136 190c6 20 8 34 8 48" stroke="#a8a29e" stroke-width="2" fill="none"/>
    <path d="M100 184l-10 20 10 12 10-12z" fill="#c2410c" opacity=".5"/>
    <!-- cuello ancho -->
    <path d="M82 148h36v30c0 8-36 8-36 0z" fill="#c9a074"/>
    <!-- cráneo calvo y ancho -->
    <ellipse cx="100" cy="94" rx="50" ry="52" fill="#dbb389"/>
    <path d="M100 42c-28 0-50 22-50 50 0 6 1 12 2 17 4-28 24-47 48-47s44 19 48 47c1-5 2-11 2-17 0-28-22-50-50-50z" fill="#e8c8a4" opacity=".6"/>
    <!-- pelo: solo a los costados -->
    <path d="M52 92c-4 16-2 30 4 40-2-16-2-30 0-42zM148 92c4 16 2 30-4 40 2-16 2-30 0-42z" fill="#e7e5e4"/>
    <path d="M50 86c2-8 6-14 12-16-4 6-8 12-8 20zM150 86c-2-8-6-14-12-16 4 6 8 12 8 20z" fill="#d6d3d1"/>
    <!-- cejas pobladas -->
    <path d="M68 88c8-8 20-8 27-2M132 88c-8-8-20-8-27-2" stroke="#e7e5e4" stroke-width="5" fill="none" stroke-linecap="round"/>
    <!-- ojos chicos y vivos -->
    <ellipse cx="80" cy="100" rx="8" ry="6" fill="#fff"/>
    <ellipse cx="120" cy="100" rx="8" ry="6" fill="#fff"/>
    <circle class="pupI" cx="81" cy="100" r="3.6" fill="#3f3f46"/>
    <circle class="pupD" cx="119" cy="100" r="3.6" fill="#3f3f46"/>
    <path class="parpI" d="M72 100c5-6 11-6 16 0" stroke="#8a6a48" stroke-width="2" fill="none"/>
    <path class="parpD" d="M112 100c5-6 11-6 16 0" stroke="#8a6a48" stroke-width="2" fill="none"/>
    <!-- nariz chata (era famoso por fea) -->
    <path d="M100 104c-6 6-10 12-10 16 0 5 5 8 10 8s10-3 10-8c0-4-4-10-10-16z" fill="#c99b6d"/>
    <path d="M92 124c5 3 11 3 16 0" stroke="#a8794c" stroke-width="1.8" fill="none"/>
    <!-- barba rizada -->
    <path d="M62 118c-2 34 14 60 38 60s40-26 38-60c2 40-10 72-38 72s-40-32-38-72z" fill="#e7e5e4"/>
    <g fill="#d6d3d1">
      <circle cx="74" cy="146" r="9"/><circle cx="90" cy="160" r="10"/><circle cx="110" cy="160" r="10"/>
      <circle cx="126" cy="146" r="9"/><circle cx="100" cy="172" r="10"/>
    </g>
    <path class="boca" d="M88 134c8 4 16 4 24 0" stroke="#a8794c" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  </g>`,

  /* ───────── LAO TSÉ ───────── */
  laotse: `
  <g class="cuerpo">
    <path d="M100 178c-44 0-72 26-78 60h156c-6-34-34-60-78-60z" fill="#14532d"/>
    <path d="M100 178c-14 0-26 3-36 8l36 52 36-52c-10-5-22-8-36-8z" fill="#166534"/>
    <path d="M78 196c8 18 14 30 22 38M122 196c-8 18-14 30-22 38" stroke="#0b3d21" stroke-width="2" fill="none"/>
    <!-- cuello -->
    <path d="M84 150h32v26c0 8-32 8-32 0z" fill="#d9b98d"/>
    <!-- cara alargada -->
    <ellipse cx="100" cy="96" rx="44" ry="52" fill="#e8cba4"/>
    <path d="M100 44c-24 0-44 20-44 48 0 6 1 11 2 16 4-26 21-44 42-44s38 18 42 44c1-5 2-10 2-16 0-28-20-48-44-48z" fill="#f0dcc0" opacity=".5"/>
    <!-- moño de sabio -->
    <path d="M100 30c-10 0-18 7-18 16 0 6 4 11 10 14h16c6-3 10-8 10-14 0-9-8-16-18-16z" fill="#e7e5e4"/>
    <path d="M64 68c4-20 18-32 36-32s32 12 36 32c-10-12-22-18-36-18s-26 6-36 18z" fill="#f5f5f4"/>
    <circle cx="100" cy="34" r="5" fill="#d6d3d1"/>
    <!-- cejas larguísimas que caen -->
    <path d="M74 86c-6 10-10 22-12 34 6-12 12-22 20-28M126 86c6 10 10 22 12 34-6-12-12-22-20-28" stroke="#f5f5f4" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <!-- ojos entrecerrados -->
    <path class="ojoI" d="M76 98c6 5 16 5 22 0" stroke="#5b4a2e" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path class="ojoD" d="M102 98c6 5 16 5 22 0" stroke="#5b4a2e" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- nariz -->
    <path d="M100 102v16c0 3-3 5-6 5" stroke="#c2a377" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <!-- bigote caído y barba larga -->
    <path d="M100 128c-10 0-18 3-22 8-2 16-4 30-8 42 8-16 12-30 14-42 4-2 10-3 16-3s12 1 16 3c2 12 6 26 14 42-4-12-6-26-8-42-4-5-12-8-22-8z" fill="#f5f5f4"/>
    <path class="boca" d="M92 134c5 3 11 3 16 0" stroke="#a8845c" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M100 140c-14 0-24 6-24 18 0 30 8 62 24 84 16-22 24-54 24-84 0-12-10-18-24-18z" fill="#f5f5f4"/>
    <path d="M100 152v78M88 168c2 24 6 42 12 56M112 168c-2 24-6 42-12 56" stroke="#d6d3d1" stroke-width="2" fill="none"/>
  </g>`,

  /* ───────── ANUBIS ───────── */
  anubis: `
  <g class="cuerpo">
    <!-- torso y collar -->
    <path d="M100 186c-42 0-70 24-76 56h152c-6-32-34-56-76-56z" fill="#78350f"/>
    <path d="M100 182c-26 0-44 8-44 18 0 12 20 20 44 20s44-8 44-20c0-10-18-18-44-18z" fill="#d9a441"/>
    <path d="M100 186c-20 0-34 6-34 14s14 14 34 14 34-6 34-14-14-14-34-14z" fill="#f4c542"/>
    <g stroke="#8a5a1c" stroke-width="1.6" fill="none">
      <path d="M72 190c0 8 2 14 6 18M100 188v24M128 190c0 8-2 14-6 18"/>
    </g>
    <!-- cuello -->
    <path d="M88 152h24v32c0 8-24 8-24 0z" fill="#1c1917"/>
    <!-- orejas de chacal -->
    <path class="orejaI" d="M62 66c-6-26-4-48 2-58 10 12 18 32 20 54z" fill="#171717"/>
    <path class="orejaD" d="M138 66c6-26 4-48-2-58-10 12-18 32-20 54z" fill="#171717"/>
    <path d="M66 58c-3-16-3-30 0-38 5 8 9 22 11 36zM134 58c3-16 3-30 0-38-5 8-9 22-11 36z" fill="#5b21b6" opacity=".55"/>
    <!-- cabeza de chacal: cráneo + hocico -->
    <path d="M100 44c-24 0-40 18-40 42 0 16 6 30 14 40h52c8-10 14-24 14-40 0-24-16-42-40-42z" fill="#1c1917"/>
    <path d="M100 44c-24 0-40 18-40 42 0 5 1 10 2 15 4-22 19-37 38-37s34 15 38 37c1-5 2-10 2-15 0-24-16-42-40-42z" fill="#292524" opacity=".9"/>
    <!-- hocico -->
    <path d="M86 126h28v34c0 6-6 10-14 10s-14-4-14-10z" fill="#1c1917"/>
    <path d="M86 132h28v6H86z" fill="#0a0a0a" opacity=".6"/>
    <ellipse cx="100" cy="166" rx="9" ry="7" fill="#0a0a0a"/>
    <path d="M100 172v8M94 178c2 3 4 4 6 4s4-1 6-4" stroke="#3f3f46" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <!-- ojos rasgados dorados -->
    <path d="M70 100c8-6 18-6 24 2-8 6-18 6-24-2z" fill="#f4c542"/>
    <path d="M106 102c6-8 16-8 24-2-6 8-16 8-24 2z" fill="#f4c542"/>
    <ellipse class="pupI" cx="82" cy="101" rx="3" ry="4.5" fill="#0a0a0a"/>
    <ellipse class="pupD" cx="118" cy="101" rx="3" ry="4.5" fill="#0a0a0a"/>
    <path d="M64 94l8-6M136 94l-8-6" stroke="#f4c542" stroke-width="2" stroke-linecap="round" opacity=".8"/>
  </g>`,

  /* ───────── HAKUIN ───────── */
  hakuin: `
  <g class="cuerpo">
    <!-- kesa -->
    <path d="M100 176c-44 0-72 26-78 62h156c-6-36-34-62-78-62z" fill="#44403c"/>
    <path d="M100 176c-14 0-26 3-36 8l36 54 36-54c-10-5-22-8-36-8z" fill="#57534e"/>
    <path d="M116 182c14 6 24 18 30 34l-30 22z" fill="#7c2d12"/>
    <!-- el palo apoyado -->
    <path d="M158 120l14 118" stroke="#78350f" stroke-width="6" stroke-linecap="round"/>
    <path d="M158 120l14 118" stroke="#92400e" stroke-width="2.5" stroke-linecap="round"/>
    <!-- cuello -->
    <path d="M84 150h32v28c0 8-32 8-32 0z" fill="#d9b98d"/>
    <!-- cabeza rapada -->
    <ellipse cx="100" cy="98" rx="48" ry="54" fill="#e8cba4"/>
    <path d="M100 44c-26 0-48 22-48 50 0 6 1 12 2 17 4-28 22-47 46-47s42 19 46 47c1-5 2-11 2-17 0-28-22-50-48-50z" fill="#f0dcc0" opacity=".55"/>
    <path d="M64 72c8-18 20-28 36-28s28 10 36 28c-10-12-22-18-36-18s-26 6-36 18z" fill="#d9b98d" opacity=".5"/>
    <!-- cejas fruncidas -->
    <path d="M68 84c10-4 20-2 26 4M132 84c-10-4-20-2-26 4" stroke="#3f3f46" stroke-width="5" fill="none" stroke-linecap="round"/>
    <!-- ojos abiertos, fijos -->
    <ellipse cx="80" cy="102" rx="11" ry="8" fill="#fff"/>
    <ellipse cx="120" cy="102" rx="11" ry="8" fill="#fff"/>
    <circle class="pupI" cx="80" cy="102" r="5" fill="#1c1917"/>
    <circle class="pupD" cx="120" cy="102" r="5" fill="#1c1917"/>
    <path class="parpI" d="M69 102c6-8 16-8 22 0" stroke="#8a6a48" stroke-width="2.2" fill="none"/>
    <path class="parpD" d="M109 102c6-8 16-8 22 0" stroke="#8a6a48" stroke-width="2.2" fill="none"/>
    <!-- nariz y boca recta -->
    <path d="M100 106v18c0 3-4 5-7 5" stroke="#c2a377" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path class="boca" d="M86 138h28" stroke="#a8794c" stroke-width="3" stroke-linecap="round"/>
    <!-- barba corta de tres días -->
    <path d="M70 120c0 26 14 42 30 42s30-16 30-42c2 30-12 50-30 50s-32-20-30-50z" fill="#3f3f46" opacity=".22"/>
  </g>`,

  /* ───────── HANK (Texas) ───────── */
  hank: `
  <g class="cuerpo">
    <!-- camisa y corbata -->
    <path d="M100 176c-44 0-72 26-78 62h156c-6-36-34-62-78-62z" fill="#e7e5e4"/>
    <path d="M100 176c-12 0-22 2-32 6l32 30 32-30c-10-4-20-6-32-6z" fill="#f5f5f4"/>
    <path d="M100 182l-14 10 14 14 14-14z" fill="#cbd5e1"/>
    <path d="M100 206l-8 8 8 24 8-24z" fill="#1e293b"/>
    <path d="M64 190c-8 12-12 30-12 48M136 190c8 12 12 30 12 48" stroke="#cbd5e1" stroke-width="2" fill="none"/>
    <!-- identificación -->
    <rect x="120" y="206" width="20" height="14" rx="2" fill="#cbd5e1"/>
    <path d="M124 211h12M124 215h8" stroke="#64748b" stroke-width="1.4"/>
    <!-- cuello -->
    <path d="M86 150h28v28c0 8-28 8-28 0z" fill="#d9a273"/>
    <!-- cara cuadrada -->
    <path d="M100 42c-28 0-46 20-46 48v20c0 26 20 44 46 44s46-18 46-44V90c0-28-18-48-46-48z" fill="#e8bb8d"/>
    <path d="M100 42c-28 0-46 20-46 48v8c4-24 22-40 46-40s42 16 46 40v-8c0-28-18-48-46-48z" fill="#f0cba4" opacity=".5"/>
    <!-- pelo corto militar -->
    <path d="M54 84c2-26 20-42 46-42s44 16 46 42c-8-16-24-24-46-24s-38 8-46 24z" fill="#57534e"/>
    <path d="M54 84c2-10 6-18 12-24-4 8-6 16-6 26z" fill="#78716c"/>
    <!-- auriculares de sala de control -->
    <path d="M50 92c0-30 22-52 50-52s50 22 50 52" stroke="#3f3f46" stroke-width="7" fill="none" stroke-linecap="round"/>
    <rect x="38" y="86" width="18" height="30" rx="7" fill="#27272a"/>
    <rect x="144" y="86" width="18" height="30" rx="7" fill="#27272a"/>
    <path d="M56 106c10 4 14 12 14 20" stroke="#27272a" stroke-width="3.5" fill="none"/>
    <ellipse cx="74" cy="128" rx="7" ry="5" fill="#3f3f46"/>
    <!-- cejas y ojos entrecerrados -->
    <path d="M70 92c8-5 18-4 24 2M130 92c-8-5-18-4-24 2" stroke="#57534e" stroke-width="4" fill="none" stroke-linecap="round"/>
    <ellipse cx="82" cy="104" rx="9" ry="5.5" fill="#fff"/>
    <ellipse cx="118" cy="104" rx="9" ry="5.5" fill="#fff"/>
    <circle class="pupI" cx="82" cy="104" r="3.6" fill="#3b82f6"/>
    <circle class="pupD" cx="118" cy="104" r="3.6" fill="#3b82f6"/>
    <path class="parpI" d="M73 104c5-6 13-6 18 0" stroke="#c2915f" stroke-width="2.2" fill="none"/>
    <path class="parpD" d="M109 104c5-6 13-6 18 0" stroke="#c2915f" stroke-width="2.2" fill="none"/>
    <!-- nariz, bigote, boca -->
    <path d="M100 110v16c0 3-4 5-7 5" stroke="#c2915f" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M82 134c6-4 12-5 18-5s12 1 18 5c-6 4-12 5-18 5s-12-1-18-5z" fill="#57534e"/>
    <path class="boca" d="M88 146c8 3 16 3 24 0" stroke="#a85a3c" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  </g>`,

  /* ───────── EL SILENCIO (Luna) ───────── */
  silencio: `
  <g class="cuerpo">
    <!-- traje -->
    <path d="M100 178c-46 0-74 26-80 62h160c-6-36-34-62-80-62z" fill="#d4d4d8"/>
    <path d="M100 178c-14 0-26 2-36 7l36 55 36-55c-10-5-22-7-36-7z" fill="#f4f4f5"/>
    <rect x="86" y="196" width="28" height="18" rx="3" fill="#a1a1aa"/>
    <path d="M90 202h20M90 208h12" stroke="#71717a" stroke-width="1.6"/>
    <path d="M56 200c-6 12-8 26-8 38M144 200c6 12 8 26 8 38" stroke="#a1a1aa" stroke-width="2.5" fill="none"/>
    <!-- cuello del casco -->
    <path d="M78 160h44v20H78z" fill="#a1a1aa"/>
    <!-- casco -->
    <circle cx="100" cy="106" r="62" fill="#e4e4e7"/>
    <circle cx="100" cy="106" r="54" fill="#18181b"/>
    <!-- visor: adentro no hay nadie, hay una Tierra -->
    <path class="visor" d="M100 52c-30 0-54 24-54 54s24 54 54 54 54-24 54-54-24-54-54-54z" fill="#020617"/>
    <circle class="tierrita" cx="118" cy="88" r="17" fill="#1d4ed8"/>
    <path class="tierrita" d="M108 80c6-2 12 0 16 4-6 2-10 6-10 10-4-4-8-10-6-14zM124 96c4 2 6 6 4 10-4-2-8-4-10-8 2-2 4-3 6-2z" fill="#16a34a"/>
    <ellipse cx="80" cy="76" rx="18" ry="9" transform="rotate(-28 80 76)" fill="#fff" opacity=".18"/>
    <g class="estrellita" fill="#fff">
      <circle cx="74" cy="120" r="1.6"/><circle cx="92" cy="134" r="1.2"/><circle cx="126" cy="126" r="1.4"/>
    </g>
  </g>`,

  /* ───────── AUTÓMATA-7 (Marte) ───────── */
  automata: `
  <g class="cuerpo">
    <!-- chasis medio enterrado -->
    <path d="M100 180c-40 0-66 24-72 58h144c-6-34-32-58-72-58z" fill="#57534e"/>
    <path d="M100 180c-12 0-22 2-32 6l32 52 32-52c-10-4-20-6-32-6z" fill="#78716c"/>
    <g fill="#a8a29e"><circle cx="72" cy="214" r="4"/><circle cx="128" cy="214" r="4"/><circle cx="100" cy="228" r="4"/></g>
    <path d="M64 196c-6 14-8 28-8 42M136 196c6 14 8 28 8 42" stroke="#44403c" stroke-width="2.5" fill="none"/>
    <!-- cuello de pistón -->
    <path d="M88 156h24v26H88z" fill="#44403c"/>
    <path d="M84 162h32M84 172h32" stroke="#78716c" stroke-width="3"/>
    <!-- cabeza angulosa -->
    <path d="M60 60h80l12 22v54l-12 20H60l-12-20V82z" fill="#78716c"/>
    <path d="M60 60h80l12 22v10l-12-16H60l-12 16V82z" fill="#a8a29e"/>
    <path d="M48 128l12 20h80l12-20v14l-12 20H60l-12-20z" fill="#57534e"/>
    <!-- antenas -->
    <path d="M70 60V30M130 60V30" stroke="#44403c" stroke-width="4" stroke-linecap="round"/>
    <circle class="antenaI" cx="70" cy="26" r="5" fill="#dc2626"/>
    <circle class="antenaD" cx="130" cy="26" r="5" fill="#78716c"/>
    <!-- un solo ojo-lente -->
    <circle cx="100" cy="100" r="30" fill="#292524"/>
    <circle cx="100" cy="100" r="24" fill="#1c1917"/>
    <circle class="lente" cx="100" cy="100" r="16" fill="#dc2626"/>
    <circle class="lente" cx="100" cy="100" r="8" fill="#fca5a5"/>
    <circle cx="93" cy="93" r="4" fill="#fff" opacity=".5"/>
    <g stroke="#44403c" stroke-width="2" fill="none">
      <path d="M100 70v-8M100 130v8M70 100h-8M130 100h8"/>
    </g>
    <!-- reja de la boca -->
    <g stroke="#44403c" stroke-width="3" stroke-linecap="round">
      <path class="boca" d="M78 146h44M84 154h32"/>
    </g>
    <!-- óxido -->
    <path d="M60 60l-6 26 10 8-8 22" stroke="#9a3412" stroke-width="3" fill="none" opacity=".7"/>
  </g>`,

  /* ───────── LA TORMENTA (Júpiter) ───────── */
  tormenta: `
  <g class="cuerpo">
    <g class="giro" style="transform-origin:100px 116px">
      <ellipse cx="100" cy="116" rx="86" ry="72" fill="#7c2d12"/>
      <ellipse cx="100" cy="116" rx="70" ry="58" fill="#9a3412"/>
      <path d="M100 44c-38 0-68 32-68 72 0 24 16 44 40 44 20 0 34-16 34-36 0-16-12-28-26-28-12 0-20 8-20 18 0 8 6 14 14 14" fill="none" stroke="#c2410c" stroke-width="10" stroke-linecap="round"/>
      <path d="M100 188c38 0 68-32 68-72 0-24-16-44-40-44-20 0-34 16-34 36 0 16 12 28 26 28 12 0 20-8 20-18 0-8-6-14-14-14" fill="none" stroke="#ea580c" stroke-width="8" stroke-linecap="round" opacity=".8"/>
    </g>
    <!-- el ojo en el centro -->
    <ellipse cx="100" cy="116" rx="26" ry="18" fill="#fed7aa"/>
    <circle class="pupI pupD" cx="100" cy="116" r="12" fill="#1c1917"/>
    <circle cx="96" cy="112" r="4" fill="#fff" opacity=".7"/>
    <ellipse cx="100" cy="116" rx="26" ry="18" fill="none" stroke="#7c2d12" stroke-width="3"/>
  </g>`,

  /* ───────── EL ANILLO (Saturno) ───────── */
  anillo: `
  <g class="cuerpo">
    <circle cx="100" cy="118" r="58" fill="#a16207"/>
    <circle cx="100" cy="118" r="58" fill="none" stroke="#ca8a04" stroke-width="2"/>
    <path d="M42 118a58 58 0 0 0 116 0z" fill="#854d0e" opacity=".5"/>
    <g stroke="#fde68a" stroke-width="2" opacity=".5" fill="none">
      <path d="M50 96h100M46 118h108M52 140h96"/>
    </g>
    <!-- la cara que se insinúa y no termina de estar -->
    <g opacity=".5">
      <ellipse cx="80" cy="106" rx="9" ry="6" fill="#1c1917"/>
      <ellipse cx="120" cy="106" rx="9" ry="6" fill="#1c1917"/>
      <path class="boca" d="M82 140c10 8 26 8 36 0" stroke="#1c1917" stroke-width="3" fill="none" stroke-linecap="round"/>
    </g>
    <!-- anillos -->
    <g class="orbita" style="transform-origin:100px 118px">
      <ellipse cx="100" cy="118" rx="96" ry="26" transform="rotate(-16 100 118)" fill="none" stroke="#fcd34d" stroke-width="9" opacity=".75"/>
      <ellipse cx="100" cy="118" rx="96" ry="26" transform="rotate(-16 100 118)" fill="none" stroke="#78350f" stroke-width="2"/>
      <ellipse cx="100" cy="118" rx="80" ry="20" transform="rotate(-16 100 118)" fill="none" stroke="#fde68a" stroke-width="4" opacity=".6"/>
    </g>
  </g>`,

  /* ───────── VOS (el borde) ───────── */
  vos: `
  <g class="cuerpo">
    <!-- una silla vacía -->
    <g stroke="#e8dcc8" stroke-width="5" fill="none" stroke-linecap="round" opacity=".85">
      <path d="M66 130h68v10H66z" fill="#e8dcc8"/>
      <path d="M70 140v92M130 140v92"/>
      <path d="M70 130V44h60v86"/>
      <path d="M74 62h52M74 84h52M74 106h52"/>
      <path d="M70 190h60"/>
    </g>
    <!-- el que falta -->
    <g class="fantasma" opacity=".2">
      <circle cx="100" cy="92" r="26" fill="#e8dcc8"/>
      <path d="M100 122c-24 0-40 16-44 40h88c-4-24-20-40-44-40z" fill="#e8dcc8"/>
    </g>
  </g>`
};

const FONDOS = {

  /* higuera sagrada, sol bajo, quietud */
  buda: `
    <defs>
      <linearGradient id="fb" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3b2f14"/><stop offset=".55" stop-color="#7c5e1e"/><stop offset="1" stop-color="#d9a441"/>
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#fb)"/>
    <circle cx="200" cy="215" r="58" fill="#f4c542" opacity=".35"/>
    <circle cx="200" cy="215" r="34" fill="#fde68a" opacity=".5"/>
    <path d="M0 240c60-14 120-14 200 0s140 14 200 0v60H0z" fill="#2a2110"/>
    <g fill="#1f1a0c" opacity=".9">
      <path d="M40 250c0-40 8-70 8-96 0-10-14-16-14-30 0-16 14-26 30-26 6-14 22-20 36-14 10-14 32-14 42 2 18-6 34 6 34 22 0 12-8 20-18 24 4 20 6 60 6 118z"/>
    </g>
    <g fill="#1f1a0c" opacity=".75">
      <path d="M360 252c0-36-6-62-6-84 0-10 12-14 12-26 0-14-12-22-26-22-6-12-20-18-32-12-8-12-28-12-36 2-16-6-30 6-30 20 0 10 6 18 16 22-4 18-4 56-4 100z"/>
    </g>
    <g class="hojas" fill="#e8c07a" opacity=".55">
      <path d="M92 120c6-8 6-16 0-22-6 6-6 14 0 22z"/>
      <path d="M300 150c6-8 6-16 0-22-6 6-6 14 0 22z"/>
      <path d="M180 96c6-8 6-16 0-22-6 6-6 14 0 22z"/>
    </g>`,

  /* cerro al atardecer, tres cruces lejanas */
  cristo: `
    <defs>
      <linearGradient id="fc" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1e293b"/><stop offset=".5" stop-color="#b45309"/><stop offset="1" stop-color="#fcd34d"/>
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#fc)"/>
    <circle cx="200" cy="205" r="70" fill="#fef3c7" opacity=".28"/>
    <g class="rayos" stroke="#fde68a" stroke-width="2" opacity=".3">
      <path d="M200 205L200 60M200 205L340 120M200 205L60 120M200 205L360 240M200 205L40 240"/>
    </g>
    <path d="M0 232c50-22 100-30 150-22 60 10 100 30 250 14v76H0z" fill="#3f2a12"/>
    <path d="M0 258c70-16 130-10 190 4 60 14 130 12 210-2v40H0z" fill="#231708"/>
    <g stroke="#1c1206" stroke-width="5" opacity=".85">
      <path d="M100 232v-42M86 204h28"/>
      <path d="M300 236v-34M289 212h22"/>
    </g>
    <g class="polvo" fill="#fde68a" opacity=".4">
      <circle cx="70" cy="180" r="1.6"/><circle cx="150" cy="150" r="1.3"/><circle cx="260" cy="170" r="1.6"/><circle cx="330" cy="140" r="1.3"/>
    </g>`,

  /* el pozo: fisura, brasas, humo */
  lucifer: `
    <defs>
      <radialGradient id="fl" cx=".5" cy="1" r="1">
        <stop offset="0" stop-color="#dc2626"/><stop offset=".35" stop-color="#7f1d1d"/><stop offset="1" stop-color="#0a0a0a"/>
      </radialGradient>
    </defs>
    <rect width="400" height="300" fill="url(#fl)"/>
    <path d="M0 250c40-10 70 6 110-2s60-18 100-10 70 22 110 14 60-14 80-10v58H0z" fill="#1c0a0a"/>
    <g stroke="#f97316" stroke-width="2.5" opacity=".8" fill="none">
      <path class="grieta" d="M120 300l20-46 -14-26 22-30"/>
      <path class="grieta" d="M280 300l-16-40 12-30-18-24"/>
      <path class="grieta" d="M200 300l4-56-12-28"/>
    </g>
    <g class="brasas" fill="#fb923c">
      <circle cx="90" cy="230" r="2.4"/><circle cx="160" cy="205" r="1.8"/><circle cx="240" cy="220" r="2.2"/>
      <circle cx="310" cy="195" r="1.7"/><circle cx="55" cy="200" r="1.5"/><circle cx="350" cy="230" r="2"/>
    </g>
    <path d="M0 0h400v90c-60 20-120 0-200 10S60 130 0 110z" fill="#0a0a0a" opacity=".55"/>`,

  /* el ágora al mediodía: columnas, olivo, sombra corta */
  socrates: `
    <defs><linearGradient id="fs" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1e3a5f"/><stop offset=".6" stop-color="#7dabc9"/><stop offset="1" stop-color="#e8d9b8"/>
    </linearGradient></defs>
    <rect width="400" height="300" fill="url(#fs)"/>
    <circle cx="330" cy="60" r="30" fill="#fef3c7" opacity=".5"/>
    <path d="M0 250h400v50H0z" fill="#b8a074"/>
    <path d="M0 240c60 6 120 8 200 4s140-6 200 0v20H0z" fill="#cdb894"/>
    <g fill="#e8dcc0">
      <path d="M40 246V116h16v130zM70 246V116h16v130zM100 246V116h16v130z"/>
      <path d="M32 116h92v-10H32zM32 106h92l-8-12H40z"/>
    </g>
    <g fill="#d6c8a8" opacity=".85">
      <path d="M300 246V150h12v96zM326 246V150h12v96z"/>
      <path d="M294 150h50v-8h-50z"/>
    </g>
    <g opacity=".9">
      <path d="M200 250v-46" stroke="#5c4a2e" stroke-width="7"/>
      <ellipse cx="200" cy="188" rx="42" ry="26" fill="#4d6b3c"/>
      <ellipse cx="176" cy="196" rx="24" ry="16" fill="#5c7d47"/>
      <ellipse cx="224" cy="194" rx="24" ry="16" fill="#5c7d47"/>
    </g>
    <g class="polvo" fill="#fff" opacity=".35">
      <circle cx="150" cy="140" r="1.4"/><circle cx="250" cy="110" r="1.2"/><circle cx="360" cy="170" r="1.4"/>
    </g>`,

  /* la montaña que se va en niebla */
  laotse: `
    <defs><linearGradient id="fla" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0f2027"/><stop offset=".5" stop-color="#2c4a52"/><stop offset="1" stop-color="#7d9b95"/>
    </linearGradient></defs>
    <rect width="400" height="300" fill="url(#fla)"/>
    <circle cx="300" cy="70" r="26" fill="#e8f0ee" opacity=".8"/>
    <circle cx="292" cy="64" r="24" fill="#2c4a52" opacity=".55"/>
    <path d="M0 210l70-100 46 62 40-46 60 84z" fill="#16303a"/>
    <path d="M160 220l70-96 50 66 40-40 80 90z" fill="#1d3d47" opacity=".9"/>
    <g class="niebla" fill="#cfe0dc" opacity=".22">
      <ellipse cx="120" cy="196" rx="140" ry="16"/>
      <ellipse cx="290" cy="222" rx="150" ry="14"/>
      <ellipse cx="200" cy="250" rx="200" ry="18"/>
    </g>
    <path d="M0 262c60-8 120-8 200 0s140 8 200 0v38H0z" fill="#12262c"/>
    <g stroke="#0d1e23" stroke-width="4" fill="none">
      <path d="M60 262v-30M50 244l10 6 10-10"/>
      <path d="M348 266v-26M338 250l10 6 10-8"/>
    </g>`,

  /* la sala de la balanza */
  anubis: `
    <defs><linearGradient id="fa" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1a1206"/><stop offset=".6" stop-color="#7c5310"/><stop offset="1" stop-color="#d9a441"/>
    </linearGradient></defs>
    <rect width="400" height="300" fill="url(#fa)"/>
    <path d="M0 246h400v54H0z" fill="#5c3d10"/>
    <path d="M0 238c60 8 120 10 200 6s140-4 200 2v14H0z" fill="#7c5310"/>
    <g fill="#8a5f1c">
      <path d="M20 244V90h34v154zM346 244V90h34v154z"/>
      <path d="M14 90h46v-14H14zM340 90h46v-14h-46z"/>
    </g>
    <g fill="#c08a2a" opacity=".8">
      <path d="M24 100h26v18H24zM24 128h26v18H24zM24 156h26v18H24z"/>
      <path d="M350 100h26v18h-26zM350 128h26v18h-26zM350 156h26v18h-26z"/>
    </g>
    <!-- balanza -->
    <g stroke="#f4c542" stroke-width="3" fill="none" opacity=".9">
      <path d="M200 240v-96M156 144h88"/>
      <path d="M156 144v18M244 144v18"/>
      <path d="M140 162h32M228 162h32"/>
      <path d="M140 162a16 10 0 0 0 32 0M228 162a16 10 0 0 0 32 0"/>
    </g>
    <path d="M156 158c0-4 4-7 8-7s8 3 8 7z" fill="#dc2626" opacity=".8"/>
    <path d="M244 156c0-3 0-6-4-8" stroke="#fef3c7" stroke-width="3" fill="none" stroke-linecap="round"/>
    <g class="polvo" fill="#f4c542" opacity=".45">
      <circle cx="90" cy="150" r="1.6"/><circle cx="300" cy="120" r="1.4"/><circle cx="130" cy="200" r="1.2"/>
    </g>`,

  /* un cuarto vacío y un círculo pintado */
  hakuin: `
    <rect width="400" height="300" fill="#2a2622"/>
    <path d="M0 214h400v86H0z" fill="#3d372f"/>
    <g stroke="#241f1a" stroke-width="2" fill="none">
      <path d="M0 244h400M0 274h400M100 214v86M200 214v86M300 214v86"/>
    </g>
    <rect x="30" y="30" width="150" height="184" fill="#d9cfbc" opacity=".18"/>
    <g stroke="#5c5347" stroke-width="3" fill="none">
      <path d="M30 30h150v184H30zM30 92h150M30 152h150M105 30v184"/>
    </g>
    <!-- el enso pintado en la pared -->
    <g stroke="#e8dcc8" fill="none" opacity=".5" stroke-linecap="round">
      <path d="M318 120A44 44 0 1 0 274 164" stroke-width="11"/>
      <path d="M274 164A44 44 0 0 0 330 148" stroke-width="5"/>
    </g>
    <!-- el palo apoyado en un rincón -->
    <path d="M382 214l-14-140" stroke="#78350f" stroke-width="6" stroke-linecap="round"/>
    <g class="polvo" fill="#e8dcc8" opacity=".2">
      <circle cx="230" cy="80" r="1.6"/><circle cx="260" cy="200" r="1.2"/><circle cx="200" cy="140" r="1.4"/>
    </g>`,

  /* sala de control, y el cohete afuera */
  hank: `
    <rect width="400" height="300" fill="#1c2530"/>
    <rect x="0" y="0" width="400" height="150" fill="#0f172a"/>
    <!-- ventanal -->
    <rect x="34" y="26" width="332" height="110" fill="#f59e0b" opacity=".22"/>
    <rect x="34" y="26" width="332" height="110" fill="none" stroke="#475569" stroke-width="5"/>
    <path d="M34 100h332" stroke="#475569" stroke-width="3"/>
    <path d="M200 26v110" stroke="#475569" stroke-width="3"/>
    <!-- el cohete y la torre -->
    <g>
      <path d="M256 136V56c0-14 6-24 12-24s12 10 12 24v80z" fill="#e2e8f0"/>
      <path d="M268 32c-6 0-12 10-12 24h24c0-14-6-24-12-24z" fill="#dc2626"/>
      <path d="M256 136l-10 0 10-24zM280 136l10 0-10-24z" fill="#94a3b8"/>
      <path d="M296 136V46h6v90z" fill="#64748b"/>
      <path d="M296 60h-14M296 78h-14M296 96h-14" stroke="#64748b" stroke-width="3"/>
      <path d="M240 136c8-10 20-14 28-14s20 4 28 14z" fill="#fbbf24" opacity=".5"/>
    </g>
    <circle cx="90" cy="60" r="16" fill="#fbbf24" opacity=".5"/>
    <!-- consolas -->
    <path d="M0 150h400v46H0z" fill="#334155"/>
    <path d="M0 196h400v104H0z" fill="#1e293b"/>
    <g>
      <rect x="26" y="160" width="60" height="28" rx="3" fill="#0f172a"/>
      <path d="M32 182l10-12 8 8 10-16 8 20" stroke="#22c55e" stroke-width="2" fill="none"/>
      <rect x="106" y="160" width="60" height="28" rx="3" fill="#0f172a"/>
      <path d="M112 174h48M112 182h30" stroke="#38bdf8" stroke-width="2"/>
      <rect x="234" y="160" width="60" height="28" rx="3" fill="#0f172a"/>
      <path d="M240 176c8-10 16 8 24-2s16 4 24-6" stroke="#f59e0b" stroke-width="2" fill="none"/>
      <rect x="314" y="160" width="60" height="28" rx="3" fill="#0f172a"/>
      <path d="M320 182l12-16 12 10 12-14" stroke="#22c55e" stroke-width="2" fill="none"/>
    </g>
    <g class="brasas" fill="#f87171">
      <circle cx="186" cy="176" r="4"/><circle cx="200" cy="176" r="4" fill="#4ade80"/><circle cx="214" cy="176" r="4" fill="#fbbf24"/>
    </g>`,

  /* mar de la tranquilidad */
  silencio: `
    <rect width="400" height="300" fill="#02040a"/>
    <g class="estrellita" fill="#fff">
      <circle cx="40" cy="40" r="1.4"/><circle cx="120" cy="24" r="1"/><circle cx="210" cy="52" r="1.5"/>
      <circle cx="300" cy="30" r="1.2"/><circle cx="370" cy="70" r="1.4"/><circle cx="80" cy="100" r="1"/>
      <circle cx="340" cy="130" r="1.2"/><circle cx="160" cy="90" r="1"/><circle cx="250" cy="120" r="1.3"/>
    </g>
    <circle cx="316" cy="72" r="30" fill="#1d4ed8"/>
    <path d="M298 56c10-4 22-2 30 6-10 4-18 10-18 18-8-6-16-16-12-24zM326 86c8 4 12 12 8 20-8-4-14-10-16-16 2-4 5-5 8-4z" fill="#16a34a"/>
    <circle cx="316" cy="72" r="30" fill="none" stroke="#93c5fd" stroke-width="1" opacity=".5"/>
    <path d="M0 214c40-16 80-20 120-12s80 20 140 14 100-18 140-8v92H0z" fill="#57534e"/>
    <path d="M0 236c50-10 100-8 150 2s110 8 160-2 60-6 90 0v64H0z" fill="#78716c"/>
    <g fill="#44403c" opacity=".7">
      <ellipse cx="90" cy="256" rx="34" ry="10"/><ellipse cx="250" cy="272" rx="46" ry="12"/><ellipse cx="350" cy="248" rx="26" ry="8"/>
    </g>
    <g fill="#a8a29e" opacity=".5">
      <ellipse cx="90" cy="253" rx="34" ry="8"/><ellipse cx="250" cy="269" rx="46" ry="9"/>
    </g>`,

  /* el cañón */
  automata: `
    <defs><linearGradient id="fm" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#450a0a"/><stop offset=".5" stop-color="#9a3412"/><stop offset="1" stop-color="#d97706"/>
    </linearGradient></defs>
    <rect width="400" height="300" fill="url(#fm)"/>
    <circle cx="80" cy="60" r="18" fill="#fed7aa" opacity=".35"/>
    <path d="M0 190l60-40 50 30 60-46 70 50 60-34 100 46v104H0z" fill="#7c2d12"/>
    <path d="M0 232l80-26 70 22 80-18 90 26 80-14v78H0z" fill="#9a3412"/>
    <path d="M0 268c60-12 120-10 200 2s140 10 200-2v32H0z" fill="#c2410c"/>
    <g fill="#7c2d12" opacity=".8">
      <path d="M150 300l10-40 14 40zM230 300l-8-30-12 30z"/>
    </g>
    <g class="polvo" fill="#fed7aa" opacity=".4">
      <circle cx="60" cy="160" r="1.6"/><circle cx="300" cy="140" r="1.4"/><circle cx="190" cy="180" r="1.2"/>
    </g>`,

  /* las bandas */
  tormenta: `
    <rect width="400" height="300" fill="#7c2d12"/>
    <g>
      <path d="M0 0h400v40H0z" fill="#9a3412"/>
      <path d="M0 40h400v34H0z" fill="#c2410c"/>
      <path d="M0 74h400v46H0z" fill="#7c2d12"/>
      <path d="M0 120h400v30H0z" fill="#ea580c" opacity=".8"/>
      <path d="M0 150h400v50H0z" fill="#9a3412"/>
      <path d="M0 200h400v40H0z" fill="#c2410c" opacity=".9"/>
      <path d="M0 240h400v60H0z" fill="#7c2d12"/>
    </g>
    <g class="niebla" opacity=".35" fill="#fed7aa">
      <ellipse cx="90" cy="56" rx="90" ry="10"/>
      <ellipse cx="300" cy="132" rx="110" ry="12"/>
      <ellipse cx="150" cy="216" rx="120" ry="11"/>
    </g>
    <ellipse cx="330" cy="250" rx="70" ry="34" fill="#dc2626" opacity=".55"/>
    <ellipse cx="330" cy="250" rx="40" ry="18" fill="#fca5a5" opacity=".4"/>`,

  /* de canto */
  anillo: `
    <rect width="400" height="300" fill="#050810"/>
    <g class="estrellita" fill="#fff">
      <circle cx="60" cy="50" r="1.3"/><circle cx="180" cy="30" r="1"/><circle cx="330" cy="60" r="1.4"/>
      <circle cx="260" cy="20" r="1.1"/><circle cx="40" cy="120" r="1"/><circle cx="370" cy="150" r="1.2"/>
    </g>
    <g transform="rotate(-12 200 190)">
      <ellipse cx="200" cy="190" rx="380" ry="42" fill="#a16207" opacity=".35"/>
      <ellipse cx="200" cy="190" rx="380" ry="30" fill="#fcd34d" opacity=".4"/>
      <ellipse cx="200" cy="190" rx="380" ry="18" fill="#fde68a" opacity=".5"/>
      <ellipse cx="200" cy="190" rx="380" ry="8" fill="#0a0a0a" opacity=".6"/>
      <ellipse cx="200" cy="190" rx="300" ry="26" fill="none" stroke="#fef3c7" stroke-width="2" opacity=".4"/>
    </g>
    <path d="M0 268c70-14 140-10 200 4s130 10 200-4v32H0z" fill="#0a0f1c"/>`,

  /* nada, y una estrella */
  vos: `
    <rect width="400" height="300" fill="#000"/>
    <circle class="estrellita" cx="200" cy="70" r="2.4" fill="#fff"/>
    <circle cx="200" cy="70" r="16" fill="#fff" opacity=".07"/>
    <circle cx="200" cy="70" r="40" fill="#fff" opacity=".03"/>`
};
