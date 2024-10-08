import { withHookController } from "./withHookController";
import { Select } from "../Select/Select";

export const SelectController = withHookController(Select, "onChangeValue");
