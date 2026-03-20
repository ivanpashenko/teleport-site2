class HeroBlock extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || '';
    const subtitle = this.getAttribute('subtitle') || '';
    const cta = this.getAttribute('cta') || '';

    this.innerHTML = `
      <section class="relative min-h-screen overflow-hidden border-b border-white/10 hero-shell">
        <div class="hero-bottom-glow bottom-cropped-glow" style="--bottom-glow-height:46vh; --bottom-glow-offset:-8vh;"></div>
        <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,3,3,0.52),rgba(3,3,3,0.22)_24%,rgba(3,3,3,0.16)_54%,rgba(3,3,3,0.96)_100%)]"></div>
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_24%,transparent_68%,rgba(255,255,255,0.03))]"></div>

        <div class="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-32 text-center md:px-10 md:py-40">
          <h1 class="max-w-6xl font-display text-5xl leading-tight text-primary md:text-6xl lg:text-5xl">${title.replace(', staged', ',<br>staged')}</h1>
          <p class="mt-8 max-w-[550px] text-sm leading-relaxed text-faded md:text-md">${subtitle}</p>
          <div class="mt-20 md:mt-28">
            <a href="#screening" class="inline-block border border-white/20 px-8 py-4 text-xs uppercase tracking-[0.28em] text-primary transition hover:bg-white hover:text-black">${cta}</a>
          </div>
        </div>

      </section>
    `;
  }
}
customElements.define('hero-block', HeroBlock);
