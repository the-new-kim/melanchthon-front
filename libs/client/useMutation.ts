import { errorMessage } from "@libs/utils";
import { useState } from "react";

interface IUseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: string;
}

type TUseMutationResult<T> = [(data: any) => void, IUseMutationState<T>];

export default function useMutaion<T = any>(
  url: string,
  method: "POST" | "PUT" = "POST"
): TUseMutationResult<T> {
  const [state, setState] = useState<IUseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  const mutation = (data: any) => {
    setState((prev) => ({ ...prev, loading: true }));

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) =>
        setState((prev) => ({ ...prev, error: errorMessage(error) }))
      )
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  };

  return [mutation, { ...state }];
}
