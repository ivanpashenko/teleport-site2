class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="border-t border-white/10 py-24 md:py-28">
        <div class="mx-auto flex max-w-7xl flex-col gap-10 px-6 md:px-10 md:flex-row md:items-end md:justify-between">
          <div class="flex items-center gap-4">
            <img src="assets/logo.svg" alt="Teleport" class="h-[7px] w-auto opacity-50 md:h-[10px]" />
            <div class="text-[11px] uppercase tracking-[0.2em] text-white/30">
              Singapore · Immersive experience in the real world
            </div>
          </div>
          <a href="mailto:screening@teleport.world" class="text-[11px] uppercase tracking-[0.2em] text-white/52 transition hover:text-white">
            screening@teleport.world
          </a>
        </div>
      </footer>
    `;
  }
}
customElements.define('site-footer', SiteFooter);
