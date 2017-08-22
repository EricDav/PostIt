import React from 'react';

class Details extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       email: '',
       error: '',
       failure: false,
       buttonText: 'Submit'
     }
     this.onClick = this.onClick.bind(this);
     this.onChange = this.onChange.bind(this);
   }
   onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
   onClick(event) {
    event.preventDefault();
    this.setState({
      buttonText: 'Loading ...'
    })
     this.props.sendSecretCode(this.state).then(
       () => {
          Materialize.toast('A code has been sent to your mail', 2500, 'purple',
            () => {
      });
       },
       (data) => {
          this.setState({
            error: data.response.data.message,
            failure: true
          });
       }
     )
   }
    render() {
        return(
             <form id="login" className="login-form">
                  <div className="row">
                    <div className="input-field col s12 center">
                      <h5 className="center login-form-text">Reset Password</h5><br/>
                      {this.state.failure && <div className="errorMessage"><b><i>{this.state.error}</i></b></div>}
                    </div>
                  </div>
                 <div className="row margin">
                    <div className="input-field col s12">
                      <i className="mdi-communication-email prefix" />
                      <input  name="email" id="email" type="email" onChange={this.onChange} required="true" value={this.state.email}/>
                      <label htmlFor="email" className="center-align">Email</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <button onClick={this.onClick}className="btn purple darken-1 waves-effect waves-light col s12">{this.state.buttonText}</button>
                    </div>
                  </div> 
                  <div className="row">
                    <div className="input-field col s12">
                      <p className="margin center medium-small sign-up"></p>
                    </div>
                  </div>
                </form>
        )
    }
}


export default Details;
