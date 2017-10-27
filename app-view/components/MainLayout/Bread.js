import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Breadcrumb, Icon } from 'antd';
import { getMenuItemByKey } from 'utils/helper';
import { Link } from 'app';
const Item = Breadcrumb.Item;

const Bread = withRouter(({ location: { pathname }, match: { url }, menu }) => {

    const keys = pathname.split('/');
    let path = '';
    const breadcrumbs = getMenuItemByKey(menu, pathname) ? keys.map((key, index) => {
        if(!key && index !== 0) return;
        if(!key) {
            return <Item key={index} href="/" ><Icon type={menu[0].iconType}/>{menu[0].name}</Item>
        }else {
            path += '/'+ key;
            const item = getMenuItemByKey(menu, path);
            if(path === pathname) return <Item key={index}>{item.iconType ? <Icon type={item.iconType}/>:null}{item.name}</Item>
            return <Item key={index}><Link to={pathname} style={{ textDecoration: 'none' }}>{item.iconType ? <Icon type={item.iconType}/>:null}{item.name}</Link></Item>
        }
    }) :
    [<Item key={1} href="/" ><Icon type={menu[0].iconType}/>{menu[0].name}</Item>,
    <Item key={2}>页面不存在</Item>];

    return (
        <Breadcrumb style={{ padding: 24 }}>
            {breadcrumbs}
        </Breadcrumb>
    );
})

export default Bread;