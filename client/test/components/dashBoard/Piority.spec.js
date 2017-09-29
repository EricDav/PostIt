import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { Piority } from '../../../components/dashboard/Piority.jsx';
import mockData from '../../mockData';

describe('Piority Component', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should render Piority component', () => {
    const wrapper = shallow(<Piority { ...mockData.Piority.props }/>);
    expect(wrapper.node.props.id).toEqual('pform');
    expect(wrapper.node.props.children[0].props.id).toEqual('piority');
  });
  it('should call onClick', () => {
    const wrapper = shallow(<Piority {...mockData.Piority.props}/>);
    const button = wrapper.find('#test1');
    button.simulate('click', {
      target: {
        id: 9
      }
    });
    expect(wrapper.node.props.action).toBe('#');
  });
});
