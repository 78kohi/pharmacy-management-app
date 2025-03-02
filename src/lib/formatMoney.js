export const formatSuffix = (number) => {
  if(number >= 1000 && number < 1000000) {
    return `${(number / 1000).toFixed(1)}K`
  } else if(number >= 1000000) {
    return `${(number / 1000000).toFixed(2)}M`
  }
}