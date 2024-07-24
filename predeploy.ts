import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

// Get arguments
const args = process.argv.slice(2);
const sourcePackageJson = args[0];
const outdir = args[1];

if (!sourcePackageJson || !outdir) {
  console.error("Usage: bun run script.js <sourcePackageJson> <outdir>");
  process.exit(1);
}

// Paths
const sourcePath = join(import.meta.dir, sourcePackageJson);
const destPath = join(import.meta.dir, outdir, "package.json");

// Read and modify package.json
const packageJson = JSON.parse(readFileSync(sourcePath, "utf-8"));
delete packageJson.dependencies;
delete packageJson.devDependencies;
delete packageJson.peerDependencies;

packageJson.main = "index.js";

// Ensure outdir exists
if (!existsSync(outdir)) mkdirSync(outdir, { recursive: true });

// Write modified package.json to outdir
writeFileSync(destPath, JSON.stringify(packageJson, null, 2));

console.log("package.json copied and updated successfully");
