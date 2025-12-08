/**
 * @file src/pages/Games/Snake3D.tsx
 * @author leon.wang
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Button, Space, Typography } from '@derbysoft/neat-design';
import './Snake3D.scss';

const { Title, Text } = Typography;

interface Position {
  x: number;
  y: number;
}

interface Direction {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const CELL_SIZE = 1;
const INITIAL_SPEED = 150; // ms per move
const SPEED_INCREASE = 5; // ms decrease per food eaten
const MIN_SPEED = 50; // minimum ms per move

const Snake3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const snakeRef = useRef<Position[]>([{ x: 10, y: 10 }]);
  const directionRef = useRef<Direction>({ x: 1, y: 0 });
  const nextDirectionRef = useRef<Direction>({ x: 1, y: 0 });
  const foodRef = useRef<Position>({ x: 15, y: 15 });
  const snakeMeshesRef = useRef<THREE.Mesh[]>([]);
  const foodMeshRef = useRef<THREE.Mesh | null>(null);
  const gameLoopRef = useRef<number | null>(null);
  const lastMoveTimeRef = useRef<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gridLinesRef = useRef<THREE.LineSegments | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const speedRef = useRef<number>(INITIAL_SPEED);
  const scoreRef = useRef<number>(0);

  // Initialize audio context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Load high score from localStorage
    const savedHighScore = localStorage.getItem('snake3d-highscore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }

    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  // Sound generation functions
  const playEatSound = () => {
    if (!isSoundEnabled || !audioContextRef.current) return;

    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, context.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.3, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.1);
  };

  const playGameOverSound = () => {
    if (!isSoundEnabled || !audioContextRef.current) return;

    const context = audioContextRef.current;
    const frequencies = [400, 350, 300, 250, 200];

    frequencies.forEach((freq, index) => {
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      oscillator.type = 'sawtooth';
      oscillator.frequency.value = freq;

      const startTime = context.currentTime + index * 0.1;
      gainNode.gain.setValueAtTime(0.2, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.3);
    });
  };

  const playMoveSound = () => {
    if (!isSoundEnabled || !audioContextRef.current) return;

    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.type = 'square';
    oscillator.frequency.value = 200;

    gainNode.gain.setValueAtTime(0.05, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.05);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.05);
  };

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(GRID_SIZE / 2, GRID_SIZE / 2, GRID_SIZE * 1.5);
    camera.lookAt(GRID_SIZE / 2, GRID_SIZE / 2, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 10, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x00ff00, 0.5, 50);
    pointLight1.position.set(0, 0, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x0088ff, 0.5, 50);
    pointLight2.position.set(GRID_SIZE, GRID_SIZE, 10);
    scene.add(pointLight2);

    // Create grid
    const gridGeometry = new THREE.BufferGeometry();
    const gridMaterial = new THREE.LineBasicMaterial({ color: 0x222222, transparent: true, opacity: 0.3 });
    const gridPoints: number[] = [];

    for (let i = 0; i <= GRID_SIZE; i++) {
      gridPoints.push(i * CELL_SIZE, 0, 0, i * CELL_SIZE, GRID_SIZE * CELL_SIZE, 0);
      gridPoints.push(0, i * CELL_SIZE, 0, GRID_SIZE * CELL_SIZE, i * CELL_SIZE, 0);
    }

    gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(gridPoints, 3));
    const gridLines = new THREE.LineSegments(gridGeometry, gridMaterial);
    scene.add(gridLines);
    gridLinesRef.current = gridLines;

    // Create border
    const borderGeometry = new THREE.EdgesGeometry(
      new THREE.PlaneGeometry(GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE)
    );
    const borderMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff, linewidth: 2 });
    const border = new THREE.LineSegments(borderGeometry, borderMaterial);
    border.position.set(GRID_SIZE / 2, GRID_SIZE / 2, 0);
    scene.add(border);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate camera slightly
      if (cameraRef.current) {
        const time = Date.now() * 0.0001;
        cameraRef.current.position.x = GRID_SIZE / 2 + Math.sin(time) * 2;
        cameraRef.current.position.y = GRID_SIZE / 2 + Math.cos(time) * 2;
        cameraRef.current.lookAt(GRID_SIZE / 2, GRID_SIZE / 2, 0);
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Create snake mesh
  const createSnakeSegment = (position: Position, isHead: boolean = false) => {
    if (!sceneRef.current) return null;

    const geometry = new THREE.BoxGeometry(CELL_SIZE * 0.9, CELL_SIZE * 0.9, CELL_SIZE * 0.9);
    const material = new THREE.MeshPhongMaterial({
      color: isHead ? 0x00ff00 : 0x00aa00,
      emissive: isHead ? 0x00ff00 : 0x00aa00,
      emissiveIntensity: isHead ? 0.5 : 0.2,
      shininess: 100,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position.x * CELL_SIZE + CELL_SIZE / 2, position.y * CELL_SIZE + CELL_SIZE / 2, CELL_SIZE / 2);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    sceneRef.current.add(mesh);
    return mesh;
  };

  // Create food mesh
  const createFood = (position: Position) => {
    if (!sceneRef.current) return null;

    const geometry = new THREE.SphereGeometry(CELL_SIZE * 0.4, 16, 16);
    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      emissive: 0xff0000,
      emissiveIntensity: 0.8,
      shininess: 100,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position.x * CELL_SIZE + CELL_SIZE / 2, position.y * CELL_SIZE + CELL_SIZE / 2, CELL_SIZE / 2);
    mesh.castShadow = true;
    sceneRef.current.add(mesh);

    // Animate food
    const animateFood = () => {
      if (mesh && sceneRef.current?.children.includes(mesh)) {
        mesh.rotation.y += 0.02;
        mesh.position.z = CELL_SIZE / 2 + Math.sin(Date.now() * 0.003) * 0.2;
        requestAnimationFrame(animateFood);
      }
    };
    animateFood();

    return mesh;
  };

  // Generate random food position
  const generateFood = () => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snakeRef.current.some((segment) => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  };

  // Update snake meshes
  const updateSnakeMeshes = () => {
    if (!sceneRef.current) return;

    // Remove old meshes
    snakeMeshesRef.current.forEach((mesh) => {
      sceneRef.current?.remove(mesh);
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
    });
    snakeMeshesRef.current = [];

    // Create new meshes
    snakeRef.current.forEach((segment, index) => {
      const mesh = createSnakeSegment(segment, index === 0);
      if (mesh) {
        snakeMeshesRef.current.push(mesh);
      }
    });
  };

  // Update food mesh
  const updateFoodMesh = () => {
    if (!sceneRef.current) return;

    if (foodMeshRef.current) {
      sceneRef.current.remove(foodMeshRef.current);
      foodMeshRef.current.geometry.dispose();
      (foodMeshRef.current.material as THREE.Material).dispose();
    }

    foodMeshRef.current = createFood(foodRef.current);
  };

  // Check collision
  const checkCollision = (head: Position): boolean => {
    // Check wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }

    // Check self collision
    return snakeRef.current.slice(1).some((segment) => segment.x === head.x && segment.y === head.y);
  };

  // Game loop
  const gameLoop = (currentTime: number) => {
    if (!isPlayingRef.current) return;

    const timeSinceLastMove = currentTime - lastMoveTimeRef.current;

    if (timeSinceLastMove >= speedRef.current) {
      lastMoveTimeRef.current = currentTime;

      // Update direction
      directionRef.current = nextDirectionRef.current;

      // Calculate new head position
      const head = snakeRef.current[0];
      const newHead: Position = {
        x: head.x + directionRef.current.x,
        y: head.y + directionRef.current.y,
      };

      // Check collision
      if (checkCollision(newHead)) {
        setGameOver(true);
        setIsPlaying(false);
        isPlayingRef.current = false;
        playGameOverSound();

        // Update high score
        if (scoreRef.current > highScore) {
          setHighScore(scoreRef.current);
          localStorage.setItem('snake3d-highscore', scoreRef.current.toString());
        }
        return;
      }

      // Move snake
      snakeRef.current.unshift(newHead);

      // Check if food is eaten
      if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
        scoreRef.current += 10;
        setScore(scoreRef.current);
        playEatSound();
        foodRef.current = generateFood();
        updateFoodMesh();

        // Increase speed
        speedRef.current = Math.max(MIN_SPEED, speedRef.current - SPEED_INCREASE);
        setSpeed(speedRef.current);
      } else {
        snakeRef.current.pop();
        playMoveSound();
      }

      updateSnakeMeshes();
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  // Start game
  const startGame = () => {
    // Reset game state
    snakeRef.current = [{ x: 10, y: 10 }];
    directionRef.current = { x: 1, y: 0 };
    nextDirectionRef.current = { x: 1, y: 0 };
    foodRef.current = generateFood();
    scoreRef.current = 0;
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    isPlayingRef.current = true;
    speedRef.current = INITIAL_SPEED;
    setSpeed(INITIAL_SPEED);

    // Update meshes
    updateSnakeMeshes();
    updateFoodMesh();

    // Start game loop
    lastMoveTimeRef.current = performance.now();
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  // Pause game
  const pauseGame = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
  };

  // Resume game
  const resumeGame = () => {
    setIsPlaying(true);
    isPlayingRef.current = true;
    lastMoveTimeRef.current = performance.now();
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;

      // Prevent default behavior for arrow keys
      if (['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
      }

      const direction = directionRef.current;

      switch (e.key) {
        case 'ArrowLeft':
          if (direction.x === 0) {
            nextDirectionRef.current = { x: -1, y: 0 };
          }
          break;
        case 'ArrowRight':
          if (direction.x === 0) {
            nextDirectionRef.current = { x: 1, y: 0 };
          }
          break;
        case 'ArrowUp':
          if (direction.y === 0) {
            nextDirectionRef.current = { x: 0, y: 1 };
          }
          break;
        case 'ArrowDown':
          if (direction.y === 0) {
            nextDirectionRef.current = { x: 0, y: -1 };
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  return (
    <div className="snake-3d">
      <div className="snake-3d__header">
        <Title level={2}>3D Snake</Title>
        <div className="snake-3d__stats">
          <div className="snake-3d__stat">
            <Text strong>Score:</Text>
            <Text className="snake-3d__stat-value">{score}</Text>
          </div>
          <div className="snake-3d__stat">
            <Text strong>High Score:</Text>
            <Text className="snake-3d__stat-value snake-3d__stat-value--high">{highScore}</Text>
          </div>
          <div className="snake-3d__stat">
            <Text strong>Length:</Text>
            <Text className="snake-3d__stat-value">{snakeRef.current.length}</Text>
          </div>
        </div>
      </div>

      <div className="snake-3d__content">
        <div ref={mountRef} className="snake-3d__canvas" />
        <div className="snake-3d__controls">
          <Space direction="vertical" size="large">
            {!isPlaying && !gameOver && snakeRef.current.length === 1 && (
              <Button type="primary" size="large" onClick={startGame}>
                Start Game
              </Button>
            )}
            {isPlaying && (
              <Button size="large" onClick={pauseGame}>
                Pause
              </Button>
            )}
            {!isPlaying && !gameOver && snakeRef.current.length > 1 && (
              <Button type="primary" size="large" onClick={resumeGame}>
                Resume
              </Button>
            )}
            {gameOver && (
              <Button type="primary" size="large" onClick={startGame}>
                Restart
              </Button>
            )}
            <Button
              size="large"
              onClick={() => setIsSoundEnabled(!isSoundEnabled)}
              type={isSoundEnabled ? 'default' : 'dashed'}
            >
              {isSoundEnabled ? '🔊 Sound On' : '🔇 Sound Off'}
            </Button>
            <div className="snake-3d__instructions">
              <Title level={5}>Controls:</Title>
              <Text>↑ : Move up</Text>
              <Text>↓ : Move down</Text>
              <Text>← : Move left</Text>
              <Text>→ : Move right</Text>
            </div>
          </Space>
        </div>
      </div>

      {gameOver && (
        <div className="snake-3d__game-over">
          <Title level={3}>Game Over!</Title>
          <Text>Final Score: {score}</Text>
          <Text>Length: {snakeRef.current.length}</Text>
          {score === highScore && score > 0 && (
            <Text className="snake-3d__new-record">🎉 New High Score! 🎉</Text>
          )}
        </div>
      )}
    </div>
  );
};

export default Snake3D;
