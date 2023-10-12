/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      borderColor: {
        'main-color': 'var(--main-color)', // --main-color 변수를 사용한 border 색상 정의
      },
    },
  },
  plugins: [],
};
