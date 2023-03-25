import { Game } from "./gameloop.js";
import { ImportManager } from "./importManager.js";

const nw = (window as any).nw;
const fs = nw.require('fs');
const path = nw.require('path');

export class Builder {
    static build(destination: string, target_platform: string) {
        // make the directory for the game
        fs.mkdirSync(path.join(destination, Game.project_name));

        // append the project name to the destination path
        destination = path.join(destination, Game.project_name);
        
        // first copy the necessary runner to the destination
        fs.cpSync(`./runners/${target_platform}`, destination, { overwrite: true, recursive: true });

        // rename the runner.exe to the project name
        fs.renameSync(path.join(destination, 'runner.exe'), path.join(destination, `${Game.project_name}.exe`));
        
        // only copy the files into assets that aren't scripts/scenes/prefabs/project.json
        const copy_filter = (src: string, dest: string) => {
            // if the file ending is .js, .proj, .scene, or .prefab, don't copy it
            return !(src.endsWith('.js') || src.endsWith('.proj') 
                || src.endsWith('.scene') || src.endsWith('.prefab'));
            
        }
        fs.cpSync(`./projects/${Game.project_name}`, path.join(destination, './game/assets'), { overwrite: true, recursive: true, filter: copy_filter});

        // copy the non-asset files into the game directory
        const proj_base_path = `./projects/${Game.project_name}/`;
        const projectFiles = ImportManager.getFilePaths(proj_base_path);
        fs.copyFileSync(
            path.join(proj_base_path, `${projectFiles.project}.proj`),
            path.join(destination, './game/project.proj'));
        for (const scene of projectFiles.scenes) {
            fs.copyFileSync(
                path.join(proj_base_path, `${scene}.scene`),
                path.join(destination, './game/scenes', `${path.basename(scene)}.scene`));
        }
        for (const prefab of projectFiles.prefabs) {
            fs.copyFileSync(
                path.join(proj_base_path, `${prefab}.prefab`),
                path.join(destination, './game/prefabs', `${path.basename(prefab)}.prefab`));
        }

        //copy the scripts into the game directory
        for (const script of projectFiles.scripts) {
            this.moveScript(
                script,
                destination,
                proj_base_path);
        }
    }

    static moveScript(script: string, dest: string, proj_base_path: string) {
        // get the script import record to determine its type
        const imp_record = ImportManager.getRecord(script);
        const script_path = path.join(proj_base_path, script+'.js');
        let dest_path = '';
        switch (imp_record.type) {
            case 'component':
                dest_path = path.join(dest, './game/scripts/components', `${path.basename(script)}.js`);
                break;
            case 'system':
                dest_path = path.join(dest, './game/scripts/systems', `${path.basename(script)}.js`);
                break;
            case 'entity':
                dest_path = path.join(dest, './game/scripts/entities', `${path.basename(script)}.js`);
                break;
            case 'shader':
                dest_path = path.join(dest, './game/scripts/shaders', `${path.basename(script)}.js`);
                break;
            default:
                throw new Error(`Unknown script type: ${imp_record.type}`);
        }
        fs.copyFileSync(script_path, dest_path);
    }
}