import styled from "styled-components";
import { motion } from "framer-motion";

export const mapStyles = [
    {
        featureType: "landscape.natural",
        elementType: "geometry.fill",
        stylers: [
            {
                visibility: "on"
            },
            {
                //color: "#e0efef"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "geometry.fill",
        stylers: [
            {
                visibility: "on"
            },
            {
                hue: "#1900ff"
            },
            {
                color: "#c0e8e8"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [
            {
                lightness: 900
            },
            {
                visibility: "simplified"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [
            {
                visibility: "on"
            },
            {
                lightness: 700
            }
        ]
    },
    {
        featureType: "water",
        elementType: "all",
        stylers: [
            {
                color: "#7dcdcd"
            }
        ]
    }
];

export const COLLAPSED_WIDTH = "50px";
export const EXPANDED_WIDTH = "350px";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  min-width: 0;
  padding: 0;
  margin: 0;
  font-family: Archia, Arch, sans-serif;
`;

export const SidebarVariants = {
    expanded: () => ({
        width: EXPANDED_WIDTH,
    }),
    collapsed: () => ({
        width: COLLAPSED_WIDTH,
    })
};

export const Sidebar = styled(motion.div)`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  
    align-items: flex-start;
    justify-content: space-between;
    padding: 0;
    background: rgba(255, 255, 255, 0.85);
    -moz-box-shadow:     0 -1px 24px rgba(0,0,0,0.4);
    -webkit-box-shadow:  0 -1px 24px rgba(0,0,0,0.4);
    box-shadow: 0 -1px 24px rgba(0,0,0,0.4);
    position: absolute;
    top: 0%;
    left: 0%;
    height: 100%;
    max-height: 100%;
    margin: 0;
    padding: 0;
     &:hover {
    background: rgba(255, 255, 255, 0.95)
    }
    z-index: 1;
    overflow-y: auto;
    
    width: 100%;
    height: 100%;

    margin: 0;
    padding: 0.8rem;

  `;

export const Menu = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  & > * + * {
    margin-top: 5px;
  }
`;

export const MenuItem = styled.li``;

export const LabelVariants = {
    expanded: {
        opacity: 1,
        display: "block"
    },
    collapsed: {
        opacity: 0,
        transitionEnd: {
            display: "none"
        }
    }
};

export const AvatarVariants = {
    expanded: {
        width: "300px",
        x: 13,
        y: 13
    },
    collapsed: {
        width: "0px",
        x: 0,
        y: 0
    }
};

export const Avatar = styled(motion.img)`
  position: relative;
`;


export const MenuLabel = styled(motion.span)`
  display: block;
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0.5rem;
  cursor: pointer;
  font-size: small;
  font-weight: 400;
`;

export const CollapseBtn = styled(motion.span)`
  padding: 10px 15px;
  display: block;
  min-width: 0;
  align-items: center;
  justify-content: center;
  width: auto;
  position: absolute;
  right: 0;
  min-width: 0;
  align-items: center;
  align-self: stretch;
  cursor: pointer;
  z-index: 1003;
`;

export const CollapseInput = styled(motion.input)`
    width: 100%;
    margin: 2.5rem 0rem 0rem 0rem;
    border-radius: 20px !important;

`;

export const CollapseSideBarContent = styled(motion.span)``;

