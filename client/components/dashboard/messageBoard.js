import React from 'react';

class MessageBoard extends React.Component {
    render() {
        return (
           <div id="email-details" className="col s12 m8 l8 card-panel">
                  <hr className="grey-text text-lighten-2"/>
                  <div className="collection-item avatar">
                      <p className="email-subject truncate"><span className="email-tag grey lighten-3">#lagos-all</span> <span className="email-tag  light-blue lighten-4"></span> <i className="mdi-action-star-rate yellow-text text-darken-3 right"></i>
                  </p>
                  </div>
                  <div id="message-board" className="email-content-wrap">
                    <div className="row">
                      <div className="col s10 m10 l10">
                        <ul className="collection">
                          <li className="collection-item avatar">
                            <img src="images/avatar.jpg" alt="" class="circle"/>
                            <span className="email-title"><a href="">Alienyi David</a> <span className="ultra-small grey-text time-text">09:23 am</span> </span>
                            <p className="truncate black-text message-text">Good Morning</p>
                          </li>
                          <li className="collection-item avatar">
                            <img src="images/avatar.jpg" alt="" class="circle"/>
                            <span className="email-title"><a href="">Abdulrasaq Nasirudeen</a> <span className="ultra-small grey-text time-text">09:23 am</span> </span>
                            <p className="truncate black-text message-text">David how far na</p>
                          </li>
                          <li className="collection-item avatar">
                            <img src="images/avatar.jpg" alt="" className="circle"/>
                            <span className="email-title"><a href="">Solomon Kingsley</a> <span className="ultra-small grey-text time-text">09:23 am</span> </span>
                            <p className="truncate black-text message-text">David, how was your night</p>
                          </li>
                          <li className="collection-item avatar">
                            <img src="images/avatar.jpg" alt="" className="circle"/>
                            <span className="email-title"><a href="">Alienyi David</a> <span className="ultra-small grey-text time-text">09:23 am</span> </span>
                            <p className="truncate black-text message-text">fine thank you</p>
                          </li>
                          <li className="collection-item avatar">
                            <img src="images/avatar.jpg" alt="" class="circle"/>
                            <span className="email-title"><a href="">Abdulrasaq Nasirudeen</a> <span className="ultra-small grey-text time-text">09:23 am</span> </span>
                            <p className="truncate black-text message-text">coool!!!</p>
                          </li>
                          <li className="collection-item avatar">
                            <img src="images/avatar.jpg" alt="" className="circle"/>
                            <span className="email-title"><a href="">Alienyi David</a> <span class="ultra-small grey-text time-text">09:23 am</span> </span>
                            <p className="truncate black-text message-text">
                            <span className="message-text light-blue lighten-4">@Abdularasaq Nasirudeen</span>
                            Where you dey na</p>
                          </li>
                          <li className="collection-item avatar">
                            <img src="images/avatar.jpg" alt="" class="circle"/>
                            <span className="email-title"><a href="">Abdulrasaq Nasirudeen</a> <span className="ultra-small grey-text time-text">09:23 am</span> </span>
                            <p className="truncate black-text message-text">I dey shop</p>
                          </li>
                          <li className="collection-item avatar">
                            <img src="images/avatar.jpg" alt="" class="circle"/>
                            <span className="email-title"><a href="">Abdulrasaq Nasirudeen</a> <span className="ultra-small grey-text time-text">09:23 am</span> </span>
                            <p className="truncate black-text message-text">I dey shop</p>
                          </li>
                          <li className="collection-item avatar">
                            <img src="images/avatar.jpg" alt="" class="circle"/>
                            <span className="email-title"><a href="">Abdulrasaq Nasirudeen</a> <span className="ultra-small grey-text time-text">09:23 am</span> </span>
                            <p className="truncate black-text message-text">I dey shop</p>
                          </li> 
                          <li className="collection-item avatar">
                            <img src="images/avatar.jpg" alt="" class="circle"/>
                            <span className="email-title"><a href="">Abdulrasaq Nasirudeen</a> <span className="ultra-small grey-text time-text">09:23 am</span> </span>
                            <p className="truncate black-text message-text">I dey shop</p>
                          </li> 
                          <li className="collection-item avatar">
                            <img src="images/avatar.jpg" alt="" class="circle"/>
                            <span className="email-title"><a href="">Abdulrasaq Nasirudeen</a> <span className="ultra-small grey-text time-text">09:23 am</span> </span>
                            <p className="truncate black-text message-text">I dey shop</p>
                          </li> 
                        </ul>
                      </div>
                      <div class="col s2 m2 l2 email-actions">
                        <a href="#!"><span><i className="mdi-content-reply"></i></span></a>
                        <a href="#!"><span><i className="mdi-navigation-more-vert"></i></span></a>
                      </div>
                    </div>
                  </div>
                  <div className="email-content-wrap">
                    <div className="row">
                      <div className="col s12 m12 l12">
                        <ul>
                          <li className="collection-item avatar" id="text-input">
                            <textarea id="text-area" class="col s10" placeholder="write message..."></textarea>
                            <select className="col s1">
                              <option value="" disabled selected>Priority</option>
                              <option value="1">Normal</option>
                              <option value="2">Urgent</option>
                              <option value="3">Critical</option>
                            </select>
                            <a href="#!" className="secondary-content">
                            <span className="send">
                                SEND
                            </span></a>
                          </li>
                        </ul>
                      </div>
                      <div className="col s2 m2 l2 email-actions">
                        <a href="#!"><span><i className="mdi-content-reply"></i></span></a>
                        <a href="#!"><span><i className="mdi-navigation-more-vert"></i></span></a>
                      </div>
                    </div>
                  </div>

                </div>
        );
    }
}

export default MessageBoard
