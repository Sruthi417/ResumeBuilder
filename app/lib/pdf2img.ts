export interface PdfConversionResult {
  imageUrl: string;
  file: File | null;
  error?: string;
}

let pdfjsLib: any = null;

// Import worker using Vite's ?url syntax to ensure version matching
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

async function loadPdfJs(): Promise<any> {
  if (pdfjsLib) return pdfjsLib;

  try {
    // @ts-expect-error - pdfjs-dist/build/pdf.mjs is not a module
    const lib = await import("pdfjs-dist/build/pdf.mjs");
    
    // Set worker source from node_modules (version-matched)
    lib.GlobalWorkerOptions.workerSrc = workerSrc;
    console.log("[PDF2IMG] pdfjs-dist loaded successfully");
    console.log("[PDF2IMG] Worker source set to:", workerSrc);
    
    pdfjsLib = lib;
    return lib;
  } catch (err) {
    console.error("[PDF2IMG] Failed to load pdfjs-dist:", err);
    throw err;
  }
}

export async function convertPdfToImage(
  file: File
): Promise<PdfConversionResult> {
  try {
    console.log("[PDF2IMG] Starting conversion for file:", file.name, "Type:", file.type);
    
    const lib = await loadPdfJs();
    console.log("[PDF2IMG] pdfjs-dist loaded");

    const arrayBuffer = await file.arrayBuffer();
    console.log("[PDF2IMG] File read, size:", arrayBuffer.byteLength);
    
    const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
    console.log("[PDF2IMG] PDF loaded, pages:", pdf.numPages);
    
    const page = await pdf.getPage(1);
    console.log("[PDF2IMG] Page 1 loaded");

    const viewport = page.getViewport({ scale: 4 });
    console.log("[PDF2IMG] Viewport created, dimensions:", viewport.width, "x", viewport.height);
    
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      console.error("[PDF2IMG] Failed to get canvas 2D context");
      return {
        imageUrl: "",
        file: null,
        error: "Failed to get canvas 2D context",
      };
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    
    console.log("[PDF2IMG] Starting page render...");
    await page.render({ canvasContext: context, viewport }).promise;
    console.log("[PDF2IMG] Page rendered successfully");

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            console.log("[PDF2IMG] Image blob created, size:", blob.size);
            // Create a File from the blob with the same name as the pdf
            const originalName = file.name.replace(/\.pdf$/i, "");
            const imageFile = new File([blob], `${originalName}.png`, {
              type: "image/png",
            });

            resolve({
              imageUrl: URL.createObjectURL(blob),
              file: imageFile,
            });
          } else {
            console.error("[PDF2IMG] Failed to create blob from canvas");
            resolve({
              imageUrl: "",
              file: null,
              error: "Failed to create image blob",
            });
          }
        },
        "image/png",
        1.0
      ); // Set quality to maximum (1.0)
    });
  } catch (err) {
    console.error("[PDF2IMG] Conversion failed:", err);
    return {
      imageUrl: "",
      file: null,
      error: `Failed to convert PDF: ${err}`,
    };
  }
}