"use client"

import { databaseResume } from "@/types/generatedResume"
import { UserSession } from "@/types/type"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { Download, Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import ResumePDF from "./ResumePDF"
import ResumeTitle from "./ResumeTitle"

type Props = {
  resume: databaseResume
  session: UserSession
}

const ResumeViewer = ({ resume, session }: Props) => {
  return (
    <div className="flex flex-col-reverse gap-8  lg:flex-row">
      <div className="max-w-3xl py-4 shadow-xl md:py-8">
        <ResumePDF resume={resume} session={session} />
      </div>
      <div className="flex flex-col justify-between ">
        <ResumeTitle
          title={resume?.title}
          description={resume?.description}
          date={resume?.createdAt}
        />
        <div className="mt-4 self-center md:self-start lg:self-end">
          <PDFDownloadLink
            document={<ResumePDF resume={resume} session={session} />}
            fileName={`${session.firstname.toUpperCase()}_${session.lastname.toUpperCase()}_RESUME`}
          >
            {({ loading }) =>
              loading ? (
                <Button disabled variant={"outline"}>
                  <Loader2 className="animate-spin" />
                </Button>
              ) : (
                <Button disabled={loading} variant={"outline"}>
                  Download Resume <Download size={18} className="ml-2" />
                </Button>
              )
            }
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  )
}

export default ResumeViewer
