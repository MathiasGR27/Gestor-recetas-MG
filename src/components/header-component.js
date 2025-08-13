import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.4/index.js?module';

class HeaderComponent extends LitElement {
  static properties = {
    menuOpen: { type: Boolean },
    showLangMenu: { type: Boolean },
    showAccountMenu: { type: Boolean },
    showLangMenuDrawer: { type: Boolean },
    showAccountMenuDrawer: { type: Boolean },
    deferredPrompt: { state: true },
    showInstallButton: { state: true }
  };

  constructor() {
    super();
    this.menuOpen = false;
    this.showLangMenu = false;
    this.showAccountMenu = false;
    this.showLangMenuDrawer = false;
    this.showAccountMenuDrawer = false;
    this.deferredPrompt = null;
    this.showInstallButton = false;

    this._onOutsideClick = this._onOutsideClick.bind(this);
    this._onBeforeInstallPrompt = this._onBeforeInstallPrompt.bind(this);
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

    // Escuchar evento PWA beforeinstallprompt
    window.addEventListener('beforeinstallprompt', this._onBeforeInstallPrompt);
  }

  disconnectedCallback() {
    window.removeEventListener('click', this._onOutsideClick);
    window.removeEventListener('producto-anadido', this._manejarProductoAnadido);
    window.removeEventListener('producto-removido', this._manejarProductoRemovido);

    window.removeEventListener('beforeinstallprompt', this._onBeforeInstallPrompt);

    super.disconnectedCallback();
  }

  _onBeforeInstallPrompt(e) {
    e.preventDefault();
    this.deferredPrompt = e;
    this.showInstallButton = true;
  }

  _handleInstallClick() {
    if (!this.deferredPrompt) return;
    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      this.deferredPrompt = null;
      this.showInstallButton = false;
    });
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
      flex-wrap: nowrap;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      gap: 10px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      position: relative;
    }

    /* En móvil se ajusta la estructura en dos filas */
    @media (max-width: 768px) {
      .header-top {
        flex-wrap: wrap; /* permite filas */
        justify-content: flex-start;
      }
    }

    .menu-button {
      cursor: pointer;
      display: none; /* Solo móvil */
      font-size: 1.6rem;
      font-weight: bold;
      padding: 6px 12px;
      background: #006935;
      border-radius: 4px;
      user-select: none;
      color: white;
      border: none;
      flex-shrink: 0;
    }

    .logo {
      font-weight: bold;
      font-size: 1.4rem;
      cursor: pointer;
      flex-shrink: 0;
      user-select: none;
      white-space: nowrap;
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

    /* Botón instalar en header */
    .install-button {
      cursor: pointer;
      user-select: none;
      padding: 8px 12px;
      background: #febd69;
      border-radius: 4px;
      font-weight: bold;
      color: #000;
      display: flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
      transition: background-color 0.3s ease;
    }

    .install-button:hover {
      background-color: #e0a84a;
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

    /* Sidebar (drawer) */
    .sidebar-menu {
      position: fixed;
      top: 0;
      left: 0;
      width: 280px; /* ancho desktop */
      height: 100vh;
      background: white;
      padding: 20px;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      z-index: 1000;
      overflow-y: auto;

      display: flex;
      flex-direction: column;
      padding-bottom: 120px; /* espacio para drawer-user-actions */
    }

    .sidebar-menu.show {
      transform: translateX(0);
    }

    /* Cuando está abierto, ocupa toda la pantalla */
    @media (max-width: 768px) {
      .sidebar-menu.show {
        width: 50vw;
        height: 100vh;
        padding-top: 60px; /* un poco de espacio arriba */
      }
    }

    .mdl-layout__drawer-title {
      font-weight: bold;
      font-size: 1.25rem;
      margin-bottom: 1rem;
      display: block;
      color: #006935;
      user-select: none;
    }

    .mdl-navigation {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 2rem;
    }

    .mdl-navigation__link {
      color: #006935;
      text-decoration: none;
      font-weight: 600;
      cursor: pointer;
      user-select: none;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .mdl-navigation__link:hover {
      text-decoration: underline;
    }

    /* User actions dentro del drawer */
    .drawer-user-actions {
      position: sticky;
      bottom: 0;
      left: 0;
      width: 100%;
      border-top: 1px solid #ccc;
      padding: 1rem 20px;
      background: white;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      box-sizing: border-box;
      z-index: 1200;
    }

    /* Dropdown en drawer: desplegar vertical hacia abajo */
    .drawer-user-actions .dropdown {
      position: relative;
      top: auto;
      right: auto;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      min-width: 100%;
      padding: 10px 0;
      border-radius: 4px;
      background: white;
      z-index: 1300;
    }

    /* Dropdown lista sin padding ni margin extra */
    .drawer-user-actions .dropdown ul {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    .drawer-user-actions .dropdown li {
      padding: 8px 16px;
      cursor: pointer;
      white-space: nowrap;
    }

    .drawer-user-actions .dropdown li:hover {
      background-color: #f0f0f0;
    }

    /* Botones de idioma y cuenta ocupan todo el ancho */
    .drawer-user-actions > div {
      cursor: pointer;
      position: relative;
      width: 100%;
      font-weight: 600;
      user-select: none;
    }

    /* Texto mejor distribuido en cuenta */
    .drawer-user-actions .acct-wrapper {
      line-height: 1.2;
      font-size: 0.9rem;
    }

    /* Responsive header */
    @media (max-width: 768px) {
      .menu-button {
        display: flex;
      }

      .header-top .user-actions {
        display: none;
      }

      /* Estructura header en móvil: dos filas */
      .header-top > .top-row {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
      }

      .header-top > .search-bar {
        width: 100%;
        max-width: none;
        background: #febd69;
        border-radius: 5px;
        padding: 2px 6px;
      }

      .search-bar select {
        display: none;
      }

      .search-bar input {
        flex: 1;
        padding: 6px;
        border: none;
        border-radius: 4px 0 0 4px;
        font-size: 1rem;
      }

      .search-bar button {
        padding: 6px 8px;
        border-radius: 0 4px 4px 0;
        cursor: pointer;
      }
    }
  `;

  toggleSidebar(e) {
    e.stopPropagation();
    this.menuOpen = !this.menuOpen;
    this.showLangMenu = false;
    this.showAccountMenu = false;
    this.showLangMenuDrawer = false;
    this.showAccountMenuDrawer = false;
  }

  _toggleLang(e) {
    e.stopPropagation();
    this.showLangMenu = !this.showLangMenu;
    this.showAccountMenu = false;
  }

  _toggleAccount(e) {
    e.stopPropagation();
    this.showAccountMenu = !this.showAccountMenu;
    this.showLangMenu = false;
  }

  _toggleLangDrawer(e) {
    e.stopPropagation();
    this.showLangMenuDrawer = !this.showLangMenuDrawer;
    this.showAccountMenuDrawer = false;
  }

  _toggleAccountDrawer(e) {
    e.stopPropagation();
    this.showAccountMenuDrawer = !this.showAccountMenuDrawer;
    this.showLangMenuDrawer = false;
  }

  _onOutsideClick(e) {
    const path = e.composedPath();

    // Header dropdowns
    if (this.showLangMenu) {
      const langBtn = this.renderRoot.querySelector('.lang-wrapper:not(.drawer-user-actions .lang-wrapper)');
      if (!path.includes(langBtn)) this.showLangMenu = false;
    }
    if (this.showAccountMenu) {
      const accBtn = this.renderRoot.querySelector('.acct-wrapper:not(.drawer-user-actions .acct-wrapper)');
      if (!path.includes(accBtn)) this.showAccountMenu = false;
    }

    // Drawer dropdowns
    if (this.showLangMenuDrawer) {
      const langBtnDrawer = this.renderRoot.querySelector('.drawer-user-actions .lang-wrapper');
      if (!path.includes(langBtnDrawer)) this.showLangMenuDrawer = false;
    }
    if (this.showAccountMenuDrawer) {
      const accBtnDrawer = this.renderRoot.querySelector('.drawer-user-actions .acct-wrapper');
      if (!path.includes(accBtnDrawer)) this.showAccountMenuDrawer = false;
    }

    // Sidebar open/close
    if (this.menuOpen) {
      const sb = this.renderRoot.querySelector('.sidebar-menu');
      const btn = this.renderRoot.querySelector('.menu-button');
      if (!path.includes(sb) && !path.includes(btn)) this.menuOpen = false;
    }
  }

  render() {
    return html`
      <header class="header-top">
        <div class="top-row">
          <button class="menu-button" @click="${this.toggleSidebar}" aria-label="Abrir menú">☰</button>
          <div class="logo" @click="${() => window.location.replace('/')}">Gestor de Recetas</div>
        </div>
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
          <div class="lang-wrapper" @click="${this._toggleLang}">ES ▾
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

          ${this.showInstallButton
            ? html`<div
                class="install-button"
                @click="${this._handleInstallClick}"
                title="Instalar la App"
              >
                📲 Instalar App
              </div>`
            : ''}

          <espe-boton-carrito></espe-boton-carrito>
        </div>
      </header>

      <!-- Drawer sidebar -->
      <div class="overlay ${this.menuOpen ? 'show' : ''}" @click="${this.toggleSidebar}"></div>
      <nav class="sidebar-menu ${this.menuOpen ? 'show' : ''}" @click=${e => e.stopPropagation()}>
        <span class="mdl-layout__drawer-title">Title</span>
        <nav class="mdl-navigation">
          <a class="mdl-navigation__link" href="#">Link 1</a>
          <a class="mdl-navigation__link" href="#">Link 2</a>
          <a class="mdl-navigation__link" href="#">Link 3</a>
          <a class="mdl-navigation__link" href="#">Link 4</a>

          ${this.showInstallButton
            ? html`<div
                class="mdl-navigation__link app--install"
                @click="${this._handleInstallClick}"
              >
                📲 Instalar App
              </div>`
            : ''}
        </nav>

        <div class="user-actions drawer-user-actions">
          <div class="lang-wrapper" @click="${this._toggleLangDrawer}">ES ▾
            ${this.showLangMenuDrawer
              ? html`<div class="dropdown">
                  <ul>
                    <li>Español – ES</li>
                    <li>English – EN</li>
                  </ul>
                </div>`
              : ''}
          </div>
          <div class="acct-wrapper" @click="${this._toggleAccountDrawer}">
            Hola, Usuario<br /><strong>Cuenta y Listas</strong> ▾
            ${this.showAccountMenuDrawer
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
        </div>
      </nav>
    `;
  }
}

customElements.define('header-component', HeaderComponent);
