// components/Hero.tsx
import { useEffect, useRef } from "react";
import * as THREE from "three";
import * as router from "routi"

interface ThreeJSRefs {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  particles: THREE.Points;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<ThreeJSRefs | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create particles
    const geometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 2000;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 3,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 100;
    sceneRef.current = { scene, camera, renderer, particles };

    const animate = () => {
      if (sceneRef.current) {
        sceneRef.current.particles.rotation.x += 0.001;
        sceneRef.current.particles.rotation.y += 0.002;
        sceneRef.current.renderer.render(
          sceneRef.current.scene,
          sceneRef.current.camera
        );
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (sceneRef.current) {
        sceneRef.current.camera.aspect = window.innerWidth / window.innerHeight;
        sceneRef.current.camera.updateProjectionMatrix();
        sceneRef.current.renderer.setSize(
          window.innerWidth,
          window.innerHeight
        );
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const showDemo = () => {
    alert(
      "🚀 Demo Mode!\n\nThis would normally redirect to the application form where users can:\n\n• Upload their resume\n• Paste job descriptions\n• Generate personalized cover letters\n• Get LinkedIn messages\n• Download PDF applications\n\nSign up to start your free trial!"
    );
  };

  const smoothScroll = (targetId: string) => {
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />
      <div className="max-w-7xl mx-auto px-5 relative z-20">
        <div className="text-center text-white animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-5 drop-shadow-lg">
            Get Your Dream Job Faster
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto drop-shadow-sm">
            Stop wasting hours writing applications. Let our AI craft
            personalized cover letters, optimize your resume, and draft perfect
            LinkedIn messages — all in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button
              onClick={showDemo}
              
              className="bg-white/20 text-white px-8 py-4 border-2 border-white/30 rounded-full font-semibold text-lg backdrop-blur-md hover:bg-white/30 hover:transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              Get Started Free
            </button>
            <button
              onClick={() => smoothScroll("#how-it-works")}
              className="bg-transparent text-white px-8 py-4 border-2 border-white/50 rounded-full font-semibold text-lg hover:bg-white/10 hover:transform hover:-translate-y-1 transition-all duration-300"
            >
              See How It Works
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
