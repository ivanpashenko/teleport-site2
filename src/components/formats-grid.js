class FormatsGrid extends HTMLElement {
  connectedCallback() {
    const items = JSON.parse(this.getAttribute('items') || '[]');

    const introTitle = this.getAttribute('intro-title') || '';
    const introText = this.getAttribute('intro-text') || '';
    const introCta = this.getAttribute('intro-cta') || '';
    const introHref = this.getAttribute('intro-href') || '#';

    this.innerHTML = `
      <section class="py-16 md:py-20">
        <div class="mx-auto max-w-7xl px-6 md:px-10">
          ${(introTitle || introText) ? `
            <div class="mb-12 px-10 md:mb-16 md:px-14">
              ${introTitle ? `<h3 class="font-display text-4xl leading-none text-white md:text-5xl">${introTitle}</h3>` : ''}
              ${introText ? `<p class="mt-5 text-sm leading-relaxed md:text-base" style="color:rgba(255,255,255,0.7);">${introText}</p>` : ''}
            </div>
          ` : ''}
          <div class="grid gap-px bg-white/10 md:grid-cols-3">
            ${items.map((item) => `
              <div class="bg-[#050505] p-10 md:p-14 flex flex-col gap-6">
                <p class="text-[10px] uppercase tracking-[0.3em] text-white/35">${item.duration} · ${item.locations}</p>
                <h3 class="font-display text-5xl leading-none text-white md:text-6xl">${item.name}</h3>
                <p class="text-sm leading-relaxed text-white/55 flex-1">${item.description}</p>
                <p class="font-display text-2xl text-white/90">${item.price}</p>
              </div>
            `).join('')}
          </div>
          ${introCta ? `<div class="mt-8 text-center"><a href="${introHref}" class="inline-block border border-white/20 px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-white transition hover:bg-white hover:text-black">${introCta}</a></div>` : ''}
        </div>
      </section>
    `;
  }
}
customElements.define('formats-grid', FormatsGrid);
