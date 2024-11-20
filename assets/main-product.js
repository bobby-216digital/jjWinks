if (!customElements.get('product-details-modal')) {
  class ProductDetailsModal extends HTMLElement {
    constructor() {
      super();

      this.button = this.querySelector('button.product__popup-link');
      this.modal = this.querySelector('.modal');
      this.closeButton = this.querySelector('.modal__close');
      this.modalBackground = this.querySelector('.modal__background');

      this.focusTrap = focusTrap.createFocusTrap(this.modal, {
        initialFocus: false,
      });

      this.bindEvents();
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
  customElements.define('product-details-modal', ProductDetailsModal);
}

if (!customElements.get('media-slideshow')) {
  class MediaSlideshow extends HTMLElement {
    constructor() {
      super();

      this.slideshow = this.querySelector('.splide.media__main');
      this.slideshowList = this.slideshow.querySelector('.splide__list');
      this.slides = this.slideshow.querySelectorAll('.splide__slide');
      this.slideshowThumbnails = this.querySelector('.splide.media__thumbnails');
      this.mediaRatio = this.slideshow.dataset.mediaRatio;
      this.thumbnailPlacement = this.slideshow.dataset.thumbnailPlacement;

      this.mediaThumbnailsScrolling = this.querySelector('.media__thumbnails--scrolling');
      if (this.mediaThumbnailsScrolling) {
        this.mediaThumbnails = this.mediaThumbnailsScrolling.querySelectorAll('.media__thumbnail');
      }

      this.bindEvents();

      // Lightbox and zoom (disabled for touch devices)
      if (theme.isTouchDevice()) return;
      const zoomEnabled = JSON.parse(this.dataset.zoom);
      const lightboxEnabled = JSON.parse(this.dataset.lightbox);

      if (zoomEnabled) {
        this.initZoom();
      }
      if (lightboxEnabled) {
        this.initLightbox();
      }
    }

    connectedCallback() {
      this.initSlideshow();
    }

    bindEvents() {
      if (this.mediaThumbnails) {
        this.mediaThumbnails.forEach((thumbnail) => {
          thumbnail.addEventListener('click', (event) => this.selectThumbnail(event));
        });
      }
    }

    initSlideshow() {
      // Main
      this.slideshowOptions = JSON.parse(this.slideshow.dataset.options);

      // Media ratio
      switch (this.mediaRatio) {
        case 'square':
          this.slideshowOptions.heightRatio = 1;
          break;

        case 'portrait':
          this.slideshowOptions.heightRatio = 1.5;
          break;

        case 'landscape':
          this.slideshowOptions.heightRatio = 0.75;
          break;
      }

      this.slides.forEach((slide, index) => {
        slide.setAttribute('data-slide-index', index);
      });

      this.main = new theme.Splide(this.slideshow, this.slideshowOptions);
      this.main.on('move', (index, prev, dest) => {
        if (this.mediaRatio === 'adapt') {
          let indexId = index + 1;
          if (indexId < 10) {
            indexId = `0${indexId}`;
          }

          const destSlide = this.slideshow.querySelector(`#${this.main.root.id}-slide${indexId}`);
          const destSlideImage = destSlide.querySelector('.product__media-image');
          this.slideshowList.style.height = `${destSlideImage.offsetHeight}px`;
        }
      });

      this.main.on('moved', (newIndex, prevIndex, destIndex) => {
        if (this.mediaThumbnailsScrolling) {
          const activeClass = 'media__thumbnail--active';
          const prevActive = this.querySelector(`.${activeClass}`);
          const active = this.mediaThumbnailsScrolling.querySelector(
            `.media__thumbnail[data-index="${newIndex}"]`
          );

          prevActive.classList.remove(activeClass);
          active.classList.add(activeClass);

          active.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
          });
        }
      });

      this.main.on('mounted', () => {
        if (this.mediaRatio === 'adapt') {
          this.onResize();

          const activeSlide = this.slideshow.querySelector('.splide__slide.is-active');
        }
      });

      // Thumbnails
      if (this.slideshowThumbnails) {
        this.slideshowThumbnailsOptions = JSON.parse(this.slideshowThumbnails.dataset.options);
        this.thumbnails = new theme.Splide(
          this.slideshowThumbnails,
          this.slideshowThumbnailsOptions
        );

        this.main.sync(this.thumbnails);
      }

      this.main.mount();

      if (this.slideshowThumbnails) {
        this.thumbnails.mount();

        // Resize thumbnail container if smaller than overall slideshow
        const track = this.slideshowThumbnails.querySelector('.splide__track');
        const list = this.slideshowThumbnails.querySelector('.splide__list');
        const thumbnails = list.querySelectorAll('.splide__slide');

        const trackStyles = getComputedStyle(track);
        const trackMarginLeft = parseInt(trackStyles.marginLeft);
        const trackMarginRight = parseInt(trackStyles.marginRight);

        this.thumbnailsContainer = this.querySelector('.media__thumbnails-container');

        this.mediaResizeObserver = new ResizeObserver((entries) => {
          const target = entries[0].target;

          let thumbnailsWidths = 0;
          thumbnails.forEach((thumbnail, index) => {
            const thumbnailStyles = getComputedStyle(thumbnail);
            let thumbMargin = 0;
            if (index + 1 !== thumbnails.length) {
              thumbMargin =
                parseFloat(thumbnailStyles.marginLeft) + parseFloat(thumbnailStyles.marginRight);
            }

            thumbnailsWidths = thumbnailsWidths + thumbnail.offsetWidth + thumbMargin;
          });

          const containerWidth = thumbnailsWidths + trackMarginLeft + trackMarginRight;

          if (containerWidth < target.offsetWidth) {
            this.thumbnailsContainer.style.width = `${containerWidth}px`;
            this.thumbnails.refresh();
          } else {
            this.thumbnailsContainer.style.width = 'auto';
          }
        });
        this.mediaResizeObserver.observe(this);
      }
    }

    initZoom() {
      const mediaSlides = [...this.slides].filter((slide) => {
        return slide.dataset.mediaType === 'image';
      });

      const slideWidth = mediaSlides[0].offsetWidth;
      this.setAttribute('data-zoom-enabled', true);

      mediaSlides.forEach((slide) => {
        const media = slide.querySelector('.product__media-image');
        let maxZoomWidth = Number(media.dataset.width);
        if (maxZoomWidth > 1400) maxZoomWidth = 1400;

        if (slideWidth > maxZoomWidth) {
          slide.classList.add('zoom-disabled');
          return;
        }

        slide.style.backgroundImage = `url(${media.src})`;

        slide.addEventListener('mousemove', (event) => {
          const media = event.currentTarget.querySelector('.product__media-image');
          const maxZoomWidth = Number(media.dataset.width);

          const zoomer = event.currentTarget;
          let offsetX;
          let offsetY;

          event.offsetX ? (offsetX = event.offsetX) : (offsetX = event.touches[0].pageX);
          event.offsetY ? (offsetY = event.offsetY) : (offsetY = event.touches[0].pageY);

          const x = (offsetX / zoomer.offsetWidth) * 100;
          const y = (offsetY / zoomer.offsetHeight) * 100;
          zoomer.style.backgroundPosition = `${x}% ${y}%`;
        });
      });
    }

    initLightbox() {
      const mediaSlides = [...this.slides].filter((slide) => {
        return slide.dataset.mediaType === 'image';
      });
      mediaSlides.forEach((slide) => {
        const media = slide.querySelector('.product__media-image');
        media.classList.add('cursor-pointer');
        media.addEventListener('click', (event) => {
          this.showLightbox(event.target);
        });
      });

      this.modal = this.querySelector('.modal');
      this.closeButton = this.querySelector('.modal__close');
      this.modalBackground = this.querySelector('.modal__background');
      this.modalContainer = this.querySelector('.modal__container');

      this.focusTrap = focusTrap.createFocusTrap(this.modal, {
        initialFocus: false,
      });

      // Events
      this.closeButton.addEventListener('click', (event) => {
        event.preventDefault();
        this.closeLightbox();
      });
      this.modalBackground.addEventListener('click', (event) => {
        event.preventDefault();
        this.closeLightbox();
      });
      this.modalContainer.addEventListener('click', (event) => {
        event.preventDefault();
        this.closeLightbox();
      });
      this.addEventListener('keyup', (event) => {
        if (event.code.toUpperCase() !== 'ESCAPE') return;
        this.closeLightbox();
      });
    }

    showLightbox(image) {
      if (!image) return;

      const imageClone = image.cloneNode(true);

      imageClone.setAttribute('sizes', '100vw');
      imageClone.classList.remove('cursor-pointer');
      const modalContainer = this.modal.querySelector('.modal__container');
      modalContainer.replaceChildren(imageClone);

      document.body.classList.add('has-modal');
      this.modal.classList.add('modal--active');
      this.closeButton = this.querySelector('.modal__close');
      this.closeButton.focus();

      this.focusTrap.activate();
    }

    closeLightbox() {
      document.body.classList.remove('has-modal');
      this.modal.classList.remove('modal--active');

      this.focusTrap.deactivate();
    }

    disableDrag() {
      this.main.options = {
        drag: false,
        keyboard: false,
      };
    }

    enableDrag() {
      this.main.options = {
        drag: true,
        keyboard: true,
      };
    }

    selectThumbnail(event) {
      const activeClass = 'media__thumbnail--active';
      const prevActive = this.querySelector(`.${activeClass}`);
      const active = event.currentTarget;
      const index = Number(active.dataset.index);

      prevActive.classList.remove(activeClass);
      active.classList.add(activeClass);

      this.main.go(index);
    }

    setActiveMedia(mediaId) {
      const activeSlide = this.querySelector(`[data-media-id="${mediaId}"]`);
      if (!activeSlide) return;

      const activeSlideIndex = Number(activeSlide.dataset.slideIndex);
      this.main.go(activeSlideIndex);
    }

    onResize() {
      this.slideshowResizeObserver = new ResizeObserver((entries) => {
        const activeSlideImage = this.slideshow.querySelector(
          '.splide__slide.is-active .product__media-image'
        );
        if (this.main.state.is(theme.Splide.STATES.IDLE)) {
          this.slideshowList.style.height = `${activeSlideImage.offsetHeight}px`;
        }
      });

      this.slideshowResizeObserver.observe(this.slideshow);
    }
  }
  customElements.define('media-slideshow', MediaSlideshow);
}

if (!customElements.get('bundle-item') && !customElements.get('variant-radios')) {
  class BundleItem extends HTMLElement {
    constructor() {
      super();
    }

    async connectedCallback() {
      for (let index = 0; index < Array.from(this.querySelectorAll(".item")).length; index++) {
        const element = Array.from(this.querySelectorAll(".item"))[index];
        const response = await fetch(element.href + '.js');
        console.log("response", response);

      }
    }
  }

  customElements.define('bundle-item', BundleItem);
}

if (!customElements.get('variant-selects') && !customElements.get('variant-radios')) {
  class VariantSelects extends HTMLElement {
    constructor() {
      super();
      this.variantFetchData = [];
      this.section = this.closest('div[data-section-id]');
      this.variants = this.getVariantData();
      this.addEventListener('change', this.onVariantChange);

      this.bundleItem = document.querySelector('bundle-item');

      this.notificationMail = document.querySelector('#BIS_trigger');

      if(this.notificationMail) {
        this.notificationMail.style.display = 'none';
      }

      this.buildOptionsMap();
      window.onload = () => {
        this.observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node)=> {
              if (node.nodeType === Node.ELEMENT_NODE && node.id === 'BIS_trigger') {
                node.style.display = 'none';
              }
            });
          });
        });
      
        this.observer.observe(document.body, { childList: true, subtree: true });
      };
    }
    get buttonEmailNotification() {
      this._buttons = document.querySelectorAll('.button.button--full-width.button--secondary');
      if(this._buttons.length > 0) {
        this._buttons = Array.from(this._buttons).filter(button => button.id == "BIS_trigger");
      }
      return this._buttons;
    }

    get urlBundles() {
      return this.bundleItem.querySelectorAll(".item");
    }

    buildOptionsMap() {
      this.optionsMap = {};
      if (!this.variants) return;

      this.variants.forEach((variant) => {
        if (variant.available) {
          this.optionsMap['root'] = this.optionsMap['root'] || [];
          this.optionsMap['root'].push(variant.option1);

          const uniqueRootOptionsSet = new Set(this.optionsMap['root']);
          this.optionsMap['root'] = Array.from(uniqueRootOptionsSet);

          if (variant.options.length > 1) {
            const key = variant.option1;
            this.optionsMap[key] = this.optionsMap[key] || [];
            this.optionsMap[key].push(variant.option2);

            const uniqueOption1Set = new Set(this.optionsMap[key]);
            this.optionsMap[key] = Array.from(uniqueOption1Set);
          }

          if (variant.options.length === 3) {
            const key = `${variant.option1}/${variant.option2}`;
            this.optionsMap[key] = this.optionsMap[key] || [];
            this.optionsMap[key].push(variant.option3);

            const uniqueOption2Set = new Set(this.optionsMap[key]);
            this.optionsMap[key] = Array.from(uniqueOption2Set);
          }
        }
      });
      this.updateOptionsInSelector();
    }

    updateOptionsInSelector() {
      if (this.nodeName === 'VARIANT-SELECTS') return;

      const options = this.variants[0].options;
      for (let i in options) {
        let key;
        let fieldset;
        let isBundle = document.querySelector(".bundle-items");
        if (i == 0) {
          key = 'root';
        } else if (i == 1) {
          if (this.querySelectorAll('fieldset')[0].querySelector('input:checked')) {
            key = this.querySelectorAll('fieldset')[0].querySelector('input:checked').value;
          }
          
        } else {
          if (this.querySelectorAll('fieldset')[0].querySelector('input:checked')) {
            const tempValue = this.querySelectorAll('fieldset')[1]
            if(tempValue && tempValue.querySelector('input:checked')) {
              key = `${this.querySelectorAll('fieldset')[0].querySelector('input:checked').value}/${
                this.querySelectorAll('fieldset')[1].querySelector('input:checked').value
              }`;
            }
            
          }
          
        }
        if(isBundle) {
          key = "root";
        }
        const selector = this.querySelectorAll('fieldset')[i];

        let initialValue = selector.querySelector('input:checked');

        if(!initialValue) {
          initialValue = selector.querySelector('input').value;
        }else {
          initialValue = initialValue.value;
        }

        const availableOptions = this.optionsMap[key];

        if (!availableOptions) {
          const variantSelectors = selector.querySelectorAll('input');
          variantSelectors.forEach((variantSelector) => {
            variantSelector.classList.add('product-form__radio--disabled');
          });
          return;
        }

        const variantSelectors = selector.querySelectorAll('input');
        variantSelectors.forEach((variantSelector) => {
          if (availableOptions.includes(variantSelector.value)) {
            // variantSelector.disabled = false;
            variantSelector.classList.remove('product-form__radio--disabled');
          } else {
            // variantSelector.disabled = true;
            variantSelector.classList.add('product-form__radio--disabled');
          }
        });

        if (!availableOptions.includes(initialValue) && this.dataset.disableSoldout == 'true') {
          const availableInput = selector.querySelector(`input[value="${availableOptions[0]}"]`);
          // const availableLabel = selector.querySelectorAll(`label[for="${availableInput[0].id}"]`);
          availableInput.click();
          break;
        }
      }
    }

    onVariantChange() {
      this.updateOptions();
      this.updateMasterId();
      this.updateVariants();
      this.toggleAddButton(true, '', false);
      this.updatePickupAvailability();
      this.removeErrorMessage();
      this.updateOptionsInSelector();

      if (!this.currentVariant) {
        this.toggleAddButton(true, '', true);
        this.setUnavailable();
      } else {
        this.updateMedia();
        this.updateURL();
        this.updateVariantInput();
        this.renderProductInfo();
        this.updateShareUrl();
      }
      
      document.querySelector('body');

      if(this.bundleItem) {
        Array.from(this.bundleItem.querySelectorAll(".item")).forEach((urlBundle, index) => {
          if(!this.currentVariant) return;
          let scriptVariants = urlBundle.querySelector("script");
          if(!scriptVariants) return;
          scriptVariants = JSON.parse(scriptVariants.innerHTML);
          const currentVariant = scriptVariants.find(variant=> {
            const tempOptionsVariants = variant.options;
            const options = [urlBundle.dataset.color,this.currentVariant.options[index]];

            return this.existArrays(tempOptionsVariants, options)
          })
          if(!currentVariant) return;
          
          const productPreOrder = window.ta.products != null ? window.ta.products[urlBundle.dataset.productId]: null;
          
          if(!productPreOrder || !("variants" in productPreOrder)) return;
          

          const ifPreOrder = productPreOrder?.variants[currentVariant.id] || null;

          if(ifPreOrder && ifPreOrder.isPOEnabled && ifPreOrder.inventoryPolicy.toLowerCase() == "continue") { 
            let value = '';
            for (const prop in window.ta.settings) {
              if (window.ta.settings[prop].name == 'Pre-order') {
                value = window.ta.settings[prop].message.value;
                break;
              }
            }
            const date = new Date(ifPreOrder.config.shippingDate.date * 1000);
            value = value.replace("{{shippingDate}}", date.toLocaleDateString('en-US', { day: "numeric", month: "long", year: "numeric" }));
            urlBundle.querySelector('.notification-bundle').innerHTML = value;
            urlBundle.querySelector('.notification-bundle').style.display = 'block';
          }else {
            urlBundle.querySelector('.notification-bundle').innerHTML = "";
            urlBundle.querySelector('.notification-bundle').style.display = 'none';
          }

          const event = new CustomEvent('timesAct', {
            detail: { handle: urlBundle.href },
          });

          const element = document.querySelector('body');
          element.dispatchEvent(event);
        });
      }else {
        const event = new CustomEvent('timesAct', {
          detail: { handle: document.querySelector('div.product-url').dataset.url },
        });
        const element = document.querySelector('body');
        element.dispatchEvent(event);
      }
      
    }

    existArrays(array1, array2) {
      return array1.length === array2.length && array1.every((valor, index) => valor.toLowerCase() === array2[index].toLowerCase());
    }

    updateOptions() {
      this.options = Array.from(this.querySelectorAll('select'), (select) => select.value);
    }

    updateMasterId() {
      this.currentVariant = this.getVariantData().find((variant) => {
        return !variant.options
          .map((option, index) => {
            return this.options[index] === option;
          })
          .includes(false);
      });
    }

    updateVariants() {
      // Update swatches
      const swatches = this.querySelectorAll('.product-form__input.swatches');
      swatches.forEach((swatch) => {
        const swatchName = swatch.querySelector('.product-form__swatch-name');
        const radios = swatch.querySelectorAll('input[type="radio"]');
        let value = Array.from(radios).find((radio) => radio.checked);
        if(!value) {
          value = swatch.querySelector('input[type="radio"]').value;
        }else {
          value = value.value;
        }
        
        

        swatchName.textContent = value;
      });
    }
    validationButton() {
      const fieldset = Array.from(this.querySelectorAll('fieldset'));
      const optionChecked = fieldset.filter((element) => {
        return element.querySelector('input:checked');
      });
      return optionChecked.length === fieldset.length;
    }

    hiddenButton() {
      this.buttonEmailNotification.forEach((button) => {
        this.observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
              if (button.style.display === '' && !this.validationButton()) {
                button.style.display = 'none';
              }
            }
          });
        });

        this.observer.observe(button, { attributes: true });
        if(this.validationButton()) {
          this.observer.disconnect();
        }
      });
      
    }

    toggleAddButton(disable = true, text, modifyClass = true) {
      
      if(!this.validationButton()) {
        this.hiddenButton();
        return;
      }else {
        this.observer.disconnect();
      }

      const productForm = document.getElementById(`product-form-${this.dataset.section}`);
      if (!productForm) return;
      const addButton = productForm.querySelectorAll('[name="add"]');
      const addButtons = productForm.querySelector('.product-form__buttons');

      if (!addButton || addButton.length === 0) return;

      addButton.forEach((btn) => {
        const addButtonText = btn.querySelector('span');

        if (disable) {
          btn.setAttribute('disabled', 'disabled');
          if (text) addButtonText.textContent = text;
        } else {
          btn.removeAttribute('disabled');
          addButtonText.textContent = theme.strings.addToCart;
        }
      });

      if (disable) {
        if (modifyClass) {
          addButtons.dataset.enabled = false;
        }
      } else {
        addButtons.dataset.enabled = true;
      }

      if (!modifyClass) return;
    }

    updatePickupAvailability() {
      const pickUpAvailability = document.querySelector('pickup-availability');
      if (!pickUpAvailability) return;
      if (this.currentVariant && this.currentVariant.available) {
        pickUpAvailability.fetchAvailability(this.currentVariant.id);
      } else {
        pickUpAvailability.removeAttribute('available');
        pickUpAvailability.innerHTML = '';
      }
    }

    removeErrorMessage() {
      if (!this.section) return;
      const productForm = this.section.querySelector('product-form');
      if (productForm) productForm.handleErrorMessage();
    }

    setUnavailable() {
      const button = document.getElementById(`product-form-${this.dataset.section}`);
      const addButton = button.querySelector('[name="add"]');
      const addButtonText = button.querySelector('[name="add"] > span');
      const price = document.getElementById(`price-${this.dataset.section}`);

      if (!addButton) return;
      addButtonText.textContent = theme.strings.unavailable;
      if (price) price.classList.add('hidden');
    }

    updateMedia() {
      if (!this.currentVariant) return;
      if (!this.currentVariant.featured_media) return;

      const mediaSlideshow = document.getElementById(`MediaSlideshow-${this.dataset.section}`);
      mediaSlideshow.setActiveMedia(
        `${this.dataset.section}-${this.currentVariant.featured_media.id}`
      );
    }

    updateURL() {
      if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
      window.history.replaceState({}, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
    }

    updateVariantInput() {
      const productForms = document.querySelectorAll(
        `#product-form-${this.dataset.section}, #product-form-installment`
      );
      productForms.forEach((productForm) => {
        const input = productForm.querySelector('input[name="id"]');
        input.value = this.currentVariant.id;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    }

    renderProductInfo() {
      const url = `${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.section}`;
      const filterDataUrl = (element) => element.url === url;

      this.variantFetchData.some(filterDataUrl)
        ? this.renderProductInfoFromCache(filterDataUrl)
        : this.renderProductInfoFromFetch(url);
    }

    renderProductInfoFromCache(filterDataUrl) {
      const html = this.variantFetchData.find(filterDataUrl).html;
      this.renderProductPrice(html);
      this.renderProductButtons(html);
      this.renderProductLiquid(html);
    }

    renderProductInfoFromFetch(url) {
      fetch(url)
        .then((response) => response.text())
        .then((responseText) => {
          const html = responseText;
          this.variantFetchData = [...this.variantFetchData, { html, url }];
          this.renderProductPrice(html);
          this.renderProductButtons(html);
          this.renderProductLiquid(html);
        });
    }

    renderProductPrice(html) {
      const id = `price-${this.dataset.section}`;
      const parsedHTML = new DOMParser().parseFromString(html, 'text/html');
      const destination = document.getElementById(id);
      const source = parsedHTML.getElementById(id);

      if (source && destination) destination.innerHTML = source.innerHTML;
    }

    renderProductLiquid(html) {
      const sourceLiquidBlocks = document.querySelectorAll(
        `.product__liquid[data-section="${this.dataset.section}"]`
      );
      if (sourceLiquidBlocks.length === 0) return;

      const parsedHTML = new DOMParser().parseFromString(html, 'text/html');
      const liquidBlocks = parsedHTML.querySelectorAll('.product__liquid');
      liquidBlocks.forEach((liquidBlock) => {
        const blockId = liquidBlock.dataset.blockId;
        const sourceBlock = document.querySelector(
          `.product__liquid[data-section="${this.dataset.section}"][data-block-id="${blockId}"]`
        );
        sourceBlock.innerHTML = liquidBlock.innerHTML;
      });
    }

    renderProductButtons(html) {
      const price = document.getElementById(`price-${this.dataset.section}`);

      if (price) price.classList.remove('hidden');
      this.toggleAddButton(!this.currentVariant.available, theme.strings.soldOut);
    }

    updateShareUrl() {
      const shareUrl = `${theme.shopUrl}${this.dataset.url}?variant=${this.currentVariant.id}`;
      const shareText = encodeURI(this.dataset.sectionText);

      const facebookLink = this.section.querySelector('.social-share__link--facebook');
      const twitterLink = this.section.querySelector('.social-share__link--twitter');
      const pinterestLink = this.section.querySelector('.social-share__link--pinterest');

      if (facebookLink) {
        facebookLink.setAttribute('href', `https://www.facebook.com/sharer.php?u=${shareUrl}`);
      }
      if (twitterLink) {
        twitterLink.setAttribute(
          'href',
          `https://twitter.com/share?url=${shareUrl}&text=${shareText}`
        );
      }
      if (pinterestLink) {
        pinterestLink.setAttribute(
          'href',
          `https://pinterest.com/pin/create/bookmarklet/?url=${shareUrl}&description=${shareText}`
        );
      }
    }

    getVariantData() {
      this.variantData =
        this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
      return this.variantData;
    }
  }
  customElements.define('variant-selects', VariantSelects);

  class VariantRadios extends VariantSelects {
    constructor() {
      super();
    }

    updateOptions() {
      const fieldsets = Array.from(this.querySelectorAll('fieldset'));
      this.options = fieldsets.map((fieldset) => {
        let option = fieldset.querySelector('input:checked');
        if(!option) {
          option = fieldset.querySelector('input').value;
        }else {
          option = option.value;
        }
        return option;
      });
    }
  }
  customElements.define('variant-radios', VariantRadios);
}
window.addEventListener('load', (event) => {
  if (!customElements.get('normal-variant')) {
    class normalVariants extends HTMLElement {
      constructor() {
        super();
        this.queryString = window.location.search;
        this.urlParams = new URLSearchParams(this.queryString);

        this.firstVariant = this.querySelector('.swatch-item__label');
        if (this.firstVariant && !this.urlParams.has('variant')) {
          this.init();
        }
      }

      init() {
        const limitVariants = document.querySelectorAll('limit-variants .swatch-item');
        const limitVariantsHidden = document.querySelectorAll(
          'limit-variants .swatch-item__label.hidden'
        );
        if (limitVariants.length == limitVariantsHidden.length) {
          this.firstVariant.click();
          const event = new Event('change');
          document.querySelector('variant-radios').dispatchEvent(event);
        }
      }
    }
    customElements.define('normal-variant', normalVariants);
  }
});

if (!customElements.get('product-form')) {
  class ProductForm extends HTMLElement {
    constructor() {
      super();

      this.form = this.querySelector('form');
      this.form.querySelector('[name=id]').disabled = false;
      this.form.addEventListener('submit', (event) => this.onSubmitHandler(event));
      this.cartNotification = document.querySelector('cart-notification');
    }

    addToCartFinallyFn(addToCartResponse, fakeSubmit, loadingClass, currentCartResponse = false) {
      if (addToCartResponse) {
        if (fakeSubmit) {
          fakeSubmit.innerText = 'Added To Cart';
          fakeSubmit.classList.remove(loadingClass);
          fakeSubmit.removeAttribute('aria-disabled');
          fakeSubmit.style.background = '#588809';
          fakeSubmit.addEventListener('mouseleave', () => {
            fakeSubmit.innerText = 'Add To Cart';
            fakeSubmit.style.background = '#839565';
          });
        }
      }

      let cartProgressBarMax = document.querySelector('input.cart_progress_bar_max');

      if (currentCartResponse && cartProgressBarMax) {
        let progressBarCtn = document.querySelector(
          '.cart-notification__container .progress-bar-container'
        );
        let ProductPrice = progressBarCtn.dataset.productPrice;
        let barMessageIncomplete = progressBarCtn.dataset.incomplete;
        let barMessageComplete = progressBarCtn.dataset.complete;
        let barMessageIncompleteIcon = progressBarCtn.dataset.incompleteicon;
        let barMessageCompleteIcon = progressBarCtn.dataset.completeicon;
        let barMax = parseFloat(cartProgressBarMax.value);
        let bar = progressBarCtn.querySelector(
          '.cart-notification__container .progress-bar .progress'
        );
        let barMessage = progressBarCtn.querySelector(
          '.cart-notification__container .progress-bar-message'
        );

        if (currentCartResponse.original_total_price >= barMax) {
          bar.style.width = '100%';

          let completeIcon = '';

          // if(barMessageComplete){
          //   completeIcon = `<img src="${barMessageCompleteIcon}" width="20" height="20">`;
          // }

          barMessage.innerHTML = barMessageComplete.replace('[[complete]]', completeIcon);
        } else {
          let percentage = (currentCartResponse.original_total_price * 100) / barMax;
          bar.style.width = `${percentage}%`;
          let priceBarMessage = progressBarCtn.dataset.priceformat.replace(
            '0.00',
            parseFloat((barMax - currentCartResponse.original_total_price) / 100).toFixed(2)
          );

          let incompleteIcon = '';

          // if(barMessageIncompleteIcon){
          //   incompleteIcon = `<img src="${barMessageIncompleteIcon}" width="20" height="20">`;
          // }

          let completeIcon = '';

          // if(barMessageComplete){
          //   completeIcon = `<img src="${barMessageCompleteIcon}" width="20" height="20">`;
          // }

          barMessage.innerHTML =
            incompleteIcon +
            barMessageIncomplete
              .replace('[[money]]', priceBarMessage)
              .replace('[[complete]]', completeIcon); /* + `(${ProductPrice} value)`; */
        }
      }

      if (addToCartResponse.status) {
        this.handleErrorMessage(addToCartResponse.description);
        return;
      }

      this.cartNotification.renderContents(addToCartResponse);
    }

    barProgressCartFetch(
      url,
      params,
      addToCartResponse,
      fakeSubmit,
      loadingClass,
      currentCartResponse
    ) {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })
        .then((response) => {
          this.addToCartFinallyFn(addToCartResponse, fakeSubmit, loadingClass, currentCartResponse);
        })
        .catch((e) => {
          console.error(e);
        });
    }

    getCartStatus(addToCartResponse, fakeSubmit, loadingClass) {
      fetch(`${theme.routes.cart_url}.js`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((response) => {
          let cartProgressBarMax = document.querySelector('input.cart_progress_bar_max');
          let cartProgressBarGiftProductId = document.querySelector(
            'input.cart_progress_bar_gift_product_id'
          );
          let cartProgressBarGiftVariantId = document.querySelector(
            'input.cart_progress_bar_gift_variant_id'
          );
          /* for product progress bar */
          /* if(cartProgressBarMax && cartProgressBarGiftProductId){
          let barMax = parseFloat(cartProgressBarMax.value);
          let giftProductAjax = true;
          let bodyProductGift = { items: [] };

          for (let i = 0; i < response.items.length; i++) {
            const item = response.items[i];
            if(item.product_id == parseInt(cartProgressBarGiftProductId.value)){
              giftProductAjax = false;
            }
          }

          if(response.total_price >= barMax && giftProductAjax){
            bodyProductGift.items = [
              {
                id: cartProgressBarGiftVariantId.value,
                quantity: 1
              }
            ];

            this.barProgressCartFetch(theme.routes.cart_add_url, bodyProductGift, addToCartResponse, fakeSubmit, loadingClass, response);
          }else{
            this.addToCartFinallyFn(addToCartResponse, fakeSubmit, loadingClass, response);
          }
        }else{ */
          this.addToCartFinallyFn(addToCartResponse, fakeSubmit, loadingClass, response);
          /* } */ /* for product progress bar */
        })
        .catch((e) => {
          console.error(e);
        });
    }

    onSubmitHandler(event) {
      event.preventDefault();

      const loadingClass = 'loading';
      const fakeSubmit = document.querySelector('.bold_clone');
      const submitButton = this.querySelector('[type="submit"]');
      if (submitButton.classList.contains(loadingClass)) return;

      this.handleErrorMessage();
      this.cartNotification.setActiveElement(document.activeElement);

      submitButton.setAttribute('aria-disabled', true);
      submitButton.classList.add(loadingClass);
      // this.querySelector('.loading-overlay__spinner').classList.remove('hidden');

      const config = theme.fetchConfig('javascript');
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
      delete config.headers['Content-Type'];

      const formData = new FormData(this.form);
      formData.append(
        'sections',
        this.cartNotification.getSectionsToRender().map((section) => section.id)
      );
      formData.append('sections_url', window.location.pathname);
      config.body = formData;

      fetch(`${theme.routes.cart_add_url}`, config)
        .then((response) => response.json())
        .then((response) => {
          let addToCartResponse = response;
          this.getCartStatus(addToCartResponse, fakeSubmit, loadingClass);
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          submitButton.classList.remove(loadingClass);
          submitButton.removeAttribute('aria-disabled');
          // this.querySelector('.loading-overlay__spinner').classList.add('hidden');
        });
    }

    handleErrorMessage(errorMessage = false) {
      this.errorMessageContainer =
        this.errorMessageContainer || this.querySelector('.product-form__error-container');
      this.errorMessage =
        this.errorMessage ||
        this.errorMessageContainer.querySelector('.product-form__error-message');
      this.errorMessageContainer.toggleAttribute('hidden', !errorMessage);

      if (errorMessage) {
        this.errorMessage.textContent = errorMessage;
      }
    }
  }
  customElements.define('product-form', ProductForm);
}
