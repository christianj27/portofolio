import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    {/* Copyright */}
                    <p className="footer-copyright">
                        © {currentYear} Christian Jeremia. All rights reserved.
                    </p>

                    {/* Social Links */}
                    <div className="footer-social">
                        <a
                            href="https://github.com/christianj27"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github"
                        >
                            <Github />
                        </a>
                        <a
                            href="https://linkedin.com/in/christianjeremia"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="linkedin"
                        >
                            <Linkedin />
                        </a>
                        <a
                            href="mailto:christian@christianjeremia.com"
                            className="mail"
                        >
                            <Mail />
                        </a>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links">
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            Back to Top
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
