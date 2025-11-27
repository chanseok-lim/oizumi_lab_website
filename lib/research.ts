import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export function getFeaturedResearch() {
    const researchDir = path.join(contentDirectory, "research");

    if (!fs.existsSync(researchDir)) {
        return [];
    }

    const fileNames = fs.readdirSync(researchDir);
    const allResearch = fileNames.map((fileName) => {
        const fullPath = path.join(researchDir, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        return {
            id: fileName.replace(/\.md$/, ""),
            ...data,
        };
    });

    // Sort by date (descending)
    return allResearch.sort((a: any, b: any) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
}
