import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.email('Введите корректную почту'),
  password: z.string().min(6, 'Пароль не короче 6 символов'),
});

export const signUpFormSchema = loginFormSchema.extend({
  motherName: z.string().optional(),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type SignUpFormValues = z.infer<typeof signUpFormSchema>;
