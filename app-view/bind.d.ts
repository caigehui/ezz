
interface Button {
    iconType: string,
    title: string,
    onClick: (dispatch: Function) => void
}

interface Option {
    disableLayout?: boolean,
    disableSubLayout?: boolean,
    userLayout?: boolean,
    button?: Button
}

function bind(mapStateToProps: (state: object) => object, options: Option): void;
function bind(options: Option): void;

export default bind;