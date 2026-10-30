import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';

import {
  loginFormSchema,
  signUpFormSchema,
  type LoginFormValues,
  type SignUpFormValues,
} from '@/features/user/schemas/authFormSchema';
import { supabase } from '@/shared/lib/supabase';

export type AuthMode = 'login' | 'signup';

function mapAuthErrorMessage(message: string): string {
  const normalized = message.toLowerCase();

  if (normalized.includes('invalid login credentials')) {
    return 'Неверный email или пароль';
  }
  if (normalized.includes('user already registered') || normalized.includes('already been registered')) {
    return 'Пользователь уже существует';
  }
  if (normalized.includes('email not confirmed')) {
    return 'Подтвердите email, затем войдите';
  }
  if (normalized.includes('password')) {
    return 'Неверный пароль';
  }

  return message;
}

export function useLogin() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
  });

  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: { email: '', password: '', motherName: '' },
  });

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode);
    setFormError(null);
  }

  async function submitLogin(values: LoginFormValues) {
    setIsSubmitting(true);
    setFormError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email.trim(),
      password: values.password,
    });

    setIsSubmitting(false);

    if (error) {
      setFormError(mapAuthErrorMessage(error.message));
      return;
    }

    router.replace('/');
  }

  async function submitSignUp(values: SignUpFormValues) {
    setIsSubmitting(true);
    setFormError(null);

    const motherName = values.motherName?.trim() || undefined;

    const { data, error } = await supabase.auth.signUp({
      email: values.email.trim(),
      password: values.password,
      options: motherName
        ? {
            data: { mother_name: motherName },
          }
        : undefined,
    });

    if (error) {
      setIsSubmitting(false);
      setFormError(mapAuthErrorMessage(error.message));
      return;
    }

    if (data.user && data.session && motherName) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ mother_name: motherName })
        .eq('id', data.user.id);

      if (profileError) {
        setIsSubmitting(false);
        setFormError(profileError.message);
        return;
      }
    }

    setIsSubmitting(false);

    if (!data.session) {
      Alert.alert(
        'Подтвердите email',
        'Мы отправили письмо со ссылкой. После подтверждения войдите в аккаунт.',
      );
      setMode('login');
      loginForm.setValue('email', values.email.trim());
      return;
    }

    router.replace('/');
  }

  return {
    mode,
    formError,
    isSubmitting,
    loginForm,
    signUpForm,
    switchMode,
    submitLogin,
    submitSignUp,
  };
}
