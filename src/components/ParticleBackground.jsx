import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const ParticleBackground = () => {
    const canvasRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        // Configuration - Theme-aware colors
        const isDark = theme === 'dark';
        const config = {
            particleCount: 100,
            particleColors: isDark ? [
                'hsla(190, 85%, 55%, 0.9)',   // cyan (main)
                'hsla(270, 70%, 65%, 0.85)',  // purple
                'hsla(200, 80%, 60%, 0.8)',   // light cyan
                'hsla(280, 65%, 70%, 0.85)',  // light purple
            ] : [
                'hsla(190, 75%, 45%, 0.7)',   // darker cyan for light mode
                'hsla(270, 60%, 55%, 0.65)',  // darker purple for light mode
                'hsla(200, 70%, 50%, 0.6)',   // darker light cyan
                'hsla(280, 55%, 60%, 0.65)',  // darker light purple
            ],
            lineColor: isDark ? 'hsla(190, 85%, 55%, 0.15)' : 'hsla(190, 75%, 45%, 0.1)',
            particleRadius: 2,
            lineWidth: 1,
            linkDistance: 150,
            speed: 0.4,
        };

        // Resize canvas to full screen
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * config.speed;
                this.vy = (Math.random() - 0.5) * config.speed;
                this.radius = config.particleRadius + Math.random() * 1.5;
                this.color = config.particleColors[Math.floor(Math.random() * config.particleColors.length)];
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                // Keep in bounds
                this.x = Math.max(0, Math.min(canvas.width, this.x));
                this.y = Math.max(0, Math.min(canvas.height, this.y));
            }

            draw() {
                // Add glow effect
                ctx.shadowBlur = 15;
                ctx.shadowColor = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        // Initialize particles
        const initParticles = () => {
            particles = [];
            for (let i = 0; i < config.particleCount; i++) {
                particles.push(new Particle());
            }
        };

        // Draw lines between nearby particles
        const drawLines = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < config.linkDistance) {
                        const opacity = 1 - distance / config.linkDistance;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        const lineOpacity = isDark ? opacity * 0.2 : opacity * 0.15;
                        ctx.strokeStyle = isDark 
                            ? `hsla(190, 85%, 55%, ${lineOpacity})` 
                            : `hsla(190, 75%, 45%, ${lineOpacity})`;
                        ctx.lineWidth = config.lineWidth;
                        ctx.stroke();
                    }
                }
            }
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });

            // Draw connecting lines
            drawLines();

            animationFrameId = requestAnimationFrame(animate);
        };

        // Initialize
        resizeCanvas();
        initParticles();
        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });

        // Cleanup
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [theme]); // Reinitialize when theme changes

    return (
        <canvas
            ref={canvasRef}
            id="particle-canvas"
            className="fixed inset-0 w-full h-full z-0 pointer-events-none"
        />
    );
};

export default ParticleBackground;
