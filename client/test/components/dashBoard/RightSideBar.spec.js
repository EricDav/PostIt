import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';

import { RightSideBar, mapStateToProps }
  from '../../../components/dashboard/RightSideBar.jsx';
import mockData from '../../mockData';

describe('RightSideBar Component', () => {
  beforeEach(() => {
    const setup = () => {
      return mapStateToProps(mockData.Search.state);
    };
    const state = setup();
  });
  it('should render RightSideBar component', () => {
    const wrapper = shallow(<RightSideBar {...mockData.Search.props}/>);
    expect(wrapper.node.type).toEqual('div');
    expect(wrapper.node.props.id).toEqual('email-list');
  });
});
