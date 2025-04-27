/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [],
  corePlugins: {
    container: false, // Remove if you use container
    accessibility: false, // Remove if you don't use screen reader classes
    appearance: false, // Remove if you don't need appearance utilities
    backdropBlur: false, // Remove if you don't use backdrop filters
    backdropBrightness: false,
    backdropContrast: false,
    backdropGrayscale: false,
    backdropHueRotate: false,
    backdropInvert: false,
    backdropOpacity: false,
    backdropSaturate: false,
    backdropSepia: false,
    fontVariantNumeric: false, // Remove if you don't need font variant utilities
    placeholderColor: false, // Remove if you don't use placeholder styling
    placeholderOpacity: false,
    ringColor: false, // Remove if you don't use ring utilities
    ringOffsetColor: false,
    ringOffsetWidth: false,
    ringOpacity: false,
    ringWidth: false,
    rotate: false, // Remove if you don't use rotation
    scale: false, // Remove if you don't use scaling
    skew: false, // Remove if you don't use skew transforms
    space: false, // Remove if you don't use space-x/space-y utilities
    touchAction: false, // Remove if you don't need touch action utilities
    transitionDelay: false, // Remove if you don't use transition delays
  },
};
