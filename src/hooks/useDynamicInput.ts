import { useReducer, ChangeEvent } from 'react';
import { ValidationResultType } from '@/utils/validator';

interface InputState<T> {
  value: T;
  isTouched: boolean;
}

type InputAction<T> =
  | { type: 'INPUT'; value: T; }
  | { type: 'BLUR' }
  | { type: 'RESET' };

const initialInputState = <T,>(initialValue: T): InputState<T> => {
  return {
    value: initialValue,
    isTouched: false,
  };
};

const inputStateReducer = <T,>(state: InputState<T>, action: InputAction<T>): InputState<T> => {
  if (action.type === 'INPUT') {
    return { ...state, value: action.value };
  }
  if (action.type === 'BLUR') {
    return { ...state, isTouched: true };
  }
  if (action.type === 'RESET') {
    return initialInputState(state.value);
  }
  return state;
};

const useDynamicInput = <T,>(validateValue: (value: T) => ValidationResultType, initialValue: T) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState(initialValue)
  );

  const result = validateValue(inputState.value as T);

  const errorMsg = !result.isValid? result.msg || 'Input is invalid.' : null

  const valueChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value as unknown as T;
    dispatch({ type: 'INPUT', value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  const setValue = (value: T) => {
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

export default useDynamicInput;