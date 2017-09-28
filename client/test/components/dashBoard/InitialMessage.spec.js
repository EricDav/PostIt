import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import InitialMessages  from '../../../components/dashboard/InitialMessage.jsx';

describe('InitialMessages Component', () => {
  it('should render GroupMembers component', () => {
    const wrapper = shallow(<InitialMessages />);
    expect(wrapper.node.props.className).toEqual('col s5 m9 l9 card-panel');
    expect(wrapper.node.props.id).toEqual('email-details');
  });
});
