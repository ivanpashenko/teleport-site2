class FaqSection extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || 'Q&A';
    const items = JSON.parse(this.getAttribute('items') || '[]');

    this.innerHTML = `
      <section id="faq" style="padding: 0 0 6rem">
        <div style="max-width:960px; margin:0 auto; padding:0 2.5rem">
          <div style="border-top:1px solid rgba(255,255,255,0.14); background:rgba(255,255,255,0.02)">
            ${items.map((item, index) => `
              <details ${index === 0 ? 'open' : ''} style="border-bottom:1px solid rgba(255,255,255,0.12); padding:0 0;">
                <summary style="list-style:none; cursor:pointer; padding:1.4rem 0; display:flex; align-items:flex-start; justify-content:space-between; gap:1.5rem; color:#fff; font-size:12px; letter-spacing:0.18em; text-transform:uppercase;">
                  <span>${item.question}</span>
                  <span style="color:rgba(255,255,255,0.45); font-size:16px; line-height:1">+</span>
                </summary>
                <div style="padding:0 3rem 1.5rem 0; max-width:760px; color:rgba(255,255,255,0.68); font-size:15px; line-height:1.8;">
                  ${item.answer}
                </div>
              </details>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }
}
customElements.define('faq-section', FaqSection);
