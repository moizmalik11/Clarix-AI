// utils/helpers.js
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

export const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};
