import { Request, Response, Router } from "express";
import { CitiesController } from "../controllers";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "hello world" });
});

router.post(
  "/cities",
  CitiesController.createValidation,
  CitiesController.create
);

export { router };
