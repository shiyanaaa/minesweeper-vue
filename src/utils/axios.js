import axios from 'axios'
import { ElMessage } from 'element-plus'
const http= axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})
http.interceptors.response.use((response)=>{
  if(response.status!==200) return Promise.reject(response.statusText)
  if(response.data.code!==200) {
    ElMessage.error(response.data.msg)
    return Promise.reject(response)
  }
  return response
})
export default http