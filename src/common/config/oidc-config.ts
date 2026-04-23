type oidcConfigType = {
    issuer: string,
    authorization_endpoint: string,
    token_endpoint: string,
    jwks_uri: string
}
let oidcConfig: oidcConfigType|null = null
let lastFetched:number = 0

const cacheTTL: number = 6 * 60 * 60 * 1000;

async function fetchOidcConfiguration()  {
    try{

        if(oidcConfig && Date.now() - lastFetched < cacheTTL){
            return oidcConfig;
        }
        const res = await fetch('https://accounts.google.com/.well-known/openid-configuration')
        oidcConfig = await res.json() as oidcConfigType;
        lastFetched = Date.now();
        console.log(oidcConfig);
        
        return oidcConfig;
    }catch(error){
        if(error instanceof Error)
            throw new Error(error.message)
        else
            throw error;
    }
}

export default fetchOidcConfiguration;