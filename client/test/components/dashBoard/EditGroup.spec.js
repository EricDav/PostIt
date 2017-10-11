import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import mockData from '../../mockData';

import EditGroup from '../../../components/dashboard/EditGroup.jsx';

describe('EditGroup Form', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should render form component', () => {
    const wrapper = shallow(<EditGroup {...mockData.EditGroup.props}/>);
    const input = wrapper.find('#fullname');
    const button = wrapper.find('#update');
    const header = wrapper.find('h5');
    expect(header.node.props.className).toEqual('center');
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
    button.simulate('click', {
      target: {
        textContent: 'Cancel'
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
    expect(wrapper.node.props.id).toEqual('email-details');
    expect(wrapper.node.type).toEqual('div');
  });
  it('it should alter the state when onfocus is called', () => {
    const wrapper = shallow(<EditGroup {...mockData.EditGroup.props}/>);
    const input = wrapper.find('#description');
    input.simulate('focus', {
      target: {
        id: 'description'
      }
    });
    expect(wrapper.renderer._instance.state.showLabelTextArea).toBe(true);
  });
});
