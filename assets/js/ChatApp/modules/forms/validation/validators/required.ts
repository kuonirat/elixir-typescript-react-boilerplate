import {Validation} from "monet";

export const required: <T>(value?: T) => Validation<string, T> = (value) => {
  if (value == null || (typeof value === "string" && value === "")) {
    return Validation.Fail("this field is required");
  } else {
    return Validation.Success(value);
  }
};
