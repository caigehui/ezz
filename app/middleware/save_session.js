'use strict';

module.exports = () => function* (next) {
    if(!this.session.user) this.throw(401, '用户未登录');
    yield next;
    // 如果 Session 是空的，则不保存
    if (!this.session.populated) return;
    this.session.save();
};
