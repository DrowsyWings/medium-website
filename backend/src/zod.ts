import z from "zod";

export const signUpInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export const signInInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const postInput = z.object({
  title: z.string(),
  content: z.string(),
});

export const updatePostInput = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
});

export type UpdatePostInput = z.infer<typeof updatePostInput>;
export type PostInput = z.infer<typeof postInput>;
export type SignInInput = z.infer<typeof signInInput>;
export type SignUpInput = z.infer<typeof signUpInput>;
