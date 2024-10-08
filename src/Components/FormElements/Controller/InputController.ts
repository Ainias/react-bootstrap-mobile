import { Input } from "../Input/Input";
import { withHookController } from "./withHookController";

export const InputController = withHookController(Input, "onChangeText");
