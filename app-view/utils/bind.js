import React from 'react';
import { connect } from 'dva';
import { MainLayout } from 'components';

/**
 * 绑定视图到应用中
 * options可选值：createForm
 * @param {function} mapStateToProps 
 */
export default function bind(mapStateToProps, options = { }) {
    return (component) => {
        let EnhancedComponent = connect(mapStateToProps)(component);
        if(options.disableLayout) return EnhancedComponent;
        return (props) => {
            return (
                <MainLayout match={props.match}>
                    <EnhancedComponent {...props}/>
                </MainLayout>
            ) 
        }
    };
}
