'use strict';
var createStore = require('fluxible/utils/createStore');

var ApplicationStore = createStore({
    storeName: 'ApplicationStore',
    handlers: {
      'CHANGE_ROUTE_SUCCESS' : 'handleNavigate'
    },

    handleNavigate: function (route) {
      this.currentRoute = route;
      this.emitChange();
    },

    getState: function () {
      return {
        route: this.currentRoute,
      };
    },

    dehydrate: function () {
      return this.getState();
    },

    rehydrate: function (state) {
      this.currentRoute = state.route;
    }
});

module.exports = ApplicationStore;
