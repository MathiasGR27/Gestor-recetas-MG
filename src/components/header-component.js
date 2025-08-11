import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.4/index.js?module';


class HeaderComponent extends LitElement {
  static properties = {
    menuOpen: { type: Boolean },
    showLangMenu: { type: Boolean },
    showAccountMenu: { type: Boolean }
  };

  constructor() {
    super();
    this.menuOpen = false;
    this.showLangMenu = false;
    this.showAccountMenu = false;
    this._onOutsideClick = this._onOutsideClick.bind(this);
  }

  _manejarProductoAnadido = () => {
    const carrito = this.renderRoot.querySelector('espe-boton-carrito');
    if (carrito) {
      carrito.cantidad += 1;
    }
  };

  _manejarProductoRemovido = () => {
    const carrito = this.renderRoot.querySelector('espe-boton-carrito');
    if (carrito) {
      carrito.cantidad -= 1;
    }
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('click', this._onOutsideClick);
    window.addEventListener('producto-anadido', this._manejarProductoAnadido);
    window.addEventListener('producto-removido', this._manejarProductoRemovido);
  }

  disconnectedCallback() {
    window.removeEventListener('click', this._onOutsideClick);
    window.removeEventListener('producto-anadido', this._manejarProductoAnadido);
    window.removeEventListener('producto-removido', this._manejarProductoRemovido);
    super.disconnectedCallback();
  }

  static styles = css`
    :host {
  display: block;
  font-family: Arial, sans-serif;
}

/* Overlay para sidebar */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: none;
  z-index: 99;
}
.overlay.show {
  display: block;
}

/* Header superior */
.header-top {
  background: #006935;
  color: white;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  gap: 10px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.logo {
  font-weight: bold;
  font-size: 1.4rem;
  cursor: pointer;
  flex-shrink: 0;
}

.search-bar {
  flex: 1 1 300px;
  max-width: 600px;
  display: flex;
}

.search-bar select,
.search-bar input {
  padding: 8px;
  border: none;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
}

.search-bar input {
  flex: 1;
  border-radius: 0;
}

.search-bar button {
  background: #febd69;
  border: none;
  padding: 8px 16px;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.search-bar button:hover {
  background-color: #e0a84a;
}

.user-actions {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-shrink: 0;
  font-size: 0.9rem;
  position: relative;
}

.user-actions > div {
  cursor: pointer;
  position: relative;
}

/* Dropdown common */
.dropdown {
  position: absolute;
  top: 110%;
  right: 0;
  background: white;
  color: black;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  min-width: 160px;
  padding: 10px 0;
  z-index: 100;
}

.dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown li {
  padding: 8px 16px;
  white-space: nowrap;
  cursor: pointer;
}

.dropdown li:hover {
  background-color: #f0f0f0;
}

/* Header inferior */
.header-bottom {
  background: #1D1D1BBF;
  color: white;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 20px;
  font-size: 0.85rem;
}
.menu-button {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

/* Sidebar */
.sidebar-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100vh;
  background: white;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 1000;
}
.sidebar-menu.show {
  transform: translateX(0);
}
.sidebar-menu h3 {
  margin-top: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
}
.sidebar-menu ul {
  list-style: none;
  padding: 0;
}
.sidebar-menu li {
  margin: 10px 0;
  cursor: pointer;
}

/* Nuevo: Grid para las cards de productos */
.recetas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Responsive para header */
@media (max-width: 700px) {
  .header-top {
    flex-direction: column;
    align-items: stretch;
  }

  .search-bar {
    max-width: 100%;
  }

  .user-actions {
    justify-content: flex-end;
  }
}
  `;

  // alterna sidebar
  toggleSidebar(e) {
    e.stopPropagation();
    this.menuOpen = !this.menuOpen;
    this.showLangMenu = false;
    this.showAccountMenu = false;
  }

  // alterna dropdown idioma
  _toggleLang(e) {
    e.stopPropagation();
    this.showLangMenu = !this.showLangMenu;
    this.showAccountMenu = false;
  }

  // alterna dropdown cuenta
  _toggleAccount(e) {
    e.stopPropagation();
    this.showAccountMenu = !this.showAccountMenu;
    this.showLangMenu = false;
  }

  // cierra menus al clicar fuera
  _onOutsideClick(e) {
    const path = e.composedPath();

    // cerrar dropdown idioma
    if (this.showLangMenu) {
      const langBtn = this.renderRoot.querySelector('.lang-wrapper');
      if (!path.includes(langBtn)) this.showLangMenu = false;
    }

    // cerrar dropdown cuenta
    if (this.showAccountMenu) {
      const accBtn = this.renderRoot.querySelector('.acct-wrapper');
      if (!path.includes(accBtn)) this.showAccountMenu = false;
    }

    // cerrar sidebar
    if (this.menuOpen) {
      const sb = this.renderRoot.querySelector('.sidebar-menu');
      const btn = this.renderRoot.querySelector('.menu-button');
      if (!path.includes(sb) && !path.includes(btn)) this.menuOpen = false;
    }
  }

render() {
  return html`
    <div class="header-top">
      <div class="logo" @click="${() => window.location.replace('/')}">Gestor de Recetas</div>
      <div class="search-bar">
        <select>
          <option>Todos</option>
          <option>Entradas</option>
          <option>Platos fuertes</option>
          <option>Postres</option>
        </select>
        <input type="text" placeholder="Buscar recetas..." />
        <button>🔍</button>
      </div>
      <div class="user-actions">
        <!-- Puedes añadir tus menús y carrito aquí -->
        <div class="lang-wrapper" @click="${this._toggleLang}">🇪🇸 ES ▾
          ${this.showLangMenu
            ? html`<div class="dropdown">
                <ul>
                  <li>Español – ES</li>
                  <li>English – EN</li>
                </ul>
              </div>`
            : ''}
        </div>
        <div class="acct-wrapper" @click="${this._toggleAccount}">
          Hola, Usuario<br /><strong>Cuenta y Listas</strong> ▾
          ${this.showAccountMenu
            ? html`<div class="dropdown">
                <ul>
                  <li><strong>Tus listas</strong></li>
                  <li>Crear una lista</li>
                  <li>Explorar una lista</li>
                </ul>
                <hr />
                <ul>
                  <li><strong>Tu cuenta</strong></li>
                  <li>Pedidos</li>
                  <li>Recomendaciones</li>
                </ul>
              </div>`
            : ''}
        </div>
        <espe-boton-carrito></espe-boton-carrito>
      </div>
    </div>
  `;
}
}

customElements.define('header-component', HeaderComponent);
