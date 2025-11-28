import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import PostdocContent from '../../../components/PostdocContent';

interface RecruitmentData {
    title: string;
    content: string;
}

function getRecruitmentData(filename: string): RecruitmentData {
    const filePath = path.join(process.cwd(), 'content/recruitment', `${filename}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
        title: data.title,
        content: content,
    };
}

export default function Postdocs() {
    const jp = getRecruitmentData('postdocs');
    const en = getRecruitmentData('postdocs.en');

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <PostdocContent jp={jp} en={en} />
            <Footer />
        </div>
    );
}
