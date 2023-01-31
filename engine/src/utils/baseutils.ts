const nw = (window as any).nw;
const fs = nw.require('fs');
const path = nw.require('path');
export class StringUtils {
    static isPostfix(str1: string, str2: string): boolean {
        const idx = str1.indexOf(str2);
        return idx >= 0 && idx + str2.length == str1.length;
    }
}

export class FileUtils {
    /**
     * Find the path to the file with the given name in the given directory and its subdirectories.
     * 
     * @param name name of the file to find e.g. 'scene.json'
     * @param startPath starting path of the search e.g. './projects/project1/'
     * @returns file path if found, null otherwise
     */
    static findFile(name: string, startPath: string) {
        // if file exists, return it's path
        if (fs.existsSync(startPath + name)) {
            return path.join(startPath, name);
        }
        
        // otherwise, search in subdirectories
        const files = fs.readdirSync(startPath);
        for (const file of files) {
            const filename = path.join(startPath, file);
            const stat = fs.lstatSync(filename);
            if (stat.isDirectory()) {
                const result = FileUtils.findFile(name, filename + '/');
                if (result) {
                    return path.resolve(result);
                }
            }
        }

        return null;
    }
}
