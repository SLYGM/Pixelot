export class StringUtils {
    static isPostfix(str1:string, str2:string) : boolean {
        const idx = str1.indexOf(str2);
        return idx >= 0 && idx + str2.length == str1.length;
    }
}

export class ScriptUtils {
    static loadScript(src:string) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        //set script source(content)
        script.src = src;
        //Make sure async is off to load script immediately
        script.async = false;
        //Add error tracing
        script.onerror = ((e) => console.trace(e));
        document.body.appendChild(script);
    }
}