import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
})

const jobPost =
  "We're looking for a Frontend Engineer to join a company in the Underdog.io network. The Underdog.io network is a curated group of some of the fastest-growing startups and tech companies in the country. We actively turn away more than 50% of companies that attempt to join. We accept companies that offer competitive salaries, benefits, and perks. They're working on interesting technical challenges and must be respectful of your time to stay active. Our companies look for Frontend Engineers proficient in HTML, CSS, JavaScript, and more. The ideal candidate is passionate about building UIs that solve complex problems and are delightful to use. Many of our companies are looking for mid-to-senior level talent, both individual contributors and managers. To apply to the network, we'll ask you to fill out a 60-second web form. It's absolutely free. If accepted, you'll hear directly from founders, hiring managers, and other key decision makers starting the following Monday. Our platform will hide your profile from your current employer. Apply today! Building an inclusive and diverse workplace is one of Underdog.io’s core values. We warmly welcome people of all backgrounds, experiences, and perspectives. JavaScript, Cascading Style Sheets (CSS), HTML, AngularJS, TypeScript, User Interface Design, Front-end Development, Web Development, HTML5, React.js"

const jobExperience =
  "WORK EXPERIENCE UpWork New York, NY Software Engineer Jan 2023 - Present • Developed and implemented an agile project management methodology that reduced project delivery time by 20% through effective team collaboration, task prioritization, and workflow optimization. • Led a team of 5 developers to successfully deliver complex projects on time and within budget with zero incidents or delays for over 15 clients. • Utilized a range of advanced technologies including Next.js and React to develop interactive web applications for clients resulting in over 90% client satisfaction rates."

const education =
  "EDUCATION Monroe College New Rochelle, NY Bachelor’s in Computer Information Systems Grad Date: Aug 2022"

const projectExperience =
  "Full Stack Quiz Generation Web App New York NY AI Quizify Jul 2023 - Aug 2023 • Developed a dynamic quiz app with data optimization, allowing users to create quizzes on any topic with multiple-choice and open-ended questions, and utilized TypeScript for improved code maintainability. • Leveraged the OpenAI API for automated question generation, streamlining content creation and enhancing user engagement. • Enhanced performance through TypeScript in conjunction with Next.js, ensuring efficient client and server-side rendering while optimizing data handling for improved responsiveness. • Implemented secure data management with MySQL for user-generated quizzes and responses, guaranteeing data integrity and efficiency. CRUD Task Organizer New York, NY Task Organizer Jun 2023 - Jul 2023 • Developed a full-stack task organizer web app with Next.js, Tailwind CSS, and SQL, offering efficient task management and organization. • Implemented priority-based task sorting, seamless editing, and quick deletion features to enhance user experience. • Demonstrated proficiency in web development technologies, ensuring an intuitive interface for users. • Designed and launched a user-friendly app, contributing to improved task management and productivity."

const skills =
  "SKILLS Languages: Typescript, HTML5, CSS3, Python, SQL. Frameworks: ReactJS, NodeJS, Next.js, Tailwind. Version Control: Git / GitHub. Software: MS Office, Figma, VS Code."

const info =
  "Nader Abdulrub New York, NY | (917) 714-1052 | nabdulrub16@gmail.com"

const resumeFunction = {
  name: "tailor_resume",
  description: "Tailor this resume to this job post",
  parameters: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Full name of the individual",
      },
      location: {
        type: "string",
        description: "Location of the individual",
      },
      phone: {
        type: "string",
        description: "Phone number of the individual",
      },
      email: {
        type: "string",
        description: "Email address of the individual",
      },
      workExperience: {
        type: "array",
        items: {
          type: "object",
          properties: {
            employer: {
              type: "string",
              description: "Name of the employer",
            },
            jobTitle: {
              type: "string",
              description: "Job title",
            },
            dateRange: {
              type: "string",
              description: "Date range (e.g., Jan 2023 - Present)",
            },
            responsibilities: {
              type: "array",
              items: {
                type: "string",
                description: "A bullet point of job responsibility",
              },
              description: "List of job responsibilities",
            },
          },
        },
        description: "List of work experiences",
      },
      projectExperience: {
        type: "array",
        items: {
          type: "object",
          properties: {
            projectName: {
              type: "string",
              description: "Name of the project",
            },
            projectLocation: {
              type: "string",
              description: "Location of the project",
            },
            dateRange: {
              type: "string",
              description: "Date range (e.g., Aug 2023 - Sep 2023)",
            },
            projectDescription: {
              type: "array",
              items: {
                type: "string",
                description: "A bullet point of project description",
              },
              description: "List of project descriptions",
            },
          },
        },
        description: "List of project experiences",
      },
      skills: {
        type: "array",
        items: {
          type: "string",
          description: "A skill (e.g., Typescript, HTML5)",
        },
        description: "List of skills",
      },
      education: {
        type: "object",
        properties: {
          institution: {
            type: "string",
            description: "Name of the educational institution",
          },
          degree: {
            type: "string",
            description:
              "Degree earned (e.g., Bachelor’s in Computer Information Systems)",
          },
          graduationDate: {
            type: "string",
            description: "Graduation date (e.g., Aug 2022)",
          },
        },
        description: "Educational information",
      },
    },
    required: [
      "name",
      "location",
      "phone",
      "email",
      "linkedin",
      "workExperience",
      "projectExperience",
      "skills",
      "education",
    ],
  },
}

type TailorJob = {
  jobDescription: string
  user: {
    jobExperience?: string
    education?: string
    projectExperience?: string
    skills?: string
    info?: string
  }
}

export const tailorJob = async ({ jobDescription, user }: TailorJob) => {
  const chatCompletion = await openai.chat.completions.create({
    temperature: 0,
    messages: [
      {
        role: "system",
        content:
          "Pretend you are a resume writer and a job career coach, tailoring resumes to jobs descriptions.",
      },
      {
        role: "user",
        content: `Tailor my resume with the following job experience: ${user?.jobExperience}, project experience ${user?.projectExperience}, education: ${user?.education}, my info ${user?.info}, my skills: ${user?.skills} to this job description ${jobDescription}. Highlight my best skills, job experiences and projects. Add other skills that might increase my chances of getting the job, but ensure they are related to my experience, limit the total skills to 10!`,
      },
    ],
    model: "gpt-3.5-turbo",
    functions: [resumeFunction],
    function_call: "auto",
  })

  return chatCompletion.choices[0].message.function_call?.arguments
}

tailorJob({
  jobDescription: jobPost,
  user: {
    jobExperience: jobExperience,
    education: education,
    projectExperience: projectExperience,
    skills: skills,
    info: info,
  },
})
