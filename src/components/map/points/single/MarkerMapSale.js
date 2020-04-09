import React, { useContext } from "react";
import clx from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import "../MarkerMap.scss";
import { store } from "../../../../hooks/mapProvider";

export default function MarkerMapSale(props) {
    const {
        onChildClick
    } = useContext(store);

    if (props.motive === null) {
        return (
            <div className={ clx("sale-marker", { "sale-marker--hover": props.hover || props.$hover }) }
                 onClick={ (event => {
                     onChildClick(event, props);
                     props.mapInstance.setZoom(15);
                     props.mapInstance.panTo({ lat: props.lat, lng: props.lng });
                 }) }>
                <AnimatePresence exitBeforeEnter>
                    { (props.$hover || props.hover) && <MarkerInfoSale { ...props } /> }
                </AnimatePresence>
                <motion.span whileTap={ { scale: 1.1 } } className="marker-indicator"/>
            </div>
        );
    } else {
        return (
            <div className={ clx("no-sale-marker", { "no-sale-marker--hover": props.hover || props.$hover }) }
                 onClick={ (event => {
                     onChildClick(event, props);
                     props.mapInstance.setZoom(15);
                     props.mapInstance.panTo({ lat: props.lat, lng: props.lng });
                 }) }>
                <AnimatePresence exitBeforeEnter>
                    { (props.$hover || props.hover) && <MarkerInfoNoSale { ...props } /> }
                </AnimatePresence>
                <motion.span whileTap={ { scale: 1.1 } } className="marker-indicator"/>
            </div>
        )
    }
}

const markerVariants = {
    hidden: {
        opacity: 0,
        scale: 0,
        transformOrigin: "center center",
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
            duration: 0.1,
            delay: 0.2
        }
    },
    exit: {
        opacity: 0,
        scale: 0,
        transformOrigin: "center center",
        transition: {
            when: "afterChildren",
            staggerChildren: 0.05,
            staggerDirection: -1,
            delay: 0.1
        }
    }
};

export function MarkerInfoSale({ clientName, clientDbRef }) {
    return (
        <motion.div variants={ markerVariants } initial="hidden" animate="visible" exit="exit"
                    className="sale-marker-info-wrapper">
            <motion.div className="place-marker-redirect-link"> VENTA</motion.div>
            <motion.div className="sale-marker-title"> { clientName } - { clientDbRef }
            </motion.div>
        </motion.div>
    );
}

export function MarkerInfoNoSale({ clientName, clientDbRef, motive }) {

    return (
        <motion.div variants={ markerVariants } initial="hidden" animate="visible" exit="exit"
                    className="sale-marker-info-wrapper">
            <motion.div className="place-marker-redirect-link"> NO VENTA</motion.div>
            <motion.div className="sale-marker-title">{ clientName } - { clientDbRef }
            </motion.div>
            <motion.div className="sale-marker-title">MOTIVO: { motive }
            </motion.div>
        </motion.div>
    );
}
