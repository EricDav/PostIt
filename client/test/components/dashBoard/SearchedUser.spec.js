import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import SearchedUser from '../../../components/dashboard/SearchedUser.jsx';
import { mockData } from '../../mockData';

describe('SearchUser Component', () => {
  it('should render SearchUser component', () => {
    const wrapper = shallow(<SearchedUser { ...mockData.SearchUser.props }/>);
    expect(wrapper.node.props.className).toEqual('collection-item avatar email-unread group-channel');
    expect(wrapper.node.type).toEqual('li');
    expect(wrapper.node.props.children[0].props.children[0].type).toEqual('span');
    expect(wrapper.node.props.children[0].props.children[0].props.className).toEqual('group-title');
  });
});
