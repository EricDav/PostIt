import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import DashboardSearch from '../../../components/dashboard/DashboardSearch.jsx';

describe('DashboardSearch Component', () => {
  it('should render DashboardSearch component', () => {
    const wrapper = shallow(<DashboardSearch/>);
    expect(wrapper.node.props.className).toEqual('search');
    expect(wrapper.node.props.children.type).toEqual('form');
    expect(wrapper.node.props.children.props.children[0].type).toEqual('input');
    expect(wrapper.node.props.children.props.children[0].props.id).toEqual('search');
    expect(wrapper.node.props.children.props.children[0].props.placeholder).toEqual('search for users');
    expect(wrapper.node.type).toEqual('div');
  });
});
