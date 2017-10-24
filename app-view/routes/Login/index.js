import React from 'react';
import { routerRedux, bind } from 'app';
import { Loader } from 'components';
import { Button, Row, Form, Input, Icon, Checkbox } from 'antd';
import styles from './index.less';
const FormItem = Form.Item;
function Login({
    loading,
    dispatch,
    form: {
        getFieldDecorator,
        validateFieldsAndScroll
    }
}) {
    const onLogin = () => validateFieldsAndScroll((errors, values) => {
        if (errors) return;
        dispatch({ type: 'app/login', payload: values }).then()
    });

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <div className={styles.logo}>
                    <img alt={'logo'} src={require('assets/logo-blue.svg')} />
                    <span>Ezz</span>
                </div>
                <form>
                    <FormItem hasFeedback>
                        {getFieldDecorator('username', {
                            rules: [
                                {
                                    required: true,
                                },
                            ],
                        })(<Input size="large" prefix={<Icon type="user" style={{ fontSize: 15 }} />} onPressEnter={onLogin} placeholder="请输入用户名" />)}
                    </FormItem>
                    <FormItem hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                },
                            ],
                        })(<Input size="large" type="password" prefix={<Icon type="lock" style={{ fontSize: 15 }} />} onPressEnter={onLogin} placeholder="请输入密码" />)}
                    </FormItem>
                    <FormItem className={styles.button}>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>两周内自动登录</Checkbox>
                            )}
                        <a href="">忘记密码</a>
                        <Button type="primary"
                            size="large"
                            onClick={onLogin}
                            loading={loading.effects['app/login']}>
                            登录
                        </Button>
                    </FormItem>
                </form>
            </div>
        </div>
    );
}

export default bind(({ loading }) => ({ loading }), { disableLayout: true })(Form.create()(Login));