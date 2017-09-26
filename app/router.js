'use strict';

module.exports = app => {
  // 登录
  app.post('/api/login', 'login.index');
  // 用户
  app.resources('users', '/api/users', 'users');
  // 渲染前端，并处理react-router的BrowserHistroy
  app.get(/^(?!\/api\/).*$/, 'view.home.index');
  // API没有匹配
  app.resources('nomatch', '*', 'nomatch');
};
