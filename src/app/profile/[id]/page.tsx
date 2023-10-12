import ProfileTabs from "@/components/profile/ProfileTabs"
import { getAuthSession } from "@/lib/nextauth"
import { redirect } from "next/navigation"
import React from "react"
import { prisma } from "../../../../prisma"
import { connectToDatabase } from "@/lib/connectdb"
import { tailorJob } from "@/lib/gpt"

type Props = {
  params: {
    id: string
  }
}

const UserProfile = async ({ params: { id } }: Props) => {
  const session = await getAuthSession()

  if (!session?.user) {
    return redirect("/")
  }

  const getUserData = async (id: string) => {
    try {
      await connectToDatabase()
      const user = await prisma.resume.findFirst({
        where: {
          userId: session.user.id,
        },
        include: {
          user: {
            select: {
              firstname: true,
              lastname: true,
              email: true,
              location: true,
              phone: true,
              hashedPassword: false,
            },
          },
          jobs: true,
          projects: true,
          skills: true,
          education: true,
        },
      })

      return user
    } catch (error) {
      console.error("Error Fetch User Data:", error)
    }
  }

  const jobPost =
    "Power My Analytics is a fast-growing SAAS company based out of Orlando, Florida, with a satellite office in Tel Aviv, Israel. We connect marketing data from social media, digital advertising, eCommerce, and other data sources to customers so they can build marketing dashboards.We are searching for an experienced individual to join our team. This position is primarily focused on front-end development, including the following responsibilities:Independently maintaining and adding features to our customer-facing website using Angular, NodeJS, and TypescriptMaintaining and adding features to our Google Sheets and Excel spreadsheet addonsCooperating with our customer support team to ensure bugs are addressed and fixed in a timely mannerCooperating with our back-end developers in the maintenance and improvement of RESTful APIsIs a team player, open to ideas and learningThe more versatile the candidate, the better the fit for our rapidly evolving team. Additional value-add capabilities under consideration are listed below. And a bi-lingual (English and Hebrew) developer is preferred to communicate effectively with our dev team in Israel.Education and General Experience:BS/MS in computer science or equivalent work experience3+ years of professional experience developing web, software, or mobile applications3+ years experience with RESTful web services / APIsExperience with unit testing & Test Driven Development (TDD)Solid communication skills: Demonstrated ability to explain complex technical issues to both technical and non-technical audiencesBi-lingual (English and Hebrew) is preferred.Specific Experience:Typescript and JavascriptNode and npmExpressAngular 10+ web development frameworkStrong CSS skillsGood understanding of Javascript promises and observablesFirebase Firestore and Realtime databasesVersion control using GitVisualization with D3Preferred Experience:Google Cloud ecosystem experience, including cloud functions, storage, and loggingRelational databases, including MySQL and Google BigQueryBig data and analyticsGoogle Analytics and GTMBilling platforms (Stripe, PayPal, Square, etc.)Opportunities are endless once you join the PMA team. New opportunities will be available as we continue to grow, including advancement to leadership positions.We offer a competitive salary and bonuses tailored to individual and team goals. Medical insurance and a 401k retirement plan with company matching are included in our benefits package.Employment TypeFull-timeSalary and Benefits:Salary range of $100,000 - $130,000 USD and based on experience.Health insurance plan options are deeply discounted by company contribution.401k plan with company match.The potential bonus of up to 20% of yearly salary, dependent on both company and individual goals met."

  const user = await getUserData(id)

  // const generatedResume = await tailorJob({
  //   jobDescription: jobPost,
  //   user: {
  //     jobExperience: JSON.stringify(user?.jobs),
  //     education: JSON.stringify(user?.education),
  //     projectExperience: JSON.stringify(user?.projects),
  //     skills: JSON.stringify(user?.skills),
  //     info: JSON.stringify(user?.user),
  //   },
  // })

  return (
    <div className="p-4 md:p-8">
      <ProfileTabs session={session.user} user={user} />
    </div>
  )
}

export default UserProfile
