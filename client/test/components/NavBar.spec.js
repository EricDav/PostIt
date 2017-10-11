import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import mockData from '../mockData';

import { NavBar, mapStateToProps } from '../../components/Navbar.jsx';

describe('EditGroup Form', () => {
  beforeEach(() => {
    const setup = () => {
      return mapStateToProps(mockData.NavBar.state);
    };
    const state = setup();
  });
  it('should render form component', () => {
    const wrapper = shallow(<NavBar {...mockData.NavBar.props}/>);
    const list = wrapper.find('#clickMe');

    list.simulate('click');
    expect(wrapper.node.props.className).toEqual('purple darken-1');
    expect(wrapper.node.type).toEqual('nav');
  });
});
