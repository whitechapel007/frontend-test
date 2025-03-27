"use client";

import { useState, useRef } from "react";
import PdfViewer from "@/components/PdfViewer";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [fileUrl, setFileUrl] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    }
  };

  const handleSaveDocument = () => {
    if (!fileUrl) return;

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = file?.name || "signed-document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const useSamplePdf = () => {
    // Clear any existing file state
    setFile(null);
    // Use a sample PDF from a public CDN instead of a local file
    setFileUrl(
      "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">
            PDF Document Signing & Annotation Tool
          </h1>
          {fileUrl && (
            <Button onClick={handleSaveDocument} variant="default">
              Save Document
            </Button>
          )}
        </div>
      </header>

      {!fileUrl ? (
        <div className="flex flex-col items-center justify-center flex-1 p-6">
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">
              Upload a PDF document to sign, annotate, or add text
            </h2>
            <div className="mt-4 flex flex-col space-y-4">
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                Choose File
              </Button>
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <Button
                variant="outline"
                onClick={useSamplePdf}
                className="w-full"
              >
                Use Sample PDF
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <PdfViewer fileUrl={fileUrl} />
        </div>
      )}
    </div>
  );
}
