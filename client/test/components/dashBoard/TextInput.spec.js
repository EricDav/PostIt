import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { TextInput, mapStateToProps } from
  '../../../components/dashboard/TextInput.jsx';
import mockData from '../../mockData';

describe('TextInput Component', () => {
  beforeEach(() => {
    const setup = () => {
      return mapStateToProps(mockData.TextInput.state);
    };
    const state = setup();
  });
  it('should render  DashboardHeader component', () => {
    const wrapper =
    shallow(<TextInput {...mockData.TextInput.props}/>);
    const textArea = wrapper.find('textarea');

    textArea.simulate('change',
      {
        target: {
          name: '',
          value: 'david'
        }
      }
    );
    textArea.simulate('onkeydown', {
      which: 13
    });
    expect(wrapper.node.props.className).toEqual('input-field row');
    //expect(wrapper.node.props.role).toEqual('navigation');
  });
});
