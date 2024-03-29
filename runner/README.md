# Runner

Used for running a game made with Pixelot

## Usage

`npm run build` - build the project with webpack (development mode)

`npm run build-prod` - build the project with webpack (production mode - recommended)

`npm start` - launch the game via nw

## Create Distributable Game

Once built, run `npm run dist` to create distributable applications for each operating system, stored in the `dist/` directory.
Alternatively, run `npm run dist:windows` to only create windows binaries (faster). Same goes for Mac and Linux.

The `assets/` directory then needs to be copied into `dist/runner-1.0.0-[OS]/` for images to load properly.

### Directory Structure

Built games must have the following directory structure:
```
game/
├── assets/
├── prefabs/
├── scenes/
├── scripts/
│   ├── components/
│   ├── entities/
│   ├── shaders/
│   ├── systems/
└── project.proj
```
> Note: assets folder should be structured internally the same way as the assets are located in the project