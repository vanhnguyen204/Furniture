export const validateFullName = (value: string): string => {
  if (value.trim().length === 0) {
    return 'Name is required';
  } else if (value.trim().length < 10) {
    return 'Full name must be more than 10 characters!';
  } else if (value.trim().length > 40) {
    return 'Full name cannot exceed 40 characters!';
  } else {
    return '';
  }
};

export const validateEmail = (value: string): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value.trim().length === 0) {
    return 'Email is required.';
  } else if (!emailRegex.test(value.trim())) {
    return 'Email format is wrong. Ex: example@gmail.com';
  } else {
    return '';
  }
};

export const validatePass = (pass: string): string => {
  if (pass.trim().length === 0) {
    return 'Password is required.';
  } else if (pass.trim().length < 6) {
    return 'Password is at least 6 characters';
  } else if (pass.trim().length > 16) {
    return 'Password cannot exceed 40 characters!';
  } else {
    return '';
  }
};

export const validateConfirmPass = (
  pass: string,
  confirmPass: string,
): string => {
  if (confirmPass.trim().length === 0) {
    return 'Bạn phải xác nhận lại mật khẩu.';
  } else if (confirmPass.trim().length < 6) {
    return 'Mật khẩu xác nhận phải nhiều hơn 6 ký tự.';
  } else if (confirmPass.trim().length > 16) {
    return 'Mật khẩu xác nhận phải ít hơn 16 ký tự.';
  } else if (pass !== confirmPass) {
    return 'Mật khẩu xác nhận không khớp.';
  } else {
    return '';
  }
};
