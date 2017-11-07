'use strict';

module.exports = app => {
  // 登录
  app.post('/api/login', 'base.login.index');
  // 签到
  app.post('/api/signin', 'base.login.signin');
  // 退出登录
  app.post('/api/logout', 'base.login.logout');
  // 用户管理
  app.resources('users', '/api/users', 'base.users');
  // 角色管理
  app.resources('roles', '/api/roles', 'base.roles');
  // 验证用户字段是否存在
  app.post('/api/verify', 'base.verify.index');
  // 文件管理
  app.resources('files', '/api/files', 'base.files');
  // 验证文件是否存在
  app.post('/api/files/verify', 'base.files.verify');
  // 渲染前端，并处理react-router的BrowserHistroy
  app.get(/^(?!\/api\/).*$/, 'view.home.index');
  // API没有匹配
  app.resources('nomatch', '*', 'base.nomatch');
};
