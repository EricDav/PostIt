import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import mockData from '../../mockData';
import { LogIn } from '../../../components/LogIn.jsx';

describe('Login Form', () => {
  it('should render form component', () => {
    const wrapper = shallow(<LogIn {...mockData.logIn.props }/>);
    const input = wrapper.find('#username');
    const pass = wrapper.find('#password');
    const form = wrapper.find('form');
    const button = wrapper.find('#clickMe');
    const header = wrapper.find('h5');
    expect(header.node.props.className).toEqual('center login-form-text')
    button.simulate('click', {
      target: {
        textContent: 'Forgot password ?'
      }
    });
    button.simulate('click', {
      target: {
        textContent: ' Signup'
      }
    });
    input.simulate('change',
      {
        target: {
          name: '',
          value: 'david'
        }
      }
    );
    pass.simulate('change',
      {
        target: {
          name: 'userName',
          value: 'David'
        }
      }
    );
    form.simulate('submit');
    expect(wrapper.node.props.id).toEqual('login-page');
    expect(wrapper.node.type).toEqual('div');
    expect(wrapper.renderer._instance.state.userName).toBe('David');
  });
  it('it should alter the state', () => {
    const wrapper = shallow(<LogIn {...mockData.logIn.props }/>);
    const input = wrapper.find('#username');
    input.simulate('focus', {
      shouldClearError: true
    });
    expect(wrapper.renderer._instance.state.shouldClearError).toBe(false);
  });
});
