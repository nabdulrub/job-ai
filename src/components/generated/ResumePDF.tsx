"use client"

import React, { useEffect, useState } from "react"
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"
import { generatedResume } from "@/types/generatedResume"

type Props = {
  resume: generatedResume
}

const ResumePDF = ({ resume }: Props) => {
  return (
    <Document>
      <Page>
        <View>
          <Text>{resume.title}</Text>
        </View>
      </Page>
    </Document>
  )
}

export default ResumePDF
