// const scriptsList = ["damage.js"];

// export class ScriptManager {
//     // The list of entities in the scene

//     static scriptData = new Map<string, any>();

//     static async loadScripts() {
//         for (const script of scriptsList) {
//             await this.addScript(script);
//         }
//     }

//     static async addScript(script:string) {
//         const a = await import("./scripts/"+script)
//                         .catch(e => console.trace(e));
//         this.scriptData.set(script, a);
//         return;
//     }
// }

// declare global {
//     interface Window { ScriptManager: ScriptManager; }
// }

// window.ScriptManager = window.ScriptManager || ScriptManager;

// export async function loadScripts() {
//     await ScriptManager.loadScripts();
// }