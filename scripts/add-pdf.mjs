import { readFile, mkdir, writeFile, unlink } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
const [source, slug, title] = process.argv.slice(2);
if (!source || !slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error('用法：pnpm add-pdf "/完整路径/文档.pdf" reading-notes "文档标题"'); process.exit(1);
}
try {
  const bytes = await readFile(resolve(source));
  if (!bytes.subarray(0,1024).includes(Buffer.from("%PDF-"))) throw new Error("请选择有效的 PDF 文件。");
  if (bytes.length > 25 * 1024 * 1024) throw new Error("请将 PDF 压缩到 25 MB 以内，以便上传和阅读。");
  const directory = fileURLToPath(new URL("../public/documents/", import.meta.url));
  await mkdir(directory, {recursive:true});
  const pdf = directory + slug + ".pdf";
  const metadata = directory + slug + ".json";
  await writeFile(metadata, JSON.stringify({title: title || slug.replaceAll("-"," "), description:"请在这里填写资料简介。",date:new Date().toISOString().slice(0,10),tags:[],demo:false,draft:false},null,2)+"\n", {flag:"wx"});
  try { await writeFile(pdf, bytes, {flag:"wx"}); }
  catch(error) { await unlink(metadata); throw error; }
  console.log("已导入：" + pdf + "\n可编辑简介：" + metadata + "\n提交并推送这两个文件后，资料库会自动发布。");
} catch(error) { console.error(error.code==="EEXIST" ? "同名资料已存在，未覆盖任何文件。" : error.message); process.exit(1); }
