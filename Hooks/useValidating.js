function useValidating() {
  return {
    validateEmail: email => {
      const emailCheck = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (email.match(emailCheck)) return true;
      else return false;
    },
    validatePassword: password => {
      const passwordFirstCheck = /[0-9]/;
      const passwordSecondCheck = /[a-z]/;
      const passwordThirdCheck = /[A-Z]/;
      const passwordFourthCheck = /[~!@#$%^&*()_+\-=\\|{}\[\]?><;,.\"']+/;
      if (
        password.match(passwordFirstCheck) &&
        password.match(passwordSecondCheck) &&
        password.match(passwordThirdCheck) &&
        password.match(passwordFourthCheck) &&
        password.length >= 8
      ) {
        return true;
      } else return false;
    },
    validatePhoneNumber: phoneNumber => {
      const phoneNumberRegex = /009627[7-9]{1,}[0-9]{7,}/;
      if (phoneNumber.match(phoneNumberRegex) && phoneNumber.length === 14)
        return true;
      else return false;
    },
    validateRePassword: (rePassword, password) => {
      if (rePassword === password) return true;
      else return false;
    },
    validateFullName: fullName => {
      const fullnameRegex = /^[a-zA-Z]+\s[a-zA-Z]+\s[a-zA-Z]+\s[a-zA-Z]+$/;
      if (fullName.match(fullnameRegex)) return true;
      else return false;
    },
  };
}
export default useValidating;
