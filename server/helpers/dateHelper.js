const isDatePast = date => {
  const currentDate = new Date().toISOString().split('T')[0]
  const comparisonDate = new Date(date).toISOString().split('T')[0]
  return currentDate > comparisonDate
}

export default isDatePast
