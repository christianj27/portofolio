import { Code, Database, Server } from 'lucide-react';
import { Card } from './ui/card';

export function About() {
    const skills = [
        {
            icon: Code,
            title: 'API Development',
            description: 'RESTful APIs, GraphQL, Microservices, gRPC',
            color: 'text-primary',
            bgColor: 'bg-primary/10',
        },
        {
            icon: Database,
            title: 'Database',
            description: 'PostgreSQL, SQL Server, MySQL',
            color: 'text-secondary',
            bgColor: 'bg-secondary/10',
        },
        {
            icon: Server,
            title: 'Tools & Others',
            description: 'Docker, Git, CI/CD, Agile, Cloud, Observability',
            color: 'text-accent',
            bgColor: 'bg-accent/20',
        },
    ];

    const technologies = [
        'C#',
        '.NET Core',
        'ASP.NET',
        'Blazor',
        'React',
        'TypeScript',
        'Node.js',
        'Python',
        'PostgreSQL',
        'SQL Server',
        'Docker',
        'Azure',
        'Git',
    ];

    return (
        <section id="about" className="about">
            <div className="about-container">
                {/* Section Header */}
                <div className="about-header">
                    <h2>About Me</h2>
                    <p>
                        6+ years crafting products across the .NET ecosystem and the PERN stack. I enjoy bridging clean backend architecture with thoughtful UI details.
                    </p>
                </div>

                {/* Journey */}
                <div className="about-journey">
                    <h3>My Journey</h3>
                    <div className="prose">
                        <p>
                            I started building Windows apps and enterprise APIs in .NET, focusing on reliability and performance. As product needs evolved, I embraced the PERN stack to deliver richer web experiences with modern tooling.
                        </p>
                        <p>
                            Throughout my career, I've embraced challenges as opportunities to learn and grow. Whether it's
                            optimizing database queries or implementing complex UI interactions, I approach each task with
                            dedication and attention to detail. I'm always excited to collaborate with teams and contribute
                            to projects that make a meaningful impact.
                        </p>
                    </div>
                </div>

                {/* Skills Cards */}
                <div className="about-skills">
                    {skills.map((skill) => {
                        const Icon = skill.icon;
                        return (
                            <Card
                                key={skill.title}
                                className="card skill-card"
                            >
                                <div className={`skill-icon ${skill.color === 'text-primary' ? 'primary' : skill.color === 'text-secondary' ? 'secondary' : 'accent'}`}>
                                    <Icon />
                                </div>
                                <h4>{skill.title}</h4>
                                <p>{skill.description}</p>
                            </Card>
                        );
                    })}
                </div>

                {/* Technologies */}
                <div className="about-technologies">
                    <h3>Technologies I Work With</h3>
                    <div className="tech-list">
                        {technologies.map((tech) => (
                            <span key={tech}>
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}