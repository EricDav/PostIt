import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { GroupButton } from '../../../components/dashboard/GroupButton.jsx';
import { mapStateToProps } from '../../../components/dashboard/GroupButton.jsx';
import { mockData } from '../../mockData';

describe('GroupButton Component', () => {
  it('should render GroupButton component', () => {
    const wrapper = shallow(<GroupButton { ...mockData.GroupButton.props }/>);
    expect(wrapper.node.props.className).toEqual('btn waves-effect waves-light groupBut');
    expect(wrapper.node.props.id).toEqual('Message');
  });
});
