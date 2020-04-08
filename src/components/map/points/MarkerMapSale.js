import React from "react";
import clx from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import "./MarkerMap.scss";

export default function MarkerMapSale(props) {
    if (props.motive === null) {
        return (
            <div className={ clx("sale-marker", { "sale-marker--hover": props.hover || props.$hover }) }>
                <AnimatePresence exitBeforeEnter>
                    { (props.$hover) && <MarkerInfoSale { ...props } /> }
                </AnimatePresence>
                <motion.span whileTap={ { scale: 1.1 } } className="marker-indicator"/>
            </div>
        );
    } else {
        return (
            <div className={ clx("no-sale-marker", { "no-sale-marker--hover": props.hover || props.$hover }) }>
                <AnimatePresence exitBeforeEnter>
                    { (props.$hover) && <MarkerInfoNoSale { ...props } /> }
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
            <motion.div className="sale-marker-title"> CLIENTE: { clientName }
            </motion.div>
            <motion.div className="sale-marker-schedule"> CODIGO: { clientDbRef }</motion.div>
        </motion.div>
    );
}

export function MarkerInfoNoSale({ clientName, clientDbRef, motive }) {

    return (
        <motion.div variants={ markerVariants } initial="hidden" animate="visible" exit="exit"
                    className="sale-marker-info-wrapper">
            <motion.div className="place-marker-redirect-link"> NO VENTA</motion.div>
            <motion.div className="sale-marker-title"><span style={ { fontWeight: 700 } }>CLIENTE:</span> { clientName }
            </motion.div>
            <motion.div className="sale-marker-title">MOTIVO: { motive }
            </motion.div>
            <motion.div className="sale-marker-schedule"> CODIGO: { clientDbRef }</motion.div>
        </motion.div>
    );
}
