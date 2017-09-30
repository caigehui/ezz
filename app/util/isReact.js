// https://stackoverflow.com/questions/33199959/how-to-detect-a-react-component-vs-a-react-element
import React from 'react';

function isClassComponent(component) {
    return (
        typeof component === 'function' && 
        !!component.prototype.isReactComponent
    ) ? true : false;
}

function isFunctionComponent(component) {
    return (
        typeof component === 'function' && (
            // babel and webpack transform
            String(component).includes('default.createElement')
        )
    ) ? true : false;
}

function isReactComponent(component) {
    return (
        isClassComponent(component) || 
        isFunctionComponent(component)
    ) ? true : false;
}

function isElement(element) {
    return React.isValidElement(element);
}

function isDOMTypeElement(element) {
    return isElement(element) && typeof element.type === 'string';
}

function isCompositeTypeElement(element) {
    return isElement(element) && typeof element.type === 'function';
}

module.exports = {
    isClassComponent,
    isFunctionComponent,
    isReactComponent,
    isElement,
    isDOMTypeElement,
    isCompositeTypeElement
};