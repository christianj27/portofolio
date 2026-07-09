import { useState } from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Toast, ToastContainer } from './ui/toast';
import emailjs from '@emailjs/browser';

export function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID, // EmailJS Service ID from environment variables
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // EmailJS Template ID from environment variables
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY // EmailJS Public Key from environment variables
            );

            setToast({ message: 'Thank you for your message! I will get back to you soon.', type: 'success' });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('EmailJS Error:', error);
            setToast({ message: 'Failed to send message. Please try again.', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: Mail,
            label: 'Email',
            value: 'christian@christianjeremia.com',
            href: 'mailto:christian@christianjeremia.com',
            color: 'text-primary',
        },
        {
            icon: Linkedin,
            label: 'LinkedIn',
            value: 'linkedin.com/in/christianjeremia',
            href: 'https://www.linkedin.com/in/christianjeremia/',
            color: 'text-secondary',
        },
        {
            icon: Github,
            label: 'GitHub',
            value: 'github.com/christianj27',
            href: 'https://github.com/christianj27',
            color: 'text-accent',
        },
    ];

    return (
        <section id="contact" className="contact">
            <div className="contact-container">
                {/* Section Header */}
                <div className="contact-header">
                    <h2>Get In Touch</h2>
                    <p>
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                    </p>
                </div>

                <div className="contact-grid">
                    {/* Contact Information */}
                    <div className="contact-info">
                        <h3>Contact Information</h3>
                        <p className="contact-description">
                            Feel free to reach out through any of these channels, and I'll get back to you as soon as possible.
                        </p>

                        <div className="contact-info-list">
                            {contactInfo.map((info) => {
                                const Icon = info.icon;
                                return (
                                    <Card key={info.label} className="card contact-info-item">
                                        <a
                                            href={info.href}
                                            target={info.label !== 'Email' ? '_blank' : undefined}
                                            rel={info.label !== 'Email' ? 'noopener noreferrer' : undefined}
                                        >
                                            <div className={`contact-icon ${info.color === 'text-primary' ? 'primary' : info.color === 'text-secondary' ? 'secondary' : 'accent'}`}>
                                                <Icon />
                                            </div>
                                            <div className="contact-details">
                                                <p className="contact-label">{info.label}</p>
                                                <p className="contact-value">
                                                    {info.value}
                                                </p>
                                            </div>
                                        </a>
                                    </Card>
                                );
                            })}
                        </div>

                        {/* Additional Info */}
                        <Card className="card contact-cta">
                            <h4>Let's Connect!</h4>
                            <p>
                                I'm currently available for freelance work and new opportunities.
                                Let's collaborate and build something amazing together!
                            </p>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <Card className="card contact-form-card">
                        <h3>Send a Message</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-field">
                                <Label htmlFor="name" className="label">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="input"
                                />
                            </div>

                            <div className="form-field">
                                <Label htmlFor="email" className="label">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="your.email@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="input"
                                />
                            </div>

                            <div className="form-field">
                                <Label htmlFor="subject" className="label">Subject</Label>
                                <Input
                                    id="subject"
                                    type="text"
                                    placeholder="Project Discussion"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    required
                                    className="input"
                                />
                            </div>

                            <div className="form-field">
                                <Label htmlFor="message" className="label">Message</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Tell me about your project or idea..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                    rows={5}
                                    className="textarea"
                                />
                            </div>

                            <Button type="submit" className="btn btn-default btn-default-size" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>

            {/* Toast Notifications */}
            {toast && (
                <ToastContainer>
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                </ToastContainer>
            )}
        </section>
    );
}