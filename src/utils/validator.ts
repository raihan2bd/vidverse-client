export type ValidationResultType = {
  isValid: boolean;
  msg?: string;
};


export const validateInput = (input: string | number | File | null, rules: {
  inputType?: string | number | boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  imageType?: string[];
}): ValidationResultType => {
  const { minLength, maxLength, pattern, inputType, imageType } = rules;

  if(inputType) {
    if (typeof input !== inputType) {
      return {
        isValid: false,
        msg: `only ${inputType} allowed as a input element`
      }
    }
  }

  if (typeof input === 'string') {
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

    if (pattern && !pattern.test(input)) {
      return {
        isValid: false,
        msg: 'Invalid input format.',
      };
    }
  }

  if (typeof input === 'number') {
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

  if (input instanceof File) {
    if (imageType && !imageType.includes(input.type)) {
      return {
        isValid: false,
        msg: `Please upload a valid image file.`,
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
