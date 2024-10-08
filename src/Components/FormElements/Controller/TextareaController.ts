import { withHookController } from "./withHookController";
import { Textarea } from "../Textarea/Textarea";

export const TextareaController = withHookController(Textarea, 'onChangeText');
