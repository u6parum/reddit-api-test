export function getDatesIntervalInMinutes(dt1, dt2) {
    const d1 = new Date(dt1)
    const d2 = new Date(dt2)
    const ms = Math.abs(d1 - d2)
    return Math.floor((ms / 1000) / 60)
}