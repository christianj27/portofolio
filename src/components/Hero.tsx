import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from './ui/button';
import profileImg from '../assets/cj.png';
import { ReactTyped } from 'react-typed';

export function Hero() {
    const scrollToContact = () => {
        const element = document.querySelector('#contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="hero">
            <div className="hero-container">
                <div className="hero-grid">
                    {/* Text Content */}
                    <div className="hero-text">
                        <div className="hero-badge">
                            <ReactTyped
                                strings={[
                                    'Software Engineer',
                                    '.NET Developer',
                                    'Full Stack Developer',
                                    'PERN Stack Developer',
                                    'Problem Solver',
                                ]}
                                typeSpeed={80}
                                backSpeed={40}
                                backDelay={1800}
                                loop
                            />
                        </div>
                        <h1 className="hero-title">
                            Hi, I'm <span className="highlight">Christian Jeremia</span>
                        </h1>
                        <p className="hero-description">
                            Passionate software engineer with 6+ years of experience building robust .NET solutions and now
                            mastering the PERN stack. I craft scalable products that balance performance, usability, and visual polish.
                        </p>

                        <div className="hero-buttons">
                            <Button onClick={scrollToContact} className="btn btn-default btn-default-size">
                                Get In Touch
                            </Button>
                            <Button
                                variant="outline"
                                className="btn btn-outline btn-default-size"
                                onClick={() => window.open('#projects', '_self')}
                            >
                                View Projects
                            </Button>
                        </div>

                        {/* Social Links */}
                        <div className="hero-social">
                            <a
                                href="https://github.com/christianj27"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="github"
                            >
                                <Github className="h-5 w-5" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/christianjeremia/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="linkedin"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a
                                href="mailto:christianjeremia2705@gmail.com"
                                className="mail"
                            >
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="hero-image">
                        <div className="hero-image-wrapper">
                            <div className="image-bg"></div>
                            <img
                                src={profileImg}
                                alt="Christian Jeremia"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}