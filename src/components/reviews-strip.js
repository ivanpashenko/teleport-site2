class ReviewsStrip extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || '';
    const items = JSON.parse(this.getAttribute('items') || '[]');

    this.innerHTML = `
      <section style="padding: 1rem 0 5rem">
        <div style="max-width:1280px; margin:0 auto; padding:0 2.5rem">
          <div style="display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:1px; background:rgba(255,255,255,0.1)">
            ${items.map((item) => `
              <article style="background:#050505; padding:2.75rem 2.5rem; min-height:100%">
                <p style="font-family:var(--font-display); font-size:clamp(1.3rem,1.9vw,1.72rem); line-height:1.22; color:rgba(255,255,255,0.58); margin:0 0 1.5rem 0">“${item.quote}”</p>
                <p style="font-size:11px; letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.4); margin:0">${item.author}</p>
              </article>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }
}
customElements.define('reviews-strip', ReviewsStrip);
