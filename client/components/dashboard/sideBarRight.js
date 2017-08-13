import React from 'react';
import Member from './members';
import Search from './search';
import GroupHeder from './groupHeader';
import GroupMember from './groupMembers'

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
       console.log(members)
        return (
            <div id="email-list" className="col s10 m3 l3 card-panel right">
                <ul className="collection">
                    <GroupHeder/>
            {true && search}
      </ul>
    </div>
        )
    }
}

export default RightSideBar;
