const getDateRange = (startDate, endDate) => {
  if (startDate && endDate) {

    const start = new Date(startDate)
    start.setHours(0,0,0,0)
    const end = new Date(endDate)
    end.setHours(23,59,59,999)

    return { start, end }
  }

  // default: bulan sekarang
  const now = new Date()

  const start = new Date(now.getFullYear(), now.getMonth(), 1)
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)

  return { start, end }
}

export default getDateRange