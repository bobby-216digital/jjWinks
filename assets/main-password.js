class PasswordModal extends HTMLElement {
  constructor() {
    super();

    this.button = this.querySelector('button.password__popup-link');
    this.modal = this.querySelector('.modal');
    this.closeButton = this.querySelector('.modal__close');
    this.modalBackground = this.querySelector('.modal__background');

    this.focusTrap = focusTrap.createFocusTrap(this.modal, {
      initialFocus: false,
    });

    this.bindEvents();

    const errorMessage = this.querySelector('#PasswordLoginForm-password-error');

    if (errorMessage) {
      this.showModal();
    }
  }

  bindEvents() {
    this.button.addEventListener('click', (event) => {
      event.preventDefault();
      this.showModal();
    });

    this.closeButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.hideModal();
    });
    this.modalBackground.addEventListener('click', (event) => {
      event.preventDefault();
      this.hideModal();
    });
    this.addEventListener('keyup', (event) => {
      if (event.code.toUpperCase() !== 'ESCAPE') return;
      this.hideModal();
    });
  }

  showModal() {
    document.body.classList.add('has-modal');
    this.modal.classList.add('modal--active');
    this.closeButton = this.querySelector('.modal__close');
    this.closeButton.focus();

    this.focusTrap.activate();
  }

  hideModal() {
    document.body.classList.remove('has-modal');
    this.modal.classList.remove('modal--active');

    this.focusTrap.deactivate();
  }
}

if (!customElements.get('password-modal')) {
  customElements.define('password-modal', PasswordModal);
}
