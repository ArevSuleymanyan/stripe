import {SERVER_API} from "./config";

export async function fetchFromAPI(endPoint, opts){
    const {method, body} = {method:'POST', body: null, ...opts}
    const response = await fetch(`${SERVER_API}/${endPoint}`, {
        method,
        ...(body && { body: JSON.stringify(body)}),
        headers: {
            'Content-Type':'application/json',
        }
    })
    if(response.status === 200){
        return response.json()
    }else{
        throw new Error(response.statusText)
    }
}
