import React from 'react';

export default () =>
  (
  <div id="email-details" className="col s5 m9 l9 card-panel">
    <hr className="grey-text text-lighten-2"/>
    <div className="collection-item avatar">
      <p className="email-subject truncate">
        <span className="email-tag grey lighten-3">
          <b>Select or Create a group</b>
        </span>
      </p>
    </div>
    <div id="message-board" className="email-content-wrap">
      <div className="row">
        <div className="col s10 m10 l10">
        </div>
      </div>
    </div>
    <div className="email-content-wrap em">
      <div className="row">
        <div className="col s12 m12 l12">
        </div>
        <div className="col s2 m2 l2 email-actions">
        </div>
      </div>
    </div>
  </div>
  );

