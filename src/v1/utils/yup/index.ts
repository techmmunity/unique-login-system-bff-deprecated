/**
 *
 * Every Time that a function be added here,
 * you need to add the type to
 * the types/yup.d.ts file
 *
 */

import * as yup from "yup";

import { fullName } from "./string/full-name";
import { password } from "./string/password";
import { username } from "./string/username";

export type Yup = typeof yup;

fullName(yup);
password(yup);
username(yup);

export const InvalidParamsErrorMessage = `this must be a \`object\` type, but the final value was: \`null\` (cast from the value \`""\`).
 If "null" is intended as an empty value be sure to mark the schema as \`.nullable()\``;

export { yup };
