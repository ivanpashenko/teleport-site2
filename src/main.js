import './components/base-section.js';
import './components/hero-block.js';
import './components/hero-menu.js';
import './components/grid-list.js';
import './components/format-card.js';
import './components/site-footer.js';
import './components/archive-grid.js';
import './components/section-title.js';
import './components/why-block.js';
import './components/process-steps.js';
import './components/formats-grid.js';
import './components/reviews-strip.js';
import './components/faq-section.js';

const page = document.documentElement.dataset.page || 'index';

async function loadYaml(path) {
  const res = await fetch(path);
  const text = await res.text();
  return jsyaml.load(text);
}

function buildPrinciplesScene(items) {
  const scene = document.getElementById('principles-scene');
  if (!scene || !items || !items.length) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  scene.innerHTML = `
    <div class="principles-track" style="position:relative; display:flex; align-items:flex-start;">

      <!-- Left: scrolling text -->
      <div class="principles-text-col" style="width:44%; padding:10vh 2rem 10vh 2.5rem; position:relative; z-index:2;">
        <div style="display:flex; flex-direction:column; gap:22vh; padding-bottom:38vh;">
          ${items.map((item, i) => `
            <article data-text-index="${i}" style="max-width:34rem; min-height:72vh; display:flex; flex-direction:column; justify-content:center; ${i === 0 ? 'margin-top:56vh;' : ''}">
              <p style="font-size:12px;letter-spacing:0.24em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin:0 0 1rem;">${item.note_label}</p>
              <h3 style="font-family:'Cormorant Garamond',serif;font-size:clamp(2.35rem,3.8vw,4.1rem);line-height:1.02;color:#fff;max-width:14ch;margin:0 0 1.25rem;">${item.title}</h3>
              <p style="font-size:15px;line-height:1.65;color:rgba(255,255,255,0.58);max-width:34ch;margin:0;">${item.text}</p>
            </article>
          `).join('')}
        </div>
      </div>

      <!-- Right: sticky image -->
      <div class="principles-image-col" style="width:56%; position:sticky; top:0; height:100vh; display:flex; align-items:center; justify-content:flex-end; padding:2rem 0 2rem 0; will-change:transform,opacity;">
        <div style="position:relative; width:100%; aspect-ratio:16/10; overflow:hidden; border:1px solid rgba(255,255,255,0.1);">
          ${items.map((item, i) => `
            <img
              data-img-index="${i}"
              src="${item.image}"
              alt=""
              style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;
                     opacity:${i === 0 ? 1 : 0};"
            />
          `).join('')}
          <canvas class="principles-canvas" aria-hidden="true"
            style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2;">
          </canvas>
          <div class="principles-fade-overlay" style="
            position:absolute;inset:0;background:#050505;opacity:0;z-index:3;
            pointer-events:none;
          "></div>
        </div>


      </div>

    </div>
  `;

  const canvas   = scene.querySelector('.principles-canvas');
  const fadeEl   = scene.querySelector('.principles-fade-overlay');
  const imageCol = scene.querySelector('.principles-image-col');
  const textCol  = scene.querySelector('.principles-text-col');
  const imgEls   = [...scene.querySelectorAll('[data-img-index]')];
  const textEls  = [...scene.querySelectorAll('[data-text-index]')];
  const dotEls   = [...scene.querySelectorAll('[data-dot-index]')];

  // Preload images for canvas
  const imgObjects = items.map((item) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = new URL(item.image, window.location.href).href;
    img._loaded = false;
    img.onload = () => { img._loaded = true; };
    if (img.complete && img.naturalWidth > 0) img._loaded = true;
    return img;
  });

  // ---- Scatter/Assemble effect ----
  const TX = 5, TY = 5;

  function ss(t) { return t * t * (3 - 2 * t); }

  function ensureCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = Math.round(canvas.offsetWidth  * dpr);
    const H = Math.round(canvas.offsetHeight * dpr);
    if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }
    return { W, H, dpr };
  }

  // kaleidoT: 0 = fully assembled (canvas clear, real <img> shows through)
  //           1 = each cell shows a src region shifted toward center
  function drawKaleido(imgObj, kaleidoT) {
    const { W, H, dpr } = ensureCanvas();
    const ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, W, H);
    if (!imgObj || !imgObj._loaded || kaleidoT <= 0) return;

    ctx.scale(dpr, dpr);
    const vw = canvas.offsetWidth, vh = canvas.offsetHeight;

    const cellW = vw / TX;
    const cellH = vh / TY;
    const centerCol = (TX - 1) / 2; // 2.0
    const centerRow = (TY - 1) / 2; // 2.0

    const iw = imgObj.naturalWidth;
    const ih = imgObj.naturalHeight;

    // object-fit: cover — find the cropped region of the image that fills the canvas
    const canvasAspect = vw / vh;
    const imgAspect    = iw / ih;
    let cropW, cropH, cropX, cropY;
    if (imgAspect > canvasAspect) {
      // image wider than canvas — crop sides
      cropH = ih;
      cropW = ih * canvasAspect;
      cropX = (iw - cropW) / 2;
      cropY = 0;
    } else {
      // image taller than canvas — crop top/bottom
      cropW = iw;
      cropH = iw / canvasAspect;
      cropX = 0;
      cropY = (ih - cropH) / 2;
    }

    // each cell maps to an equal slice of the cropped region
    const srcCellW = cropW / TX;
    const srcCellH = cropH / TY;

    const t = ss(kaleidoT);

    for (let row = 0; row < TY; row++) {
      for (let col = 0; col < TX; col++) {
        // destination: always fixed in place
        const drawX = col * cellW;
        const drawY = row * cellH;

        // distance from center, normalized 0..1
        const dist = Math.sqrt((col - centerCol) ** 2 + (row - centerRow) ** 2);
        const maxDist = Math.sqrt(centerCol ** 2 + centerRow ** 2);
        const normDist = dist / maxDist;

        // center cell: zoom in 1.35x at t=1 (src shrinks → image fills more)
        // outer cells: zoom out up to 1.35x at t=1 (src grows → image shrinks)
        const isCenterTile = col === centerCol && row === centerRow;
        const zoomFactor = isCenterTile
          ? 1 - 0.35 * t
          : 1 + normDist * 0.35 * t;
        const scaledSrcW = srcCellW * zoomFactor;
        const scaledSrcH = srcCellH * zoomFactor;

        // own src slice within the cropped region (center of slice stays fixed)
        const ownSrcX = cropX + col * srcCellW + (srcCellW - scaledSrcW) * 0.5;
        const ownSrcY = cropY + row * srcCellH + (srcCellH - scaledSrcH) * 0.5;

        // shift src origin toward center proportionally to distance (85% of full shift)
        const shiftSrcX = ownSrcX + (centerCol - col) * srcCellW * 0.85 * t;
        const shiftSrcY = ownSrcY + (centerRow - row) * srcCellH * 0.85 * t;

        ctx.save();
        ctx.beginPath();
        ctx.rect(drawX, drawY, cellW, cellH);
        ctx.clip();
        ctx.drawImage(imgObj, shiftSrcX, shiftSrcY, scaledSrcW, scaledSrcH, drawX, drawY, cellW, cellH);
        ctx.restore();
      }
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  // ---- State ----
  let visibleIndex = 0;

  function setDot(index) {
    dotEls.forEach((d, i) => {
      d.style.height     = i === index ? '18px' : '8px';
      d.style.background = i === index ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)';
    });
  }

  // ---- rAF scroll loop ----
  function update() {
    const vh     = window.innerHeight;
    const focusY = vh * 0.45;

    const firstRect = textEls[0]?.getBoundingClientRect();
    if (!firstRect) return;

    // Fully scroll-driven phase model
    // Find the card closest to focus line.
    let nearestIndex = 0;
    let minDist = Infinity;
    const rects = textEls.map((el) => el.getBoundingClientRect());

    rects.forEach((rect, i) => {
      const center = rect.top + rect.height * 0.5;
      const dist = Math.abs(center - focusY);
      if (dist < minDist) {
        minDist = dist;
        nearestIndex = i;
      }
    });

    visibleIndex = nearestIndex;
    setDot(visibleIndex);

    let fadeT = 0;
    let targetIndex = visibleIndex;

    const currentRect = rects[visibleIndex];
    if (!currentRect) return;

    const currentCenter = currentRect.top + currentRect.height * 0.5;
    const currentDelta = currentCenter - focusY;

    if (visibleIndex < textEls.length - 1) {
      const passed = Math.max(0, -currentDelta);
      const blackoutStart = vh * 0.135;
      const blackoutPeak  = vh * 0.155;
      const blackoutEnd   = vh * 0.175;

      if (passed <= blackoutStart) {
        fadeT = 0;
      } else if (passed <= blackoutPeak) {
        fadeT = Math.min(1, (passed - blackoutStart) / (blackoutPeak - blackoutStart));
      } else if (passed <= blackoutEnd) {
        fadeT = Math.max(0, 1 - ((passed - blackoutPeak) / (blackoutEnd - blackoutPeak)));
      } else {
        fadeT = 0;
      }

      const switchForward = passed >= blackoutPeak;
      targetIndex = switchForward ? visibleIndex + 1 : visibleIndex;
    }

    imgEls.forEach((el, i) => { el.style.opacity = i === targetIndex ? '1' : '0'; });

    const targetRect = rects[targetIndex];
    const targetCenter = targetRect ? targetRect.top + targetRect.height * 0.5 : 0;
    const targetDelta = targetCenter - focusY;

    let targetKaleidoT = 1;
    if (targetDelta > 0) {
      const assembleStart = vh * 0.95;
      const assembleEnd   = vh * 0.02;
      const p = 1 - Math.min(1, Math.max(0, (targetDelta - assembleEnd) / (assembleStart - assembleEnd)));
      targetKaleidoT = 1 - ss(p);
    } else {
      targetKaleidoT = 0;
    }

    if (reduce) {
      targetKaleidoT = 0;
      fadeT = 0;
      if (imageCol) { imageCol.style.transform = 'translateY(0)'; imageCol.style.opacity = '1'; }
      if (textCol)  { textCol.style.transform  = 'translateY(0)'; textCol.style.opacity  = '1'; }
    }

    fadeEl.style.opacity = String(0.92 * ss(fadeT));
    drawKaleido(imgObjects[targetIndex], targetKaleidoT);
  }

  setDot(0);
  // Start fully disassembled
  drawKaleido(imgObjects[0], 1);

  (function loop() { update(); requestAnimationFrame(loop); })();

  window.addEventListener('resize', () => { canvas.width = 0; canvas.height = 0; });
}

async function init() {
  const data = await loadYaml(`./content/${page}.yaml`);
  document.title = data.site.title;

  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="min-h-screen bg-[var(--bg)] text-[var(--text)] antialiased selection:bg-white selection:text-black">
      <div class="pointer-events-none fixed inset-0 opacity-10 mix-blend-soft-light" style="background-image:url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"140\" height=\"140\" viewBox=\"0 0 140 140\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"140\" height=\"140\" filter=\"url(%23n)\" opacity=\"0.45\"/></svg>');"></div>
      <hero-block
        logo="${data.hero.logo}"
        location="${data.hero.location}"
        title="${data.hero.title}"
        subtitle="${data.hero.subtitle}"
        cta="${data.hero.cta}"
        menu='${JSON.stringify(data.hero.menu || [])}'
      ></hero-block>

      <section-title label="Principles"></section-title>

      <div id="principles-scene" id="experience"></div>

      <div id="why">
        <section-title label="Why"></section-title>
        <why-block
          title="${data.why.title || ''}"
          text="${data.why.text || ''}"
          items='${JSON.stringify(data.why.items)}'
        ></why-block>
        <div style="text-align:center; padding:3rem 0 5rem">
          <a href="formats.html" style="display:inline-block; border:1px solid rgba(255,255,255,0.2); padding:1rem 2.5rem; font-size:11px; letter-spacing:0.25em; text-transform:uppercase; color:#fff; text-decoration:none; transition:background 200ms,color 200ms" onmouseover="this.style.background='#fff';this.style.color='#000'" onmouseout="this.style.background='transparent';this.style.color='#fff'">View entry options</a>
        </div>
      </div>



      <div id="process">
        <section-title label="Process"></section-title>
        <process-steps items='${JSON.stringify(data.process.items)}'></process-steps>
      </div>

      <reviews-strip
        title="${data.reviews.title}"
        items='${JSON.stringify(data.reviews.items)}'
      ></reviews-strip>

      <div id="faq">
        <section-title label="${data.faq.title}"></section-title>
        <faq-section
          title="${data.faq.title}"
          items='${JSON.stringify(data.faq.items)}'
        ></faq-section>
      </div>

      <section id="screening" class="relative overflow-hidden border-t border-white/10 py-24 text-center md:py-32">
        <div class="hero-bottom-glow bottom-cropped-glow" style="--bottom-glow-height:46vh; --bottom-glow-offset:-8vh;"></div>
        <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,3,3,0.3),rgba(3,3,3,0.12)_22%,rgba(3,3,3,0.16)_50%,rgba(3,3,3,0.86)_100%)]"></div>
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_22%,transparent_66%,rgba(255,255,255,0.03))]"></div>
        <div class="relative z-10 mx-auto max-w-4xl px-6 md:px-10">
          <p class="mb-5 text-[10px] uppercase tracking-[0.22em] text-white/42">${data.final.eyebrow}</p>
          <h2 class="font-display text-4xl leading-[1] text-white md:text-6xl">We do not sell tickets.<br>We shift reality.</h2>
          <div class="mt-10">
            <a href="mailto:screening@teleport.world" class="inline-block border border-white/20 px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-white transition hover:bg-white hover:text-black">${data.final.cta}</a>
          </div>
        </div>
      </section>

      <site-footer></site-footer>
    </div>
  `;

  await new Promise((r) => setTimeout(r, 0));
  buildPrinciplesScene(data.product.items);
}

init();
