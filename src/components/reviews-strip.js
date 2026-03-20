class ReviewsStrip extends HTMLElement {
  connectedCallback() {
    const items = JSON.parse(this.getAttribute('items') || '[]');

    this.innerHTML = `
      <section class="relative px-6 pb-10 pt-3 md:px-10 md:pb-16 md:pt-4">
        <div class="mx-auto max-w-7xl">
          <div class="border-t border-white/10">
            ${items.map((item) => {
              const parts = String(item.author || '').split(' — ');
              const name = parts[0] || '';
              const role = parts[1] || '';

              return `
                <article class="grid gap-10 border-b border-white/10 py-10 md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] md:gap-12 md:py-14">
                  <div class="pr-2 md:pr-10">
                    <div class="flex items-start gap-4 md:gap-5">
                      <span class="mt-0.5 font-display text-xl leading-tight text-primary md:text-3xl">”</span>
                      <h3 class="max-w-[18ch] font-display text-xl leading-tight text-primary md:text-3xl">${item.headline || item.quote}</h3>
                    </div>
                  </div>

                  <div class="max-w-[56rem] pt-1">
                    <p class="text-sm leading-relaxed text-faded md:text-sm">${item.quote}</p>
                    <div class="mt-7 text-xs uppercase leading-relaxed tracking-[0.03em] text-faded md:mt-8">
                      <p>${name}</p>
                      <p>${role}</p>
                    </div>
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </div>
      </section>
    `;
  }
}
customElements.define('reviews-strip', ReviewsStrip);
