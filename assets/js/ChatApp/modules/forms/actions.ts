import {FormikHelpers} from "formik";

export interface IFormAction<D> {
  helpers: FormikHelpers<Partial<D>>;
}
