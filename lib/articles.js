import fs from 'fs';
import matter from "gray-matter"
import path from "path"
import moment from "moment"
import { remark } from 'remark'
import html from "remark-html"

export const GetArticle = async (id) => {
  const filepath = path.join(path.join(process.cwd(), "blogpages"),`${id}.md`);
  const contents = fs.readFileSync(filepath,"utf-8");
  const matterResult = matter(contents);
  const processedResult = await remark().use(html).process(matterResult.content)
  const contentHTML = processedResult.toString();
  return {
    id,
    contentHTML,
    title:matterResult.data.title,
    description:matterResult.data.description,
    data:matterResult.data.date
  }
  
};

export const GetSortedArticles = () => {
  const fileNames = fs.readdirSync(path.join(process.cwd(), "blogpages"))

  const allArticlesData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "")

    const fullPath = path.join(path.join(process.cwd(), "blogpages"), fileName)
    const fileContents = fs.readFileSync(fullPath, "utf-8")

    const matterResult = matter(fileContents)

    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      description: matterResult.data.description,
      coverImage:matterResult.data.coverImage,
      category: matterResult.data.category,
    }
  })

  return allArticlesData.sort((a, b) => {
    const format = "DD-MM-YYYY"
    const dateOne = moment(a.date, format)
    const dateTwo = moment(b.date, format)
    if (dateOne.isBefore(dateTwo)) {
      return -1
    } else if (dateTwo.isAfter(dateOne)) {
      return 1
    } else {
      0
    }
  })
};