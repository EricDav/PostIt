import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import LogIn from '../../../components/LogIn.jsx';

describe('Login Form', () => {
  it('should render form component', () => {
    const wrapper = shallow(<LogIn/>);
    // const input = wrapper.find('#input');
    // input.simulate('change',
    //   {
    //     target: {
    //       name: '',
    //       value: 'david'
    //   }
    //   }
    // )
    expect(wrapper.node.props.id).toEqual('login-page');
    expect(wrapper.node.type).toEqual('div');
  });
});
