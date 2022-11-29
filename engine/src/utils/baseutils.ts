export class StringUtils {
    static isPostfix(str1: string, str2: string): boolean {
        const idx = str1.indexOf(str2);
        return idx >= 0 && idx + str2.length == str1.length;
    }

    //Hashes a string. Useful to compare strings.
    //Implementation pulled from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript.
    //53-bit hash (much less collisions)
    static cyrb53(str : string, seed = 0) : number {
        let h1 = 0xdeadbeef ^ seed,
          h2 = 0x41c6ce57 ^ seed;
        for (let i = 0, ch; i < str.length; i++) {
          ch = str.charCodeAt(i);
          h1 = Math.imul(h1 ^ ch, 2654435761);
          h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        
        h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
        
        return 4294967296 * (2097151 & h2) + (h1 >>> 0);
      };
      
}
