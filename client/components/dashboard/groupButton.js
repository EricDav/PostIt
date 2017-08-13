import React from 'react';

class GroupButton extends React.Component {
    render() {
        return (
             <button className="btn waves-effect waves-light groupBut" type="submit" name="action">{this.props.text}
                 
             </button>
        )
    }
}

export default GroupButton;