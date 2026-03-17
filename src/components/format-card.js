class FormatCard extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute('name') || '';
    const specs = this.getAttribute('specs') || '';
    const price = this.getAttribute('price') || '';
    this.innerHTML = `
      <article class="flex h-full flex-col justify-between border border-white/10 bg-white/[0.02] p-8">
        <div>
          <p class="text-[11px] uppercase tracking-[0.3em] text-white/35">Format</p>
          <h3 class="mt-4 font-display text-3xl text-white md:text-4xl">${name}</h3>
          <p class="mt-6 text-sm leading-relaxed text-white/60 md:text-base">${specs}</p>
        </div>
        <p class="mt-10 text-sm uppercase tracking-[0.22em] text-white">${price}</p>
      </article>
    `;
  }
}
customElements.define('format-card', FormatCard);
