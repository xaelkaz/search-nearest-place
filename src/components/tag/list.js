import { motion } from 'framer-motion'
import styled from 'styled-components'

const List = styled(motion.ul).attrs({
  animate: 'open',
  exit: 'collapsed',
  initial: 'collapsed',
  key: 'content',
  transition: { duration: 0.3 },
  variants: {
    open: { opacity: 1, height: 'auto' },
    collapsed: { opacity: 0, height: 0 },
  },
})`
  list-style-type: none;
  margin-top: 9px;
  overflow: hidden;
  padding-left: 8px;
`

export default List
