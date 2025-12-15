import { z } from 'zod';

export const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72),
});

export type SignupDto = z.infer<typeof SignupSchema>;

export const LoginSchema = SignupSchema;

export type LoginDto = z.infer<typeof LoginSchema>;
