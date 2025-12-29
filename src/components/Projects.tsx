import { ExternalLink, Github } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function Projects() {
    const projects = [
        {
            title: 'Enterprise CRM System',
            description: 'A comprehensive customer relationship management system with advanced analytics and reporting features. Built for scalability and performance.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
            tags: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
            github: '#',
            demo: '#',
        },
        {
            title: 'Task Management Platform',
            description: 'Real-time collaborative task management tool with drag-and-drop interface, team collaboration, and progress tracking.',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop',
            tags: ['TypeScript', 'React', 'GraphQL', 'MongoDB'],
            github: '#',
            demo: '#',
        },
        {
            title: 'Inventory Management API',
            description: 'RESTful API for inventory tracking with real-time updates, barcode scanning, and automated stock alerts.',
            image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop',
            tags: ['Node.js', 'Express', 'PostgreSQL', 'Redis'],
            github: '#',
            demo: '#',
        },
        {
            title: 'E-commerce Dashboard',
            description: 'Modern admin dashboard for e-commerce platforms featuring sales analytics, inventory management, and customer insights.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
            tags: ['Next.js', 'Tailwind', 'Charts', 'API'],
            github: '#',
            demo: '#',
        },
        {
            title: 'Microservices Architecture',
            description: 'Scalable microservices infrastructure with Docker containers, API gateway, and service discovery.',
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
            tags: ['Docker', 'Kubernetes', 'Node.js', 'RabbitMQ'],
            github: '#',
            demo: '#',
        },
        {
            title: 'Mobile App Backend',
            description: 'High-performance backend API for mobile applications with authentication, push notifications, and data synchronization.',
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop',
            tags: ['Python', 'FastAPI', 'PostgreSQL', 'AWS'],
            github: '#',
            demo: '#',
        },
    ];

    return (
        <section id="projects" className="projects">
            <div className="projects-container">
                {/* Section Header */}
                <div className="projects-header">
                    <h2>Featured Projects</h2>
                    <p>
                        A selection of my recent work showcasing various technologies and solutions
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <Card
                            key={index}
                            className="card project-card"
                        >
                            {/* Project Image */}
                            <div className="project-image">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                />
                            </div>

                            {/* Project Content */}
                            <div className="project-content">
                                <h3>{project.title}</h3>
                                <p className="project-description">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="project-tags">
                                    {project.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="badge badge-secondary">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="project-links">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="btn btn-outline btn-sm"
                                        onClick={() => window.open(project.github, '_blank')}
                                    >
                                        <Github className="h-4 w-4 mr-2" />
                                        Code
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="btn btn-secondary btn-sm"
                                        onClick={() => window.open(project.demo, '_blank')}
                                    >
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        Demo
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}