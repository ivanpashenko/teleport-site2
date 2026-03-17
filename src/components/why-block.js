class WhyBlock extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || '';
    const text = this.getAttribute('text') || '';
    const items = JSON.parse(this.getAttribute('items') || '[]');

    this.innerHTML = `
      <section class="py-16 md:py-24">
        <div class="mx-auto max-w-7xl px-6 md:px-10">
          <div class="max-w-3xl">
            ${title ? `<h2 class="font-display text-4xl leading-[1.05] text-white md:text-6xl">${title}</h2>` : ''}
            ${text ? `<p class="mt-6 text-base leading-relaxed text-white/60 md:text-lg">${text}</p>` : ''}
          </div>

          <div class="mt-14 grid gap-8 md:mt-16 md:grid-cols-3">
            ${items.map((item) => `
              <article class="archive-card group relative overflow-hidden border border-white/10 bg-[#070707]">
                <div class="relative aspect-[4/5] overflow-hidden bg-black">
                  <img src="${item.image || ''}" alt="" class="archive-card__image h-full w-full object-cover" />
                  <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.18)_26%,rgba(0,0,0,0.44)_58%,rgba(0,0,0,0.88)_100%)]"></div>
                  <div class="absolute inset-x-0 bottom-0 p-7 md:p-8">
                    <h3 class="font-display text-[2rem] leading-[1.05] text-white md:text-[2.2rem]">${item.title}</h3>
                    <p class="mt-4 max-w-[28ch] text-[15px] leading-7 text-white/68">${item.text}</p>
                  </div>
                </div>
              </article>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }
}
customElements.define('why-block', WhyBlock);
