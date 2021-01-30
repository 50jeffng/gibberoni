export interface TranslationFunc {
    (txt: string): string;
}

// const alphaNumeric_re = /([A-Z]|[a-z]|[0-9])/g
function unicodeAlphanumericReplace (txt:string, unicodeStartHex: {upper:string, lower:string, number:string}): string {
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
export const bold = (txt:string): string => {
    // return txt.replace(alphaNumeric_re, '1D400');
    return unicodeReplace(txt, {upper:'1D400', lower:'1D41A', number:'1D7EC'});
}