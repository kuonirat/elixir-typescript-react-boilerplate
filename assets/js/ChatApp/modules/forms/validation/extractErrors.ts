import {Validation} from "monet";

type Validations<Values> = {
  [K in keyof Values]?: Validation<string, any>;
};

type Errors<Values> = {
  [K in keyof Values]?: string;
};

// finds failed validations in an object and extracts error messages from them
export const extractErrors: <V>(validations: Validations<V>) => Errors<V> = <V>(validations: Validations<V>) => {
  return Object
    .keys(validations)
    .map((key) => <keyof V>key)
    .filter((key) => (validations[key] as Validation<string, any>).isFail())
    .reduce((acc, key) => ({...acc, [key]: (validations[key] as Validation<string, any>).fail()}), {});
};
