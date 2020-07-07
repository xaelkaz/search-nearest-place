import React, { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import hasSelection from '../filter/selection'
import List from './list'
import ListItem from './list-item'
import Option from './option'
import Title from './title'

const Aside = ({
  datum: { options, title },
  expanded,
  idx,
  selection,
  setExpanded,
}) => {
  const isOpen = idx === expanded
  const isSelected = hasSelection(selection, options)
  const handleClick = () => setExpanded(isOpen ? false : idx)

  useEffect(() => {
    if (isSelected) {
      setExpanded(idx)
    }
  }, [idx, isSelected, setExpanded])

  return (
    <aside style={{ marginBottom: 20 }}>
      <Title isOpen={isOpen} onClick={handleClick}>
        {title}
      </Title>
      <AnimatePresence initial={false}>
        {isOpen && (
          <List>
            {options.map((option) => (
              <ListItem key={option.id}>
                <Option
                  row={option}
                  idx={idx}
                  setExpanded={setExpanded}
                  {...option}
                />
              </ListItem>
            ))}
          </List>
        )}
      </AnimatePresence>
    </aside>
  )
}

export default Aside
