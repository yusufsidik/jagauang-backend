export const getMonthRange = (month, year) => {
    const y = year ? Number(year) : new Date().getFullYear()
    const m = Number(month) - 1
    
    const start = new Date(y, m, 1)
    start.setHours(0,0,0,0)

    const end = new Date(y, m + 1, 0)
    end.setHours(23, 59, 59, 999)

    return { start, end }
}