import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import mockData from '../../mockData';

import { CreateGroupModal } from
  '../../../components/dashboard/CreateGroupModal.jsx';

describe('EditUser Form', () => {
  it('should render form component', () => {
    const wrapper =
    shallow(<CreateGroupModal {...mockData.CreateGroupModal.props }/>);
    const input = wrapper.find('#group-title');
    const form = wrapper.find('form');
    input.simulate('change',
      {
        target: {
          name: '',
          value: 'david'
        }
      }
    );
    form.simulate('submit', {
      preventDefault: () => {
      }
    });
    expect(wrapper.node.props.id).toEqual('modal1');
    expect(wrapper.node.props.className).toEqual('modal');
    expect(wrapper.node.type).toEqual('div');
  });
  it('it should change the state when onfocus is called', () => {
    const wrapper =
    shallow(<CreateGroupModal {...mockData.CreateGroupModal.props }/>);
    const input = wrapper.find('#description');
    input.simulate('blur', {
      target: {
        name: 'name'
      }
    });
    expect(wrapper.renderer._instance.state.descriptionError)
      .toBe(' ');
  });
});
