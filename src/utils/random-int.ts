export default (max = 0): number => {
  return Math.floor(Math.random() * Math.floor(max)) || 0;
};
