/**
 * Compile and bundle all the distributables into dist.
 *
 * Note: This file does NOT use deno.json as a config file for itself.
 * That config file is specifically for use in Deno.emit.
 */
import { copySync, ensureDir } from "https://deno.land/std@0.97.0/fs/mod.ts";

// Probably need to start using multiple config files to support
// webworker functionality in background.ts
import compilerOptions from "./deno.json" assert { type: "json" };

interface BrowserManifestSettings {
  color: string;
  omits: string[];
  // deno-lint-ignore no-explicit-any
  overrides?: { [id: string]: any };
}

interface BrowserManifests {
  [id: string]: BrowserManifestSettings;
}

const emitOptions: Deno.EmitOptions = {
  bundle: "classic",
  importMapPath: "./import_map.json",
  compilerOptions: compilerOptions as Deno.CompilerOptions,
};

const browsers: BrowserManifests = {
  chrome: {
    color: "\x1b[32m",
    omits: ["applications", "options_ui"],
  },
  firefox: {
    color: "\x1b[91m",
    overrides: {
      manifest_version: 2,
      // @todo this is not elegant
      background: {
        scripts: ["background.js"],
      },
    },
    omits: ["options_page"],
  },
};

if (Deno.args[0] === "chrome") delete browsers.firefox;
if (Deno.args[0] === "firefox") delete browsers.chrome;

console.log("\x1b[37mPackager\n========\x1b[0m");

Object.keys(browsers).forEach(async (browserId) => {
  const distDir = `dist/${browserId}`;

  // Copy JS/HTML/CSS/ICONS
  ensureDir(`${distDir}/static`);

  const options = { overwrite: true };
  copySync("source/static", distDir, options);

  const browserManifestSettings = browsers[browserId];

  // Transform Manifest
  const manifest = {
    ...JSON.parse(Deno.readTextFileSync("source/manifest.json")),
    ...browserManifestSettings.overrides,
  };
  browserManifestSettings.omits.forEach((omit) => delete manifest[omit]);

  Deno.writeTextFileSync(
    distDir + "/manifest.json",
    JSON.stringify(manifest, null, 2),
  );

  const color = browserManifestSettings.color || "";
  const browserName = browserId.toUpperCase();
  const colorizedBrowserName = `\x1b[1m${color}${browserName}\x1b[0m`;

  console.log(`Initializing ${colorizedBrowserName} build...`);

  const jsFiles = await Promise.all([
    loadFile("background.ts"),
    loadFile("options.tsx"),
    loadFile("contentScript.ts"),
    loadFile("popup.tsx"),
  ]);

  console.log(`Writing Files for ${colorizedBrowserName}`);
  jsFiles.forEach(({ name, emitResult }) => {
    const { diagnostics, files } = emitResult;
    const bundleCode: string = files["deno:///bundle.js"];
    const outputFileName = name.replace(/(t|j)sx?$/, "js");
    const outputPath = `dist/${browserId}/${outputFileName}`;

    console.info(`%c building ${name} > ${outputPath}...`, "color: #bada55");

    if (diagnostics.length) {
      console.warn(Deno.formatDiagnostics(diagnostics));
    }

    Deno.writeTextFile(outputPath, bundleCode);
  });

  console.log(
    `Build complete for ${colorizedBrowserName}`,
  );
});

async function loadFile(name: string) {
  const filePath = `source/${name}`;
  const emitResult = await Deno.emit(filePath, emitOptions);
  return { name, emitResult };
}
