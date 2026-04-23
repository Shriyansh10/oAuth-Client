import jwt, {Jwt} from "jsonwebtoken";
import pem, {} from 'jwk-to-pem'
import { Keys } from "../config/oidc-config.js";

const verify = (code: string, secret: string) => {
  return jwt.verify(code, secret);
};

const verifyOAuth = async (token:string, publicKeys:Keys[], issuer: string) => {
  const decoded = jwt.decode(token, {
    complete: true,
  }) as {header: { kid: string; alg: string }};
  const {kid, alg} = decoded.header;
  if(alg !== 'RS256') throw new Error('Token invalid 1')
  const key = publicKeys.find((k:{kid:string}) => k.kid === kid)
  if(!key) throw new Error("Token invalid 2");
  let keyForPem
  if(key.kty ==='RSA'){
    keyForPem = pem({e:key.e, n:key.n, kty:key.kty})
  }else{
    throw new Error('key type not valid')
  }
  const payload = jwt.verify(token, keyForPem, {
    issuer,
    algorithms: ['RS256'],
    audience: process.env.GOOGLE_CLIENT_ID
  })
  return payload;
}

export { verify, verifyOAuth };

