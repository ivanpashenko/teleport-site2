class SectionTitle extends HTMLElement {
  connectedCallback() {
    const label = this.getAttribute('label') || '';

    this.innerHTML = `
      <div class="border-t border-white/10 py-16 md:py-24 text-center">
        <h2 class="font-display text-[clamp(4rem,12vw,10rem)] leading-none tracking-tight text-white">${label}</h2>
      </div>
    `;
  }
}
customElements.define('section-title', SectionTitle);
