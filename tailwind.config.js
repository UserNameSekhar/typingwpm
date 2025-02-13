/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enables dark mode by adding 'dark' class to the parent element
  theme: {
    extend: {
      colors: {

        // Light Theme Colors
        light: {
          bg: "#fff", // Light background
          primary: "#4f46e5", // Blue for primary buttons
          // primary: "#16a34a", // Blue for primary buttons
          // primary: "#22c55e", // Blue for primary buttons
          primaryLight: "#e0e7ff", // Light Blue for primary buttons
          secondary: "#388e3c", // Forest Green
          accent: "#ffd600", // Golden Glow
          card: "#f5f5f5",
          textPrimary: "#263238", // Dark Gray Text
          textSecondary: "#546e7a", // Muted Gray Text
          buttonPrimary: "#007bff", // Primary Blue Button
          buttonSecondary: "#388e3c", // Green Button
          buttonDanger: "#D32F2F", // Red for Danger/Destructive buttons
          buttonWarning: "#FFA000", // Amber/Orange for Warning buttons
          buttonInfo: "#0296e0", // Light Blue for Info buttons
        },

        // Dark Theme Colors
        dark: {
          // bg: "#191919", // Dark Background
          bg: "#111827", // Dark Background
          primary: "#ff5722", // Cinematic Orange
          secondary: "#1b5e20", // Deep Forest Green
          accent: "#ffd600", // Golden Glow
          card: "#1d252eff", // Deep Gray for Cards
          // card: "#202020", // Deep Gray for Cards
          textPrimary: "#ffffff", // White Text
          textSecondary: "#b0bec5", // Light Gray Text
          buttonPrimary: "#007bff", // Primary Blue Button
          buttonSecondary: "#388e3c", // Green Button
          buttonDanger: "#D32F2F", // Red for Danger/Destructive buttons
          buttonWarning: "#FFA000", // Amber/Orange for Warning buttons
          buttonInfo: "#0296e0", // Light Blue for Info buttons
        },
      },

      fontFamily: {
        // Custom Fonts
        primary: ["Roboto", "sans-serif"],
        accent: ["Playfair Display", "serif"],
        support: ["Poppins", "sans-serif"],
      },

      keyframes: {
        "gradient-move": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "gradient-move": "gradient-move 3s linear infinite",
      },

      typography: {
        DEFAULT: {
          css: {
            color: "var(--text-primary)",
            "h1, h2, h3, h4, h5, h6": {
              color: "var(--text-primary)",
              fontWeight: "700", // Bold headings
            },
            p: {
              color: "var(--text-secondary)",
            },
            a: {
              color: "var(--primary)",
              textDecoration: "none",
              "&:hover": {
                color: "var(--accent)",
                textDecoration: "underline",
              },
            },
            code: {
              color: "var(--secondary)",
            },
            blockquote: {
              borderLeftColor: "var(--primary)",
            },
          },
        },
      },

      spacing: {
        // Adding custom padding and margin for xs and sm screens
        xs: "8px",
        sm: "16px",
        md: "24px",
      },

      // Extend the button styling for different variants
      extend: {
        button: {
          primary: {
            backgroundColor: "var(--buttonPrimary)", // Blue button
            color: "white",
            padding: "10px 20px",
            borderRadius: "4px",
            border: "none",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "var(--accent)", // Accent color for hover
            },
            "&:focus": {
              outline: "none",
              boxShadow: "0 0 0 2px var(--buttonPrimary)", // Blue focus ring
            },
          },
          secondary: {
            backgroundColor: "var(--buttonSecondary)", // Green button
            color: "white",
            padding: "10px 20px",
            borderRadius: "4px",
            border: "none",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "var(--accent)", // Accent color for hover
            },
            "&:focus": {
              outline: "none",
              boxShadow: "0 0 0 2px var(--buttonSecondary)", // Green focus ring
            },
          },
        },
      },
    },
  },
  plugins: [],
};
