import { expect, test } from "@jest/globals";
import { FileUtils, StringUtils } from "retro-engine";
import path from "path";

test("StringUtils", () => {
    expect(StringUtils.isPostfix("hello world", "world")).toBe(true);
    expect(StringUtils.isPostfix("hello world", "hello")).toBe(false);
    expect(StringUtils.isPostfix("hello world", "hello world")).toBe(true);
    expect(StringUtils.isPostfix("file.js", ".js")).toBe(true);
});

test("FileUtils", () => {
    let absolutePath = FileUtils.findFile("test_scene.scene", "./projects/test_project/");
    absolutePath = absolutePath.split(path.sep).join(path.posix.sep);
    expect(StringUtils.isPostfix(absolutePath, "projects/test_project/scenes/test_scene.scene")).toBe(true);
    expect(FileUtils.findFile("nonexistent.txt", "./projects/test_project/")).toBe(null);
});

