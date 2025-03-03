import { z } from "zod";

export const createCategoryValidationSchema = z.object({
    body: z.object({
        name: z.string().max(20),
    }),
});

export const categoryValidations = {
    createCategoryValidationSchema,
  };