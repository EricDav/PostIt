import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { Button } from '../../../components/dashboard/Button.jsx';
import mockData from '../../mockData';

describe('Group Component', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should render Button component', () => {
    const wrapper = shallow(<Button {...mockData.Button.props }/>);
    expect(wrapper.node.props.className).toEqual('right btn');
    expect(wrapper.node.type).toEqual('button');
  });
  it('should update the state when onClick is called', () => {
    const wrapper = shallow(<Button {...mockData.Button.props}/>);
    const button = wrapper.find('button');
    button.simulate('click');
    expect(wrapper.renderer._instance.state.hasAdded).toBe(true);
  });
});
