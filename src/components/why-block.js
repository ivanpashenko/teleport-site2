class WhyBlock extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || '';
    const text = this.getAttribute('text') || '';
    const items = JSON.parse(this.getAttribute('items') || '[]');

    this.innerHTML = `
      <section class="py-20 md:py-28">
        <div class="mx-auto max-w-[1240px] px-6 md:px-10">
          ${(title || text) ? `
            <div class="max-w-[760px] text-left">
              ${title ? `<h2 class="font-display text-[3rem] leading-[0.98] text-white md:text-[5.1rem]">${title}</h2>` : ''}
              ${text ? `<p class="mt-5 max-w-[720px] text-[15px] leading-[1.75] text-white/50 md:text-[18px]">${text}</p>` : ''}
            </div>
          ` : ''}

          <div class="mt-16 grid gap-y-14 md:mt-20 md:grid-cols-3 md:gap-x-12 lg:gap-x-16">
            ${items.map((item, index) => {
              const imageShift = index === 0 ? 'md:translate-x-0' : index === 1 ? 'md:translate-x-2' : 'md:translate-x-4';
              const imageWidth = index === 0 ? 'w-[92%]' : index === 1 ? 'w-[90%]' : 'w-[88%]';
              const textWidth = index === 1 ? 'w-[88%]' : 'w-[90%]';
              const titleWidth = index === 0 ? 'max-w-[8.2ch]' : index === 1 ? 'max-w-[8.8ch]' : 'max-w-[8.4ch]';

              return `
                <article class="group min-w-0 ${index === 2 ? 'md:justify-self-end' : ''}">
                  <div class="relative aspect-[1.02/0.78] overflow-visible ${imageWidth} ${index === 2 ? 'ml-auto' : ''}">
                    <img
                      src="${item.image || ''}"
                      alt="${item.title || ''}"
                      class="block h-full w-full object-cover object-center ${imageShift}"
                    />
                  </div>

                  <div class="relative z-10 -mt-8 ${textWidth} pr-2 md:-mt-10 lg:-mt-12 ${index === 2 ? 'ml-auto pr-0' : 'pr-3 md:pr-4'}">
                    <h3 class="${titleWidth} font-display text-[3rem] font-medium leading-[0.9] text-white md:text-[3.35rem] lg:text-[3.7rem]">
                      ${item.title}
                    </h3>
                    <p class="mt-5 w-[80%] text-[15px] leading-[1.55] text-white/38 md:w-[82%] md:text-[16px]">
                      ${item.text}
                    </p>
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
customElements.define('why-block', WhyBlock);
