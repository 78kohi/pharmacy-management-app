export const formatSuffix = (number) => {
  if(number >= 1000 && number < 1000000) {
    return `${(number / 1000).toFixed(1)}K`
  } else if(number >= 1000000) {
    return `${(number / 1000000).toFixed(2)}M`
  }
}

export const formatMoney = (amount) => 
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(parseFloat(amount))

export const calculateLateFee = (date, dueDate) => {
  const due = new Date(dueDate)
  const today = new Date(date)

  if(today <= due) return 0

  const diffTime = Math.abs(today - due)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  return diffDays * 2
}