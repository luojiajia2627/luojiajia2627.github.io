import {cp,mkdir} from "node:fs/promises";
import {dirname,resolve} from "node:path";
import {fileURLToPath} from "node:url";
const source=dirname(fileURLToPath(import.meta.resolve("pdfjs-dist/package.json")));
const destination=resolve("public/pdfjs");
await mkdir(destination,{recursive:true});
for(const directory of ["cmaps","standard_fonts","wasm"])await cp(resolve(source,directory),resolve(destination,directory),{recursive:true});
await cp(resolve(source,"LICENSE"),resolve(destination,"LICENSE"));
