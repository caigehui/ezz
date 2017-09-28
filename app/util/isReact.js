// https://stackoverflow.com/questions/33199959/how-to-detect-a-react-component-vs-a-react-element

function isClassComponent(component) {
    return (
        typeof component === 'function' && 
        !!component.prototype.isReactComponent
    ) ? true : false
}

function isFunctionComponent(component) {
    return (
        typeof component === 'function' && (
            String(component).includes('return React.createElement') ||
            String(component).includes('_react2.default.createElement')
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
}