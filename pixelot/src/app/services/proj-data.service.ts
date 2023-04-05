import { Injectable } from '@angular/core';
import * as engine from 'retro-engine';

const nw = (window as any).nw;
const fs = nw.require("fs");
const path = nw.require("path");

export type Project = {
  resolution: number[];
  start_scene: string;
  shaders: Shader[];
};

export type Shader = {
  name: string;    /* this is the **class** name of the shader*/
  args: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjDataService {
  curr_proj: Project;
  path: string;

  /**
   * Create and save a new project to the file system (no changes to the engine)
   * @param name The name of the project
   * @param resolution The rendering resolution of the project
   */
  newProject(name: string, resolution: {width: number, height: number}) {
    this.curr_proj = {
      resolution: [resolution.width, resolution.height],
      start_scene: "main",
      shaders: []
    };
    this.path = path.join("./projects", name, 'project.proj');
    this.saveProject();
  }

  
  /**
   * Load a project to the service
   * **Note: this is only for UI purposes, there are no changes to the engine**
   * @param project the parsed JSON project object
   * @param proj_path the path to the directory containing the project file
   */
  loadProject(project: Project, proj_path: string) {
    this.path = path.join(proj_path, 'project.proj');
    this.curr_proj = project;
  }

  /**
   * Save the current project json `(.proj)` to the file it was loaded from
   */
  saveProject() {
    // if there is no project loaded, don't do anything
    if (!this.curr_proj || !this.path) {
      return;
    }

    const projJson = JSON.stringify(this.curr_proj, null, 2);
    fs.writeFile(this.path, projJson, (err: any) => {
      if (err) {
        console.error(err);
      }
    });
  }

  /**
   * Add a new shader to the project (also acts on the engine)
   * @param shader the shder to add to the project
   */
  addShader(shader: Shader) {
    this.curr_proj.shaders.push(shader);

    // add it to the engine
    const shader_import = engine.ImportManager.getShader(shader.name);
    if (!shader_import) {
      throw new Error(`Shader ${shader.name} not found`);
    }

    // get default args
    const args = this.genDefaultArgs(shader);
    // construct the shader
    const new_shader = new shader_import.constr(...args);
    engine.PostProcessing.add(new_shader);

    // also update the shader args to the default args
    shader.args = args;
  }

  /**
   * Generate the default arguments for a shader
   * @param shader the shader to generate the default arguments for
   * @returns an array of the default arguments for the shader
   */
  private genDefaultArgs(shader: Shader) {
    const shader_import = engine.ImportManager.getShader(shader.name);
    if (!shader_import) {
      throw new Error(`Shader ${shader.name} not found`);
    }

    let args = [];
    for (let i = 0; i < shader_import.arg_names.length; i++) {
      args.push(this.generateDefaultArg(shader_import.arg_types[i].constructor.name));
    }

    return args;
  }

  /**
   * Generate the default value for an argument type
   * @param type the type of the argument
   * @returns default value for the argument
   */
  private generateDefaultArg(type: string) {
    switch (type) {
      case 'StringType':
        return '';
      case 'NumberType':
        return 0;
      case 'BooleanType':
        return false;
      case 'FileType':
        return '';
      default:
        return '';
    }
  }

  /**
   * get the names of the shaders in the project
   * @returns an array of the names of all the shaders in the project
   */
  getShaders(): string[] {
    return this.curr_proj.shaders.map(shader => shader.name);
  }

  /**
   * Get the argument of a shader in the project by index
   * @param shader_index index of the shader to get the arguments of
   * @param arg_index index of the argument to get
   * @returns the value of the argument
   */
  getShaderArg(shader_index: number, arg_index: number) {
    return this.curr_proj.shaders[shader_index].args[arg_index];
  }

  /**
   * Delete a shader from the project by index (also acts on the engine)
   * @param index the index of the shader to delete
   */
  deleteShader(index: number) {
    this.curr_proj.shaders.splice(index, 1);
    // get the shader from the engine
    const shader = engine.PostProcessing.post_queue[index];
    // remove it from the engine
    engine.PostProcessing.remove(shader);
  }

  /**
   * Change the value of an argument in a shader (also acts on the engine)
   * @param shader_index the index of the shader to edit
   * @param arg_index the index of the argument to edit
   * @param value the new value of the argument
   */
  setShaderArg(shader_index: number, arg_index: number, value: any) {
    let proj_shader = this.curr_proj.shaders[shader_index]
    proj_shader.args[arg_index] = value;
    // parse the new args
    const shader_import = engine.ImportManager.getShader(this.curr_proj.shaders[shader_index].name);
    const args = shader_import.parseArgs(this.curr_proj.shaders[shader_index].args);
    // delete the shader from the engine
    this.deleteShader(shader_index);
    // add the shader back to the engine
    const new_shader = new shader_import.constr(...args);
    engine.PostProcessing.add(new_shader);
    this.curr_proj.shaders.push(proj_shader);
    // move the shader to the correct index
    this.moveShader(engine.PostProcessing.post_queue.length - 1, shader_index);
  }

  /**
   * Move a shader to a new index (also acts on the engine)
   * @param old_index index of the shader to move
   * @param new_index index to move the shader to
   */
  moveShader(old_index: number, new_index: number) {
    // remove the shader from the old index
    const shader = this.curr_proj.shaders.splice(old_index, 1)[0];
    // insert the shader at the new index
    this.curr_proj.shaders.splice(new_index, 0, shader);

    // do the same for the engine
    const engine_shader = engine.PostProcessing.post_queue.splice(old_index, 1)[0];
    engine.PostProcessing.post_queue.splice(new_index, 0, engine_shader);
  }
  
}
