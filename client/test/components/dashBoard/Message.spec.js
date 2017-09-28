import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { Message } from '../../../components/dashboard/Message.jsx';
import { mapStateToProps } from '../../../components/dashboard/Message.jsx';
import { mockData } from '../../mockData';

describe('Message Component', () => {
   beforeEach(() => {
    const setup = () => {
      return mapStateToProps(mockData.Message.state);
    };
    const state = setup();
  });
  it('should render Message component', () => {
    const wrapper = shallow(<Message { ...mockData.Message.props }/>);
    expect(wrapper.node.props.className).toEqual('collection-item avatar listMessage');
    console.log(wrapper.node.props.children)
    expect(wrapper.node.type).toEqual('li');
    expect(wrapper.node.props.children[0].props.className).toEqual('circle indigo darken-1');
  });
});
