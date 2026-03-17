class HeroBlock extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || '';
    const subtitle = this.getAttribute('subtitle') || '';
    const cta = this.getAttribute('cta') || '';
    const logo = this.getAttribute('logo') || 'assets/logo.svg';
    const location = this.getAttribute('location') || '';
    const menu = JSON.parse(this.getAttribute('menu') || '[]');

    this.innerHTML = `
      <section class="relative min-h-screen overflow-hidden border-b border-white/10 hero-shell">
        <div class="hero-bottom-glow bottom-cropped-glow" style="--bottom-glow-height:46vh; --bottom-glow-offset:-8vh;"></div>
        <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,3,3,0.52),rgba(3,3,3,0.22)_24%,rgba(3,3,3,0.16)_54%,rgba(3,3,3,0.96)_100%)]"></div>
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_24%,transparent_68%,rgba(255,255,255,0.03))]"></div>

        <header class="fixed inset-x-0 top-0 z-30 bg-[linear-gradient(180deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.72)_28%,rgba(0,0,0,0.34)_58%,rgba(0,0,0,0)_100%)]">
          <div class="flex items-start justify-between px-6 py-6 md:px-10 md:py-8">
            <hero-menu items='${JSON.stringify(menu)}' side="left"></hero-menu>

            <a href="index.html" class="absolute left-1/2 top-6 -translate-x-1/2 flex flex-col items-center text-center no-underline md:top-8">
              <img src="${logo}" alt="Teleport" class="hero-logo-image h-3 w-auto md:h-4" />
              <p class="mt-2 text-[9px] uppercase tracking-[0.38em] text-white/50">${location}</p>
            </a>

            <a href="formats.html" class="inline-block px-2 py-1 text-[11px] uppercase tracking-[0.28em] text-white/72 transition hover:text-white">Entry</a>
          </div>
        </header>

        <div class="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-32 text-center md:px-10 md:py-40">
          <h1 class="max-w-6xl font-display text-5xl leading-[0.95] text-white md:text-7xl lg:text-[6.2rem]">${title.replace(', staged', ',<br>staged')}</h1>
          <p class="mt-8 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg">${subtitle}</p>
          <div class="mt-20 md:mt-28">
            <a href="#screening" class="inline-block border border-white/20 px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-white transition hover:bg-white hover:text-black">${cta}</a>
          </div>
        </div>

      </section>
    `;
  }
}
customElements.define('hero-block', HeroBlock);
