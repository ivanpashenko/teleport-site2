class SiteHeader extends HTMLElement {
  connectedCallback() {
    const menu = JSON.parse(this.getAttribute('menu') || '[]');
    const logo = this.getAttribute('logo') || 'assets/logo.svg';
    const location = this.getAttribute('location') || '';
    const brandHref = this.getAttribute('brand-href') || 'index.html';
    const rightLabel = this.getAttribute('right-label') || 'Entry';
    const rightHref = this.getAttribute('right-href') || 'formats.html';
    const fixed = this.getAttribute('fixed') === 'true';
    const overlay = this.getAttribute('overlay') !== 'false';
    const shellClass = fixed ? 'fixed inset-x-0 top-0 z-30' : 'relative z-20';
    const bgClass = overlay
      ? 'bg-[linear-gradient(180deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.72)_28%,rgba(0,0,0,0.34)_58%,rgba(0,0,0,0)_100%)]'
      : '';

    this.innerHTML = `
      <header class="${shellClass} ${bgClass}">
        <div class="flex items-start justify-between px-6 py-6 md:px-10 md:py-8">
          <hero-menu items='${JSON.stringify(menu)}' side="left"></hero-menu>

          <a href="${brandHref}" class="absolute left-1/2 top-6 -translate-x-1/2 flex flex-col items-center text-center no-underline md:top-8">
            <img src="${logo}" alt="Teleport" class="hero-logo-image h-3 w-auto md:h-4" />
            ${location ? `<p class="mt-2 text-[9px] uppercase tracking-[0.38em] text-white/50">${location}</p>` : ''}
          </a>

          <a href="${rightHref}" class="inline-block px-2 py-1 text-[11px] uppercase tracking-[0.28em] text-white/72 transition hover:text-white">${rightLabel}</a>
        </div>
      </header>
    `;
  }
}

customElements.define('site-header', SiteHeader);
