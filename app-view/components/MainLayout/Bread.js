import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Breadcrumb, Icon } from 'antd';
import { getBreadItemByKey } from 'utils/helper';
import { Link } from 'app';
const Item = Breadcrumb.Item;

const Bread = withRouter(({ location: { pathname }, match: { url }, menu }) => {

    const keys = pathname.split('/');
    let path = '';
    //如果能获取到menu，否则为404
    const breadcrumbs = getBreadItemByKey(menu, pathname) ? keys.map((key, index) => {
        if(!key && index !== 0) return;
        if(!key) {
            return <Item key={index} ><Link to="/"><Icon type={menu[0].iconType}/>{menu[0].name}</Link></Item>
        }else {
            path += '/'+ key;
            const item = getBreadItemByKey(menu, path);
            // 如果是最后一级，不提供Link
            if(path === pathname) return <Item key={index}>{item.iconType ? <Icon type={item.iconType}/>:null}{item.name}</Item>
            // 如果没有子Menu，则提供Link
            if(!item.children || item.children.length === 0) return <Item key={index}><Link to={item.key} style={{ textDecoration: 'none' }}>{item.iconType ? <Icon type={item.iconType}/>:null}{item.name}</Link></Item>
            // 如果有子Menu，Link当前url
            return <Item key={index}><Link to={pathname} style={{ textDecoration: 'none' }}>{item.iconType ? <Icon type={item.iconType}/>:null}{item.name}</Link></Item>
        }
    }) :
    [<Item key={1} href="/" ><Icon type={menu[0].iconType}/>{menu[0].name}</Item>,
    <Item key={2}>页面不存在</Item>];

    return (
        <Breadcrumb style={{ padding: '18px 24px' }}>
            {breadcrumbs}
        </Breadcrumb>
    );
})

export default Bread;