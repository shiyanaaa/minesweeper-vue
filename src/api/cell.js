import http from '@/utils/axios'
export const getCellByNum = (start, row, col) => {
  return http.get("/region", {
    params: {
      startX: start.y,
      startY: start.x,
      row: row,
      col: col
    }
  })
}
export const openCell = (id) => {
  return http.post(`/open/${id}`)
}
export const flagCell = (id) => {
  return http.post(`/flag/${id}`)
}
export const cancelFlagCell = (id) => {
  return http.post(`/cancel_flag/${id}`)
}