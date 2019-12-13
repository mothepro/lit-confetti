/** Simple random number range method. */
export default (max = 1, min = 0) =>
  min + Math.random() * (max - min)
