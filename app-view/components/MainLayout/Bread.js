import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Breadcrumb, Icon } from 'antd';
import { Link } from 'app';
const Item = Breadcrumb.Item;

const Bread = withRouter(({ location: { pathname }, menu }) => {

    function getMenuItemByKey(menu, path) {
        for(let i = 0; i < menu.length; i++) {
            if(menu[i].key === path) return menu[i];
            if(menu[i].children && menu[i].children.length > 0) {
                const item = getMenuItemByKey(menu[i].children, path);
                if(item) return item;
            }  
        }
    }

    const keys = pathname.split('/');
    let path = '';
    const breadcrumbs = keys.map((key, index) => {
        if(!key && index !== 0) return;
        if(!key) {
            return <Item key={index} href="/" ><Icon type={menu[0].iconType}/>{menu[0].name}</Item>
        }else {
            path += '/'+ key;
            const item = getMenuItemByKey(menu, path);
            if(path === pathname) return <Item key={index}>{item.iconType ? <Icon type={item.iconType}/>:null}{item.name}</Item>
            return <Item key={index}><Link to={pathname} style={{ textDecoration: 'none' }}>{item.iconType ? <Icon type={item.iconType}/>:null}{item.name}</Link></Item>
        }
    })

    return (
        <Breadcrumb style={{ padding: 24 }}>
            {breadcrumbs}
        </Breadcrumb>
    );
})

export default Bread;