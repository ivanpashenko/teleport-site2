import './components/hero-menu.js';
import './components/site-header.js';
import './components/formats-grid.js';
import './components/section-title.js';
import './components/site-footer.js';

async function loadYaml(path) {
  const res = await fetch(path);
  const text = await res.text();
  return jsyaml.load(text);
}

async function init() {
  const data = await loadYaml('./content/formats.yaml');
  document.title = data.site.title;

  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="min-h-screen bg-[var(--bg)] text-[var(--text)] antialiased selection:bg-white selection:text-black">
      <div class="pointer-events-none fixed inset-0 opacity-10 mix-blend-soft-light" style="background-image:url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"140\" height=\"140\" viewBox=\"0 0 140 140\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"140\" height=\"140\" filter=\"url(%23n)\" opacity=\"0.45\"/></svg>');"></div>

      <site-header
        menu='${JSON.stringify(data.hero.menu || [])}'
        logo="${data.hero.logo}"
        location="${data.hero.location}"
        brand-href="index.html"
        right-label="${data.hero.cta}"
        right-href="#screening"
        fixed="false"
        overlay="false"
      ></site-header>

      <section-title label="Entry"></section-title>
      <formats-grid
        intro-title="${data.formats.intro_title || ''}"
        intro-text="${data.formats.intro_text || ''}"
        intro-cta="${data.formats.intro_cta || ''}"
        intro-href="${data.formats.intro_href || '#'}"
        items='${JSON.stringify(data.formats.items)}'
      ></formats-grid>

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
}

init();
