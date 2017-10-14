import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { GroupHeader } from '../../../components/dashboard/GroupHeader.jsx';
import mockData from '../../mockData';

describe('GroupHeader Component', () => {
  it('should render GroupButton component', () => {
    const wrapper = shallow(<GroupHeader { ...mockData.GroupHeader.props }/>);
    expect(wrapper.node.props.className)
      .toEqual('collection-item avatar email-unread');
    expect(wrapper.node.type).toEqual('li');
  });
});
