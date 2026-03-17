class GridList extends HTMLElement {
  connectedCallback() {
    this.classList.add('block');
    if (!this.innerHTML.trim()) {
      this.innerHTML = '<div class="grid gap-px bg-white/10 md:grid-cols-2"></div>';
    }
  }
}
customElements.define('grid-list', GridList);
