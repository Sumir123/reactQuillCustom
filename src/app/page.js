"use client";
import Editor from "@/components/Editor";
import MyPdf from "@/components/MyPdf";
import { PDFViewer } from "@react-pdf/renderer";

export default function Home() {
  return (
    <main className="p-10">
      <div>
        <Editor />
     
      </div>
    </main>
  );
}
