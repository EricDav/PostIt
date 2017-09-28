import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { DashboardHeader } from '../../../components/dashboard/DashboardHeader.jsx';
import { mapStateToProps } from '../../../components/dashboard/DashboardHeader.jsx';
import { mockData } from '../../mockData';

describe(' DashboardHeader Component', () => {
  beforeEach(() => {
    const setup = () => {
      return mapStateToProps(mockData.dashboardHeader.state);
    };
    const state = setup();
  });
  it('should render  DashboardHeader component', () => {
    const wrapper = shallow(<DashboardHeader { ...mockData.dashboardHeader.props }/>);
    expect(wrapper.node.props.className).toEqual('purple darken-1');
    expect(wrapper.node.props.role).toEqual('navigation');
  });
});
