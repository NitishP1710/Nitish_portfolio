import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        // Configuration - Orange-Yellow theme matching navbar
        const config = {
            particleCount: 100,
            particleColors: [
                'hsla(45, 100%, 72%, 0.9)',   // orange-yellow (main)
                'hsla(45, 100%, 65%, 0.85)',  // slightly darker orange-yellow
                'hsla(40, 100%, 68%, 0.8)',   // warm orange-gold
                'hsla(50, 90%, 70%, 0.85)',   // light gold
            ],
            lineColor: 'hsla(45, 100%, 72%, 0.15)',
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
                        ctx.strokeStyle = `hsla(45, 100%, 72%, ${opacity * 0.2})`;
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
    }, []);

    return (
        <canvas
            ref={canvasRef}
            id="particle-canvas"
            className="fixed inset-0 w-full h-full z-0 pointer-events-none"
        />
    );
};

export default ParticleBackground;
