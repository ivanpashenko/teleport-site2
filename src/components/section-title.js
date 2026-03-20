class SectionTitle extends HTMLElement {
  connectedCallback() {
    const label = this.getAttribute('label') || '';
    const title = this.getAttribute('title') || '';
    const subtitle = this.getAttribute('subtitle') || '';

    this.innerHTML = `
      <div class="border-t border-white/10 py-16 text-center md:py-24">
        <div class="mx-auto max-w-5xl px-6 md:px-10">
          <h2 class="font-display text-[clamp(4rem,12vw,10rem)] leading-none tracking-tight text-white">${label}</h2>
          ${title ? `<h3 class="mx-auto mt-8 max-w-4xl font-display text-3xl leading-[0.98] text-white md:text-5xl">${title}</h3>` : ''}
          ${subtitle ? `<p class="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/68 md:text-base">${subtitle}</p>` : ''}
        </div>
      </div>
    `;
  }
}
customElements.define('section-title', SectionTitle);
