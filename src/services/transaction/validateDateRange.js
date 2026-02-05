const MAX_RANGE_MONTH = 3

export const validateDateRange = (start, end) => {
    const diffTime = end.getTime() - start.getTime()
    const diffDays = diffTime / (1000 * 60 * 60 * 24)

    const maxDays = MAX_RANGE_MONTH * 31 

    if(diffDays > maxDays) {
        throw new Error(`Maksimal tanggal ${MAX_RANGE_MONTH} bulan`)
    }
}