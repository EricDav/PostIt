import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import mockData from '../../mockData';

import EditUser from '../../../components/dashboard/EditUser.jsx';

describe('EditUser Form', () => {
  it('should render form component', () => {
    const wrapper = shallow(<EditUser {...mockData.EditUser.props }/>);
    const input = wrapper.find('#username');
    const form = wrapper.find('form');
    const button = wrapper.find('#clickMe');
    const header = wrapper.find('h5');
    expect(header.node.props.className).toEqual('center');
    button.simulate('click');
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
    form.simulate('submit');
    expect(wrapper.node.props.id).toEqual('email-details');
    expect(wrapper.node.type).toEqual('div');
  });
  it('it should alter the state when onfocus is called', () => {
    const wrapper = shallow(<EditUser {...mockData.EditUser.props }/>);
    const input = wrapper.find('#phoneNumber');
    input.simulate('focus', {
      target: {
        className: 'showLabelPhoneNumber'
      }
    });
    expect(wrapper.renderer._instance.state.showLabelPhoneNumber).toBe(true);
  });
});
