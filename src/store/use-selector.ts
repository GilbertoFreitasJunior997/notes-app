import { useCallback } from "react";

export const useSelector = <
  TStore extends object,
  TKeys extends (keyof TStore)[] = (keyof TStore)[],
  TReturn = { [key in TKeys[number]]: TStore[key] }
>(
  ...keys: TKeys
) =>
  useCallback(
    (store: TStore) => {
      const ret = {} as TReturn;

      keys.forEach((key) => {
        ret[key as unknown as keyof TReturn] = store[
          key
        ] as unknown as TReturn[keyof TReturn];
      });

      return ret;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...keys]
  );
