import React from 'react';
import Member from './members';
import Search from './search';
import GroupHeader from './groupHeader';
import GroupMember from './groupMembers';
import { connect } from 'react-redux';

class RightSideBar extends React.Component {
    constructor(props) {
        super(props);
        this.getMembers = this.getMembers.bind(this);
    }
     getMembers() {
        return this.props.members.map((member) => {
            return (
                <Member fullname={member.fullname} key={member.id}/>
        );
         });
    }

    render() {
        const members = this.getMembers();
        const search = <Search/>
        const groupMember = <GroupMember/>
        return (
            <div id="email-list" className="col s10 m3 l3 card-panel right">
                <ul className="collection">
                    <GroupHeader name={this.props.group.creator}/>
            {this.props.viewNumber === 1 && groupMember}
            {this.props.viewNumber === 1 && members}
            {this.props.viewNumber === 2 && search}
      </ul>
    </div>
        )
    }
}

function mapStateToProps(state) {
   return {
    viewNumber: state.viewNumber
   }
}

export default connect(mapStateToProps)(RightSideBar)
