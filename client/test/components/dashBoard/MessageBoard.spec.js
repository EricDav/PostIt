import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { MessageBoard, mapStateToProps } from
  '../../../components/dashboard/MessageBoard.jsx';
import mockData from '../../mockData';

describe('MessageBoard Component', () => {
  beforeEach(() => {
    const setup = () => {
      return mapStateToProps(mockData.MessageBoard.state);
    };
    const state = setup();
  });
  it('should render  DashboardHeader component', () => {
    const wrapper =
    shallow(<MessageBoard {...mockData.MessageBoard.props}/>);
    expect(wrapper.node.props.className).toEqual('col  s12 m6 l6 card-panel');
    //expect(wrapper.node.props.role).toEqual('navigation');
  });
});
