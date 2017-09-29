import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { Search, mapStateToProps }
  from '../../../components/dashboard/Search.jsx';
import mockData from '../../mockData';

describe('Search Component', () => {
  beforeEach(() => {
    const setup = () => {
      return mapStateToProps(mockData.Search.state);
    };
    const state = setup();
  });
  it('should render Search component', () => {
    const wrapper = shallow(<Search {...mockData.Search.props}/>);
    expect(wrapper.node.type).toEqual('ul');
    expect(wrapper.node.props.children[0].props.id).toEqual('right-search');
  });
  it('should call onChange', () => {
    const wrapper = shallow(<Search {...mockData.Search.props }/>);
    const span = wrapper.find('.validate');
    span.simulate('change', {
      target: {
        value: 'david'
      }
    });
  });
});
