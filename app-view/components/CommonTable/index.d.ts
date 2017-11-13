import React, { Component } from 'react';
import { TableProps } from 'antd/lib/table';

interface CommonTableProps extends TableProps<T> {
    totalCount: number,
    onFetch?: Function,
    children?: any,
    reloadTriggers?: Array
}

export default class CommonTable extends React.Component<CommonTableProps, any> {}