import { useReducer, ChangeEvent } from 'react';
import { ValidationResultType } from '@/utils/validator';

interface InputState {
  value: string;
  isTouched: boolean;
}

type InputAction =
  | { type: 'INPUT'; value: string; }
  | { type: 'BLUR' }
  | { type: 'RESET' };

const initialInputState: InputState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state: InputState, action: InputAction): InputState => {
  if (action.type === 'INPUT') {
    return { ...state, value: action.value };
  }
  if (action.type === 'BLUR') {
    return { ...state, isTouched: true };
  }
  if (action.type === 'RESET') {
    return { ...initialInputState };
  }
  return state;
};

const useInput = (validateValue: (value: string) => ValidationResultType) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const result = validateValue(inputState.value);

  const errorMsg = !result.isValid? result.msg || 'Input is invalid.' : null

  const valueChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    dispatch({ type: 'INPUT', value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  const setValue = (value: string) => {
    dispatch({ type: 'INPUT', value });
  }

  return {
    value: inputState.value,
    errorMsg,
    isTouched: inputState.isTouched,
    valueChangeHandler,
    inputBlurHandler,
    reset,
    setValue,
  };
};

export default useInput;