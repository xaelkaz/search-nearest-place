import React, { useState } from 'react'
import _ from 'lodash'
import Aside from '../../components/tag/aside-tag'

const SidebarMenu = ({ data, selection }) => {
  const [expanded, setExpanded] = useState(false)

  const filterUniqueValue = _.uniqBy(data, 'activity_name')

  const dataCategories = [
    {
      title: 'Categorias',
      options: filterUniqueValue,
    },
    {
      title: 'Favoritos',
      options: [],
    },
  ]

  return dataCategories.map((datum, idx) => (
    <Aside
      datum={datum}
      expanded={expanded}
      idx={idx}
      key={idx}
      selection={selection}
      setExpanded={setExpanded}
    />
  ))
}

export default SidebarMenu
