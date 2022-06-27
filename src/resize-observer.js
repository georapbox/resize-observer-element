const template = document.createElement('template');

const html = String.raw;

template.innerHTML = html`
  <style>:host { display: contents; }</style>
  <slot></slot>
`;

class ResizeObserverElement extends HTMLElement {
  constructor() {
    super();

    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    this._slot = this.shadowRoot.querySelector('slot');
    this._resizeObserver = null;
    this._observedElements = [];

    this._onSlotChange = this._onSlotChange.bind(this);

    this._upgradeProperty('disabled');
  }

  static get observedAttributes() {
    return ['disabled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'disabled' && oldValue !== newValue) {
      this.disabled ? this._stopObserver() : this._startObserver();
    }
  }

  connectedCallback() {
    if ('ResizeObserver' in window) {
      this._resizeObserver = new ResizeObserver(entries => {
        this.dispatchEvent(new CustomEvent('resize-observer:resize', {
          bubbles: true,
          composed: true,
          detail: { entries }
        }));
      });

      if (!this.disabled) {
        this._startObserver();
      }

      this._slot.addEventListener('slotchange', this._onSlotChange);
    }
  }

  disconnectedCallback() {
    this._stopObserver();
    this._slot.removeEventListener('slotchange', this._onSlotChange);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  _startObserver() {
    if (!this._slot || !this._resizeObserver) {
      return;
    }

    this._observedElements.forEach(el => this._resizeObserver.unobserve(el));
    this._observedElements = [];

    this._slot.assignedElements().forEach(el => {
      this._resizeObserver.observe(el);
      this._observedElements.push(el);
    });
  }

  _stopObserver() {
    this._resizeObserver && this._resizeObserver.disconnect();
  }

  _onSlotChange() {
    if (!this.disabled) {
      this._startObserver();
    }
  }

  _upgradeProperty(prop) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  static defineCustomElement(elementName = 'resize-observer') {
    if (typeof window !== 'undefined' && !window.customElements.get(elementName)) {
      window.customElements.define(elementName, ResizeObserverElement);
    }
  }
}

export { ResizeObserverElement };
