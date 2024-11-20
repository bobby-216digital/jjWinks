if (!customElements.get('product-recommendations')) {
  class ProductRecommendations extends HTMLElement {
    constructor() {
      super();

      this.url = this.dataset.url;
      if (!this.url) return;
    }

    connectedCallback() {
      this.fetchRecommendations();
    }

    fetchRecommendations() {
      fetch(this.url)
        .then((response) => response.text())
        .then((text) => {
          const sectionInnerHTML = new DOMParser()
            .parseFromString(text, 'text/html')
            .querySelector('.shopify-section');

          const container = sectionInnerHTML.querySelector('.product-recommendations__container');

          if (container) {
            this.innerHTML = container.outerHTML;
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }

  customElements.define('product-recommendations', ProductRecommendations);
}
