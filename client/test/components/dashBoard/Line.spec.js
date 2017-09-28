import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import Line from '../../../components/dashboard/Line.jsx';

describe('Line Component', () => {
  it('should render GroupMembers component', () => {
    const wrapper = shallow(<Line/>);
    expect(wrapper.node.props.className).toEqual('collection-item');
    expect(wrapper.node.type).toEqual('li');
    expect(wrapper.node.props.children.type).toEqual('div');
    expect(wrapper.node.props.children.props.className).toEqual('line');
  });
});
