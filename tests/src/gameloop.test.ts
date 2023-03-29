import { expect, test } from "@jest/globals";
import { Game, Renderer } from "retro-engine";

test("Load game", () => {
    Renderer.init(true);
    Game.loadGame("./projects/test_project/");
    expect(Game.start_scene).toBe("test_scene");
});
