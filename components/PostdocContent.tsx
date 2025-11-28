"use client";

import ReactMarkdown from 'react-markdown';
import { useLanguage } from '../context/LanguageContext';

interface RecruitmentData {
    title: string;
    content: string;
}

interface PostdocContentProps {
    jp: RecruitmentData;
    en: RecruitmentData;
}

export default function PostdocContent({ jp, en }: PostdocContentProps) {
    const { language, toggleLanguage } = useLanguage();
    const data = language === 'jp' ? jp : en;

    return (
        <main style={{ flex: 1 }}>
            <div className="container section" style={{ paddingBottom: '1rem', paddingTop: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1.5rem' }}>
                    <h1 style={{ marginBottom: 0, fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>{data.title}</h1>
                    <button
                        onClick={toggleLanguage}
                        className="btn btn-accent"
                        style={{
                            fontSize: '1.1rem',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '50px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        {language === 'jp' ? 'English page here →' : 'Japanese page here →'}
                    </button>
                </div>
            </div>

            <section style={{
                padding: '1.5rem 0',
                background: 'var(--color-background)',
                borderTop: '1px solid var(--border-color)'
            }}>
                <div className="container">
                    <div style={{ maxWidth: '800px' }}>
                        <div className="markdown-content postdoc-content" style={{ fontSize: '1rem', lineHeight: '1.5' }}>
                            <ReactMarkdown
                                components={{
                                    a: ({ node, ...props }) => <a {...props} style={{ color: 'var(--color-primary)', textDecoration: 'underline', fontWeight: 500 }} />,
                                    ul: ({ node, ...props }) => <ul {...props} style={{ paddingLeft: '1.5rem', marginBottom: '1rem', listStyleType: 'disc' }} />,
                                    ol: ({ node, ...props }) => <ol {...props} style={{ paddingLeft: '1.5rem', marginBottom: '1rem', listStyleType: 'decimal' }} />,
                                    li: ({ node, ...props }) => <li {...props} style={{ marginBottom: '0.25rem', paddingLeft: '0.5rem' }} />,
                                    p: ({ node, ...props }) => <p {...props} style={{ marginBottom: '0.75rem' }} />,
                                    h2: ({ node, ...props }) => <h2 {...props} style={{ marginTop: '3rem', marginBottom: '1.5rem', fontSize: '1.8rem', fontWeight: 700 }} />,
                                    h3: ({ node, ...props }) => <h3 {...props} style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.4rem', fontWeight: 600 }} />
                                }}
                            >
                                {data.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
