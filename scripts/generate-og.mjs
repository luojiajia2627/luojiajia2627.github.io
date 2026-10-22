import sharp from "sharp";
import { fileURLToPath } from "node:url";
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#fbfaf7"/><text x="95" y="130" fill="#78726a" font-family="Georgia,serif" font-size="30">Lily.</text><text x="91" y="285" fill="#302e2b" font-family="Georgia,Songti SC,serif" font-size="84">罗佳佳 Lily</text><text x="97" y="354" fill="#78726a" font-family="sans-serif" font-size="27">技术笔记 / 个人思考 / 阅读资料</text><line x1="97" y1="420" x2="1103" y2="420" stroke="#e5e1da"/><text x="97" y="480" fill="#78726a" font-family="sans-serif" font-size="21">扩散语言模型 · 推荐算法 · 前后端开发</text><text x="97" y="555" fill="#78726a" font-family="sans-serif" font-size="19">luojiajia2627.github.io</text></svg>`;
await sharp(Buffer.from(svg)).png().toFile(fileURLToPath(new URL("../public/default-og.png", import.meta.url)));
console.log("Generated public/default-og.png");
