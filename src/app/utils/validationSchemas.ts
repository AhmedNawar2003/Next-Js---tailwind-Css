import { z } from "zod";
//create Article Schema
export const CreateArticleSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(2, { message: "Title should be 2 characters long" })
    .max(200, { message: "Title should be less than 200 characters" }),
  description: z.string().min(10),
});

//Register  Schema
export const RegisterSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(2, { message: "username should be at least 2 characters" })
    .max(100, { message: "username should be less than 100 characters" }),
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  }).min(3,{message:"Email should be at least 2 characters"}).max(200,{message:"Email should be  less than 200 characters"}).email(),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }).min(6,{message:"password should be at least 6"}),
});

//Login Schema
export const LoginSchema = z.object({
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  }).min(3,{message:"Email should be at least 2 characters"}).max(200,{message:"Email should be  less than 200 characters"}).email(),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),
});

// Create Comment Schema

export const CreateCommentSchema = z.object({
  text: z.string().min(2).max(500),
  articleId: z.number(),
});

