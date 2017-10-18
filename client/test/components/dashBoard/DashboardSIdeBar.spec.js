import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import mockData from '../../mockData';
import { DashboardSideBar, mapStateToProps } from
  '../../../components/dashboard/DashboardSideBar.jsx';

describe('DashboardSideBar component', () => {
  beforeEach(() => {
    const setup = () => {
      return mapStateToProps(mockData.dashboardHeader.state);
    };
    const state = setup();
  });
  it('should render form component', () => {
    const wrapper =
    shallow(<DashboardSideBar {...mockData.DashboardSideBar.props }/>);
    const editProfile = wrapper.find('#edit-profile');
    const form = wrapper.find('form');
    const viewGroups = wrapper.find('#clickMe');
    viewGroups.simulate('click');
    editProfile.simulate('click');
    expect(wrapper.node.props.id).toEqual('email-list');
    expect(wrapper.node.type).toEqual('div');
  });
});
