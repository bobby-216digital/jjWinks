if (!customElements.get('custom-modal')) {
  customElements.define(
    'custom-modal',
    class customModal extends HTMLElement {
      constructor() {
        super();
        this.buttonClose = this.querySelector('.button-close');

        if (window.cartStrings) {
          setTimeout(() => {
            this.open();
          }, 10000);
        }

        if (this.buttonClose) {
          this.buttonClose.addEventListener('click', (e) => {
            e.preventDefault();
            this.close();
          });
        }
      }

      open() {
        this.style.display = 'flex';
      }

      close() {
        this.style.display = 'none';
      }
    }
  );
}
