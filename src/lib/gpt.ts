import { TailorJob, generatedResume } from "@/types/generatedResume"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
})

const resume_example_json: generatedResume = {
  title: "title of the job being applied to",
  description: "short description of the job being applied to",
  company: "company of the job being applied to",
  jobs: [
    {
      employer: "",
      title: "",
      location: "",
      dateRange: "",
      description: [
        "Focus on tailoring these job bullet points to the job description",
        "4 detailed bullet points for each job",
      ],
    },
  ],
  projects: [
    {
      title: "",
      location: "",
      dateRange: "",
      description: [
        "Focus on tailoring these project bullet points to the job description",
        "4 detailed bullet points for each project",
      ],
    },
  ],

  skills: [
    "This is an array of strings of the skills.",
    "Feel free to add any skills or remove skills based on the job, but be realistic.",
  ],
  educations: [
    {
      school: "",
      degree: "",
      location: "",
      graduationDate: "",
    },
  ],
}

export const tailorJob = async ({
  jobDescription,
  user,
}: TailorJob): Promise<generatedResume> => {
  const prompt = `Tailor my job to this job ${jobDescription} and project descriptions with my following job experience: ${user?.jobExperience}, project experience ${user?.projectExperience}, education: ${user?.education}, my skills: ${user?.skills}. Highlight my best skills, job experiences and projects. Add other skills that might increase my chances of getting the job, but ensure they are related to my experience, limit the total skills to 10! Each job should 4 bullets points description, each having a max character length of 125.`

  const chatCompletion = await openai.chat.completions.create({
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "Provide output in valid JSON. The data schema should be like this: " +
          JSON.stringify(resume_example_json),
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "gpt-3.5-turbo-1106",
  })
  return chatCompletion.choices[0].message.content
}
