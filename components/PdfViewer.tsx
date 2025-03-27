"use client";

import React, { useState, useRef } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import {
  highlightPlugin,
  Trigger,
  RenderHighlightContentProps,
  RenderHighlightsProps,
} from "@react-pdf-viewer/highlight";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { searchPlugin } from "@react-pdf-viewer/search";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import { zoomPlugin } from "@react-pdf-viewer/zoom";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import "@react-pdf-viewer/search/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";

import AnnotationToolbar from "./AnnotationToolbar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PdfViewerProps {
  fileUrl: string;
}

interface HighlightPosition {
  left: number;
  top: number;
  height: number;
  width: number;
}

interface Highlight {
  id: string;
  position: HighlightPosition;
}

interface HighlightProps extends RenderHighlightsProps {
  highlights?: Highlight[];
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [signatureMode, setSignatureMode] = useState(false);
  const [textAnnotation, setTextAnnotation] = useState<{
    show: boolean;
    text: string;
  }>({ show: false, text: "" });
  const [textPosition, setTextPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const signatureRef = useRef<HTMLDivElement>(null);
  const viewerContainerRef = useRef<HTMLDivElement>(null);

  // PDF viewer plugins
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const searchPluginInstance = searchPlugin();
  const toolbarPluginInstance = toolbarPlugin();
  const zoomPluginInstance = zoomPlugin();

  // Custom highlight content render
  const renderHighlightContent = (props: RenderHighlightContentProps) => (
    <div
      style={{
        background: "#ffeb3b",
        padding: "4px",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      {props.selectedText}
    </div>
  );

  // Custom highlight render with error handling
  const renderHighlights = (props: HighlightProps) => {
    try {
      return (
        <div>
          {props.highlights?.map((highlight: Highlight) => (
            <div
              key={highlight.id}
              style={{
                position: "absolute",
                left: `${highlight.position.left}%`,
                top: `${highlight.position.top}%`,
                height: `${highlight.position.height}%`,
                width: `${highlight.position.width}%`,
                background: "rgba(255, 255, 0, 0.4)",
                mixBlendMode: "multiply",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      );
    } catch (error) {
      console.error("Error rendering highlights:", error);
      return <></>;
    }
  };

  const highlightPluginInstance = highlightPlugin({
    trigger: Trigger.TextSelection,
    renderHighlightContent,
    renderHighlights,
  });

  // Handle tool selection
  const handleToolSelect = (tool: string | null) => {
    setActiveTool(tool);

    // Handle signature tool
    if (tool === "signature") {
      setSignatureMode(true);
    }
  };

  // Handle viewer click for text annotations
  const handleViewerClick = (e: React.MouseEvent) => {
    if (activeTool === "text" && viewerContainerRef.current) {
      const rect = viewerContainerRef.current.getBoundingClientRect();
      setTextPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setTextAnnotation({ show: true, text: "" });
    }
  };

  const handleSignatureDraw = (e: React.MouseEvent) => {
    // In a production app, this would use a proper drawing library
    console.log("Drawing signature at:", e.clientX, e.clientY);
  };

  const handleTextAnnotationSave = () => {
    if (textAnnotation.text && textPosition) {
      // In a real app, you'd add this text to the PDF
      console.log("Text annotation:", textAnnotation.text, "at", textPosition);

      // Reset state
      setTextAnnotation({ show: false, text: "" });
      setTextPosition(null);
      setActiveTool(null);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Annotation Toolbar */}
      <div className="p-2 border-b">
        <AnnotationToolbar
          activeTool={activeTool}
          onToolSelect={handleToolSelect}
        />
      </div>

      {/* Signature Dialog */}
      <Dialog open={signatureMode} onOpenChange={setSignatureMode}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Draw Your Signature</DialogTitle>
          </DialogHeader>
          <div
            ref={signatureRef}
            className="border border-gray-300 h-[200px] w-full bg-white cursor-crosshair"
            onMouseMove={handleSignatureDraw}
          >
            <p className="text-center text-gray-400 mt-[70px]">
              Draw your signature here
            </p>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setSignatureMode(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                console.log("Signature applied");
                setSignatureMode(false);
                setActiveTool(null);
              }}
            >
              Apply Signature
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Text Annotation Dialog */}
      <Dialog
        open={textAnnotation.show}
        onOpenChange={(open: boolean) =>
          setTextAnnotation({ ...textAnnotation, show: open })
        }
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Text Annotation</DialogTitle>
          </DialogHeader>
          <textarea
            className="w-full p-2 border rounded-md h-24"
            value={textAnnotation.text}
            onChange={(e) =>
              setTextAnnotation({ ...textAnnotation, text: e.target.value })
            }
            placeholder="Enter your text here..."
          />
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setTextAnnotation({ show: false, text: "" })}
            >
              Cancel
            </Button>
            <Button onClick={handleTextAnnotationSave}>Add Text</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* PDF Viewer */}
      <div
        className="flex-1 relative"
        ref={viewerContainerRef}
        onClick={handleViewerClick}
      >
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
        >
          <Viewer
            fileUrl={fileUrl}
            plugins={[
              defaultLayoutPluginInstance,
              pageNavigationPluginInstance,
              searchPluginInstance,
              toolbarPluginInstance,
              zoomPluginInstance,
              highlightPluginInstance,
            ]}
            renderError={(error: Error) => (
              <div className="p-8 text-center">
                <p className="text-red-500 font-medium">Error loading PDF:</p>
                <p>{error.message}</p>
              </div>
            )}
          />
        </Worker>
      </div>
    </div>
  );
};

export default PdfViewer;
