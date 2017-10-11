import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import NotFound from '../../components/NotFound.jsx';

describe('GroupHeader Component', () => {
  it('should render GroupButton component', () => {
    const wrapper = shallow(<NotFound/>);
    expect(wrapper.node.props.className).toEqual('not-found-image');
    expect(wrapper.node.type).toEqual('div');
  });
});
