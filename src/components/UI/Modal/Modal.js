import React from 'react';
import './Modal.css';
import Backdrop from "../Backdrop/Backdrop";


const Modal = props => (
    <div>
        <Backdrop show={props.show} cancel={props.cancel}/>
        <div
            className="Modal"
            style={{
                transform: props.show ? 'translateY(-50%)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}
        >
            {props.children}
        </div>
    </div>
);


export default Modal;
