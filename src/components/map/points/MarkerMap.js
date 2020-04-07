import React from "react";
import clx from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import "./MarkerMap.scss";

export default function MarkerMap(props) {
    return (
        <div className={ clx("place-marker", { "place-marker--hover": props.hover || props.$hover }) }>
            <AnimatePresence exitBeforeEnter>
                { (props.$hover) && <MarkerInfo { ...props } /> }
            </AnimatePresence>
            <motion.span whileTap={ { scale: 1.1 } } className="marker-indicator"/>
        </div>
    );
}

export function MarkerInfo({ clientName, clientDbRef, motive }) {
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

    return (
        <motion.div variants={ markerVariants } initial="hidden" animate="visible" exit="exit"
                    className="place-marker-info-wrapper">
            <motion.div className="place-marker-title"> Client: { clientName }</motion.div>
            <motion.div className="place-marker-schedule"> Código: { clientDbRef }</motion.div>
        </motion.div>
    );
}
