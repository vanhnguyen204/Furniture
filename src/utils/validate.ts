export const validateFullName = (value: string): string => {
  if (value.trim().length === 0) {
    return 'Bạn không được bỏ trống họ tên!';
  } else if (value.trim().length < 10) {
    return 'Họ tên phải nhiều hơn 10 ký tự!';
  } else if (value.trim().length > 40) {
    return 'Họ tên không được quá 40 ký tự!';
  } else {
    return '';
  }
};

export const validateEmail = (value: string): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value.trim().length === 0) {
    return 'Bạn không được bỏ trống email!';
  } else if (!emailRegex.test(value.trim())) {
    return 'Sai định dạng email. Ex: example@gmail.com';
  } else {
    return '';
  }
};

export const validatePass = (pass: string): string => {
  if (pass.trim().length === 0) {
    return 'Không được để trống mật khẩu.';
  } else if (pass.trim().length < 6) {
    return 'Mật khẩu phải nhiều hơn 6 ký tự.';
  } else if (pass.trim().length > 16) {
    return 'Mật khẩu phải ít hơn 16 ký tự.';
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
