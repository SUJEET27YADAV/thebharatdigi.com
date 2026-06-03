import fs from "fs/promises";
import path from "path";

export async function readProductFile(filename: string) {
  const filePath = path.join(process.cwd(), "src", "products", filename);
  return fs.readFile(filePath);
}
