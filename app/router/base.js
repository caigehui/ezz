'use strict';

module.exports = app => {
  // 登录
  app.post('/api/login', 'base.login.index');
  // 签到
  app.post('/api/signin', 'base.login.signin');
  // 用户
  app.resources('users', '/api/users', 'base.users');
  // 文件管理
  app.resources('files', '/api/files', 'base.files');
  // 验证文件是否存在
  app.post('/api/files/verify', 'base.files.verify');
  // 渲染前端，并处理react-router的BrowserHistroy
  app.get(/^(?!\/api\/).*$/, 'view.home.index');
  // API没有匹配
  app.resources('nomatch', '*', 'base.nomatch');
};
