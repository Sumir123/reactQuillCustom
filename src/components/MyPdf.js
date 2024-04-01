import React from "react";
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
const { compile, convert } = require("html-to-text");

// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 10,
  },
  section: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    textAlign: "justify",
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  code: {
    fontFamily: "Courier",
  },
  blockquote: {
    fontStyle: "italic",
    marginLeft: 10,
    borderLeft: "3 solid black",
    paddingLeft: 10,
  },
  center: {
    textAlign: "center",
  },
});

const MyPdf = ({ data }) => {
  const texts = [
    {
      type: "paragraph",
      children: [
        { text: "This is editable " },
        { text: "rich", bold: true },
        { text: " text, " },
        { text: "much", italic: true },
        { text: " better than a " },
        { text: "<textarea>", code: true },
        { text: "!" },
      ],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Since it's rich text, you can do things like turn a selection of text ",
        },
        { text: "bold", bold: true },
        {
          text: ", or add a semantically rendered block quote in the middle of the page, like this:",
        },
      ],
    },
    {
      type: "block-quote",
      children: [{ text: "A wise quote." }],
    },
    {
      type: "paragraph",
      align: "center",
      children: [{ text: "Try it out for yourself!" }],
    },
  ];

  const renderTextElement = (element, index) => {
    switch (element.type) {
      case "paragraph":
        return (
          <Text key={index} style={styles.text}>
            {element.children.map((child, idx) => (
              <Text
                key={idx}
                style={
                  child.bold ? styles.bold : child.italic ? styles.italic : {}
                }
              >
                {child.text}
              </Text>
            ))}
          </Text>
        );
      case "block-quote":
        return (
          <Text key={index} style={styles.blockquote}>
            {element.children[0].text}
          </Text>
        );
      default:
        return null;
    }
  };

  Font.register({
    family: "Open Sans",
    fonts: [
      {
        src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
      },
      {
        src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
        fontWeight: 600,
      },
    ],
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>
            Quill Rich Text to PDF with Custom Dropdown
          </Text>
        </View>
        {texts.map((text, index) => (
          <View key={index} style={styles.section}>
            {renderTextElement(text, index)}
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default MyPdf;
