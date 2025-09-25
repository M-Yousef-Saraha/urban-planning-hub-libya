import type { Config } from "tailwindcss";

const semanticColors = {
	border: "hsl(var(--border))",
	input: "hsl(var(--input))",
	ring: "hsl(var(--ring))",
	background: "hsl(var(--background))",
	foreground: "hsl(var(--foreground))",
	primary: {
		DEFAULT: "hsl(var(--primary))",
		foreground: "hsl(var(--primary-foreground))",
	},
	secondary: {
		DEFAULT: "hsl(var(--secondary))",
		foreground: "hsl(var(--secondary-foreground))",
	},
	destructive: {
		DEFAULT: "hsl(var(--destructive))",
		foreground: "hsl(var(--destructive-foreground))",
	},
	muted: {
		DEFAULT: "hsl(var(--muted))",
		foreground: "hsl(var(--muted-foreground))",
	},
	accent: {
		DEFAULT: "hsl(var(--accent))",
		foreground: "hsl(var(--accent-foreground))",
	},
	popover: {
		DEFAULT: "hsl(var(--popover))",
		foreground: "hsl(var(--popover-foreground))",
	},
	card: {
		DEFAULT: "hsl(var(--card))",
		foreground: "hsl(var(--card-foreground))",
	},
	sidebar: {
		DEFAULT: "hsl(var(--sidebar-background))",
		foreground: "hsl(var(--sidebar-foreground))",
		primary: "hsl(var(--sidebar-primary))",
		"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
		accent: "hsl(var(--sidebar-accent))",
		"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
		border: "hsl(var(--sidebar-border))",
		ring: "hsl(var(--sidebar-ring))",
	},
	success: {
		DEFAULT: "hsl(var(--success))",
		foreground: "hsl(var(--success-foreground))",
		light: "hsl(var(--success-light))",
	},
	warning: {
		DEFAULT: "hsl(var(--warning))",
		foreground: "hsl(var(--warning-foreground))",
		light: "hsl(var(--warning-light))",
	},
	info: {
		DEFAULT: "hsl(var(--info))",
		foreground: "hsl(var(--info-foreground))",
		light: "hsl(var(--info-light))",
	},
	brand: {
		primary: "hsl(var(--brand-primary))",
		"primary-light": "hsl(var(--brand-primary-light))",
		"primary-dark": "hsl(var(--brand-primary-dark))",
		"primary-foreground": "hsl(var(--brand-primary-foreground))",
		secondary: "hsl(var(--brand-secondary))",
		"secondary-foreground": "hsl(var(--brand-secondary-foreground))",
	},
} as const;

const paletteColors = {
	blue: {
		50: "hsl(var(--blue-50))",
		100: "hsl(var(--blue-100))",
		200: "hsl(var(--blue-200))",
		300: "hsl(var(--blue-300))",
		400: "hsl(var(--blue-400))",
		500: "hsl(var(--blue-500))",
		600: "hsl(var(--blue-600))",
		700: "hsl(var(--blue-700))",
		800: "hsl(var(--blue-800))",
		900: "hsl(var(--blue-900))",
	},
	gray: {
		50: "hsl(var(--gray-50))",
		100: "hsl(var(--gray-100))",
		200: "hsl(var(--gray-200))",
		300: "hsl(var(--gray-300))",
		400: "hsl(var(--gray-400))",
		500: "hsl(var(--gray-500))",
		600: "hsl(var(--gray-600))",
		700: "hsl(var(--gray-700))",
		800: "hsl(var(--gray-800))",
		900: "hsl(var(--gray-900))",
	},
	green: {
		50: "hsl(var(--green-50))",
		100: "hsl(var(--green-100))",
		200: "hsl(var(--green-200))",
		500: "hsl(var(--green-500))",
		600: "hsl(var(--green-600))",
		700: "hsl(var(--green-700))",
		800: "hsl(var(--green-800))",
	},
	yellow: {
		50: "hsl(var(--yellow-50))",
		100: "hsl(var(--yellow-100))",
		200: "hsl(var(--yellow-200))",
		500: "hsl(var(--yellow-500))",
		600: "hsl(var(--yellow-600))",
		700: "hsl(var(--yellow-700))",
		800: "hsl(var(--yellow-800))",
	},
	red: {
		50: "hsl(var(--red-50))",
		100: "hsl(var(--red-100))",
		200: "hsl(var(--red-200))",
		500: "hsl(var(--red-500))",
		600: "hsl(var(--red-600))",
		700: "hsl(var(--red-700))",
		800: "hsl(var(--red-800))",
	},
	orange: {
		50: "hsl(var(--orange-50))",
		100: "hsl(var(--orange-100))",
		200: "hsl(var(--orange-200))",
		500: "hsl(var(--orange-500))",
		600: "hsl(var(--orange-600))",
		700: "hsl(var(--orange-700))",
		800: "hsl(var(--orange-800))",
	},
	indigo: {
		50: "hsl(var(--indigo-50))",
		100: "hsl(var(--indigo-100))",
		200: "hsl(var(--indigo-200))",
		500: "hsl(var(--indigo-500))",
		600: "hsl(var(--indigo-600))",
		700: "hsl(var(--indigo-700))",
		800: "hsl(var(--indigo-800))",
	},
} as const;

const colors = {
	transparent: "transparent",
	current: "currentColor",
	inherit: "inherit",
	black: "#000000",
	white: "#ffffff",
	...semanticColors,
	...paletteColors,
} as const;

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		colors,
		extend: {
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;
