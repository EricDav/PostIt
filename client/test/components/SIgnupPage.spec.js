import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import SignupPage from '../../components/SignupPage.jsx';

describe('GroupHeader Component', () => {
  it('should render GroupButton component', () => {
    const wrapper = shallow(<SignupPage/>);
    expect(wrapper.node.props.className).toEqual('body-container image');
    expect(wrapper.node.type).toEqual('div');
  });
});
