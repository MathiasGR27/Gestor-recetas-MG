import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.4/index.js?module';

export class EspeFooter extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        font-family: var(--footer-font, 'Arial', 'Roboto', sans-serif);
        background-color: var(--footer-bg, rgba(160, 92, 36, 0.1));
        color: var(--footer-text, #000);
        padding: 20px 60px;
      }

      footer {
        width: 100%;
      }

      .footer-top {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 2rem;
        border-bottom: 1px solid var(--footer-divider, #ffffff50);
        padding-bottom: 10px;
      }

      .logo {
        width: 25%;  
        height: auto;
        filter: var(--footer-logo-filter, none);
      }
      .footer-column {
        flex: 1;
        min-width: 200px;
      }

      .footer-column h4 {
        margin-top: 0;
        margin-bottom: 10px;
        font-size: 1.1rem;
        color: var(--footer-title, #006539);
      }

      .footer-column ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .footer-column li {
        margin-bottom: 6px;
        color: var(--footer-text, #000);
      }

      .footer-column li a {
        color: var(--footer-link, #ffffff);
        text-decoration: none;
      }

      .footer-column li a:hover {
        color: var(--footer-link-hover, #FFD700);
      }

      .footer-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 20px;
        color: var(--footer-signature, #000);
      }

      .footer-bottom span {
        font-weight: bold;
      }

      .payment-methods img {
        height: 20px;
        margin-left: 20px;
        filter: var(--footer-payment-filter, none);
      }

      @media (max-width: 768px) {
        .footer-top {
          flex-direction: column;
          align-items: flex-start;
        }

        .footer-bottom {
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
        }
      }
      @media (max-width: 768px) {
        :host {
          display: none;
        }
      }
    `;
  }

  static get properties() {
    return {
      logoSrc: { type: String },
      addresses: { type: Array },
      contacts: { type: Array },
      paymentLogos: { type: Array }
    };
  }

  constructor() {
    super();
    this.logoSrc = '';
    this.addresses = [];
    this.contacts = [];
    this.paymentLogos = [];
  }

  render() {
    return html`
      <footer>
        <div class="footer-top">
          <div class="footer-column">
            <img class="logo" src="${this.logoSrc}" alt="Logo" />
          </div>

          <div class="footer-column">
            <h4>Nuestras Tiendas</h4>
            <ul>
              ${this.addresses.map(item => html`<li>${item}</li>`)}
            </ul>
          </div>

          <div class="footer-column">
            <h4>Contactos</h4>
            <ul>
              ${this.contacts.map(item => html`<li>${item}</li>`)}
            </ul>
          </div>
        </div>

        <hr />

        <div class="footer-bottom">
          <span>© Universidad de las Fuerzas Armadas - ESPE 2025</span>
          <div class="payment-methods">
            ${this.paymentLogos.map(
              src => html`<img src="${src}" alt="Método de pago" />`
            )}
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('espe-footer', EspeFooter);
