import { nextui } from "@nextui-org/react"
import { type Config } from "tailwindcss"
import colors from "tailwindcss/colors"

/** @type {Config} */
const config: Config = {
  content: [
    // ...
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderColor: {
        default: "#274f8c",
      },
      dropShadow: {
        custom: "0px 4px 4px rgba(0, 0, 0, 0.09)",
      },
      container: {
        screens: {
          sm: "768px",
          md: "995px",
          lg: "1440px",
          xl: "1680px",
          "2xl": "2650px",
        },
      },
    },
    fontFamily: {
      robotoFont: ["var(--roboto-font)"],
      interFont: ["var(--interFont)"],
    },
    colors: {
      ...colors,
    },
  },
  plugins: [
    nextui({
      prefix: "nextui",
      addCommonColors: true,
      defaultTheme: "light",
      defaultExtendTheme: "light",
      layout: {
        fontSize: {
          tiny: "12px",
          small: "14px",
          medium: "16px",
          large: "18px",
        },
      },
      themes: {
        light: {
          layout: {},
          colors: {
            background: "#FFFFFF",
            foreground: "#11181C",
            primary: {
              foreground: "#FFFFFF",
              DEFAULT: "#274f8c",
            },
            secondary: {
              DEFAULT: "#c1c1c1",
              foreground: "#000",
            },
          },
        },
      },
    }),
  ],
}

export default config
