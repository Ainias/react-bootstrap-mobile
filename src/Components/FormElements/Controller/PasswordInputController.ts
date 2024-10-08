import { withHookController } from "./withHookController";
import { PasswordInput } from "../Input/PasswordInput/PasswordInput";

export const PasswordInputController = withHookController(PasswordInput, "onChangeText");
