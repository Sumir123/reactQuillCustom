import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import QuillToolbar, { modules, formats } from "./QuillToolBar";
import { PDFViewer } from "@react-pdf/renderer";
import MyPdf from "./MyPdf";

export const Editor = () => {
  const [state, setState] = useState({
    value: `A react-quill rich text with a custom dropdown for placeholders 
    which then is rendered in pdf with the same quill formats
`,
  });
  const [submitData, setSubmitData] = useState("");

  const handleChange = (value) => {
    setState({ value });
  };

  const handleSubmit = () => {
    const data = state.value;

    const placeholderMap = {
      "[CLIENT_NAME]": "John Doe",
      "[CLIENT_ADDRESS]": "123 Main St, Anytown",
      "[CLIENT_PHONE]": "555-123-4567",
      "[CLIENT_EMAIL]": "john.doe@example.com",
      "[START_DATE]": "2024-04-01",
    };

    let replacedData = data;
    for (const placeholder in placeholderMap) {
      if (placeholderMap.hasOwnProperty(placeholder)) {
        const value = placeholderMap[placeholder];
        const regex = new RegExp(
          placeholder.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
          "g"
        );
        replacedData = replacedData.replace(regex, value);
      }
    }
    setSubmitData(replacedData);
  };

  const dropDownItems = [
    { label: "[CLIENT_NAME]", value: "[CLIENT_NAME]" },
    { label: "[CLIENT_ADDRESS]", value: "[CLIENT_ADDRESS]" },
    { label: "[CLIENT_PHONE]", value: "[CLIENT_PHONE]" },
    { label: "[CLIENT_EMAIL]", value: "[CLIENT_EMAIL]" },
    { label: "[START_DATE]", value: "[START_DATE]" },
  ];

  return (
    <>
      <div className="text-editor">
        <QuillToolbar dropDownItems={dropDownItems} />
        <ReactQuill
          theme="snow"
          value={state.value}
          onChange={handleChange}
          placeholder={"Write something awesome..."}
          modules={modules}
          formats={formats}
        />
        <button
          className="px-4 py-2 mt-5 bg-blue-500 text-white rounded-xl"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <div>
        <PDFViewer height={600} width="100%">
          <MyPdf data={submitData} />
        </PDFViewer>
      </div>
    </>
  );
};

export default Editor;
