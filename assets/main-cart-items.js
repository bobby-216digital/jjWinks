/******/ (() => { // webpackBootstrap
  var __webpack_exports__ = {};
  class CartItems extends HTMLElement {
    constructor() {
      super();

      this.form = this.querySelector('.cart-items__form');
      this.emptyMessage = this.querySelector('.cart-items__empty');
      this.lineItemStatusElement = document.getElementById(
        'shopping-cart-line-item-status'
      );

      this.currentItemCount = Array.from(
        this.querySelectorAll('[name="updates[]"]')
      ).reduce(
        (total, quantityInput) => total + parseInt(quantityInput.value),
        0
      );


      this.debouncedOnChange = this.debounce((event) => {
        this.onChange(event);
      }, 300);

      this.addEventListener('change', this.debouncedOnChange.bind(this));
    }

    debounce = (e, t) => {
      let i;
      return (...n) => {
        clearTimeout(i),
          i = setTimeout(() => e.apply(void 0, n), t)
      }
    }

    onChange(event) {
      this.updateQuantity(
        event.target.dataset.index,
        event.target.value,
        document.activeElement.getAttribute('name'),
        event.target
      );
    }

    getSectionsToRender() {
      return [
        {
          id: 'main-cart-items',
          section: document.getElementById('main-cart-items').dataset.sectionId,
          selector: '.cart-items__products',
        },
        {
          id: 'cart-button',
          section: 'cart-button',
        },
        {
          id: 'main-cart-footer',
          section: document.getElementById('main-cart-footer').dataset.sectionId,
          selector: '.cart-block__subtotal',
        },
      ];
    }
    /* for product progress bar */
    barProgressFetch(url, params) {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      })
        .then((response) => {
          window.location.reload();
        })
        .catch((e) => {
          console.error(e);
        })
    }

    barProgressProductFn(parsedState) {
      let progressBarCtn = document.querySelector('cart-items .progress-bar-container');

      if (progressBarCtn) {
        let bar = progressBarCtn.querySelector('cart-items .progress-bar .progress');
        let barMessage = progressBarCtn.querySelector('cart-items .progress-bar-message');
        let barMessageIncomplete = progressBarCtn.dataset.incomplete;
        let barMessageIncompleteIcon = progressBarCtn.dataset.incompleteicon;
        let barMessageCompleteIcon = progressBarCtn.dataset.completeicon;
        let barMessageComplete = progressBarCtn.dataset.complete;
        let barProgressProductPrice = parseInt(progressBarCtn.dataset.productprice);
        let ProductPrice = progressBarCtn.dataset.productPrice;
        let barMax = parseFloat(progressBarCtn.dataset.max);

        let giftProductAjax = true;
        let bodyProductGift = { items: [] };
        let total_price = parsedState.original_total_price;
        let variantid = progressBarCtn.dataset.variantid;

        for (let i = 0; i < parsedState.items.length; i++) {
          const item = parsedState.items[i];
          if (item.product_id == parseInt(progressBarCtn.dataset.productid)) {
            giftProductAjax = false;
            total_price = parsedState.original_total_price - barProgressProductPrice;
            variantid = item.id;
          }
        }

        if (total_price >= barMax) {
          bar.style.width = '100%';

          let completeIcon = '';

          /* if (barMessageComplete) {
            completeIcon = `<img src="${barMessageCompleteIcon}" width="30" height="30">`;
          } */

          barMessage.innerHTML = barMessageComplete.replace('[[complete]]', completeIcon);

          if (giftProductAjax) {
            bodyProductGift.items = [
              {
                id: variantid,
                quantity: 1
              }
            ];

            //this.barProgressFetch(theme.routes.cart_add_url, bodyProductGift); /* for product progress bar */
          }

        } else {

          if (!giftProductAjax) {
            bodyProductGift.updates = {
              [variantid]: 0,
            };

            //this.barProgressFetch(theme.routes.cart_update_url, bodyProductGift); /* for product progress bar */
          }

          let percentage = (parsedState.original_total_price * 100) / barMax;
          bar.style.width = `${percentage}%`;
          let priceBarMessage = progressBarCtn.dataset.priceformat.replace('0.00', Math.abs(parseFloat((barMax - parsedState.original_total_price) / 100)).toFixed(2));

          let incompleteIcon = '';

          /* if (barMessageIncompleteIcon) {
            incompleteIcon = `<img src="${barMessageIncompleteIcon}" width="30" height="30">`;
          } */

          let completeIcon = '';

          /* if (barMessageComplete) {
            completeIcon = `<img src="${barMessageCompleteIcon}" width="30" height="30">`;
          } */

          barMessage.innerHTML = incompleteIcon + barMessageIncomplete.replace('[[money]]', priceBarMessage).replace('[[complete]]', completeIcon)/*  + `(${ProductPrice} value)` */
        }
      }
    }

    updateQuantity(line, quantity, name, currentElement = { value: false }) {
      this.enableLoading(line);

      if (name == 'Color') {
        let giftProductData = JSON.parse(document.getElementById('gift_product_data').textContent);
        let giftProductAjax = false;
        let newVariantid = false;

        for (let i = 0; i < giftProductData.length; i++) {
          const elm = giftProductData[i];
          if (elm.name.includes(currentElement.value)) {
            newVariantid = elm.id;
            giftProductAjax = true;
            break;
          }
        }

        if (giftProductAjax) {
          let bodyProductGift = {};
          bodyProductGift.updates = {
            [currentElement.dataset.variantid]: 0,
            [newVariantid]: 1,
          };

          //this.barProgressFetch(theme.routes.cart_update_url, bodyProductGift); /* for product progress bar */
        }

        return
      }

      const body = JSON.stringify({
        line,
        quantity,
        sections: this.getSectionsToRender().map((section) => section.section),
        sections_url: window.location.pathname,
      });

      fetch(`${theme.routes.cart_change_url}`, {
        ...theme.fetchConfig(),
        ...{ body },
      })
        .then((response) => {
          return response.text();
        })
        .then((state) => {
          const parsedState = JSON.parse(state);

          this.barProgressProductFn(parsedState);

          // Hide cart footer elements too
          if (parsedState.item_count === 0) {
            this.form.classList.add('hidden');
            this.emptyMessage.classList.remove('hidden');
          } else {
            this.form.classList.remove('hidden');
            this.emptyMessage.classList.add('hidden');
          }

          this.getSectionsToRender().forEach((section) => {
            const elementToReplace =
              document
                .getElementById(section.id)
                .querySelector(section.selector) ||
              document.getElementById(section.id);

            elementToReplace.innerHTML = this.getSectionInnerHTML(
              parsedState.sections[section.section],
              section.selector
            );
          });

          this.updateLiveRegions(line, parsedState.item_count);
          const lineItem = document.getElementById(`CartItem-${line}`);
          if (lineItem && lineItem.querySelector(`[name="${name}"]`)) lineItem.querySelector(`[name="${name}"]`).focus();
          this.disableLoading();
        })
        .catch((error) => {
          this.querySelectorAll(`.loading-spinner`).forEach(
            (spinner) => {
              spinner.classList.remove('hidden')
              spinner.classList.add('block')
            }
          );
          document.getElementById('cart-errors').textContent =
            window.cartStrings.error;
          this.disableLoading();
        });
    }

    getSectionInnerHTML(html, selector = '.shopify-section') {
      return new DOMParser()
        .parseFromString(html, 'text/html')
        .querySelector(selector).innerHTML;
    }

    updateLiveRegions(line, itemCount) {
      this.currentItemCount = itemCount;
      this.lineItemStatusElement.setAttribute('aria-hidden', true);

      const cartStatus = document.getElementById('cart-live-region-text');
      cartStatus.setAttribute('aria-hidden', false);

      setTimeout(() => {
        cartStatus.setAttribute('aria-hidden', true);
      }, 1000);
    }

    enableLoading(line) {
      this.form.classList.add('pointer-events-none');
      this.querySelectorAll(`#CartItem-${line} .loading-spinner`).forEach(
        (spinner) => {
          const totalContent = spinner.parentElement.querySelector('.cart-item__total-content');
          totalContent.classList.add('hidden');
          spinner.classList.remove('hidden')
          spinner.classList.add('block')
        }
      );
      document.activeElement.blur();
      this.lineItemStatusElement.setAttribute('aria-hidden', false);
    }

    disableLoading() {
      this.form.classList.remove('pointer-events-none');
    }
  }
  customElements.define('cart-items', CartItems);

  class CartAddGift extends HTMLElement {
    constructor() {
      super();

      this.gift_box_container = this.querySelector('.gift-box__wrapper');
      this.gift_list_items = this.querySelector('.cart-items__products');
      this.gift_form = this.querySelector('.gift-form');
      this.gift_id = this.querySelector('input[name="id"]').value;
      this.gift_pr = this.querySelector('input[name="pr"]').value;
      this.gift_cur = this.querySelector('input[name="cur"]').value;
      this.input_from = this.querySelector('.from');
      this.input_to = this.querySelector('.to');
      this.input_message = this.querySelector('.message');

      this.btn_add_gift = this.querySelector('.gift-add');
      this.btn_add_note = this.querySelector('.gift-note');
      if (this.btn_add_gift != null) {
        this.btn_add_gift.addEventListener('click', (event) => {
          event.preventDefault();
          this.addGift()
        });
      }

      if (this.btn_add_note != null) {
        this.btn_add_note.addEventListener('click', (event) => {
          event.preventDefault()
          this.addNote()
        });
      }

      this.getCart()
    }


    enableButtons() {
      if (this.btn_add_note != null) {
        this.btn_add_note.innerText = 'ADD A GIFT NOTE';
        this.btn_add_note.removeAttribute('disabled');
        this.btn_add_note.style.background = '#839565';
      }

      if (this.btn_add_gift != null) {
        this.btn_add_gift.innerText = 'add to cart';
        this.btn_add_gift.removeAttribute('disabled');
        this.btn_add_gift.removeAttribute('disabled');
      }

      if (this.input_from != '') {
        this.input_from.removeAttribute('disabled');
        this.input_to.removeAttribute('disabled');
      }

      if (this.input_message != null) {
        this.input_message.removeAttribute('disabled');
      }

    }
    disableButtons() {
      if (this.btn_add_note != null) {
        this.btn_add_note.innerText = 'NOTE ADDED';
        this.btn_add_note.setAttribute('disabled', 'true');
        this.btn_add_note.style.background = '#008000';
      }

      if (this.btn_add_gift != null) {
        this.btn_add_gift.innerText = 'SUCCESS';
        this.btn_add_gift.setAttribute('disabled', 'true');
        this.btn_add_gift.setAttribute('disabled', 'true');
      }

      if (this.input_from != '') {
        this.input_from.setAttribute('disabled', 'true');
        this.input_to.setAttribute('disabled', 'true');
      }

      if (this.input_message != null) {
        this.input_message.setAttribute('disabled', 'true');
      }

    }
    formatMoney(cents, format) {
      if (typeof cents == 'string') { cents = cents.replace('.', ''); }
      var value = '';
      var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
      var formatString = (format || this.money_format);

      function defaultOption(opt, def) {
        return (typeof opt == 'undefined' ? def : opt);
      }

      function formatWithDelimiters(number, precision, thousands, decimal) {
        precision = defaultOption(precision, 2);
        thousands = defaultOption(thousands, ',');
        decimal = defaultOption(decimal, '.');

        if (isNaN(number) || number == null) { return 0; }

        number = (number / 100.0).toFixed(precision);

        var parts = number.split('.'),
          dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
          cents = parts[1] ? (decimal + parts[1]) : '';

        return dollars + cents;
      }

      switch (formatString.match(placeholderRegex)[1]) {
        case 'amount':
          value = formatWithDelimiters(cents, 2);
          break;
        case 'amount_no_decimals':
          value = formatWithDelimiters(cents, 0);
          break;
        case 'amount_with_comma_separator':
          value = formatWithDelimiters(cents, 2, '.', ',');
          break;
        case 'amount_no_decimals_with_comma_separator':
          value = formatWithDelimiters(cents, 0, '.', ',');
          break;
      }

      return formatString.replace(placeholderRegex, value);
    };
    getCart() {
      fetch('/cart.js')
        .then((response) => response.json())
        .then((data) => {
          for (let i in data.items) {
            // Check if the gift_box is already added
            if (data.items[i].id == this.gift_id) {
              document.querySelector(`[data-cart-item="${data.items[i].key}"] quantity-select`).style.display = 'none';
              document.querySelector(`[data-cart-item="${data.items[i].key}"] cart-remove-button a`).addEventListener('click', (event) => {
                event.preventDefault()
                this.getCart();
                this.enableButtons()
              })
              document.querySelector('.cart-button__count').innerText = data.item_count
              document.querySelector('.cart-button__total').innerText = this.gift_cur + '' + this.formatMoney(data.original_total_price, '{{amount}}')
              document.querySelector('.subtotal p').innerText = this.gift_cur + '' + this.formatMoney(data.original_total_price, '{{amount}}') + ' ' + data.currency
            }
          }
        });

    };


    addGiftData = async (form_data) => {
      try {
        const response = await fetch(window.Shopify.routes.root + 'cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form_data)
        });


        if (response.status === 200) {
          const data = await response.json();
          let gift_item_html =
            `
          <div class="cart-items__product cart-item py-4 flex" data-cart-item="${data.key}">
              <div class="flex flex-wrap flex-auto">
                  <div class="w-full flex">
                    <div class="cart-item__media flex-none">
                        <a href="${data.url}" class="block w-16 sm:w-20 md:w-36 mr-2 sm:mr-4 navigable">
                          <img src="${data.featured_image.url}" class="cart-item__image w-full">
                        </a>
                    </div>
                    <div class="flex-auto flex flex-wrap md:flex-nowrap">
                        <div class="cart-item__details flex-auto rtl:pr-4">
                            <a href="${data.url}" class="block w-16 sm:w-20 md:w-36 mr-2 sm:mr-4 navigable">
                                ${data.title}
                            </a>
                            <div class="cart-item__price text-sm">
                                ${this.gift_pr}
                            </div>
                        </div>
                        <div class="cart-item__quantity w-full mt-2 md:mt-0 md:w-40 max-w-[10rem]">
                        <quantity-select style="display: none">
                          <div class="quantity cart-items-form__input cart-items-form__quantity">
                            <label class="quantity__label sr-only" for="">
                            </label>
                            <div class="quantity__container">
                              <button class="quantity__button no-js-hidden" name="minus" type="button">
                                <span class="sr-only"></span>
                                <svg aria-hidden="true" focusable="false" class="icon fill-current icon-ui-minus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M368 224H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h352c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"></path></svg>
                              </button>
                              <input class="quantity__input"  type="number" value="1">
                              <button class="quantity__button no-js-hidden" name="plus" type="button">
                                <span class="sr-only"></span>
                                <svg aria-hidden="true" focusable="false" class="icon fill-current icon-ui-plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"></path></svg>
                              </button>
                            </div>
                          </div>
                        </quantity-select>
                          <cart-remove-button class="block text-center remove" id="Remove-01" data-index="01">
                            <a href="change?id=${data.key}&quantity=0" class="underline text-primary-text-80 font-navigation text-xs inline-block">
                              Remove
                            </a>
                          </cart-remove-button>
                        </div>
                    </div>
                  </div>
              </div>
              <div class="cart-item__total text-right flex-none w-auto sm:w-24 md:w-36 ml-4">
                    <div class="cart-item__total-content">
                        <div class="cart-item__price text-base font-weight-body-bolder text-primary-accent md:text-lg">${this.gift_pr}</div>
                    </div>
               </div>
           </div>`;

          document.querySelector('.cart-items__products').innerHTML += gift_item_html;
          this.getCart();
          this.disableButtons()
        }
      } catch (error) {
        console.log(error);
      }
    }
    addGift() {
      let form_data = {
        'items': {
          'quantity': 1,
          'id': this.gift_id
        }
      };
      this.addGiftData(form_data['items'])
    }

    addNoteData = async (form_data) => {
      try {
        const response = await fetch(window.Shopify.routes.root + 'cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form_data)
        });


        if (response.status === 200) {
          const data = await response.json();
          this.getCart();
          this.disableButtons()
        }
      } catch (error) {
        console.log(error);
      }
    }
    addNote() {
      let form_data = {
        'items': {
          'quantity': 1,
          'id': this.gift_id,
          'properties': {
            from: this.input_from.value,
            to: this.input_to.value,
            message: this.input_message.value
          }
        }
      };
      this.addNoteData(form_data['items'])
    }
  }
  customElements.define('cart-add-gift', CartAddGift);

  class CartRemoveButton extends HTMLElement {
    constructor() {
      super();
      this.addEventListener('click', (event) => {
        event.preventDefault();
        this.closest('cart-items').updateQuantity(this.dataset.index, 0);
      });
    }
  }
  customElements.define('cart-remove-button', CartRemoveButton);

  class CartAgreement extends HTMLElement {
    constructor() {
      super();

      this.section = this.closest('[data-section-id]');
      this.checkoutButtons = this.section.querySelector('.cart-block__buttons');
      if (!this.checkoutButtons) return;

      this.checkbox = this.querySelector('input[type="checkbox"]');
      this.toggleCheckout(this.checkbox.checked);

      this.checkbox.addEventListener('change', (event) => {
        this.toggleCheckout(event.currentTarget.checked);
      });
    }

    toggleCheckout(checked) {
      if (checked === true) {
        this.checkoutButtons.classList.remove('pointer-events-none', 'opacity-50');
      } else {
        this.checkoutButtons.classList.add('pointer-events-none', 'opacity-50');
      }
    }
  }
  customElements.define('cart-agreement', CartAgreement);

  class CartNote extends HTMLElement {
    constructor() {
      super();

      this.addEventListener('change', this.debounce((event) => {
        const body = JSON.stringify({ note: event.target.value });
        fetch(`${theme.routes.cart_update_url}`, { ...theme.fetchConfig(), ...{ body } });
      }, 300))
    }

    debounce = (e, t) => {
      let i;
      return (...n) => {
        clearTimeout(i),
          i = setTimeout(() => e.apply(void 0, n), t)
      }
    }
  }
  customElements.define('cart-note', CartNote);



  /******/
})()
  ;