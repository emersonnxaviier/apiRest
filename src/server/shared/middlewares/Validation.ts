import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

type TProperty = "body" | "header" | "params" | "query";

type TGetSchema = <T>(schema: yup.Schema<T>) => yup.Schema<T>; //função que reccebe e retorna um unico schema

type TAllSchemas = Record<TProperty, yup.Schema<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>; // retornar todos os schemas

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation = (getAllSchemas) => {
  const schemas = getAllSchemas((schema) => schema);

  return async (req, res, next) => {
    const errosResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
      try {
        schema.validateSync(req[key as TProperty], {
          abortEarly: false, // abortEarly: false serve para que sejá validado todos os erros antes de para, e não um erro por vez
        });
      } catch (error) {
        const yupError = error as yup.ValidationError;

        // vai armazenar os erros com chave (field que apresentou erro) e valor (mensagem de erro)
        const errors: Record<string, string> = {};

        // loop para armanezer todos os erros que aconteceram
        yupError.inner.forEach((error) => {
          if (!error.path) return; // path é a field que está apresentando o erro
          errors[error.path] = error.message; // nome da filed = mensagem de erro
        });

        errosResult[key] = errors;
      }
    });

    if (Object.entries(errosResult).length === 0) {
      // Se não existir erros execute a proxima função
      return next();
    } else {
      // caso exista erro exiba-os
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: errosResult,
      });
    }
  };
};
