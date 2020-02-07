export default (): string => {
  return '#' + Math.random().toString(16).substr(2, 6);
};
