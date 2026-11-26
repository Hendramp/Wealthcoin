import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Document,
  Page,
  pdfjs,
} from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function DocumentViewer({
  selectedDocument,
  onClose,
}) {
  const containerRef = useRef(null);
  const [pageWidth, setPageWidth] = useState(720);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selectedDocument) return undefined;

    function resizePage() {
      const width = containerRef.current?.clientWidth || 720;
      setPageWidth(Math.max(280, Math.min(width - 32, 900)));
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    resizePage();

    window.addEventListener("resize", resizePage);
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", resizePage);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedDocument, onClose]);

  useEffect(() => {
    setError("");
  }, [selectedDocument]);

  if (!selectedDocument) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-black/95 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
    >
      <header className="border-b border-[#D4AF37]/25 bg-[#020302] px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/assets/logos/wealthcoin-logo.png"
              alt=""
              className="h-11 w-11 rounded-full object-contain"
            />

            <div>
              <h2 className="font-display text-lg text-[#D4AF37] sm:text-xl">
                {selectedDocument.title}
              </h2>

              <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                WealthCoin Library
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={selectedDocument.href}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost rounded-lg px-4 py-2 text-sm font-bold"
            >
              Open PDF
            </a>

            <a
              href={selectedDocument.href}
              download
              className="btn-ghost rounded-lg px-4 py-2 text-sm font-bold"
            >
              Download
            </a>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/20 px-4 py-2 text-sm font-bold text-white/70 hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
            >
              Close
            </button>
          </div>
        </div>
      </header>

      <main
        ref={containerRef}
        className="min-h-0 flex-1 overflow-auto bg-[#151515] p-4 sm:p-8"
      >
        <div className="mx-auto flex min-h-full max-w-5xl justify-center">
          {error ? (
            <div className="m-auto max-w-xl rounded-2xl border border-red-500/30 bg-black p-8 text-center">
              <h3 className="font-display text-2xl text-[#D4AF37]">
                Preview unavailable
              </h3>

              <p className="mt-4 break-words text-white/60">
                {error}
              </p>

              <a
                href={selectedDocument.href}
                target="_blank"
                rel="noreferrer"
                className="btn-gold mt-7 rounded-xl px-6 py-4 font-bold"
              >
                Open PDF
              </a>
            </div>
          ) : (
            <Document
              file={selectedDocument.href}
              onLoadError={(loadError) => {
                console.error("PDF preview error:", loadError);
                setError(
                  loadError?.message ||
                    "The document could not be rendered."
                );
              }}
              loading={
                <p className="m-auto font-display text-xl text-[#D4AF37]">
                  Loading document…
                </p>
              }
            >
              <Page
                pageNumber={1}
                width={pageWidth}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="overflow-hidden rounded-xl bg-white shadow-2xl"
              />
            </Document>
          )}
        </div>
      </main>
    </div>
  );
}