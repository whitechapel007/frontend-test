# Document Signer & Annotation Tool

A modern web application built with Next.js that allows users to upload, view, annotate, and sign PDF documents.

## Features

### Core Functionality

1. **Document Upload**

   - Upload PDF documents through file selection dialog
   - Use sample PDF for testing
   - Preview uploaded documents in the viewport

2. **Annotation Features**

   - Text highlighting with customizable colors
   - Text underlining
   - Add text annotations anywhere on the document
   - Draw signatures (basic implementation)
   - Page navigation
   - Text search functionality
   - Zoom controls

3. **Document Export**
   - Export annotated documents as PDF
   - Maintain document quality during export

## Technical Stack

- **Framework**: Next.js 15.2.4 with App Router
- **UI Components**: Shadcn UI (based on Radix UI)
- **PDF Handling**:
  - @react-pdf-viewer/core and plugins
  - pdfjs-dist for PDF rendering
- **Styling**: TailwindCSS
- **Type Safety**: TypeScript

## Setup and Running Instructions

1. **Prerequisites**

   ```bash
   Node.js >= 18
   npm or yarn
   ```

2. **Installation**

   ```bash
   # Clone the repository
   git clone https://github.com/dev-ritease/document-signer.git

   cd doc-signer

   # Install dependencies
   npm install
   ```

3. **Development**

   ```bash
   # Start the development server
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000)

4. **Production Build**

   ```bash
   # Build the application
   npm run build

   # Start the production server
   npm start
   ```

## Implementation Details

### PDF Viewer

- Uses @react-pdf-viewer/core for PDF rendering
- Implements multiple plugins for enhanced functionality:
  - default-layout: Complete UI for PDF viewing
  - highlight: Text highlighting
  - page-navigation: Page navigation controls
  - search: Text search functionality
  - toolbar: Customizable toolbar
  - zoom: Zoom controls

### Annotation System

- Text highlighting with customizable colors
- Text underlining
- Text annotations with positioning
- Basic signature drawing (can be enhanced with Fabric.js)

## Challenges and Solutions

1. **PDF.js Version Mismatch**

   - Challenge: API version (3.11.174) didn't match Worker version (3.10.111)
   - Solution: Updated both versions to match and created proper type declarations

2. **Type Safety**

   - Challenge: Missing type definitions for PDF viewer libraries
   - Solution: Created comprehensive type declarations in types/react-pdf-viewer.d.ts

3. **UI Component Integration**
   - Challenge: Integrating Radix UI components with Next.js
   - Solution: Used Shadcn UI which provides pre-configured components

## Future Enhancements

1. **Annotation Features**

   - Implement pressure-sensitive signature drawing
   - Add shape drawing tools (rectangles, circles)
   - Support for image annotations
   - Rich text annotations with formatting

2. **Document Management**

   - User authentication
   - Document storage and retrieval
   - Version history
   - Collaboration features

3. **Export Options**

   - Multiple export formats
   - Batch processing
   - Custom export settings

4. **Performance Optimizations**

   - Lazy loading for large documents
   - Caching strategies
   - Progressive loading of annotations

5. **Mobile Support**
   - Touch-friendly interface
   - Mobile-optimized annotation tools
   - Responsive design improvements

## License

This project is licensed under the MIT License - see the LICENSE file for details.
