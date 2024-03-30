import React from "react";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
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
});

const MyPdf = ({ data }) => {
  const options = {
    wordwrap: 130,
  };
  const texts = convert(data, options);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>
            Quill Rich Text to PDF with Custom Dropdown
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>{texts}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default MyPdf;
