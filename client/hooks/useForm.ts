import { Dispatch, useState } from "react";

//* interface *//
interface Return {
  error: string | undefined;
  formValues: any;
  isSending: boolean;

  setError: Dispatch<string | undefined>;
  setIsSending: Dispatch<boolean>;

  onInputChange({ target }: any): void;
  onSetError(error: string): void;
  reset(): void;
}

export const useForm = <T>(initialState: T): T & Return => {
  const [formValues, setFormValues] = useState(initialState);
  const [error, setError] = useState<string>();
  const [isSending, setIsSending] = useState<boolean>(false);

  const reset = () => {
    setFormValues(initialState);
  };

  const onInputChange = ({ target }: any) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onSetError = (error: string) => {
    setError(error);

    setTimeout(() => {
      setError("");
    }, 4000);
  };

  return {
    //* properties
    ...formValues,
    formValues,
    error,
    isSending,

    //* setters
    setError,
    setIsSending,

    //* methods
    onInputChange,
    onSetError,
    reset,
  };
};
