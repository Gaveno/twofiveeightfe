import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

export function MessagePopUp(props) {
    return (
        <div className="popup-box">
            <div className="popup-text">
                <b>{props.text ? props.text : "Empty message"}</b>
            </div>
            {props.btnText ? <Button block className="popup-button" onClick={props.btnClick ? props.btnClick : null}>
                <b>{props.btnText}</b>
            </Button> : null}
            {props.btnText2 ? <Button block className="popup-button" onClick={props.btnClick2 ? props.btnClick2 : null}>
                <b>{props.btnText2}</b>
            </Button> : null}
        </div>
    )
}