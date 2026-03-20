class ArchiveGrid extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || '';
    const intro = this.getAttribute('intro') || '';
    const items = JSON.parse(this.getAttribute('items') || '[]');

    this.innerHTML = `
      <section class="py-28 md:py-36">
        <div class="mx-auto max-w-7xl px-6 md:px-10">
          <div class="mb-14 max-w-3xl md:mb-20">
            <h2 class="font-display text-5xl leading-tight text-primary md:text-6xl">${title}</h2>
            <p class="mt-6 max-w-2xl text-sm leading-relaxed text-faded md:text-md">${intro}</p>
          </div>

          <div class="grid gap-8 md:grid-cols-3 md:gap-10">
            ${items.map((item) => `
              <article class="group relative overflow-hidden border border-white/10 bg-white/[0.03] shadow-film archive-card">
                <div class="relative aspect-square overflow-hidden">
                  <img src="${item.image}" alt="${item.title}" class="h-full w-full object-cover object-center archive-card__image" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"></div>
                  <div class="absolute inset-0 ring-1 ring-inset ring-white/10"></div>
                </div>

                <div class="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p class="mb-3 text-xs uppercase tracking-[0.28em] text-faded">${item.meta}</p>
                  <h3 class="max-w-[12ch] font-display text-2xl leading-tight text-white md:text-2xl">${item.title}</h3>
                  <p class="mt-4 max-w-[28ch] text-xs leading-relaxed text-faded md:text-sm">${item.text}</p>
                </div>
              </article>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }
}
customElements.define('archive-grid', ArchiveGrid);
