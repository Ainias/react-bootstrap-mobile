import { Characters } from './Characters';

export function nonEmptyString(str: string | undefined | null, other = Characters.NBSP) {
    if (!str) {
        return other;
    }
    return str;
}
