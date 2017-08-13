import React from 'react';
import addUserToAGroup from '../../actions/addUserToAGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            hasAdded: false
        }
    }
    onClick(event) {
        const data = {userId: this.props.id}
        this.props.addUserToAGroup(data, this.props.groupId).then(
            () => {
                this.setState({
                        hasAdded: true
                  });
               Materialize.toast(`${this.props.fullname} has been added Successfully to the group`, 2000, 'purple',
                 () => {
                     
            }
        );
    },
    (error) => {
        Materialize.toast(`An error occured. ${this.props.fullname} has not been added to the group`, 2000, 'purple',
                 () => {
                     
            }
        );
    }
 )
}
    render() {
        const hasAdded = this.state.hasAdded;
        return (
             <button onClick={ this.onClick} className="btn waves-effect waves-light right but" type="submit" name="action" disabled={hasAdded}>Add Member
                
             </button>
        )
    }
}

const ButtonPropTypes = {
  addUserToAGroup: PropTypes.func
}
PropTypes.checkPropTypes(ButtonPropTypes, 'prop', 'Button');

export default connect(null, { addUserToAGroup})(Button);
