// const alphaNumeric_re = /([A-Z]|[a-z]|[0-9])/g
function unicodeReplace (txt:string, unicodeStartHexUpper: string, unicodeStartHexLower: string, unicodeStartHexNumber: string): string {
    let output = "";
    for(const c of txt) {
        // default
        let idx = 0;
        let unicodeStartHex = unicodeStartHexUpper;

        // cases for A-Z, a-z, 0-9
        switch(c) {
            case (c.match(/[A-Z]/) || {}).input:
                idx = c.charCodeAt(0) - 65;
                unicodeStartHex = unicodeStartHexUpper;
                break;
            case (c.match(/[a-z]/) || {}).input:
                idx = c.charCodeAt(0) - 97;
                unicodeStartHex = unicodeStartHexLower;
                break;
            case (c.match(/[0-9]/) || {}).input:
                idx = c.charCodeAt(0) - 48;
                unicodeStartHex = unicodeStartHexNumber;
                break;
            default:
                output += c;
                continue;
        }
        output += String.fromCodePoint(parseInt(unicodeStartHex, 16) + idx);
    }
    return output;
}
export const bold = (txt:string): string => {
    // return txt.replace(alphaNumeric_re, '1D400');
    return unicodeReplace(txt, '1D400', '1D41A', '1D7EC');
}