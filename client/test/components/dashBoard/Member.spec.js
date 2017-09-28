import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import Member from '../../../components/dashboard/Members.jsx';
import { mockData } from '../../mockData';

describe('Line Component', () => {
  it('should render GroupMembers component', () => {
    const wrapper = shallow(<Member { ...mockData.members.props }/>);
    expect(wrapper.node.props.className).toEqual('collection-item avatar email-unread group-channel Me');
    expect(wrapper.node.type).toEqual('li');
  });
});
