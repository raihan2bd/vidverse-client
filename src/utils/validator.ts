export type ValidationResultType = {
  isValid: boolean;
  msg?: string;
};

export const validateInput = (
  input: string | number | null,
  rules: {
    inputType?: string;
    minLength?: number;
    maxLength?: number;
    isEmail?: boolean;
    isPassword?: boolean;
    comparePass?: string;
    pattern?: RegExp;
    imageType?: string[];
  }
): ValidationResultType => {
  const {
    minLength,
    maxLength,
    pattern,
    inputType,
    isEmail,
    isPassword,
    comparePass,
    imageType,
  } = rules;

  if (inputType) {
    if (typeof input !== inputType) {
      return {
        isValid: false,
        msg: `only ${inputType} allowed as a input element`,
      };
    }
  }

  if (typeof input === "string") {
    if (minLength !== undefined && input.trim().length < minLength) {
      return {
        isValid: false,
        msg: `Input must be at least ${minLength} characters long.`,
      };
    }

    if (maxLength !== undefined && input.trim().length > maxLength) {
      return {
        isValid: false,
        msg: `Input cannot exceed ${maxLength} characters.`,
      };
    }

    if (isEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input)) {
        return {
          isValid: false,
          msg: "Invalid email format.",
        };
      }
    }

    if (isPassword) {
      let hasUpper = false;
      let hasLower = false;
      let hasNumber = false;
      let hasSpecial = false;
      let hasSpace = false;

      // Loop through each character in the password
      for (const char of input) {
        if (char.match(/[A-Z]/)) {
          hasUpper = true;
        } else if (char.match(/[a-z]/)) {
          hasLower = true;
        } else if (char.match(/[0-9]/)) {
          hasNumber = true;
        } else if (char.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/)) {
          hasSpecial = true;
        } else if (char.match(/\s/)) {
          hasSpace = true;
        }
      }

      if (!(hasUpper && hasLower && hasNumber && hasSpecial)) {
        return {
          isValid: false,
          msg: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        };
      }

      if (hasSpace) {
        return {
          isValid: false,
          msg: "Password cannot contain spaces.",
        };
      }
    }

    if (pattern && !pattern.test(input)) {
      return {
        isValid: false,
        msg: "Invalid input format.",
      };
    }

    if(comparePass) {
      if(input !== comparePass) {
        return {
          isValid: false,
          msg: "Conformation password is not matched"
        }
      }
    }
  }

  if (typeof input === "number") {
    if (minLength !== undefined && input < minLength) {
      return {
        isValid: false,
        msg: `Input must be at least ${minLength}.`,
      };
    }

    if (maxLength !== undefined && input > maxLength) {
      return {
        isValid: false,
        msg: `Input cannot exceed ${maxLength}.`,
      };
    }
  }

  if (input === null || input === undefined) {
    return {
      isValid: false,
      msg: `Input is required.`,
    };
  }

  return {
    isValid: true,
  };
};
