import { $ } from "bun";

await Promise.all([
  $`bun run emulators`,
  $`bun run dev`
])