import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Chevron from './svg/chevron'

const Header = styled(motion.header)`
  align-items: center;
  border-bottom: 1px solid #c3ced5;
  color: #2a353c;
  display: flex;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 9px;
  padding-bottom: 4px;
  text-transform: uppercase;
`;

const Title = ({ children, isOpen, onClick }) => (
    <Header onClick={ onClick }>
        <Chevron isOpen={ isOpen }/>
        { children }
    </Header>
);

export default Title
