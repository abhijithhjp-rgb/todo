

let token : string | null = null ;

export function saveAccessToken(accessToken : string){
    token = accessToken ;
}

export function getAccessToken(){
    return token ;
}

export function clearAccessToken(){
    token = null ;
}