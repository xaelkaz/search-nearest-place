import styled from "styled-components";

const Link = styled.a.attrs(({ attrs: { href } = {} }) => ({
    href
}))`
  color: ${ ({ selected }) => (selected ? "#2a353c" : "#546a78") };
  font-weight: ${ ({ selected }) => selected && 600 };
  position: ${ ({ selected }) => selected && "relative" };
  text-decoration: none;

  ${ ({ selected }) =>
    selected &&
    `
      ::before {
        background-color: #57c7d5;
        content: '';
        height: 28px;
        width: 3px;
        top: -4px;
        left: -10px;
        position: absolute;
      }
    ` }
`;

export default Link;
