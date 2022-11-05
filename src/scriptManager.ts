class ScriptManager {
    // The list of entities in the scene
    private static scripts = new Map<string, HTMLScriptElement>();;

    static loadScripts(scripts:string[]) {
        if (this.scripts.size > 0)
            return;
        for (let scriptName of scripts) {
            this.addScript(scriptName);
        }
    }

    // Add an entity to the Scene
    static addScript(scriptName:string) {
        if (this.scripts.has(scriptName))
            return;
        let script = document.createElement("script");
        script.type = "text/javascript";
        //set script source(content)
        script.src = "build/scripts/" + scriptName;
        //Make sure async is off to load script immediately
        script.async = false;
        //Add error tracing
        script.onerror = ((e) => console.trace(e));
        document.body.appendChild(script);

        this.scripts.set(scriptName, script);
    }

}
