import { ExternalLink, Github } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function Projects() {
    const projects = [
        {
            title: 'Digital Garden — Quartz Configuration',
            description: 'Custom Quartz v5 static site configuration powering my digital garden. Features knowledge graph visualization, Obsidian vault integration, custom Head.tsx component, and a full nginx + Caddy + Cloudflare deployment pipeline.',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop',
            tags: ['TypeScript', 'Quartz', 'Node.js', 'Nginx', 'Cloudflare'],
            github: 'https://github.com/christianj27/garden-site',
            demo: 'https://garden.christianjeremia.com',
        },
        {
            title: 'POS Air & Gas — MSMe Management',
            description: 'A mobile-first PWA for managing a bottled water and gas cylinder shop. Supports three user roles (Owner, Courier, Clerk) with stock management, delivery tracking, customer debt, and container loans. Built with React + TypeScript frontend and .NET 10 Web API backend.',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
            tags: ['React', 'TypeScript', '.NET 10', 'PostgreSQL', 'PWA'],
            github: 'https://github.com/christianj27/pos-web',
            demo: null,
            secondaryRepo: { label: 'API', url: 'https://github.com/christianj27/pos-api' },
        },
        {
            title: 'Krop GRS — Goods Receiving System',
            description: 'A comprehensive Blazor Server application for managing goods receiving, invoice processing, and delivery submissions. Features a mobile-friendly courier portal with digital signature capture, role-based access control, and real-time variance tracking.',
            image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop',
            tags: ['C#', '.NET 8', 'Blazor', 'SQL Server', 'EF Core'],
            github: 'https://github.com/christianj27/Krop-GRS',
            demo: null,
        },
        {
            title: 'Portfolio Website',
            description: 'This portfolio website itself — a modern single-page application built with React 19 and TypeScript. Features smooth-scroll sections, typewriter animation, dark mode support, and an EmailJS-powered contact form. Deployed on Vercel with custom domain.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
            tags: ['React 19', 'TypeScript', 'SCSS', 'Vite', 'Vercel'],
            github: 'https://github.com/christianj27/portofolio',
            demo: 'https://www.christianjeremia.com',
        },
        {
            title: 'Mango Microservices — E-Commerce Platform',
            description: 'A comprehensive e-commerce microservices learning solution built with .NET 8. Features API Gateway (Ocelot), JWT authentication, Azure Service Bus messaging, and six independent services (Auth, Product, Order, Coupon, Email, ShoppingCart) with a Razor Pages frontend.',
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
            tags: ['C#', '.NET 8', 'Microservices', 'Azure', 'Docker'],
            github: 'https://github.com/christianj27/.net-microservice-architecture',
            demo: null,
        },
        {
            title: 'Badminton Draw — Tournament Randomizer',
            description: 'A React + TypeScript web app built for the GPdI Imanuel Badminton Tournament 2025. Randomly generates team draws with a clean, intuitive interface. Uses Supabase as the backend database for storing participant and match data.',
            image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=500&fit=crop',
            tags: ['React', 'TypeScript', 'Vite', 'Supabase'],
            github: 'https://github.com/christianj27/badminton-draw',
            demo: null,
        },
        {
            title: 'FoodInfo — Indonesian Food Explorer',
            description: 'A cross-platform mobile application built with Flutter that showcases Indonesian cuisine from across the archipelago. Features detailed food information, regional categorization, and an intuitive browsing experience.',
            image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=800&h=500&fit=crop',
            tags: ['Flutter', 'Dart', 'Mobile', 'Android'],
            github: 'https://github.com/christianj27/FoodInfo',
            demo: null,
        },
        {
            title: 'Umbraco Blog — CMS on Azure',
            description: 'A full-featured web blog built with Umbraco CMS on ASP.NET, deployed to Microsoft Azure. Demonstrates content management, custom templates, and cloud deployment patterns for enterprise-grade CMS solutions.',
            image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=500&fit=crop',
            tags: ['C#', 'ASP.NET', 'Umbraco CMS', 'Azure'],
            github: 'https://github.com/christianj27/UmbracoAzure',
            demo: null,
        },
        {
            title: 'YOLO Object Detection — AI Vision',
            description: 'Final year project implementing real-time object detection using the YOLO (You Only Look Once) algorithm with the Darkflow framework. Built on Python with TensorFlow and OpenCV, running on Windows for applied engineering research.',
            image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop',
            tags: ['Python', 'TensorFlow', 'OpenCV', 'AI', 'Computer Vision'],
            github: 'https://github.com/christianj27/yoloobjectdetection',
            demo: null,
        },
    ];

    return (
        <section id="projects" className="projects">
            <div className="projects-container">
                {/* Section Header */}
                <div className="projects-header">
                    <h2>Featured Projects</h2>
                    <p>
                        A selection of my work spanning web apps, APIs, mobile applications, and AI — built with .NET, React, Flutter, and more.
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
                                    loading="lazy"
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
                                    {project.secondaryRepo && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="btn btn-outline btn-sm"
                                            onClick={() => window.open(project.secondaryRepo!.url, '_blank')}
                                        >
                                            <Github className="h-4 w-4 mr-2" />
                                            {project.secondaryRepo.label}
                                        </Button>
                                    )}
                                    {project.demo && (
                                        <Button
                                            size="sm"
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => window.open(project.demo!, '_blank')}
                                        >
                                            <ExternalLink className="h-4 w-4 mr-2" />
                                            Demo
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
