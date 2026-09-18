import { motion, useReducedMotion } from 'framer-motion';

// A bento tile — opens its section. Carries a logo-primitive glyph + colour, and
// (optionally) a faint image peek that brightens/zooms on hover so the tile
// teases its content. Shares `layoutId` with its panel for the morph.
export default function Tile({ section, area, shape, color, tag, label, blurb, image, fill, onOpen, big, children }) {
    const reduce = useReducedMotion();
    return (
        <motion.button
            type="button"
            className={`tile ${big ? 'tile--big' : ''} ${image ? 'tile--img' : ''} ${fill ? `tile--fill-${fill}` : ''}`}
            style={{ gridArea: area }}
            data-color={color}
            onClick={onOpen}
            aria-label={`Open ${label}`}
            whileHover={reduce ? undefined : { y: -4 }}
            whileTap={{ scale: 0.99 }}
        >
            {image && <img className="tile__bg" src={image} alt="" aria-hidden="true" loading="lazy" decoding="async" />}
            <motion.span layoutId={`shape-${section}`} className={`tile__shape tile__shape--${shape}`} aria-hidden="true" />
            <span className="tile__tag mono">{tag}</span>
            <span className="tile__label display">{label}</span>
            {blurb && <span className="tile__blurb">{blurb}</span>}
            {children}
        </motion.button>
    );
}
