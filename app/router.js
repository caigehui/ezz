'use strict';

module.exports = app => {
  app.resources('apiTest', '/api/apiTest', 'apiTest');
  app.get(/^(?!\/api\/).*$/, 'home.index');
  app.resources('nomatch', '*', 'nomatch');
};
