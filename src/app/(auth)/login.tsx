import { Controller } from 'react-hook-form';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLogin } from '@/features/user/hooks/useLogin';
import { colors } from '@/theme';

export default function LoginScreen() {
  const {
    mode,
    formError,
    isSubmitting,
    loginForm,
    signUpForm,
    switchMode,
    submitLogin,
    submitSignUp,
  } = useLogin();

  const isLogin = mode === 'login';
  const activeForm = isLogin ? loginForm : signUpForm;

  return (
    <View className="flex-1 bg-surface">
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}>
          <View className="flex-1 justify-center gap-6 px-6">
            <View className="gap-2">
              <Text className="type-title text-brand">Project SS</Text>
              <Text className="type-body text-label-secondary">
                Войдите, чтобы сохранить профиль и прогресс прикорма.
              </Text>
            </View>

            <View className="flex-row rounded-2xl bg-surface-elevated p-1 shadow-sm">
              <Pressable
                onPress={() => switchMode('login')}
                accessibilityRole="button"
                accessibilityState={{ selected: isLogin }}
                className={`min-h-11 flex-1 items-center justify-center rounded-xl px-3 ${
                  isLogin ? 'bg-brand' : 'bg-transparent'
                }`}>
                <Text className={`type-headline ${isLogin ? 'text-onTint' : 'text-label-secondary'}`}>
                  Вход
                </Text>
              </Pressable>
              <Pressable
                onPress={() => switchMode('signup')}
                accessibilityRole="button"
                accessibilityState={{ selected: !isLogin }}
                className={`min-h-11 flex-1 items-center justify-center rounded-xl px-3 ${
                  !isLogin ? 'bg-brand' : 'bg-transparent'
                }`}>
                <Text
                  className={`type-headline ${!isLogin ? 'text-onTint' : 'text-label-secondary'}`}>
                  Регистрация
                </Text>
              </Pressable>
            </View>

            <View className="gap-4 rounded-2xl bg-surface-elevated p-5 shadow-sm">
              <View className="gap-2">
                <Text className="type-caption text-label-secondary">Email</Text>
                <Controller
                  control={activeForm.control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="anna@email.com"
                      placeholderTextColor={colors.labelMuted}
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="email-address"
                      textContentType="emailAddress"
                      autoComplete="email"
                      className="min-h-11 rounded-2xl border border-border/50 bg-surface px-4 py-3 type-body text-label"
                    />
                  )}
                />
                {activeForm.formState.errors.email ? (
                  <Text className="type-caption text-danger">
                    {activeForm.formState.errors.email.message}
                  </Text>
                ) : null}
              </View>

              <View className="gap-2">
                <Text className="type-caption text-label-secondary">Пароль</Text>
                <Controller
                  control={activeForm.control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Минимум 6 символов"
                      placeholderTextColor={colors.labelMuted}
                      secureTextEntry
                      textContentType={isLogin ? 'password' : 'newPassword'}
                      autoComplete={isLogin ? 'password' : 'new-password'}
                      className="min-h-11 rounded-2xl border border-border/50 bg-surface px-4 py-3 type-body text-label"
                    />
                  )}
                />
                {activeForm.formState.errors.password ? (
                  <Text className="type-caption text-danger">
                    {activeForm.formState.errors.password.message}
                  </Text>
                ) : null}
              </View>

              {!isLogin ? (
                <View className="gap-2">
                  <Text className="type-caption text-label-secondary">Имя мамы (необязательно)</Text>
                  <Controller
                    control={signUpForm.control}
                    name="motherName"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        value={value ?? ''}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Анна"
                        placeholderTextColor={colors.labelMuted}
                        autoCapitalize="words"
                        className="min-h-11 rounded-2xl border border-border/50 bg-surface px-4 py-3 type-body text-label"
                      />
                    )}
                  />
                </View>
              ) : null}

              {formError ? <Text className="type-caption text-danger">{formError}</Text> : null}
            </View>

            <Pressable
              disabled={isSubmitting}
              onPress={() => {
                if (isLogin) {
                  void loginForm.handleSubmit(submitLogin)();
                  return;
                }
                void signUpForm.handleSubmit(submitSignUp)();
              }}
              accessibilityRole="button"
              accessibilityLabel={isLogin ? 'Войти' : 'Зарегистрироваться'}
              className="min-h-11 items-center justify-center rounded-2xl bg-brand px-5 active:opacity-80 disabled:opacity-60">
              {isSubmitting ? (
                <ActivityIndicator color={colors.onTint} />
              ) : (
                <Text className="type-headline text-onTint">
                  {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </Text>
              )}
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
