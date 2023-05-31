import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

interface ICities {
  name: string;
  uf: string;
}

const bodyvalidation: yup.Schema<ICities> = yup.object().shape({
  name: yup.string().required().min(3),
  uf: yup.string().required().min(2),
});

//ICities ficou na terceira posição por que é o reqBody que estamos usando
export const create = async (req: Request<{}, {}, ICities>, res: Response) => {
  let validatedData: ICities | undefined = undefined;
  try {
    validatedData = await bodyvalidation.validate(req.body, {
      abortEarly: false,
    });
    return res.status(StatusCodes.CREATED).json(validatedData);
  } catch (error) {
    const yupError = error as yup.ValidationError;

    // vai armazenar os erros com chave (field que apresentou erro) e valor (mensagem de erro)
    const validationErros: Record<string, string> = {};

    // loop para armanezer todos os erros que aconteceram
    yupError.inner.forEach((error) => {
      if (!error.path) return; // path é a field que está apresentando o erro
      validationErros[error.path] = error.message; // nome da filed = mensagem de erro
    });

    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: validationErros,
    });
  }
};
