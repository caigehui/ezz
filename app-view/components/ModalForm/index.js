import React from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, message, Alert } from 'antd';
import { connect } from 'dva';
import { unique } from 'utils/helper';
import _ from 'lodash';
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

@connect(({ modal }) => ({ modal }))
@Form.create()
export default class ModalForm extends React.Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        rows: PropTypes.array.isRequired,
        infoMessage: PropTypes.string,
        onSubmit: PropTypes.func.isRequired
    }

    static defaultProps = {
        key: 'tempModal',
        title: '新建',
    }

    state = {
        loading: false,
        errorMessage: ''
    }


    componentWillReceiveProps(nextProps) {
        // 当接收到对象类型的参数时，重置Fields
        if (nextProps.modal[this.props.id] &&
            _.isObject(nextProps.modal[this.props.id]) &&
            !_.isObject(this.props.modal[this.props.id])) {
            this.props.form.resetFields();
        }
    }


    onOk = () => {
        const { form: { validateFields, resetFields }, title, dispatch, id } = this.props;
        validateFields(async (errors, values) => {
            if (!errors) {
                this.setState({ loading: true });
                const err = this.props.onSubmit && await this.props.onSubmit(values);
                if (err) this.setState({ errorMessage: err, loading: false });
                else {
                    message.success(`${title}成功！`, 1.5);
                    resetFields();
                    dispatch({ type: 'modal/close', payload: id });
                    this.setState({ loading: false });
                }
            }
        });
    }

    onCancel = () => {
        // 如果是编辑状态，重置
        if (_.isObject(this.props.modal[this.props.id])) {
            this.props.form.resetFields();
        }
        this.props.dispatch({ type: 'modal/close', payload: this.props.id });
    }


    render() {

        const {
            infoMessage,
            rows,
            title,
            modal,
            id,
            form: {
                getFieldDecorator
            }
        } = this.props;

        const { loading, errorMessage } = this.state;

        return (
            <Modal
                title={title}
                visible={!!modal[id]}
                onOk={this.onOk}
                confirmLoading={loading}
                onCancel={this.onCancel}>
                {infoMessage && <Alert
                    style={{ marginBottom: 24 }}
                    message={infoMessage}
                    type="info"
                    showIcon
                />}
                {errorMessage && <Alert
                    style={{ marginBottom: 24 }}
                    message={errorMessage}
                    type="error"
                    showIcon
                />}
                <Form layout="horizontal">
                    {
                        rows && rows.map((row, index) => {
                            const rules = [];
                            if (row.required) rules.push({ required: row.required, message: `请输入${row.label}！` });
                            if (row.unique) rules.push({
                                validator: unique({
                                    name: row.label,
                                    from: row.unique.from,
                                    field: row.unique.field
                                })
                            });
                            if (row.otherRules) rules.push(...row.otherRules);

                            // 设置初始值
                            let initialValue;
                            if (_.isObject(modal[id])) {
                                initialValue = modal[id][row.id];
                            }
                            return (
                                <FormItem key={index} label={row.label} hasFeedback {...formItemLayout}>
                                    {getFieldDecorator(row.id, _.omitBy({ rules, initialValue }, value => !value))(row.content)}
                                </FormItem>
                            );
                        })
                    }
                </Form>
            </Modal>
        );

    }

}