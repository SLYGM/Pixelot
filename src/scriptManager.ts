const scriptsList = ["damage.js"];

export class ScriptManager {
    // The list of entities in the scene

    static scriptData = new Map<string, any>();

    static async loadScripts() {
        for (let script of scriptsList) {
            await this.addScript(script);
        }
    }

    static async addScript(script:string) {
        let a = await import("./scripts/"+script);
        this.scriptData.set(script, a);
        return;
    }

}

await ScriptManager.loadScripts();