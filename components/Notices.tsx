import Link from "next/link";
import { Bell } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Notice {
    slug: string;
    title: string;
    date: string;
    link?: string;
    content?: string;
}

export default function Notices({ notices }: { notices: Notice[] }) {
    if (!notices || notices.length === 0) return null;

    return (
        <section className="section" style={{ padding: '4rem 0', background: 'var(--color-background)' }}>
            <div className="container">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '1.5rem' }}>
                    <Bell size={28} />
                    <h2>Announcements</h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {notices.map((notice) => (
                        <div key={notice.slug} style={{
                            padding: '1.5rem',
                            background: 'var(--color-surface)',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                    {new Date(notice.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                                {notice.link ? (
                                    <Link href={notice.link} style={{ fontWeight: '700', fontSize: '1.25rem', color: 'var(--color-primary)' }}>
                                        {notice.title}
                                    </Link>
                                ) : (
                                    <span style={{ fontWeight: '700', fontSize: '1.25rem', color: 'var(--color-primary)' }}>{notice.title}</span>
                                )}
                            </div>

                            {notice.content && (
                                <div style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--color-text)' }}>
                                    <ReactMarkdown
                                        components={{
                                            a: ({ node, ...props }) => <Link href={props.href || '#'} style={{ color: 'var(--color-accent)', textDecoration: 'underline' }} {...props} />
                                        }}
                                    >
                                        {notice.content}
                                    </ReactMarkdown>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
