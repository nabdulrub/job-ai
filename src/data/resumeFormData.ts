import { Tag } from "@/components/ui/tag-input"

export const resumeFormData = [
  "Just one form away...",
  "...from lasting resume help.",
  "Lets get started!",
]

export const resumeMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export const resumeYears = () => {
  const startYear: number = 1970
  const endYear: number = new Date().getFullYear()

  const yearsArray: string[] = []
  for (let year = startYear; year <= endYear; year++) {
    yearsArray.push(year.toString())
  }

  return yearsArray.sort((a, b) => b - a)
}

export const jobSkills: Tag[] = [
  { id: "1", text: "Programming" },
  { id: "2", text: "Problem Solving" },
  { id: "3", text: "Communication" },
  { id: "4", text: "Teamwork" },
  { id: "5", text: "Time Management" },
  { id: "6", text: "Leadership" },
  { id: "7", text: "Data Analysis" },
  { id: "8", text: "Creativity" },
  { id: "9", text: "Adaptability" },
  { id: "10", text: "Critical Thinking" },
  { id: "11", text: "Project Management" },
  { id: "12", text: "Customer Service" },
  { id: "13", text: "Marketing" },
  { id: "14", text: "Sales" },
  { id: "15", text: "Graphic Design" },
  { id: "16", text: "Web Development" },
  { id: "17", text: "Database Management" },
  { id: "18", text: "Financial Analysis" },
  { id: "19", text: "Content Writing" },
  { id: "20", text: "Public Speaking" },
  { id: "21", text: "Negotiation" },
  { id: "22", text: "Social Media Management" },
  { id: "23", text: "Machine Learning" },
  { id: "24", text: "Network Security" },
  { id: "25", text: "UI/UX Design" },
  { id: "26", text: "Foreign Languages (e.g., Spanish, French)" },
  { id: "27", text: "Statistical Analysis" },
  { id: "28", text: "Quality Assurance" },
  { id: "29", text: "Troubleshooting" },
  { id: "30", text: "Research" },
  { id: "31", text: "Technical Support" },
]

export const FormTitle = [
  "Let's Create Your Resume",
  "Work Experience Details",
  "Highlight Your Projects",
  "Showcase Education & Skills",
]
