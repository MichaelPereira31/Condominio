import fs from 'fs';

export async function FileRemove(filePath: string) {
  fs.unlinkSync(filePath);
}
