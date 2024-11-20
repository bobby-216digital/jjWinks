customElements.get("custom-set-recently-products")||customElements.define("custom-set-recently-products",class t extends HTMLElement{constructor(){super(),this.productsRecently=null!=localStorage.getItem("productRecently")?JSON.parse(localStorage.getItem("productRecently")):[],this.currentProduct=JSON.parse(this.querySelector("script").textContent),this.check()&&this.productsRecently.push(this.currentProduct),localStorage.setItem("productRecently",JSON.stringify(this.productsRecently))}get productsRecently(){return this._productsRecently}get currentProduct(){return this._currentProduct}set currentProduct(t){this._currentProduct=t}set productsRecently(t){this._productsRecently=t}check(){if(0===this.productsRecently.length)return!0;let t=this.productsRecently.filter(t=>t.id===this.currentProduct.id);return 0===t.length}}),customElements.get("custom-recently-products")||customElements.define("custom-recently-products",class t extends HTMLElement{constructor(){super(),this.button=this.querySelector(".button-prodoct-recently"),this.productsRecently=null!=localStorage.getItem("productRecently")?JSON.parse(localStorage.getItem("productRecently")):[],this.button&&this.button.addEventListener("click",t=>{t.preventDefault();let e=document.querySelector("body");e.classList.toggle("product-recently-open")}),window.addEventListener("load",t=>{this.init()})}get productsRecently(){return this._productsRecently}set productsRecently(t){this._productsRecently=t}init(){if(0===this.productsRecently.length)return!0;this.productsRecently.forEach(t=>{let e=document.createElement("cust-cart-item");e.init(t),this.querySelector(".swiper-wrapper").appendChild(e)}),new Swiper(".swiper",{direction:"vertical",loop:!1,slidesPerView:4,navigation:{nextEl:".product-recently-next",prevEl:".product-recently-prev"}})}}),customElements.get("cust-cart-item")||customElements.define("cust-cart-item",class t extends HTMLElement{constructor(){super()}get productsRecently(){return null!=localStorage.getItem("productRecently")?JSON.parse(localStorage.getItem("productRecently")):[]}init(t){let e=`
        <div class="cc-left-side">
          <div class="cc-rvp-image">
            <a
              class="cc-rvp-link"
              |
              href="${t.url}"
            >
              <img src="${t.image.src}" alt="${t.image.alt}">
            </a>
          </div>
        </div>
        <div class="cc-right-side">
          <div class="cc-rvp-title">
            <a
              class="cc-rvp-link"
              href="${t.url}"
              >${t.title}</a
            >
          </div>
          <div class="cc-rvp-price">${t.price}</div>
          <div class="cc-rvp-actions">
            <a
              class="cc-btn-view-product"
              href="${t.url}"
              >View product</a
            >
          </div>
        </div>
        <div class="close" style="cursor: pointer;">X</div>`;this.classList.add("swiper-slide"),this.classList.add("cc-rvp-list"),this.id=t.id,this.innerHTML=e;let c=this.querySelector(".close");c&&c.addEventListener("click",e=>{this.check(t),this.remove()})}check(t){if(0===this.productsRecently.length)return;let e=this.productsRecently.filter(e=>e.id!=t.id);console.log(),localStorage.setItem("productRecently",JSON.stringify(e))}});