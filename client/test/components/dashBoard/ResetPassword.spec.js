import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import mockData from '../../mockData';

import ResetPassword from '../../../components/dashboard/ResetPassword.jsx';

describe('EditGroup Form', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should render form component', () => {
    const wrapper = shallow(<ResetPassword {...mockData.ResetPassword.props}/>);
    const input = wrapper.find('.showLabelFullname');
    const button = wrapper.find('#clickMe');
    const form = wrapper.find('form');
    form.simulate('submit', {
      preventDefault: () => {
      }
    });
    button.simulate('click', {
      target: {
        textContent: 'Update Now'
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
    button.simulate('click');
    input.simulate('change',
      {
        target: {
          name: '',
          value: 'david'
        }
      }
    );
    expect(wrapper.node.props.id).toEqual('email-details');
    expect(wrapper.node.type).toEqual('div');
  });
});
