import React from 'react';
import { Breadcrumb } from 'antd';
import { getBreadItemByKey } from 'utils/helper';
import { Link } from 'dva/router';
const Item = Breadcrumb.Item;

const Bread = ({ pathname, path, menu }) => {
    let breadcrumbs;
    if (getBreadItemByKey(menu, pathname)) {
        const keys = pathname.split('/');
        let tempPath = '';
        breadcrumbs = keys.map((key, index) => {
            if (!key && index !== 0) return;
            if (!key) {
                return <Item key={index} ><Link to="/" style={{ textDecoration: 'none' }}>{menu[0].name}</Link></Item>;
            } else {
                tempPath += '/' + key;
                const item = getBreadItemByKey(menu, tempPath);
                if (index === keys.length - 1) return <Item key={index}>{item.name}</Item>;
                // 如果没有子Menu，则提供Link
                if (!item.children || item.children.length === 0) return <Item key={index}><Link to={item.key} style={{ textDecoration: 'none' }}>{item.name}</Link></Item>;
                // 如果有子Menu，Link当前url
                return <Item key={index}><Link to={pathname} style={{ textDecoration: 'none' }}>{item.name}</Link></Item>;
            }
        });
    } else if (getBreadItemByKey(menu, path) && path !== '/') {
        breadcrumbs = [
            <Item key={1} ><Link to="/" style={{ textDecoration: 'none' }}>{menu[0].name}</Link></Item>,
            <Item key={2}>{getBreadItemByKey(menu, path).name}</Item>
        ];
    } else if (path.toLowerCase() === '/notallow') {
        breadcrumbs = [
            <Item key={1} ><Link to="/" style={{ textDecoration: 'none' }}>{menu[0].name}</Link></Item>,
            <Item key={2}>没有权限</Item>
        ];
    } else {
        breadcrumbs = [
            <Item key={1} ><Link to="/" style={{ textDecoration: 'none' }}>{menu[0].name}</Link></Item>,
            <Item key={2}>页面不存在</Item>
        ];
    }

    return (
        <Breadcrumb>
            {breadcrumbs}
        </Breadcrumb>
    );
};

export default Bread;