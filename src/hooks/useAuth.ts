import {create} from 'zustand';
interface AuthType {
  name: string;
  email: string;
  passWord: string;
  confirmPassword: string;
  errorName: string;
  errorEmail: string;
  errorPassword: string;
  errorConfirmPassword: string;
}

interface AuthAction extends AuthType {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (passWord: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setErrorName: (nameError: string) => void;
  setErrorEmail: (emailError: string) => void;
  setErrorPassword: (passWordError: string) => void;
  setErrorConfirmPassword: (confirmPasswordError: string) => void;
}
export const useAuth = create<AuthAction>(set => ({
  name: '',
  email: '',
  passWord: '',
  confirmPassword: '',
  errorName: '',
  errorEmail: '',
  errorPassword: '',
  errorConfirmPassword: '',
  setName: (name: string) => set({name: name}),
  setEmail: (email: string) => set({email: email}),
  setPassword: (passWord: string) => set({passWord}),
  setConfirmPassword: (confirmPassword: string) => set({confirmPassword}),
  setErrorName: (nameError: string) => set({errorName: nameError}),
  setErrorEmail: (emailError: string) => set({errorEmail: emailError}),
  setErrorPassword: (passWordError: string) =>
    set({errorPassword: passWordError}),
  setErrorConfirmPassword: (confirmPasswordError: string) =>
    set({errorConfirmPassword: confirmPasswordError}),
}));
