import React from 'react';
import { connect } from 'dva';
import { MainLayout, SubLayout, UserLayout } from './layouts';

/**
 * 绑定视图到应用中
 * options.disableLayout 禁用Layout
 * options.disableSubLayout 禁用SubLayout
 * options.userLayout 使用UserLayout
 * @param {function} mapStateToProps
 * @param {object} options  
 */
export default function bind() {
    let mapStateToProps = () => ({});
    let options = {};

    if (arguments.length === 1) {
        if (typeof arguments[0] === 'object') {
            options = arguments[0];
        } else {
            mapStateToProps = arguments[0];
        }
    } else if (arguments.length === 2) {
        mapStateToProps = arguments[0];
        options = arguments[1];
    }

    return (component) => {
        let EnhancedComponent = connect(mapStateToProps)(component);
        // 禁用Layout
        if (options.disableLayout) return EnhancedComponent;
        // 使用UserLayout
        if (options.userLayout) return (props) => (
            <UserLayout>
                <EnhancedComponent {...props} />
            </UserLayout>
        )
        // 默认情况
        return (props) => (
            <MainLayout match={props.match}>
                {
                    options.disableSubLayout ?
                        <EnhancedComponent {...props} />
                        :
                        <SubLayout button={options.button} {...props}>
                            <EnhancedComponent {...props} />
                        </SubLayout>
                }
            </MainLayout>
        )
    };
}
