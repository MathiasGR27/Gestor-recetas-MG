import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.4/index.js?module';

export class EspeProductCard extends LitElement {
  static get properties() {
    return {
      tema: { type: String, reflect: true },
      title: { type: String },
      description: { type: String },
      price: { type: String },
      status: { type: String },
      buttonTheme: { type: String },
      imageUrl: { type: String },
    };
  }

  constructor() {
    super();
    this.tema = undefined;
    this.title = 'Producto Genérico';
    this.description = 'Este es un producto de ejemplo para tu tienda.';
    this.price = '$00.00';
    this.status = 'Disponible'; // o 'Sin stock'
    this.buttonTheme = 'green'; // o 'yellow'
    this.imageUrl = '';
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: 'Arial', 'Roboto', sans-serif;
        --card-bg: white;
        --text-color: #333;
        --muted-text: #666;
        --border-color: #eee;
        --btn-green-bg: #2e7d5f;
        --btn-yellow-bg: #f9be01;
        --btn-yellow-text: #000;
        --btn-green-text: white;
      }

      :host([tema="oscuro"]) {
        --card-bg: #1e1e1e;
        --text-color: #f0f0f0;
        --muted-text: #aaa;
        --border-color: #333;
        --btn-yellow-text: #111;
      }

      @media (prefers-color-scheme: dark) {
        :host(:not([tema])) {
          --card-bg: #1e1e1e;
          --text-color: #f0f0f0;
          --muted-text: #aaa;
          --border-color: #333;
          --btn-yellow-text: #111;
        }
      }

      .card {
        display: flex;
        flex-direction: column;
        background-color: var(--card-bg);
        color: var(--text-color);
        border-radius: 16px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        overflow: hidden;
        width: 280px;
      }

      .image-placeholder {
        background-color: #bbb;
        height: 200px;
        position: relative;
      }

      .card-image {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }

      .options-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: var(--btn-green-bg);
        border-radius: 50%;
        width: 32px;
        height: 32px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        cursor: pointer;
      }

      .content {
        padding: 16px;
      }

      .title-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .title {
        font-weight: bold;
        font-size: 1.1rem;
      }

      .badge {
        font-size: 0.8rem;
        padding: 2px 8px;
        border-radius: 12px;
        border: 1px solid;
      }

      .badge.green {
        color: #006B53;
        border-color: #006B53;
      }

      .badge.red {
        color: #E63329;
        border-color: #E63329;
      }

      .description {
        font-size: 0.9rem;
        color: var(--muted-text);
        margin: 10px 0;
      }

      .price {
        font-size: 1rem;
        font-weight: bold;
        margin-bottom: 12px;
      }

      .button-area {
        border-top: 1px solid var(--border-color);
        text-align: center;
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
      }

      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        border: none;
        border-radius: 0;
        width: 100%;
        font-weight: bold;
        cursor: pointer;
        font-size: 0.9rem;
        gap: 6px;
      }

      .btn.green {
        background-color: var(--btn-green-bg);
        color: var(--btn-green-text);
      }

      .btn.yellow {
        background-color: var(--btn-yellow-bg);
        color: var(--btn-yellow-text);
      }
    `;
  }

  render() {
    const btnClass = this.buttonTheme === 'yellow' ? 'btn yellow' : 'btn green';
    const badgeClass = this.status === 'Disponible' ? 'badge green' : 'badge red';

    return html`
      <div class="card">
        <div class="image-placeholder">
          ${this.imageUrl
            ? html`<img src="${this.imageUrl}" alt="Imagen del producto" class="card-image" />`
            : ''}
          <div class="options-btn">⋮</div>
        </div>
        <div class="content">
          <div class="title-row">
            <span class="title">${this.title}</span>
            <span class="${badgeClass}">${this.status}</span>
          </div>
          <div class="description">${this.description}</div>
          <div class="price">${this.price}</div>
        </div>
        <div class="button-area">
          <button class="${btnClass}">
            Ver Receta
        </div>
      </div>
    `;
  }
}

customElements.define('espe-product-card', EspeProductCard);
