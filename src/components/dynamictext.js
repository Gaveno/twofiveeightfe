import React, {Component} from 'react';
import Username from './username';

export default class DynamicText extends Component {
    render() {
        if (!this.props.text)
            return "";
        else {
            const text = this.props.text.split(" ");
            return text.map((word, i) =>
                <samp className="dynamic-text" key={i}>
                    {word[0] === "@" ? <Username username={word.slice(1, word.length) + " "}/> : word + " "}
                </samp>
            )
        }
    }
}