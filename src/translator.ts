import * as translateFuncs from './translationFuncs';

export default class Translator {
    enabled = true;
    translateModes: {[key: string]: translateFuncs.TranslationFunc} = {
        'bold': translateFuncs.bold,
    };
    
    translate(txt: string, mode: string): string {
        return this.translateModes[mode](txt);
    }
}