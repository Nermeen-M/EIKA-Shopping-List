import "./Modal.scss";

const Modal = (props) => {
    return (<div className="modal">
        <div className="backdrop" onClick={props.onCancel}></div>
        <div className="content">
            <div className="modal-header">{props.title}</div>
            <div className="modal-body">
                {props.children}
            </div>
        </div>
    </div>);
}

export default Modal;