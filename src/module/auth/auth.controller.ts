import { Request, Response } from "express";
import fetchOidcConfiguration from "../../common/config/oidc-config.js";
import { authService, callbackService } from "./auth.service.js";

type Payload = {
  email: string,
  name: string,
  picture: string,
  id: string
}

const loginWithGoogle = async (req: Request, res: Response) => {
  await authService(res);
};

const loginCallback = async (req: Request, res: Response) =>{
    const provider = req.params.provider as string;
    const code = req.query.code as string;
    const payload:Payload = await callbackService(provider, code) as Payload
    res.redirect(
      `http://localhost:5500/?email=${payload.email}&name=${payload.name}&picture=${payload.picture}&id=${payload.id}`,
    );
}

export { loginWithGoogle, loginCallback };
