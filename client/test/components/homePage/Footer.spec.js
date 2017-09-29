import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import Footer from '../../../components/Footer.jsx';

describe('Footer Component', () => {
  it('should render footer component', () => {
    const wrapper = shallow(<Footer/>);
    expect(wrapper.node.props.className)
      .toEqual('page-footer purple darken-1 footer');
    expect(wrapper.node.props.children.props.className)
      .toEqual('footer-copyright');
    expect(wrapper.node.type).toEqual('footer');
  });
});
