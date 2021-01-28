import * as translateFuncs from './translationFuncs';

export default class Translator {
    enabled = true;
    translateModes: {[key: string]: (txt: string) => string} = {
        'bold': translateFuncs.bold,
    };
    
    translate(txt: string, mode: string): string {
        return this.translateModes[mode](txt);
    }
}