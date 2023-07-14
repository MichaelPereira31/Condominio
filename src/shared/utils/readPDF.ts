/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';

export async function ReadPDF(filePath: string) {
  const pdf = await pdfjsLib.getDocument({ url: filePath }).promise;
  const textPDF = [];
  const numberPages = pdf.numPages;

  for (let i = 1; i <= numberPages; i++) {
    const page = await pdf.getPage(i);
    const text = await page.getTextContent();
    textPDF.push(
      text.items.map((item: { str: unknown }) => {
        if (item.str) {
          return item.str;
        }
      }),
    );
  }
  fs.unlinkSync(filePath);
  return textPDF;
}
