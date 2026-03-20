class HeroMenu extends HTMLElement {
  connectedCallback() {
    const menu = JSON.parse(this.getAttribute('items') || '[]');
    const side = this.getAttribute('side') || 'left';
    const alignClass = side === 'right'
      ? 'right-0 translate-x-full border-l border-white/10'
      : 'left-0 -translate-x-full border-r border-white/10';

    this.innerHTML = `
      <button type="button" class="hero-burger inline-block px-2 py-1 text-xs uppercase tracking-[0.28em] text-primary transition hover:text-primary" aria-label="Open menu" aria-expanded="false">
        Menu
      </button>

      <aside class="hero-menu fixed top-0 z-40 h-screen w-[30vw] min-w-[320px] max-w-[520px] ${alignClass} bg-[#0a0a0a]/95 p-8 backdrop-blur-xl md:p-10" aria-hidden="true">
        <div class="flex h-full flex-col">
          <div class="mb-10 flex items-end justify-end">
            <button type="button" class="hero-menu-close flex h-11 w-11 items-center justify-center text-white transition hover:opacity-60" aria-label="Close menu">
              <span class="relative block h-4 w-4">
                <span class="absolute left-1/2 top-1/2 block h-px w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white"></span>
                <span class="absolute left-1/2 top-1/2 block h-px w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white"></span>
              </span>
            </button>
          </div>

          <nav class="flex flex-1 flex-col justify-center gap-8">
            ${menu.map((item) => `
              <a href="${item.href}" class="hero-menu-link font-display text-3xl leading-tight text-primary transition hover:text-white md:text-4xl">
                ${item.label}
              </a>
            `).join('')}
          </nav>

          <div class="pt-10 text-xs uppercase tracking-[0.3em] text-faded">Private access only</div>
        </div>
      </aside>

      <div class="hero-menu-backdrop fixed inset-0 z-30 bg-black/50 opacity-0 pointer-events-none"></div>
    `;

    const burger = this.querySelector('.hero-burger');
    const menuPanel = this.querySelector('.hero-menu');
    const backdrop = this.querySelector('.hero-menu-backdrop');
    const close = this.querySelector('.hero-menu-close');
    const links = [...this.querySelectorAll('.hero-menu-link')];
    const host = this;
    const openClass = side === 'right' ? 'menu-open-right' : 'menu-open';

    const openMenu = () => {
      host.classList.add(openClass);
      burger?.setAttribute('aria-expanded', 'true');
      menuPanel?.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      host.classList.remove(openClass);
      burger?.setAttribute('aria-expanded', 'false');
      menuPanel?.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    burger?.addEventListener('click', openMenu);
    close?.addEventListener('click', closeMenu);
    backdrop?.addEventListener('click', closeMenu);
    links.forEach((link) => link.addEventListener('click', closeMenu));

    this._onKeydown = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', this._onKeydown);
  }

  disconnectedCallback() {
    if (this._onKeydown) document.removeEventListener('keydown', this._onKeydown);
  }
}

customElements.define('hero-menu', HeroMenu);
