import { TailorJob, generatedResume } from "@/types/generatedResume"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
})

const resumeFunction = {
  name: "tailor_resume",
  description: "Tailor this resume to the job description",
  parameters: {
    type: "object",
    properties: {
      title: {
        type: "string",
        description: "The name of the job from the description provided.",
      },
      description: {
        type: "string",
        description:
          "A description of the job from the description provided. 70 Characters Max",
      },
      jobs: {
        type: "array",
        items: {
          type: "object",
          properties: {
            employer: {
              type: "string",
              description: "Name of the employer",
            },
            title: {
              type: "string",
              description: "Title of the job",
            },
            location: {
              type: "string",
              description: "Location of the job",
            },
            dateRange: {
              type: "string",
              description: "Date range of the job (e.g., Jan 2023 - Present)",
            },
            description: {
              type: "array",
              items: {
                type: "string",
                description:
                  "A bullet point of the job responsibility tailored to the job description",
              },
              description: "List of job responsibilities",
            },
          },
        },
        description: "List of work experiences tailored to the job description",
      },
      projects: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Name of the project",
            },
            location: {
              type: "string",
              description: "Location of the project",
            },
            dateRange: {
              type: "string",
              description: "Date range (e.g., Aug 2023 - Sep 2023)",
            },
            description: {
              type: "array",
              items: {
                type: "string",
                description:
                  "A bullet point of project description tailored to the job description",
              },
              description: "List of project descriptions",
            },
          },
        },
        description:
          "List of project experiences tailored to the job description",
      },
      skills: {
        type: "array",
        items: {
          type: "string",
          description: "A skill (e.g., Typescript, HTML5)",
        },
        description: "List of skills tailored to the job description",
      },
      educations: {
        type: "array",
        items: {
          type: "object",
          properties: {
            school: {
              type: "string",
              description: "Name of the educational institution",
            },
            degree: {
              type: "string",
              description:
                "Degree earned (e.g., Bachelor’s in Computer Information Systems)",
            },
            location: {
              type: "string",
              description: "Location the school is located",
            },
            graduationDate: {
              type: "string",
              description: "Graduation date (e.g., Aug 2022)",
            },
          },
        },
        description: "A List of education tailored to the job description",
      },
    },
    required: [
      "title",
      "description",
      "jobs",
      "projects",
      "skills",
      "educations",
    ],
  },
}

export const tailorJob = async ({
  jobDescription,
  user,
}: TailorJob): Promise<generatedResume> => {
  console.log(user)
  const chatCompletion = await openai.chat.completions.create({
    temperature: 0.5,
    messages: [
      {
        role: "system",
        content:
          "Pretend you are a resume writer and a job career coach, tailoring resumes to jobs descriptions.",
      },
      {
        role: "user",
        content: `Tailor my job to this job ${jobDescription} and project descriptions with my following job experience: ${user?.jobExperience}, project experience ${user?.projectExperience}, education: ${user?.education}, my skills: ${user?.skills}. Highlight my best skills, job experiences and projects. Add other skills that might increase my chances of getting the job, but ensure they are related to my experience, limit the total skills to 10! Each job should 4 bullets points description, each having a max character length of 125.`,
      },
    ],
    model: "gpt-3.5-turbo",
    functions: [
      {
        name: "tailor_resume",
        description: "Tailor this resume to the job description",
        parameters: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "The name of the job from the description provided.",
            },
            description: {
              type: "string",
              description:
                "A description of the job from the description provided. 70 Characters Max",
            },
            jobs: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  employer: {
                    type: "string",
                    description: "Name of the employer",
                  },
                  title: {
                    type: "string",
                    description: "Title of the job",
                  },
                  location: {
                    type: "string",
                    description: "Location of the job",
                  },
                  dateRange: {
                    type: "string",
                    description:
                      "Date range of the job (e.g., Jan 2023 - Present)",
                  },
                  description: {
                    type: "array",
                    items: {
                      type: "string",
                      description:
                        "A bullet point of the job responsibility tailored to the job description",
                    },
                    description: "List of job responsibilities",
                  },
                },
              },
              description:
                "List of work experiences tailored to the job description",
            },
            projects: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                    description: "Name of the project",
                  },
                  location: {
                    type: "string",
                    description: "Location of the project",
                  },
                  dateRange: {
                    type: "string",
                    description: "Date range (e.g., Aug 2023 - Sep 2023)",
                  },
                  description: {
                    type: "array",
                    items: {
                      type: "string",
                      description:
                        "A bullet point of project description tailored to the job description",
                    },
                    description: "List of project descriptions",
                  },
                },
              },
              description:
                "List of project experiences tailored to the job description",
            },
            skills: {
              type: "array",
              items: {
                type: "string",
                description: "A skill (e.g., Typescript, HTML5)",
              },
              description: "List of skills tailored to the job description",
            },
            educations: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  school: {
                    type: "string",
                    description: "Name of the educational institution",
                  },
                  degree: {
                    type: "string",
                    description:
                      "Degree earned (e.g., Bachelor’s in Computer Information Systems)",
                  },
                  location: {
                    type: "string",
                    description: "Location the school is located",
                  },
                  graduationDate: {
                    type: "string",
                    description: "Graduation date (e.g., Aug 2022)",
                  },
                },
              },
              description:
                "A List of education tailored to the job description",
            },
          },
          required: [
            "title",
            "description",
            "jobs",
            "projects",
            "skills",
            "educations",
          ],
        },
      },
    ],
    function_call: "auto",
  })
  console.log(chatCompletion)

  return chatCompletion.choices[0].message.function_call?.arguments
}

// EXAMPLE USE BELOW

// tailorJob({
//   jobDescription: jobPost, // Job Description Provided on Each Call
//   user: {
//     jobExperience: jobExperience,
//     education: education,
//     projectExperience: projectExperience,
//     skills: skills,
//   },
// })
