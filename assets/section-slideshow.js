(()=>{"use strict";var e={},t=function(){return(t=Object.assign||function e(t){for(var i,s=1,o=arguments.length;s<o;s++)for(var n in i=arguments[s])Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n]);return t}).apply(this,arguments)},i={once:!1,threshold:0},s=function(e){return t(t({},i),e)},o=function(e,t){for(var i=e instanceof Element?[e]:e,s=0;s<i.length;s++)t.observe(i[s])},n=function(e,t,i){var s=new IntersectionObserver(function(o){o.forEach(function(o){var n=o.target;null!==o.rootBounds&&i(o)&&(e(n,{isAboveView:o.boundingClientRect.bottom<o.rootBounds.height/2&&o.boundingClientRect.top<0,isInView:o.isIntersecting,isBelowView:o.boundingClientRect.top>o.rootBounds.height/2&&o.boundingClientRect.bottom>o.rootBounds.height}),t.once&&s.unobserve(n))})},{threshold:t.threshold});return s};function d(){return"IntersectionObserver"in window}var l=function(e,t,i){void 0===i&&(i={});var d=s(i),l=n(t,d,function(e){return e.isIntersecting});o(e,l)},r=function(e,t,i){void 0===i&&(i={});var d=s(i),l=n(t,d,function(e){return!e.isIntersecting});o(e,l)};class a extends Error{constructor(e){super(null!=e?`Timed out after waiting for ${e} ms`:"Timed out"),Object.setPrototypeOf(this,a.prototype)}}let u=(e,t)=>new Promise((i,s)=>{try{e.schedule(i,t)}catch(o){s(o)}}),h={schedule(e,t){let i,s=e=>{null!=e&&clearTimeout(e),i=void 0};return i=setTimeout(()=>{s(i),e()},t),{cancel:()=>s(i)}}},c=Number.POSITIVE_INFINITY,p=(e,t,i)=>{var s,o;let n=null!==(s="number"==typeof t?t:null==t?void 0:t.timeout)&&void 0!==s?s:5e3,d=null!==(o="number"==typeof t?i:null==t?void 0:t.intervalBetweenAttempts)&&void 0!==o?o:50,l=!1,r=()=>new Promise((t,i)=>{let s=()=>{l||new Promise((t,i)=>{try{t(e())}catch(s){i(s)}}).then(e=>{e?t(e):u(h,d).then(s).catch(i)}).catch(i)};s()}),p=n!==c?()=>u(h,n).then(()=>{throw l=!0,new a(n)}):void 0;return null!=p?Promise.race([r(),p()]):r()};if(!customElements.get("slideshow-component")){class y extends HTMLElement{constructor(){super(),this.slideshow=this.querySelector(".splide"),this.slideshowList=this.slideshow.querySelector(".splide__list"),this.initSlideshow()}initSlideshow(){if(this.options=JSON.parse(this.slideshow.dataset.options),this.options.size<=1)return;let e=this.slideshow.querySelectorAll('.splide__slide[data-type="video"]');e.length>0&&(this.options.type="slide",this.options.rewind=!0),this.Splide=new theme.Splide(this.slideshow,this.options),this.Splide.on("move",(e,t,i)=>{let s=e+1;s<10&&(s=`0${s}`);let o=this.slideshow.querySelector(`#${this.Splide.root.id}-slide${s}`),n=o.querySelector(".slide__image");this.slideshowList.style.height=`${n.offsetHeight}px`,"video"===o.getAttribute("data-type")&&this.initSlideVideo(o)}),this.Splide.on("mounted",()=>{this.onResize();let e=this.slideshow.querySelector(".splide__slide.is-active");"video"===e.getAttribute("data-type")&&this.initSlideVideo(e)}),this.Splide.mount(),this.bindEditorEvents()}onResize(){this.slideshowResizeObserver=new ResizeObserver(e=>{let t=this.slideshow.querySelector(".splide__slide.is-active .slide__image");this.Splide.state.is(theme.Splide.STATES.IDLE)&&(this.slideshowList.style.height=`${t.offsetHeight}px`)}),this.slideshowResizeObserver.observe(this.slideshow)}loadYouTubeAPI(){if(void 0!==window.YT&&(theme.youTubeApiStatus="ready"),"loaded"!==theme.youTubeApiStatus||"ready"!==theme.youTubeApiStatus){let e=document.createElement("script");e.id="youtube-iframe-api",e.src="https://www.youtube.com/iframe_api",e.async=!0,e.onload=async()=>{await p(()=>void 0!==window.YT.Player,{timeout:1e4}),theme.youTubeApiStatus="loaded"},document.body.append(e)}}async initSlideVideo(e){try{await p(()=>!0===theme.userInteraction,{timeout:4e3})}catch(t){t instanceof a&&(theme.userInteraction=!0)}if("true"===e.dataset.videoLoaded)return;"loaded"!==theme.youTubeApiStatus&&(this.loadYouTubeAPI(),await p(()=>"loaded"===theme.youTubeApiStatus,{timeout:1e4}));let i=e.querySelector(".slide__contain");i.insertAdjacentHTML("beforeend",'<div class="slide__video absolute inset-0 z-20"></div>');let s=e.querySelector(".slide__video"),o=e.dataset.videoId,n=new theme.Vidim(s,{type:"YouTube",src:o});n.once("ready",function(){this.container.style.opacity=0,this.play();let t={threshold:.001};l(e,e=>{n.play()},t),r(e,e=>{n.pause()},t)}),n.once("play",function(){let e=this.container;window.setTimeout(function(){e.style.opacity=1},200)}),e.dataset.videoLoaded="true"}bindEditorEvents(){let{Autoplay:e}=this.Splide.Components;document.addEventListener("shopify:block:select",e=>{let t=e.detail.blockId,i=this.slideshow.querySelector(`[data-block-id="${t}"]`);if(i){let s=Number(i.dataset.slideIndex);this.Splide.go(s)}}),document.addEventListener("shopify:section:select",t=>{e.pause()}),document.addEventListener("shopify:section:deselect",t=>{e.play()})}}customElements.define("slideshow-component",y)}})();