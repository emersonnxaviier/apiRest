import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";

interface ICities {
  name: string;
  uf: string;
}

interface IFilter {
  filter?: string;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<ICities>(
    yup.object().shape({
      name: yup.string().required().min(3),
      uf: yup.string().required().min(2),
    })
  ),
  query: getSchema<IFilter>(
    yup.object().shape({
      filter: yup.string().required().min(3),
    })
  ),
}));

//ICities ficou na terceira posição por que é o reqBody que estamos usando
export const create = async (req: Request<{}, {}, ICities>, res: Response) => {
  return res.status(StatusCodes.OK).json({ created: req.body });
};
