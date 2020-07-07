import React from 'react'
import Tag from '../../components/tag/svg/tag'

/**
 *[
 *  {
 *    title: String,
 *    selection?: String,
 *    options: [
 *      {
 *        text: String,
 *        favorite?: Boolean
 *        Addon?: Function,
 *        attrs?: Object,
 *      }
 *    ]
 *  }
 *]
 */
export default [
  {
    title: 'Tags',
    options: [
      {
        text: '1abc',
        Addon: () => <Tag />,
      },
      {
        text: 'abcd',
        Addon: () => <Tag />,
      },
      {
        text: 'bcde',
        Addon: () => <Tag />,
      },
      {
        text: 'cdef',
        Addon: () => <Tag />,
      },
      {
        text: 'defg',
        Addon: () => <Tag />,
      },
    ],
  },
]
