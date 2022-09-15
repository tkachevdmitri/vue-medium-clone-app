export const range = (start, end) => {
  return [...Array(end).keys()].map((key) => key + start)
}
