import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { Group, mapStateToProps }
  from '../../../components/dashboard/Group.jsx';
import mockData from '../../mockData';

describe('Group Component', () => {
  beforeEach(() => {
    const setup = () => {
      return mapStateToProps(mockData.Group.state);
    };
    const state = setup();
  });
  it('should render GroupButton component', () => {
    const wrapper = shallow(<Group { ...mockData.Group.props }/>);
    expect(wrapper.node.props.className)
      .toEqual('collection-item avatar email-unread group-channel group');
    expect(wrapper.node.props.children[0].props.href).toEqual('#!');
  });
  it('should call onClick', () => {
    const wrapper = shallow(<Group { ...mockData.Group.props }/>);
    const span = wrapper.find('.group-title');
    span.simulate('click', {
      target: {
        id: 9
      }
    });
    expect(wrapper.renderer._instance.state.groupId).toBe(9);
  });
});
