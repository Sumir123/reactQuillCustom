import React from "react";
import { Quill } from "react-quill";

const selectorRef = React.createRef();

function onSelect() {
  const node = selectorRef.current;
  const selectorDiv = node.querySelector(".ql-custom");
  const childSpan = selectorDiv.querySelector(".ql-picker-label");
  const dataValue = childSpan.getAttribute("data-value");
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, dataValue);
  this.quill.setSelection(cursorPosition + dataValue.length + 2);
  this.quill.focus();
}

const Size = Quill.import("formats/size");
const Font = Quill.import("formats/font");

Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
];
Quill.register(Font, true);

export const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      custom: onSelect,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
};

export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
];

const QuillToolbar = ({ dropDownItems }) => {
  return (
    <div id="toolbar" ref={selectorRef}>
      <span className="ql-formats">
        <select className="ql-header" defaultValue="3">
          <option value="1">Heading</option>
          <option value="2">Subheading</option>
          <option value="3">Normal</option>
        </select>
      </span>
      <span className="ql-formats">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
      </span>
      <span className="ql-formats">
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
      </span>

      <span className="ql-formats">
        <select className="ql-custom valueSelector tooltip">
          <option value="">Placeholders</option>
          {dropDownItems?.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
};

export default QuillToolbar;
