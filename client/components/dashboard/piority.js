import React from 'react';

class Piority extends React.Component {
    render() {
        return(
             <form action="#" id="pform">
    <p id="piority">
      <input name="group1" type="radio" id="test1" />
      <label htmlFor="test1">Normal</label>
    </p>
    <p id="piority">
      <input name="group1" type="radio" id="test2" />
      <label htmlFor="test2">Urgent</label>
    </p>
    <p id="piority">
      <input className="with-gap" name="group1" type="radio" id="test3"  />
      <label htmlFor="test3">Critical</label>
    </p>
  </form>
        )
    }
}

export default Piority;