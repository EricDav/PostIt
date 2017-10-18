import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import mockData from '../mockData';
import GoogleLoginForm from '../../components/GoogleLoginForm.jsx';

describe('EditGroup Form', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should render form component', () => {
    const wrapper =
      shallow(<GoogleLoginForm {...mockData.GoogleLoginForm.props}/>);
    const input = wrapper.find('.showLabelFullname');
    const form = wrapper.find('form');
    form.simulate('submit', {
      preventDefault: () => {
      }
    });
    input.simulate('change',
      {
        target: {
          name: '',
          value: 'david'
        }
      }
    );
    button.simulate('click');
    input.simulate('change',
      {
        target: {
          name: '',
          value: 'david'
        }
      }
    );
    expect(wrapper.node.type).toEqual('center');
  });
});
