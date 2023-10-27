"use client"

import React, { Key, useEffect, useState } from "react"
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer"
import { databaseResume, generatedResume } from "@/types/generatedResume"
import { UserSession } from "@/types/type"
import { Dot } from "lucide-react"

type Props = {
  resume: databaseResume
  session: UserSession
}

const styles = StyleSheet.create({
  page: {
    fontSize: "11px",
    paddingTop: 50,
    paddingRight: 30,
    paddingLeft: 30,
    fontFamily: "Times-Roman",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  heading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 4,
  },
  name: { fontFamily: "Times-Bold", fontSize: "13px" },
  socials: { display: "flex", flexDirection: "row", gap: 5 },
  separator: { height: "100%", width: 0.5, backgroundColor: "black" },

  title: { fontFamily: "Times-Bold" },
  work: { display: "flex", flexDirection: "column", gap: 10 },
  jobSeparator: {
    height: 0.5,
    width: "100%",
    backgroundColor: "black",
  },
  between: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bold: {
    fontFamily: "Times-Bold",
  },
  italic: {
    fontFamily: "Times-Italic",
  },
  block: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  bullet: {
    paddingLeft: 10,
    paddingRight: 40,
  },
  skills: {
    maxWidth: "400px",
    display: "flex",
    flexDirection: "row",
    gap: 5,
    flexWrap: "wrap",
  },
  skill: {},
})

const ResumePDF = ({ resume, session }: Props) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.heading}>
          <Text style={styles.name}>
            {session.firstname + " " + session.lastname}
          </Text>
          <div style={styles.socials}>
            <Text>{session.location}</Text>
            <span style={styles.separator} />
            <Text>{session.phone}</Text>
            <span style={styles.separator} />
            <Text>{session.email}</Text>
          </div>
        </View>
        {resume?.jobs ? (
          <View style={styles.work}>
            <div>
              <Text style={styles.title}>WORK EXPERIENCE</Text>
              <span style={styles.jobSeparator} />
            </div>
            {resume.jobs?.map((job) => {
              const jobDescription = job?.description
                ? job?.description.split("*")
                : null

              return (
                <div key={job.id} style={styles.block}>
                  <div style={styles.between}>
                    <Text style={styles.bold}>{job.employer}</Text>
                    <Text style={styles.bold}>{job.location}</Text>
                  </div>
                  <div style={styles.between}>
                    <Text style={styles.bold}>{job.title}</Text>
                    <Text style={styles.italic}>{job.dateRange}</Text>
                  </div>
                  {jobDescription?.map((string: string, i: Key) => {
                    const newString = string.replace(/,$/, ".")
                    if (newString.length > 10)
                      return (
                        <div
                          key={i}
                          style={{ display: "flex", flexDirection: "row" }}
                        >
                          <Text>•</Text>
                          <Text style={styles.bullet}>
                            {newString}
                            {i != 3 && "."}
                          </Text>
                        </div>
                      )
                  })}
                </div>
              )
            })}
          </View>
        ) : null}

        {resume?.projects ? (
          <View style={styles.work}>
            <div>
              <Text style={styles.title}>PROJECT EXPERIENCE</Text>
              <span style={styles.jobSeparator} />
            </div>
            {resume.projects?.map((project) => {
              const projectDescription =
                project.description && project.description.split("*")
              return (
                <div key={project.id} style={styles.block}>
                  <div style={styles.between}>
                    <Text style={styles.bold}>{project.title}</Text>
                    <Text style={styles.bold}>{project.location}</Text>
                  </div>
                  <div style={styles.between}>
                    <Text>Project</Text>
                    <Text style={styles.italic}>{project.dateRange}</Text>
                  </div>
                  {projectDescription?.map((string: string, i: Key) => {
                    const newString = string.replace(/,$/, "")
                    return (
                      <div
                        key={i}
                        style={{ display: "flex", flexDirection: "row" }}
                      >
                        <Text>•</Text>
                        <Text style={styles.bullet}>
                          {newString}
                          {i != 3 && "."}
                        </Text>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </View>
        ) : null}
        {resume?.skills ? (
          <View style={styles.work}>
            <div>
              <Text style={styles.title}>SKILLS</Text>
              <span style={styles.jobSeparator} />
            </div>
            <div style={styles.skills}>
              {resume.skills?.map((skill, i) => {
                return (
                  <Text key={skill.id} style={styles.skill}>
                    {skill.name}
                    {resume.skills && i != resume?.skills?.length - 1 && ","}
                  </Text>
                )
              })}
            </div>
          </View>
        ) : null}
        {resume?.education ? (
          <View style={styles.work}>
            <div>
              <Text style={styles.title}>EDUCATION</Text>
              <span style={styles.jobSeparator} />
            </div>
            {resume.education?.map((education) => {
              return (
                <div key={education.id} style={styles.block}>
                  <div style={styles.between}>
                    <Text style={styles.bold}>{education.school}</Text>
                    <Text style={styles.bold}>{education.location}</Text>
                  </div>
                  <div style={styles.between}>
                    <Text style={styles.italic}>{education.degree}</Text>
                    <Text style={styles.italic}>
                      Grad Date: {education.graduationDate}
                    </Text>
                  </div>
                </div>
              )
            })}
          </View>
        ) : null}
      </Page>
    </Document>
  )
}

export default ResumePDF
