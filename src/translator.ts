import translationData from './translationData.json';

interface TranslationFunc {
    (txt: string): string;
}

export default class Translator {
    enabled = true;
    translateModes: {[key: string]: TranslationFunc} = {};

    constructor() {
        this.initTranslationModes();
    }
    
    // translate will use input mode
    translate(txt: string, mode: string): string {
        // if input mode does not exist, just return txt
        if(!(mode in this.translateModes)) return txt;
        return this.translateModes[mode](txt);
    }

    // initialise all modes by dynamically adding from json files
    private initTranslationModes() {
        for(const entry of Object.entries(translationData.alphaNumericalStartHexes)) {
            this.translateModes[entry[0]] = (txt:string) => {return this.unicodeAlphanumericReplace(txt, entry[1])};
        }
    }

    // const alphaNumeric_re = /([A-Z]|[a-z]|[0-9])/g
    private unicodeAlphanumericReplace (txt:string, unicodeStartHex: {upper?:string, lower?:string, number?:string}): string {
    let output = "";
    for(const c of txt) {
        // default
        let idx = 0;
        let currentUnicodeStartHex: string | undefined | null;

        // cases for A-Z, a-z, 0-9
        switch(c) {
            case (c.match(/[A-Z]/) || {}).input:
                idx = c.charCodeAt(0) - 65;
                currentUnicodeStartHex = unicodeStartHex.upper;
                break;
            case (c.match(/[a-z]/) || {}).input:
                idx = c.charCodeAt(0) - 97;
                currentUnicodeStartHex = unicodeStartHex.lower;
                break;
            case (c.match(/[0-9]/) || {}).input:
                idx = c.charCodeAt(0) - 48;
                currentUnicodeStartHex = unicodeStartHex.number;
                break;
            default:
                currentUnicodeStartHex = null;
                break;
        }
        if(currentUnicodeStartHex) {
            output += String.fromCodePoint(parseInt(currentUnicodeStartHex, 16) + idx);
        }
        else {
            // just insert character as is
            output += c;
        }
    }
    return output;
}
}