import React, { Component } from 'react';

declare interface PrivilegePickerProps {
    visible: boolean,
    privileges: Array,
    onConfirm: Array
    title?: string,
}

export default class PrivilegePicker extends Component<PrivilegePickerProps, any> {}