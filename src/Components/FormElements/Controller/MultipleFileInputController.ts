import { MultipleFileInput } from "../Input/FileInput/MultipleFileInput";
import { withHookController } from "./withHookController";

// TODO Error handling(?)
export const MultipleFileInputController = withHookController(MultipleFileInput, 'onChangeFiles');
