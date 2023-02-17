import { createTheme, PaletteOptions } from "@mui/material";
import { frFR } from "@mui/material/locale";

// const rootElement = document.getElementById("__next");

export const theme = createTheme(
  {
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 1000,
        lg: 1200,
        xl: 1920,
      },
    },
    components: {
      /* MuiPopover: {
        defaultProps: {
          container: rootElement,
        },
      },
      MuiPopper: {
        defaultProps: {
          container: rootElement,
        },
      }, */
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            "&&:hover": {
              backgroundColor: "#1888ff",
            },
            "&&:hover *": {
              textDecoration: "none",
            },
            "&&": {
              backgroundColor: theme.palette.primary.main,
            },
          }),
          sizeSmall: {
            padding: "6px 16px",
          },
          sizeMedium: {
            padding: "8px 20px",
          },
          sizeLarge: {
            padding: "11px 24px",
          },
          textSizeSmall: {
            padding: "7px 12px",
          },
          textSizeMedium: {
            padding: "9px 16px",
          },
          textSizeLarge: {
            padding: "12px 16px",
          },
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: "32px 24px",
            "&:last-child": {
              paddingBottom: "32px",
            },
          },
        },
      },
      MuiCardHeader: {
        defaultProps: {
          titleTypographyProps: {
            variant: "h6",
          },
          subheaderTypographyProps: {
            variant: "body2",
          },
        },
        styleOverrides: {
          root: {
            padding: "32px 24px",
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          "*": {
            fontFamily: '"Montserrat", sans-serif',
          },
          html: {
            height: "100%",
            width: "100%",
          },
          body: {
            height: "100%",
            width: "100%",
          },
          "#__next": {
            height: "100%",
            width: "100%",
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontSize: "0.875rem",
            lineHeight: 1.8,
            color: "#66728e",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            "&& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(55, 65, 81, 0.15)",
            },
            "&&:hover .MuiOutlinedInput-notchedOutline": {
              borderWidth: 0.1,
              borderColor: "#66728e",
            },
            "&&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderWidth: 1,
              borderColor: theme.palette.primary.main,
            },
            "&& .MuiIconButton-root": {
              color: "#66728e",
            },
            "&& input": {
              ...theme.unstable_sx({
                py: 2.3,
              }),
            },
            "&& input:focus": {
              outline: "none",
              border: 0,
              boxShadow: "none",
            },
          }),

          /*   notchedOutline: {
            borderColor: "#f0f4fd",
            borderWidth: 1,
          }, */
        },
      },
      MuiStepper: {
        styleOverrides: {
          root: {
            "& .MuiStepLabel-label": {
              fontSize: "0.7rem",
            },
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: "#ffffff",
            ".MuiTableCell-root": {
              color: "#374151",
            },

            "& .MuiTableCell-root": {
              borderBottom: "1px solid #E5E7EB",
              fontSize: "13px",
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: 0.5,
            },
            "& .MuiTableCell-paddingCheckbox": {
              paddingTop: 4,
              paddingBottom: 4,
            },
          },
        },
      },
      MuiTableBody: {
        styleOverrides: {
          root: {
            ".MuiTableCell-root": {
              color: "#374151",
            },

            "& .MuiTableCell-root": {
              borderBottom: "1px solid #E5E7EB",
              whiteSpace: "nowrap",
              fontSize: "12px",
              fontWeight: 500,
              lineHeight: 1,
              letterSpacing: 0.5,
            },
            "& .MuiTableCell-paddingCheckbox": {
              paddingTop: 4,
              paddingBottom: 4,
            },
          },
        },
      },
    },
    palette: {
      neutral: {
        100: "#F3F4F6",
        200: "#E5E7EB",
        300: "#D1D5DB",
        400: "#9CA3AF",
        500: "#6B7280",
        600: "#4B5563",
        700: "#374151",
        800: "#1F2937",
        900: "#111827",
      },
      action: {
        active: "#6B7280",
        focus: "rgba(55, 65, 81, 0.12)",
        hover: "#E5E7EB",
        selected: "rgba(55, 65, 81, 0.08)",
        disabledBackground: "rgba(55, 65, 81, 0.12)",
        disabled: "rgba(55, 65, 81, 0.26)",
      },
      background: {
        default: "#f2f2f2",
        paper: "#FFFFFF",
      },
      divider: "#E6E8F0",
      primary: {
        main: "#f8892b",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#3177cd",
        contrastText: "#FFFFFF",
      },
      sky: {
        main: "#1DAAE6",
        contrastText: "#FFFFFF",
      },
      success: {
        main: "#14B8A6",
        light: "#43C6B7",
        dark: "#0E8074",
        contrastText: "#FFFFFF",
      },
      info: {
        main: "#2196F3",
        light: "#64B6F7",
        dark: "#0B79D0",
        contrastText: "#FFFFFF",
      },
      warning: {
        main: "#FFB020",
        light: "#FFBF4C",
        dark: "#B27B16",
        contrastText: "#FFFFFF",
      },
      error: {
        main: "#D14343",
        light: "#DA6868",
        dark: "#922E2E",
        contrastText: "#FFFFFF",
      },
      text: {
        primary: "#66728e",
        secondary: "#66728e",
        disabled: "rgba(55, 65, 81, 0.48)",
      },
    },
    shape: {
      borderRadius: 8,
    },
    shadows: [
      "none",
      "0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)",
      "0px 1px 2px rgba(100, 116, 139, 0.12)",
      "0px 1px 4px rgba(100, 116, 139, 0.12)",
      "0px 1px 5px rgba(100, 116, 139, 0.12)",
      "0px 1px 6px rgba(100, 116, 139, 0.12)",
      "0px 2px 6px rgba(100, 116, 139, 0.12)",
      "0px 3px 6px rgba(100, 116, 139, 0.12)",
      "0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)",
      "0px 5px 12px rgba(100, 116, 139, 0.12)",
      "0px 5px 14px rgba(100, 116, 139, 0.12)",
      "0px 5px 15px rgba(100, 116, 139, 0.12)",
      "0px 6px 15px rgba(100, 116, 139, 0.12)",
      "0px 7px 15px rgba(100, 116, 139, 0.12)",
      "0px 8px 15px rgba(100, 116, 139, 0.12)",
      "0px 9px 15px rgba(100, 116, 139, 0.12)",
      "0px 10px 15px rgba(100, 116, 139, 0.12)",
      "0px 12px 22px -8px rgba(100, 116, 139, 0.25)",
      "0px 13px 22px -8px rgba(100, 116, 139, 0.25)",
      "0px 14px 24px -8px rgba(100, 116, 139, 0.25)",
      "0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)",
      "0px 25px 50px rgba(100, 116, 139, 0.25)",
      "0px 25px 50px rgba(100, 116, 139, 0.25)",
      "0px 25px 50px rgba(100, 116, 139, 0.25)",
      "0px 25px 50px rgba(100, 116, 139, 0.25)",
    ],
    typography: {
      button: {
        fontWeight: 600,
      },
      fontFamily:
        '"Montserrat","Lato", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      body1: {
        fontSize: "1.1rem",
        fontWeight: 300,
        lineHeight: 1.5,
      },
      body2: {
        fontSize: "0.875rem",
        fontWeight: 300,
        lineHeight: 1.57,
      },
      subtitle1: {
        fontSize: "1rem",
        fontWeight: 500,
        lineHeight: 1.75,
      },
      subtitle2: {
        fontSize: "0.875rem",
        fontWeight: 500,
        lineHeight: 1.57,
      },
      overline: {
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.5px",
        lineHeight: 2.5,
        textTransform: "uppercase",
      },
      caption: {
        fontSize: "0.75rem",
        fontWeight: 400,
        lineHeight: 1.66,
      },
      h1: {
        fontWeight: 700,
        fontSize: "3.5rem",
        lineHeight: 1.375,
      },
      h2: {
        fontWeight: 700,
        fontSize: "3rem",
        lineHeight: 1.375,
      },
      h3: {
        fontWeight: 700,
        fontSize: "2.25rem",
        lineHeight: 1.375,
      },
      h4: {
        fontWeight: 700,
        fontSize: "2rem",
        lineHeight: 1.375,
      },
      h5: {
        fontWeight: 600,
        fontSize: "1.5rem",
        lineHeight: 1.375,
      },
      h6: {
        fontWeight: 600,
        fontSize: "1.125rem",
        lineHeight: 1.375,
      },
    },
  },
  frFR
);
