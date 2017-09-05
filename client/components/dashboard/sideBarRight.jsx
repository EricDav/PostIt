import React from 'react';
import { connect } from 'react-redux';

import Member from './members';
import Search from './search';
import GroupHeader from './groupHeader';
import GroupMember from './groupMembers';

class RightSideBar extends React.Component {
    constructor(props) {
        super(props);
        this.getMembers = this.getMembers.bind(this);
    }
     getMembers() {
        return this.props.members.map((member) => {
            return (
                <Member member={member} key={member.id}/>
        );
         });
    }

    render() {
        const members = this.getMembers();
        const search = <Search/>
        const groupMember = <GroupMember/>
        return (
            <div id="email-list" className="col s10 m3 l3 card-panel">
                <ul className="collection">
                    <GroupHeader showDashboardPage ={this.props.showDashboardPage} setCurrentGroup={this.props.setCurrentGroup}
                     deleteUser={this.props.deleteUser} user={this.props.user} group={this.props.group} dashboardPage={this.props.dashboardPage}/>
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
    viewNumber: state.viewNumber,
   }
}

export default connect(mapStateToProps)(RightSideBar)
