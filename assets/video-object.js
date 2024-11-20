if (!customElements.get('video-object')) {
  class VideoObject extends HTMLElement {
    constructor() {
      super();

      this.mediaId = this.dataset.mediaId;
      if (!this.mediaId) return;

      this.mediaType = this.dataset.mediaType;
      this.loaded = JSON.parse(this.dataset.loaded);

      this.bindEvents();
    }

    bindEvents() {
      const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.querySelector('.video__cover-button').click();
          }
        });
      });
      this.coverButton = this.querySelector('.video__cover-button');
      appearOnScroll.observe(this.coverButton);
      this.coverButton.addEventListener('click', (event) => {
        this.pauseAllMedia();
        if (!this.loaded) {
          const content = document.createElement('div');
          content.appendChild(
            this.querySelector('template').content.firstElementChild.cloneNode(true)
          );

          this.loaded = true;
          this.dataset.loaded = true;
          this.appendChild(content.querySelector('video, model-viewer, iframe')).focus();

          this.video = this.querySelector('video, model-viewer, iframe');
        }

        if (this.mediaType === 'youtube') this.loadYouTubeAPI();

        const appearOnScroll = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.video.play();
            } else {
              this.pauseMedia();
            }
          });
        });

        appearOnScroll.observe(this);

        event.preventDefault();
      });
    }

    loadYouTubeAPI() {
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
        this.player = new YT.Player(this.video.id, {
          events: {
            onReady: () => this.onPlayerReady(),
          },
        });
      } else {
        window.onYouTubeIframeAPIReady = () => {
          this.player = new YT.Player(this.video.id, {
            events: {
              onReady: () => {
                this.onPlayerReady();
                theme.youTubeApiStatus = 'ready';
              },
            },
          });
        };
      }
    }

    onPlayerReady(player) {
      player.playVideo();

      const appearOnScroll = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            player.pauseVideo();
          }
        });
      });

      appearOnScroll.observe(this);
    }

    pauseMedia() {
      this.querySelectorAll('.js-youtube').forEach((video) => {
        video.contentWindow.postMessage(
          '{"event":"command","func":"' + 'pauseVideo' + '","args":""}',
          '*'
        );
      });
      this.querySelectorAll('.js-vimeo').forEach((video) => {
        video.contentWindow.postMessage('{"method":"pause"}', '*');
      });
      this.querySelectorAll('video').forEach((video) => video.pause());
      this.querySelectorAll('product-model').forEach((model) => {
        if (model.modelViewerUI) model.modelViewerUI.pause();
      });
    }

    pauseAllMedia() {
      document.querySelectorAll('.js-youtube').forEach((video) => {
        video.contentWindow.postMessage(
          '{"event":"command","func":"' + 'pauseVideo' + '","args":""}',
          '*'
        );
      });
      document.querySelectorAll('.js-vimeo').forEach((video) => {
        video.contentWindow.postMessage('{"method":"pause"}', '*');
      });
      document.querySelectorAll('video').forEach((video) => video.pause());
      document.querySelectorAll('product-model').forEach((model) => {
        if (model.modelViewerUI) model.modelViewerUI.pause();
      });
    }
  }
  customElements.define('video-object', VideoObject);
}
