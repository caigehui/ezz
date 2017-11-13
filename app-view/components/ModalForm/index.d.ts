import React, { Component } from 'react';

declare interface ModalFormProps {
    id: string,
    title: string,
    rows: Array,
    onSubmit: Function
    infoMessage?: string,
}

export default class ModalForm extends Component<ModalFormProps, any> {}