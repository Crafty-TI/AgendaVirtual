import axios from 'axios';

const URL_BASE = 'http://localhost:3009/api/'

export const useConeccion = () => {
    
    const post = async (url:string,body:any):Promise<any> => {
        try {
            let response = await axios.post(`${URL_BASE}${url}`, body)
            return response;
        }catch(error){
            console.error(error)
        }
        
    }

    const get = async (url:string):Promise<any> => {
        try {
            let response = await axios.get(`${URL_BASE}${url}`)
            return response;
        }catch(error){
            console.error(error)
        }
        
    }

    const put = async (url:string,body:any):Promise<any> => {
        try {
            let response = await axios.put(`${URL_BASE}${url}`, body)
            return response;
        }catch(error){
            console.error(error)
        }
        
    }
    
    return {
        post,
        get,
        put
    }
}