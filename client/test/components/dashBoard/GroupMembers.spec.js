import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import GroupMembers from '../../../components/dashboard/GroupMembers.jsx';

describe('GroupMembers Component', () => {
  it('should render GroupMembers component', () => {
    const wrapper = shallow(<GroupMembers/>);
    expect(wrapper.node.props.className)
      .toEqual('collection-item avatar email-unread group-collection');
    expect(wrapper.node.props.children.type).toEqual('span');
    expect(wrapper.node.props.children.props.className).toEqual('group-title');
  });
});
