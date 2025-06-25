import z from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
    catchPhrase: z.string().optional(),
})

export type SignupInput = z.infer<typeof signupInput>

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export type SigninInput = z.infer<typeof signinInput>

export const createBlog = z.object({
    title: z.string(),
    content: z.string(),
})
export type CreateBlog = z.infer<typeof createBlog>

export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number()
})
export type UpdateBlogInput = z.infer<typeof updateBlogInput>

export const updateUserInput = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  catchPhrase: z.string().optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserInput>


export const createComment = z.object({
    id: z.string().uuid(),
    content: z.string().min(1),
})
export type CreateComment = z.infer<typeof createComment>