import React from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip'

const Message = (props) => {
        let viewers = '';
        let seen = '';
        let hidden = true;
        let numOfSeen = 0;
        props.viewers.forEach((viewer) => {
            if (viewer !== props.user.username && viewer !== props.name) {
                viewers = viewers + ' @' + viewer;
                numOfSeen +=1;
            }
        });
        if (numOfSeen === 0) {
            hidden = false;
        }
        return (
            <li className="collection-item avatar">
                     <span className="circle indigo darken-1"><center className="firstName">{props.name[0]}</center></span>
                        <span className="email-title"><a href="">{props.name}</a></span>
                        <span className="ultra-small grey-text time-text">  {new Date(props.date).toLocaleString()}</span> 
                    <span className="truncate auto">{props.content}</span>
                    { hidden && <p className="minimizeSeen" data-tip={viewers}><span className="seen">seen:<span className="numSeen">{numOfSeen}</span></span></p>}
                    <ReactTooltip />
                </li>
        )
}

function mapStateToProps(state) {
    return {
      user: state.auth.user.currentUser,
      group: state.group
    }
}


export default connect(mapStateToProps)(Message);