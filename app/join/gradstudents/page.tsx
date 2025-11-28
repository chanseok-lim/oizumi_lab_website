import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

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

export default function GradStudents() {
    const graduate = getRecruitmentData('graduate');

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
                <div className="container section" style={{ paddingBottom: '1rem', paddingTop: '2rem' }}>
                    <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>{graduate.title}</h1>
                </div>

                <section style={{
                    padding: '1.5rem 0',
                    background: 'var(--color-background)',
                    borderTop: '1px solid var(--border-color)'
                }}>
                    <div className="container">
                        <div style={{ maxWidth: '800px' }}>
                            <div className="markdown-content" style={{ fontSize: '1rem', lineHeight: '1.5' }}>
                                <ReactMarkdown
                                    components={{
                                        a: ({ node, ...props }) => <a {...props} style={{ color: 'var(--color-primary)', textDecoration: 'underline', fontWeight: 500 }} />,
                                        ul: ({ node, ...props }) => <ul {...props} style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }} />,
                                        li: ({ node, ...props }) => <li {...props} style={{ marginBottom: '0.25rem' }} />,
                                        p: ({ node, ...props }) => <p {...props} style={{ marginBottom: '0.5rem' }} />
                                    }}
                                >
                                    {graduate.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
