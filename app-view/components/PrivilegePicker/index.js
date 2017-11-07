import React from 'react';
import PropTypes from 'prop-types';
import { Modal, message, Alert } from 'antd';
import { connect } from 'dva';

class PrivilegesPicker extends React.Component {

    static propTypes = {
        visible: PropTypes.bool,
        title: PropTypes.string,
        privileges: PropTypes.array,
        onConfirm: PropTypes.array
    }

    static defaultProps = {
        visible: false,
        privileges: [],
        title: '权限管理'
    }

    onOk = () => {

    }

    render() {
        const { visible, title, dispatch } = this.props;
        return (
            <Modal 
                visible={visible} 
                title={title}
                onOk={this.onOk}
                onCancel={() => dispatch({ type: 'modal/close', payload: 'PrivilegesPicker' })}>
            </Modal>
        )
    }

}

export default connect(state => ({ visible: state.modal['PrivilegesPicker'] }))(PrivilegesPicker);