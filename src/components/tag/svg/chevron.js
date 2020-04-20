import React from 'react'
import styled from 'styled-components'

const SVG = styled.svg.attrs({
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 256 512',
})`
  fill: ${ ({ fill }) => fill || '#2a353c' };
  height: 1rem;
  margin-right: 8px;
  transform: ${ ({ isOpen }) => isOpen && 'rotate(90deg)' };
  transition: transform ease-in-out 0.2s;
`;

const Chevron = ({ fill, isOpen }) => (
    <SVG fill={ fill } isOpen={ isOpen }>
        <path
            d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z"/>
    </SVG>
);

export default Chevron
