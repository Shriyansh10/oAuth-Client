import { Response } from "express";
import fetchOidcConfiguration from "../../common/config/oidc-config.js";
import { verify, verifyOAuth } from "../../common/utils/jwt.utils.js";

const {oidcConfig, publicKeys} = await fetchOidcConfiguration();
const { authorization_endpoint, token_endpoint, issuer, } = oidcConfig;
type Token = {
    id_token: string
}

const authService = async (res: Response) => {
  const url = `${authorization_endpoint}?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=openid email profile`;
  res.redirect(url);
};

const callbackService = async (provider: string, code: string) => {
  const data = await exchangeCodeForTokens(code);
  const payload = await verifyIdTokens(data);
  
  return payload;
};

const exchangeCodeForTokens = async (code: string) => {
  console.log('code', code, process.env.GOOGLE_CLIENT_SECRET!);
  const response = await fetch(token_endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  });
  const data:Token = await response.json() as Token;
  if (!data) throw new Error("data is empty");
  console.log('data', data);
  return data;
};

const verifyIdTokens = async (data: Token) => {
    return verifyOAuth(data.id_token!, publicKeys, issuer);
}; 

export { authService, callbackService };
