import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import feedback from '../../actions/feedback';

class FeedbackForm extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onClick= this.onClick.bind(this);
        this.state = {
            Bug: '',
            recomendation: '',
            generalRating: 0,
            rejections: '',
            status: false
        }
    }
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onClick(event) {
        event.preventDefault();
        this.setState({
            status: true
        });
      this.props.feedback(this.state).then(
          () => {
              Materialize.toast('Your response has been saved. Thank You!', 2500, 'purple', ()=> {
                browserHistory.push('dashboard');
              });
          },
          () => {
            this.setState({
              status: false
        });
          }
      )
    }
    render(){
        return(
                <form id="login" className="login-form">
                  <div className="row">
                    <div className="input-field col s12 center">
                      <h4 className="center login-form-text">Feedback</h4><br/>
                    </div>
                  </div>
                  <div className="row">
                      <div className="input-field col s12">
                        <textarea onChange={this.onChange} name="bug" id="description" className="materialize-textarea" ></textarea>
                        <label htmlFor="description">Do you find any bug or error in this application? If yes, type it here</label>
                      </div>
                    </div>
                     <div className="row">
                      <div className="input-field col s12">
                        <textarea onChange={this.onChange} name="rejections" id="description" className="materialize-textarea"></textarea>
                        <label htmlFor="description">Which part of the application you think needs improvement?</label>
                      </div>
                    </div>
                    <div className="row margin">
                    <div className="input-field col s12">
                      <input onChange={this.onChange} name="generalRating" type="number" max="5" min="1" required="true"/>
                      <label htmlFor="password">How will you rate this application in a range of 1 to 5</label>
                    </div>
                  </div>
                     <div className="row">
                      <div className="input-field col s12">
                        <textarea onChange={this.onChange} name="recomendation" id="description" className="materialize-textarea" ></textarea>
                        <label htmlFor="description">What other feature do you think should be in this application?</label>
                      </div>
                    </div>
                    <div className="row">
                    <div className="input-field col s12">
                      <button onClick={this.onClick} className="btn purple darken-1 waves-effect waves-light col s12" disabled={this.state.status}>Submit</button>
                    </div>
                  </div>
                </form>
        )
    }
}

const feedbackPropTypes = {
   feedback: PropTypes.func,
 }

 PropTypes.checkPropTypes(feedbackPropTypes, 'prop', 'FeedbackForm');

export default connect(null, {feedback})(FeedbackForm);
