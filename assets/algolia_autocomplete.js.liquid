(function(algolia) {
  'use strict';

  if (!algolia.config.autocomplete_enabled) return;

  const autocomplete = algolia.externals.autocomplete;

  algolia.searchClient.addAlgoliaAgent('Shopify Integration');

  // Retrieve the container from Shopify's config
  const container = document.querySelector(algolia.config.input_selector);
  container.innerHTML = '';
  const containerClasses = container.classList;
  containerClasses.add('aa-MainContainer');

  // Set plugins
  const { productsPlugin, collectionsPlugin, articlesPlugin, pagesPlugin, querySuggestionsPlugin, algoliaInsightsPlugin } = algolia;
  const plugins = [
    algolia.config.analytics_enabled && algoliaInsightsPlugin,
    algolia.config.index_products && productsPlugin,
    algolia.config.index_collections && collectionsPlugin,
    algolia.config.index_articles && articlesPlugin,
    algolia.config.index_pages && pagesPlugin,
    algolia.config.autocomplete_query_suggestions && querySuggestionsPlugin
  ];

  const cssFile = document.getElementById('template_algolia_autocomplete.css');
  //Set CSS variables
  document.documentElement.style.setProperty(`--aa-text-color-rgb`, `${algolia.helpers.hexToRGB(algolia.config.colors.secondary)}`);
  document.documentElement.style.setProperty(`--aa-primary-color-rgb`, `${algolia.helpers.hexToRGB(algolia.config.colors.main)}`);
  document.documentElement.style.setProperty(`--aa-muted-color-rgb`, `${algolia.helpers.hexToRGB(algolia.config.colors.muted)}`);
  document.documentElement.style.setProperty(`--aa-highlight-color-rgb`, `${algolia.helpers.hexToRGB(algolia.config.colors.highlight)}`);
  //Link CSS
  algolia.appendStyle(cssFile.text);

  autocomplete({
    container,
    openOnFocus: false,
    debug: algolia.config.autocomplete_debug,
    plugins,
    render({ elements, render, html, state }, root) {
      const sourceIdsToExclude = ['products'];
      const hasLeftPanelResults = state.collections
              .filter(
                      ({ source }) => sourceIdsToExclude.indexOf(source.sourceId) === -1
              )
              .reduce((prev, curr) => prev + curr.items.length, 0) > 0;
      const [querySuggestionsPluginResults] = state.collections.filter(({source}) => source.sourceId === 'querySuggestionsPlugin');
      const displaySuggestions = algolia.config.autocomplete_query_suggestions && querySuggestionsPluginResults.items.length > 0;
      render(
              hasLeftPanelResults ?
              algolia.mainTemplate({ html, state }, elements, displaySuggestions)
              : algolia.mainProductsTemplate({ html, state }, elements),
              root
      );
    },
    renderNoResults({ render, html, state }, root) {
      render(
              algolia.noResultsTemplate({ html, state }),
              root
      )
    },
    onSubmit({ state }) {
      window.location.href = `/search?q=${state.query}`;
    }
  });
})(window.algoliaShopify);
