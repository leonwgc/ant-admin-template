/**
 * @file src/pages/Games/FlappyBirds3D.tsx
 * @author leon.wang
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import './FlappyBirds3D.scss';

// Game constants
const GRAVITY = 0.6;
const JUMP_FORCE = -12;
const BIRD_SIZE = 20;
const PIPE_WIDTH = 60;
const PIPE_GAP = 180;
const PIPE_SPEED = 3;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

interface Bird {
  x: number;
  y: number;
  velocity: number;
  rotation: number;
}

interface Pipe {
  x: number;
  topHeight: number;
  scored: boolean;
}

const FlappyBirds3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'gameOver'>('ready');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Audio refs
  const flapSoundRef = useRef<HTMLAudioElement | null>(null);
  const scoreSoundRef = useRef<HTMLAudioElement | null>(null);
  const hitSoundRef = useRef<HTMLAudioElement | null>(null);

  // Game state refs
  const birdRef = useRef<Bird>({
    x: 150,
    y: GAME_HEIGHT / 2,
    velocity: 0,
    rotation: 0,
  });

  const pipesRef = useRef<Pipe[]>([]);
  const frameCountRef = useRef(0);

  // Initialize audio
  useEffect(() => {
    // Create simple sound effects using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Flap sound - higher pitch beep
    const createFlapSound = () => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    };

    // Score sound - pleasant chime
    const createScoreSound = () => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.value = 1000;
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    };

    // Hit sound - low thud
    const createHitSound = () => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.value = 100;
      oscillator.type = 'sawtooth';
      gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    };

    flapSoundRef.current = { play: createFlapSound } as any;
    scoreSoundRef.current = { play: createScoreSound } as any;
    hitSoundRef.current = { play: createHitSound } as any;

    // Load high score from localStorage
    const savedHighScore = localStorage.getItem('flappyBirds3DHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }

    return () => {
      audioContext.close();
    };
  }, []);

  // Draw 3D-like bird
  const drawBird = (ctx: CanvasRenderingContext2D, bird: Bird) => {
    ctx.save();
    ctx.translate(bird.x, bird.y);
    ctx.rotate((bird.rotation * Math.PI) / 180);

    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.arc(3, 3, BIRD_SIZE, 0, Math.PI * 2);
    ctx.fill();

    // Body - gradient for 3D effect
    const gradient = ctx.createRadialGradient(-5, -5, 0, 0, 0, BIRD_SIZE);
    gradient.addColorStop(0, '#FFD700');
    gradient.addColorStop(0.5, '#FFA500');
    gradient.addColorStop(1, '#FF8C00');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, BIRD_SIZE, 0, Math.PI * 2);
    ctx.fill();

    // Wing
    ctx.fillStyle = '#FF6347';
    ctx.beginPath();
    ctx.ellipse(0, 0, BIRD_SIZE * 0.8, BIRD_SIZE * 0.4, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    // Eye white
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(8, -5, 6, 0, Math.PI * 2);
    ctx.fill();

    // Eye pupil
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(10, -5, 3, 0, Math.PI * 2);
    ctx.fill();

    // Beak
    ctx.fillStyle = '#FF4500';
    ctx.beginPath();
    ctx.moveTo(15, 0);
    ctx.lineTo(25, -3);
    ctx.lineTo(25, 3);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  };

  // Draw 3D-like pipe
  const drawPipe = (ctx: CanvasRenderingContext2D, pipe: Pipe) => {
    // Top pipe
    const topGradient = ctx.createLinearGradient(pipe.x, 0, pipe.x + PIPE_WIDTH, 0);
    topGradient.addColorStop(0, '#2ECC71');
    topGradient.addColorStop(0.5, '#27AE60');
    topGradient.addColorStop(1, '#1E8449');

    // Pipe body
    ctx.fillStyle = topGradient;
    ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);

    // Pipe cap
    ctx.fillStyle = '#229954';
    ctx.fillRect(pipe.x - 5, pipe.topHeight - 30, PIPE_WIDTH + 10, 30);

    // Pipe highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(pipe.x + 5, 0, 10, pipe.topHeight);

    // Bottom pipe
    const bottomY = pipe.topHeight + PIPE_GAP;
    const bottomHeight = GAME_HEIGHT - bottomY;

    ctx.fillStyle = topGradient;
    ctx.fillRect(pipe.x, bottomY, PIPE_WIDTH, bottomHeight);

    // Bottom pipe cap
    ctx.fillStyle = '#229954';
    ctx.fillRect(pipe.x - 5, bottomY, PIPE_WIDTH + 10, 30);

    // Bottom pipe highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(pipe.x + 5, bottomY, 10, bottomHeight);
  };

  // Game loop
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with sky gradient
    const skyGradient = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
    skyGradient.addColorStop(0, '#87CEEB');
    skyGradient.addColorStop(1, '#E0F6FF');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Draw clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.beginPath();
    ctx.arc(100 + (frameCountRef.current % 800), 100, 40, 0, Math.PI * 2);
    ctx.arc(140 + (frameCountRef.current % 800), 100, 50, 0, Math.PI * 2);
    ctx.arc(180 + (frameCountRef.current % 800), 100, 40, 0, Math.PI * 2);
    ctx.fill();

    if (gameState === 'playing') {
      // Update bird physics
      const bird = birdRef.current;
      bird.velocity += GRAVITY;
      bird.y += bird.velocity;
      bird.rotation = Math.min(Math.max(bird.velocity * 3, -30), 90);

      // Update pipes
      frameCountRef.current++;
      if (frameCountRef.current % 90 === 0) {
        const topHeight = Math.random() * (GAME_HEIGHT - PIPE_GAP - 100) + 50;
        pipesRef.current.push({
          x: GAME_WIDTH,
          topHeight,
          scored: false,
        });
      }

      // Move and draw pipes
      pipesRef.current = pipesRef.current.filter((pipe) => {
        pipe.x -= PIPE_SPEED;

        // Check scoring
        if (!pipe.scored && pipe.x + PIPE_WIDTH < bird.x) {
          pipe.scored = true;
          setScore((prev) => {
            const newScore = prev + 1;
            if (newScore > highScore) {
              setHighScore(newScore);
              localStorage.setItem('flappyBirds3DHighScore', newScore.toString());
            }
            return newScore;
          });
          scoreSoundRef.current?.play();
        }

        drawPipe(ctx, pipe);

        // Check collision
        const birdLeft = bird.x - BIRD_SIZE;
        const birdRight = bird.x + BIRD_SIZE;
        const birdTop = bird.y - BIRD_SIZE;
        const birdBottom = bird.y + BIRD_SIZE;

        const pipeLeft = pipe.x;
        const pipeRight = pipe.x + PIPE_WIDTH;

        if (birdRight > pipeLeft && birdLeft < pipeRight) {
          if (birdTop < pipe.topHeight || birdBottom > pipe.topHeight + PIPE_GAP) {
            hitSoundRef.current?.play();
            setGameState('gameOver');
          }
        }

        return pipe.x > -PIPE_WIDTH;
      });

      // Check ground and ceiling collision
      if (bird.y + BIRD_SIZE >= GAME_HEIGHT || bird.y - BIRD_SIZE <= 0) {
        hitSoundRef.current?.play();
        setGameState('gameOver');
      }
    }

    // Draw bird
    drawBird(ctx, birdRef.current);

    // Draw score
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.strokeText(score.toString(), GAME_WIDTH / 2, 80);
    ctx.fillText(score.toString(), GAME_WIDTH / 2, 80);

    // Draw high score
    ctx.font = 'bold 24px Arial';
    ctx.strokeText(`Best: ${highScore}`, GAME_WIDTH / 2, 120);
    ctx.fillText(`Best: ${highScore}`, GAME_WIDTH / 2, 120);

    if (gameState === 'ready') {
      ctx.font = 'bold 32px Arial';
      ctx.strokeText('Click or Press Space to Start!', GAME_WIDTH / 2, GAME_HEIGHT / 2);
      ctx.fillText('Click or Press Space to Start!', GAME_WIDTH / 2, GAME_HEIGHT / 2);
    }

    if (gameState === 'gameOver') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 64px Arial';
      ctx.strokeText('Game Over!', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 50);
      ctx.fillText('Game Over!', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 50);

      ctx.font = 'bold 32px Arial';
      ctx.strokeText(`Score: ${score}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 20);
      ctx.fillText(`Score: ${score}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 20);

      ctx.font = 'bold 24px Arial';
      ctx.strokeText('Click to Restart', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 80);
      ctx.fillText('Click to Restart', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 80);
    }

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, score, highScore]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameLoop]);

  const handleJump = useCallback(() => {
    if (gameState === 'ready') {
      setGameState('playing');
    }

    if (gameState === 'playing') {
      birdRef.current.velocity = JUMP_FORCE;
      flapSoundRef.current?.play();
    }

    if (gameState === 'gameOver') {
      // Reset game
      birdRef.current = {
        x: 150,
        y: GAME_HEIGHT / 2,
        velocity: 0,
        rotation: 0,
      };
      pipesRef.current = [];
      frameCountRef.current = 0;
      setScore(0);
      setGameState('ready');
    }
  }, [gameState]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleJump();
      }
    },
    [handleJump]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="flappy-birds-3d">
      <div className="flappy-birds-3d__header">
        <h1 className="flappy-birds-3d__title">Flappy Birds 3D</h1>
      </div>
      <div className="flappy-birds-3d__game-container">
        <canvas
          ref={canvasRef}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          onClick={handleJump}
          className="flappy-birds-3d__canvas"
        />
      </div>
      <div className="flappy-birds-3d__instructions">
        <p>Click or press SPACE to jump</p>
        <p>Avoid the pipes and fly as far as you can!</p>
      </div>
    </div>
  );
};

export default FlappyBirds3D;
