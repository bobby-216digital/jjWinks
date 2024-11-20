(function(algolia) {
  'use strict';
  algolia.translations = {
    searchTitle: 'Search result',
    search: 'Current search',
    allProducts: 'See all products ',
    matching: 'matching',
    sortBy: 'Sorted by',
    relevance: 'Relevance',
    outOf: 'out of',
    resultsFound: 'results found',
    oneResultFound: '1 result found',
    noResultFound: 'No result found',
    addToCart: 'Add to cart',
    searchForProduct: 'Search for products',
    selectedFilter: 'Selected filters',
    clearAll: 'Clear all',
    outOfStock: 'Out of stock',
    products: 'Products',
    collections: 'Collections',
    articles: 'Articles',
    pages: 'Pages',
    try: 'Try',
    clearFilters: 'clearing the filters',
    or: 'or',
    changeInput: 'changing your input',
    showLess: 'Show less',
    showMore:'Show more'
  };

  algolia.translation_helpers = {
    no_result_for: function(text) {
      return 'No result for " ' + text + ' ".';
    },
    in: function(processingTimeMS) {
      return 'in ' + processingTimeMS / 1000 + 's';
    },

    outOf: function(page, hitsPerPage, nbHits) {
      return (
        page * hitsPerPage +
        1 +
        '-' +
        Math.min((page + 1) * hitsPerPage, nbHits) +
        ' out of'
      );
    },

    by: function(text) {
      if (!text) return '';
      return ' by ' + text;
    },

    render_title: function(text, query){
      if (text === 'Products' && query) {
        return text + ' for ' + query;
      }
      return text;
    }
  };
})(window.algoliaShopify);
