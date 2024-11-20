if (!customElements.get('video-background-object')) {
  class VideoObject extends HTMLElement {
    constructor() {
      super();

      // Set some params
      this.mediaId = this.dataset.mediaId;
      this.mobileAutoplay = JSON.parse(this.dataset.mobileAutoplay);
      this.loaded = JSON.parse(this.dataset.loaded);

      if (!this.mediaId) return;
    }

    connectedCallback() {
      if (this.loaded) {
        this.loadYouTubeAPI();
      }
    }

    loadYouTubeAPI() {
      this.vidimEvent = new CustomEvent('vidimYouTubeAPIReady');

      if (window.YT !== undefined) {
        theme.youTubeApiStatus = 'ready';
      }
      if (theme.youTubeApiStatus !== 'loaded' || theme.youTubeApiStatus !== 'ready') {
        const script = document.createElement('script');
        script.id = `youtube-iframe-api`;
        script.src = `https://www.youtube.com/iframe_api`;
        script.async = true;
        script.onload = () => {
          theme.youTubeApiStatus = 'loaded';
        };
        document.body.append(script);
      }

      if (theme.youTubeApiStatus === 'ready') {
        // already loaded... do what needs to be done
        this.initBackgroundVideo();
      } else {
        window.onYouTubeIframeAPIReady = () => {
          // freshly loaded
          this.initBackgroundVideo();
        };
      }
    }

    initBackgroundVideo() {
      // Create bg container
      const container = document.createElement('div');
      container.classList.add('video-background__container', 'absolute', 'inset-0', 'z-10');
      this.appendChild(container);
      const videoBackgroundContainer = this.querySelector('.video-background__container');

      // Add vidim
      this.videoBackground = new theme.Vidim(videoBackgroundContainer, {
        type: 'YouTube',
        src: this.mediaId,
      });

      this.videoBackground.once('ready', function () {
        this.container.style.opacity = 0;
        this.play();
      });

      this.videoBackground.once('play', function () {
        const container = this.container;
        const showDelay = 200;
        window.setTimeout(function () {
          container.style.opacity = 1;
        }, showDelay);

        // Play pause when in view
        const options = {
          threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.play();
            } else {
              this.pause();
            }
          });
        }, options);

        observer.observe(this.container);
      });
    }
  }
  customElements.define('video-background-object', VideoObject);
}
