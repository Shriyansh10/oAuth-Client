export type oidcConfigType = {
  issuer: string;
  authorization_endpoint: string;
  token_endpoint: string;
  jwks_uri: string;
};
export type Keys =
    {
        kid: string,
        n: string,
        e: string,
        alg: string,
        kty: "RSA" | "EC"
    }

let oidcConfig: oidcConfigType | null = null;
let lastFetched: number = 0;
let publicKeys: Keys[]|null = null;

const cacheTTL: number = 6 * 60 * 60 * 1000;

async function fetchOidcConfiguration() {
  try {
    if (oidcConfig && publicKeys && Date.now() - lastFetched < cacheTTL) {
      return { oidcConfig, publicKeys };
    }
    let res = await fetch(
      "https://accounts.google.com/.well-known/openid-configuration",
    );
    oidcConfig = (await res.json()) as oidcConfigType;
    res = await fetch(oidcConfig.jwks_uri);
    type Data = {
      keys: Keys[];
    };
    const data: Data = (await res.json()) as Data;
    publicKeys = data.keys;
    lastFetched = Date.now();
    return { oidcConfig, publicKeys };
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw error;
  }
}

export default fetchOidcConfiguration;
