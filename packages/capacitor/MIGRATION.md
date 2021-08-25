# Migration

# 11.x.x - 12.0.0

The `@capacitor/cli` dependency can now be moved to the workspace root `package.json` and can be removed from the applications `package.json`. However, this is not necessary.

Capacitor plugins must still be added to both the root and application-level `package.json`, but are no longer required to be installed into the application-level `node_modules/`. If your application-level `package.json` is installing the Capacitor CLI and Capacitor plugins, then this `node_modules/` directory can be removed entirely.

# 1.x.x - 2.0.0

## Move Capacitor Configs

With `@nxtend/capacitor` 2.0+, Capacitor configurations will be added to the associated frontend project instead of creating a dedicated Capacitor project. Migrating to this new paradigm is trivial and takes just a few steps.

First, add a new set of Capacitor configs to your frontend project.

```
nx g @nxtend/capacitor:capacitor-project --project my-app
```

Move `capacitor.config.json` from the Capacitor project to the root of the associated frontend project. You will have to overwrite the `capacitor.config.json` that was just generated.

Move all platform folders (`android`, `ios`, `electron`) from the Capacitor project to the root of the frontend project.

You should now test the Capacitor commands for the frontend project and ensure the project works as expected.

```
nx run my-app:sync --platform ios
nx run my-app:open --platform ios
```

If everything works as expected then you can safely remove the Capacitor project.

```
nx g @nrwl/workspace:remove my-app
```

The `@capacitor/cli` dependency in the root `package.json` is also no longer needed and can be removed.
