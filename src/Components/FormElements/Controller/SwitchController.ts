import { Switch } from "../Switch/Switch";
import { withHookController } from "./withHookController";

export const SwitchController = withHookController(Switch, "onChangeChecked");
