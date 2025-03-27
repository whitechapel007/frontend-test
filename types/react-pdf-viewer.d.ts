declare module "@react-pdf-viewer/core" {
  import React from "react";

  export interface ViewerProps {
    fileUrl: string;
    plugins?: unknown[];
    renderError?: (error: Error) => React.ReactElement;
  }

  export class Viewer extends React.Component<ViewerProps> {}

  export interface WorkerProps {
    workerUrl: string;
    children?: React.ReactNode;
  }

  export class Worker extends React.Component<WorkerProps> {}
}

declare module "@react-pdf-viewer/default-layout" {
  export function defaultLayoutPlugin(): unknown;
}

declare module "@react-pdf-viewer/highlight" {
  export enum Trigger {
    TextSelection,
  }

  export interface RenderHighlightContentProps {
    selectedText: string;
  }

  export interface RenderHighlightsProps {
    pageIndex?: number;
  }

  export function highlightPlugin(options: {
    trigger?: Trigger;
    renderHighlightContent?: (
      props: RenderHighlightContentProps
    ) => React.ReactElement;
    renderHighlights?: (props: RenderHighlightsProps) => React.ReactElement;
  }): unknown;
}

declare module "@react-pdf-viewer/page-navigation" {
  export function pageNavigationPlugin(): unknown;
}

declare module "@react-pdf-viewer/search" {
  export function searchPlugin(): unknown;
}

declare module "@react-pdf-viewer/toolbar" {
  export function toolbarPlugin(): unknown;
}

declare module "@react-pdf-viewer/zoom" {
  export function zoomPlugin(): unknown;
}
