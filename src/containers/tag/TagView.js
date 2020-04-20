import React, { useState } from 'react'
import Aside from '../../components/tag/aside-tag'

const SidebarMenu = ({ data, selection }) => {

    const [ expanded, setExpanded ] = useState(false);

    const dataCategories = [ {
        title: 'Categorias',
        options: data
    } ]
    
    return dataCategories.map((datum, idx) => (
        <Aside
            datum={ datum }
            expanded={ expanded }
            idx={ idx }
            key={ idx }
            selection={ selection }
            setExpanded={ setExpanded }
        />
    ))
};

export default SidebarMenu
