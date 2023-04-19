import { NextFunction, Response, Request } from "express";
import { ZodTypeAny } from "zod";

export const validateBody =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const validatedBody = schema.parse(req.body);
    // req.body = validated
    // res.locals.validatedBody = validatedBody;

    return next();
  };
