import { withHookController } from "./withHookController";
import { ColorInput } from "../ColorInput/ColorInput";

export const ColorInputController = withHookController(ColorInput, "onChangeColor");
