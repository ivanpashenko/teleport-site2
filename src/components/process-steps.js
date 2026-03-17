class ProcessSteps extends HTMLElement {
  connectedCallback() {
    const items = JSON.parse(this.getAttribute('items') || '[]');
    const palette = [
      {
        glow: 'rgba(37, 129, 91, 0.34)',
        soft: 'rgba(37, 129, 91, 0.14)',
        core: 'rgba(176, 255, 219, 0.1)'
      },
      {
        glow: 'rgba(52, 78, 165, 0.34)',
        soft: 'rgba(52, 78, 165, 0.14)',
        core: 'rgba(181, 203, 255, 0.1)'
      },
      {
        glow: 'rgba(124, 46, 120, 0.34)',
        soft: 'rgba(124, 46, 120, 0.14)',
        core: 'rgba(255, 182, 244, 0.1)'
      },
      {
        glow: 'rgba(138, 64, 44, 0.34)',
        soft: 'rgba(138, 64, 44, 0.14)',
        core: 'rgba(255, 205, 180, 0.1)'
      }
    ];

    this.innerHTML = `
      <section class="py-16 md:py-20">
        <div class="mx-auto max-w-7xl px-6 md:px-10">
          ${items.map((item, index) => {
            const colors = palette[index % palette.length];
            return `
              <article class="process-step relative overflow-hidden border-t border-white/10 py-8 md:py-9 min-h-[150px] md:min-h-[168px] flex items-center" style="--process-glow:${item.glow || colors.glow}; --process-glow-soft:${item.glow_soft || colors.soft}; --process-glow-core:${item.glow_core || colors.core};">
                <div class="pointer-events-none absolute inset-x-0 -bottom-20 h-40 process-step__glow"></div>
                <div class="relative z-10 grid w-full gap-6 md:grid-cols-[6rem_minmax(0,1.1fr)_minmax(0,2fr)] md:gap-8 xl:gap-12 items-center">
                  <p class="font-mono text-[11px] tracking-[0.2em] text-white/40">${item.step}</p>
                  <h3 class="m-0 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.12] text-white">${item.title}</h3>
                  <p class="m-0 max-w-[56ch] text-[15px] leading-8 text-white md:text-base" style="color:rgba(255,255,255,0.72)">${item.text}</p>
                </div>
              </article>
            `;
          }).join('')}
        </div>
      </section>
    `;
  }
}
customElements.define('process-steps', ProcessSteps);
