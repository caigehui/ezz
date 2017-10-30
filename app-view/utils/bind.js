import React from 'react';
import { connect } from 'dva';
import { MainLayout, SubLayout } from 'components';

/**
 * 绑定视图到应用中
 * options.disableLayout 禁用Layout
 * options.disableSubLayout 禁用SubLayout
 * @param {function} mapStateToProps 
 */
export default function bind(mapStateToProps, options = {}) {
    return (component) => {
        let EnhancedComponent = connect(mapStateToProps)(component);
        if (options.disableLayout) return EnhancedComponent;
        return (props) => {
            return (
                <MainLayout match={props.match}>
                    {
                        options.disableSubLayout ?
                            <EnhancedComponent {...props} />
                            :
                            <SubLayout {...props}>
                                <EnhancedComponent {...props} />
                            </SubLayout>
                    }
                </MainLayout>
            )
        }
    };
}
