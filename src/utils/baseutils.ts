export class StringUtils {
    static isPostfix(str1:string, str2:string) : boolean {
        const idx = str1.indexOf(str2);
        return idx >= 0 && idx + str2.length == str1.length;
    }
}