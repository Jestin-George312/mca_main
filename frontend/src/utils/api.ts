import axios from'axios';

const api=axios.create({
    baseURL:import.meta.env.VITEq_API_URL,
    headers:{
        'content-type':'application/json'
    },
})

api.interceptors.request.use((config)=>{
    const token=localStorage.getItem('token');
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;

})

export default api;