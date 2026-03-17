class BaseSection extends HTMLElement {
  connectedCallback() {
    // If we've already rendered, don't re-render and kill slots
    if (this.hasAttribute('rendered')) return;
    this.setAttribute('rendered', 'true');

    const eyebrow = this.getAttribute('eyebrow') || '';
    const title = this.getAttribute('title') || '';
    const intro = this.getAttribute('intro') || '';
    const noWrap = this.hasAttribute('no-wrap');
    
    // Save innerHTML before overwriting it
    const inner = this.innerHTML;
    
    this.innerHTML = `
      <section class="border-t border-white/10 py-24 md:py-32">
        <div class="mx-auto max-w-7xl px-6 md:px-10">
          ${!noWrap ? `
            <div class="max-w-3xl">
              ${eyebrow ? `<p class="mb-4 text-[11px] uppercase tracking-[0.35em] text-white/40">${eyebrow}</p>` : ''}
              ${title ? `<h2 class="font-display text-4xl leading-[1.05] text-white md:text-6xl">${title}</h2>` : ''}
              ${intro ? `<p class="mt-6 text-base leading-relaxed text-white/60 md:text-lg">${intro}</p>` : ''}
            </div>
            <div class="mt-12">
              ${inner}
            </div>
          ` : `
            ${inner}
          `}
        </div>
      </section>
    `;
  }
}
customElements.define('base-section', BaseSection);
