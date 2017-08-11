import React from 'react';

class TextInput extends React.Component {
    constructor(props) {
        super(props);
       
        this.onKeyDown = this.onKeyDown.bind(this);
    }
    onKeyDown(event) {
        if (event.which== 13) {
             event.preventDefault();
        }
    }

    render() {
        return (
             <div className="input-field row" >
                 <textarea onKeyDown={this.onKeyDown} className="materialize-textarea col s10" id= "text-area"  placeholder="write message..."></textarea>
                 <select className="col s2">
                    <option value="" disabled selected>Priority</option>
                    <option value="1">Normal</option>
                    <option value="2">Urgent</option>
                     <option value="3">Critical</option>
                 </select>
            </div>
        )
    }
}

export default TextInput;