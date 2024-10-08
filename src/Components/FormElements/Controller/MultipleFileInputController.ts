import { MultipleFileInput } from "../Input/FileInput/MultipleFileInput";
import { withHookController } from "./withHookController";

export const MultipleFileInputController = withHookController(MultipleFileInput, 'onChangeFiles');
