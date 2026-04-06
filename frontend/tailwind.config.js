/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: "#000000",
                card: "rgba(255, 215, 0, 0.03)",
                accent: "#FFD700",
                gold: "#FFD700",
                "gold-dark": "#B8860B",
                "gold-light": "#FFED4E",
                glow: "#FFD700",
                text: "#FFFFFF",
                "text-secondary": "#A0A0A0",
                "text-muted": "#666666"
            },
            animation: {
                'glow-pulse': 'glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'gold-shimmer': 'shimmer 3s ease-in-out infinite',
            },
            keyframes: {
                glow: {
                    '0%, 100%': { opacity: 0.8 },
                    '50%': { opacity: 1, filter: 'brightness(1.5)' },
                },
                shimmer: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                }
            },
            backgroundImage: {
                'gold-gradient': 'linear-gradient(135deg, #FFD700, #B8860B)',
                'gold-gradient-subtle': 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(184, 134, 11, 0.05))',
                'radial-gold': 'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.1), transparent 50%)',
            }
        },
    },
    plugins: [],
}
