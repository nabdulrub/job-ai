import axios from "axios"

export default async function fetchHTML(url: string) {
  try {
    const response = await axios.get(url, {
      headers: {
        Referer: "https://google.com/",
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching HTML:", error)
  }
}
