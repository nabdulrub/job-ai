import fetchHTML from "@/utils/fetchHTML"
import * as cheerio from "cheerio"

export default async function getJobData() {
  const url =
    "https://www.indeed.com/?vjk=b15dbd681ea53b1f&advn=5253764674380665"
  const html = await fetchHTML(url)

  if (!html) {
    return null
  }

  const $ = cheerio.load(html)

  const title = $(".job-details-jobs-unified-top-card__job-title").text()

  const description = $(".jobs-description-content__text").text().trim()

  console.log(html)

  return { title, description }
}
