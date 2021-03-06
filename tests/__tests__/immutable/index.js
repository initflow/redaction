import React from 'react'
import { fromJS } from 'immutable'
import { shallow } from 'enzyme'

import store from '../../immutable/store'
import ImmutableComponent from '../../immutable/Component'
import PlainComponent from '../../plain/Component'


describe('Immutable Store', () => {

  it('immutable connect', () => {

    const component = shallow(<ImmutableComponent />, {
      context: {
        store,
      },
    })

    const expected = fromJS({
      name: 'John Doe',
      avatar: null,
      stats: [
        { type: 'reviews', value: 10 },
        { type: 'orders', value: 20 },
      ],
    })

    expect(component.props().me).toEqual(expected)
    expect(component.props().myStats).toEqual(expected.get('stats'))
    expect(component.props().avatar).toEqual(expected.get('avatar'))

  })

  it('plain connect', () => {

    const component = shallow(<PlainComponent />, {
      context: {
        store,
      },
    })

    const expected = {
      name: 'John Doe',
      avatar: null,
      stats: [
        { type: 'reviews', value: 10 },
        { type: 'orders', value: 20 },
      ],
    }

    expect(component.props().me).toEqual(expected)
    expect(component.props().myStats).toEqual(expected.stats)
    expect(component.props().avatar).toEqual(expected.avatar)

  })

})
