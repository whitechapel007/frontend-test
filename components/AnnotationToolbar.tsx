"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Highlighter,
  Pencil,
  Type,
  Square,
  Circle,
  Underline,
  Stamp,
  PenTool,
} from "lucide-react";

interface AnnotationToolbarProps {
  activeTool: string | null;
  onToolSelect: (tool: string | null) => void;
}

interface ToolOption {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const AnnotationToolbar: React.FC<AnnotationToolbarProps> = ({
  activeTool,
  onToolSelect,
}) => {
  const tools: ToolOption[] = [
    {
      id: "highlight",
      name: "Highlight",
      icon: <Highlighter className="w-4 h-4" />,
    },
    {
      id: "underline",
      name: "Underline",
      icon: <Underline className="w-4 h-4" />,
    },
    { id: "draw", name: "Draw", icon: <Pencil className="w-4 h-4" /> },
    { id: "text", name: "Add Text", icon: <Type className="w-4 h-4" /> },
    {
      id: "rectangle",
      name: "Rectangle",
      icon: <Square className="w-4 h-4" />,
    },
    { id: "circle", name: "Circle", icon: <Circle className="w-4 h-4" /> },
    {
      id: "signature",
      name: "Signature",
      icon: <PenTool className="w-4 h-4" />,
    },
    { id: "stamp", name: "Stamp", icon: <Stamp className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-white border rounded-lg shadow-sm">
      {tools.map((tool) => (
        <Button
          key={tool.id}
          variant={activeTool === tool.id ? "default" : "outline"}
          size="sm"
          className="flex items-center gap-1"
          onClick={() => onToolSelect(activeTool === tool.id ? null : tool.id)}
          title={tool.name}
        >
          {tool.icon}
          <span className="hidden sm:inline">{tool.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default AnnotationToolbar;
