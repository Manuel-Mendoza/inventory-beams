/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-green-500',
    'bg-green-700',
    'hover:bg-green-700',
    'bg-blue-500',
    'bg-blue-700',
    'hover:bg-blue-700',
    'bg-red-500',
    'bg-red-700',
    'hover:bg-red-700',
    'bg-yellow-500',
    'bg-yellow-700',
    'hover:bg-yellow-700',
    'bg-purple-500',
    'bg-purple-700',
    'hover:bg-purple-700',
    'bg-pink-500',
    'bg-pink-700',
    'hover:bg-pink-700',
    'bg-indigo-500',
    'bg-indigo-700',
    'hover:bg-indigo-700',
    'bg-gray-500',
    'bg-gray-700',
    'hover:bg-gray-700',
  ]
}