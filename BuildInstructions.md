# Building Pixelot
## Building the Runners
1. Within `runners\` run `npm run build-prod`
2. Then run `npm run dist:<target>` where `<target>` is one of `windows`, `mac`, or `linux` (or just `npm run dist` to build all three)
3. Within `runners\dist\` you will find the distributable files for each target
4. Within `runners\dist\<target>` find the reference in `package.json` to the engine library and correct the relative path to point to the `engine` directory
5. Now run `npm run install` within `runners\dist\<target>`
6. Delete the `game` folder within the runner (this will be created by the engine when building)
7. Finally, copy the built runner to `pixelot\runners\<target>` and rename the folder to 'Windows', 'Linux', or 'Mac'  
   Your `pixelot` directory should now look like (if you only want to build to Windows, the other folders aren't necessary):
   ```
   pixelot
    |___<everything else>
    |___ runners
        |_____Windows
        |_____Linux
        |_____Mac
   ```

## Building the UI
1. Within `pixelot\` run `npm run build`
2. Then run `npm run dist:<target>` where `<target>` is one of `windows`, `mac`, or `linux` (or just `npm run dist` to build all three)
3. Follow instructions 3-5 from the previous section, in the `pixelot\dist\<target>` directory instead, to install the engine library and necessary packages
4. Take all files from `pixelot\dist\<target>\dist-ng` and move them up one level (deleting the extra `projects` and `engine_assets` folders within). 
> This has been changed from how it was previously because otherwise the root directory of the UI would be `dist-ng` and not `pixelot` which is what the engine expects.