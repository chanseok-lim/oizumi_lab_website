"use client";

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function Join() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
                <div className="container section" style={{ paddingBottom: '1rem', paddingTop: '2rem' }}>
                    <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Join us!</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: '3rem' }}>
                        We are looking for passionate researchers and students to join our team.
                    </p>
                </div>

                <div className="container" style={{ paddingBottom: '4rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {/* Postdocs Card */}
                        <Link href="/join/postdocs" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="glass" style={{
                                padding: '2rem',
                                borderRadius: 'var(--radius-md)',
                                height: '100%',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                cursor: 'pointer',
                                border: '1px solid var(--border-color)'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Postdocs</h2>
                                <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                                    Information for postdoctoral researchers interested in joining our lab.
                                </p>
                                <div style={{ marginTop: '1.5rem', color: 'var(--color-accent)', fontWeight: 500 }}>
                                    Read more →
                                </div>
                            </div>
                        </Link>

                        {/* Graduate Students Card */}
                        <Link href="/join/gradstudents" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="glass" style={{
                                padding: '2rem',
                                borderRadius: 'var(--radius-md)',
                                height: '100%',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                cursor: 'pointer',
                                border: '1px solid var(--border-color)'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Graduate Students</h2>
                                <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                                    Information for students interested in our Master's and PhD programs.
                                </p>
                                <div style={{ marginTop: '1.5rem', color: 'var(--color-accent)', fontWeight: 500 }}>
                                    Read more →
                                </div>
                            </div>
                        </Link>

                        {/* Undergraduate Students Card */}
                        <Link href="/join/undergrad" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="glass" style={{
                                padding: '2rem',
                                borderRadius: 'var(--radius-md)',
                                height: '100%',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                cursor: 'pointer',
                                border: '1px solid var(--border-color)'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Undergraduate Students</h2>
                                <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                                    Information for undergraduate students interested in research.
                                </p>
                                <div style={{ marginTop: '1.5rem', color: 'var(--color-accent)', fontWeight: 500 }}>
                                    Read more →
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
