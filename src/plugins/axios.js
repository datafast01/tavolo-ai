import router from '@/router'
import axios from 'axios'

const userData = localStorage.getItem('userData')

const axiosIns = axios.create({
  
// You can add your headers here
// ================================
baseURL: 'http://server.tavolo.ai/api/',
// timeout: 1000,
// headers: {'X-Custom-Header': 'foobar'}
})


// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
axiosIns.interceptors.request.use(config => {
  // Retrieve token from localStorage
  

  const userData = localStorage.getItem('userData')
    console.log(userData, '=============')
        // Add the API key to the request headers
      
        config.headers['Authorization'] = `Bearer ${token.token}`;

        return config;

 
})

// ℹ️ Add response interceptor to handle 401 response
axiosIns.interceptors.response.use(response => {
  return response
}, error => {
  // Handle error
  console.log(error)
  if (error.response.status === 401) {
    // ℹ️ Logout user and redirect to login page
   
    localStorage.removeItem('userData')

    // Remove "accessToken" from localStorage
    

    // If 401 response returned from api
    router.push('/login')
  }
  else {
    return Promise.reject(error)
  }
})
export default axiosIns
