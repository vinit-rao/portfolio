// The VR monogram — Bauhaus primitives (triangle · bar · circle · triangle).
// Defaults to currentColor (monochrome, adapts to light/dark). Each primitive is
// classed so the nav can flush it to its Bauhaus colour on hover.
const Logo = ({ className, title = 'Vinit Rao' }) => (
    <svg
        className={className}
        viewBox="0 0 1001 600"
        fill="currentColor"
        role="img"
        aria-label={title}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path className="lg-tri" d="M0 0L400 600H0.000330749L0 0Z" />
        <path className="lg-tri2" d="M1000 599.999L600 399.999H1000L1000 599.999Z" />
        <rect className="lg-bar" x="400" y="0.000976562" width="200" height="600" />
        <ellipse className="lg-circ" cx="801" cy="200" rx="200" ry="200" />
    </svg>
);

export default Logo;
