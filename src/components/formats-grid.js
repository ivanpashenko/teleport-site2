class FormatsGrid extends HTMLElement {
  connectedCallback() {
    const items = JSON.parse(this.getAttribute('items') || '[]');

    const introTitle = this.getAttribute('intro-title') || '';
    const introText = this.getAttribute('intro-text') || '';
    const introCta = this.getAttribute('intro-cta') || '';
    const introHref = this.getAttribute('intro-href') || '#';

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
      }
    ];

    this.innerHTML = `
      <section class="py-20 md:py-32">
        <div class="mx-auto max-w-7xl px-6 md:px-10">
          ${(introTitle || introText) ? `
            <div class="mb-16 max-w-2xl px-6 md:mb-24 md:px-0 text-left">
              ${introTitle ? `<h2 class="font-display text-4xl leading-tight text-primary md:text-5xl">${introTitle}</h2>` : ''}
              ${introText ? `<p class="mt-5 text-sm leading-relaxed text-faded md:text-md">${introText}</p>` : ''}
            </div>
          ` : ''}
          <div class="flex flex-col md:flex-row md:justify-between gap-16 md:gap-10">
            ${items.map((item, index) => {
              const colors = palette[index % palette.length];
              return `
                <div class="w-full md:w-[26%] flex flex-col gap-4 relative overflow-hidden bg-transparent pt-12 md:pt-14"
                  style="--process-glow:${item.glow || colors.glow}; --process-glow-soft:${item.glow_soft || colors.soft}; --process-glow-core:${item.glow_core || colors.core}; --process-glow-center: 50%;"
                >
                  <div class="pointer-events-none absolute inset-x-0 top-0 h-40 -translate-y-4 process-step__glow opacity-100 scale-y-[-1]"></div>
                  <div class="relative z-10 flex flex-col gap-4 h-full px-2">
                    <p class="text-xs uppercase tracking-[0.3em] text-faded">${item.duration} · ${item.locations}</p>
                    <h3 class="font-display text-2xl leading-tight text-white md:text-3xl">${item.name}</h3>
                    <p class="text-sm leading-relaxed text-faded flex-1">${item.description}</p>
                    <p class="mt-2 font-display text-xl text-primary">${item.price}</p>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
          ${introCta ? `<div class="mt-24 text-center"><a href="${introHref}" class="inline-block border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.24em] text-white transition hover:bg-white hover:text-black">${introCta}</a></div>` : ''}
        </div>
      </section>
    `;
  }
}
customElements.define('formats-grid', FormatsGrid);
