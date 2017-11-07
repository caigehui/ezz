import React from 'react';
import { Form, Input, InputNumber, Modal, message, Alert } from 'antd';
import { connect } from 'dva';
import { ErrorMessage } from 'components';
import { verify } from 'utils/helper';

const FormItem = Form.Item

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
}

function UserForm({
    dispatch,
    visible,
    err,
    onCreate,
    loading,
    form: {
      getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields
    }
}) {

    function onSubmit() {
        validateFields(async (errors, values) => {
            if (!errors) {
                const ret = await dispatch({
                    type: 'user/create',
                    payload: {
                        ...values
                    }
                });
                ret && message.success('新增成功', 1, () => {
                    dispatch({ type: 'modal/close', payload: 'UserForm' })
                    resetFields();
                });
            }
        });
    }

    return (
        <Modal
            title="新增用户"
            visible={visible}
            onOk={onSubmit}
            confirmLoading={loading.effects['user/create']}
            onCancel={() => dispatch({ type: 'modal/close', payload: 'UserForm' })}>
            <ErrorMessage err={err} />
            <Form layout="horizontal">
                <FormItem label="姓名" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入姓名!' }],
                    })(<Input />)}
                </FormItem>
                <FormItem label="登录账号" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入账号!' }, { validator: verify({ model: 'User', name: '登录账号', field: 'username' }) }],
                    })(<Input />)}
                </FormItem>
                <FormItem label="初始密码" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(<Input autoComplete="new-password" />)}
                </FormItem>
                <FormItem label="手机号码" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('mobile', {
                        rules: [
                            { required: true , message: '请输入手机号码!'},
                            {
                                pattern: /^1[34578]\d{9}$/,
                                message: '手机号码格式不正确！',
                            }]
                    })(<Input />)}
                </FormItem>
            </Form>
        </Modal>
    )
}

export default connect(state => ({ visible: state.modal['UserForm'], err: state.user.err, loading: state.loading }))(Form.create()(UserForm));