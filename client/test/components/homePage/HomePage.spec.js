import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { HomePage, mapStateToProps } from '../../../components/HomePage.jsx';
import mockData from '../../mockData';

describe('GroupHeader Component', () => {
  beforeEach(() => {
    const setup = () => {
      return mapStateToProps(mockData.TextInput.state);
    };
    const state = setup();
  });
  it('should render GroupButton component', () => {
    const wrapper = shallow(<HomePage {...mockData.HomePage.props }/>);
    expect(wrapper.node.props.className).toEqual('body-container image');
    expect(wrapper.node.type).toEqual('div');
  });
});
