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
            Agregar al carrito <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M19.5 22C20.3284 22 21 21.3284 21 20.5C21 19.6716 20.3284 19 19.5 19C18.6716 19 18 19.6716 18 20.5C18 21.3284 18.6716 22 19.5 22Z" fill="#000000" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9.5 22C10.3284 22 11 21.3284 11 20.5C11 19.6716 10.3284 19 9.5 19C8.67157 19 8 19.6716 8 20.5C8 21.3284 8.67157 22 9.5 22Z" fill="#000000" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.5 4H22L20 15H15.5M16.5 4L15.5 15M16.5 4H10.75M15.5 15H11.5M10.75 4H5L7 15H11.5M10.75 4L11.5 15" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 4C4.83333 3.33333 4 2 2 2" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 15H7H5.23077C3.44646 15 2.5 15.7812 2.5 17C2.5 18.2188 3.44646 19 5.23077 19H19.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('espe-product-card', EspeProductCard);
