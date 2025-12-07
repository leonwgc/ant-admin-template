/**
 * @file src/pages/Games/Tetris3D.tsx
 * @author leon.wang
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Button, Space, Typography } from '@derbysoft/neat-design';
import './Tetris3D.scss';

const { Title, Text } = Typography;

interface Position {
  x: number;
  y: number;
  z: number;
}

interface Block {
  position: Position;
  mesh: THREE.Mesh;
}

interface Tetromino {
  blocks: Position[];
  color: number;
}

// Define tetromino shapes
const TETROMINOS: Tetromino[] = [
  // I shape
  {
    blocks: [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 2, y: 0, z: 0 },
      { x: 3, y: 0, z: 0 },
    ],
    color: 0x00ffff,
  },
  // O shape
  {
    blocks: [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 },
      { x: 1, y: 1, z: 0 },
    ],
    color: 0xffff00,
  },
  // T shape
  {
    blocks: [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 2, y: 0, z: 0 },
      { x: 1, y: 1, z: 0 },
    ],
    color: 0x800080,
  },
  // L shape
  {
    blocks: [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 },
      { x: 0, y: 2, z: 0 },
      { x: 1, y: 2, z: 0 },
    ],
    color: 0xff7f00,
  },
  // J shape
  {
    blocks: [
      { x: 1, y: 0, z: 0 },
      { x: 1, y: 1, z: 0 },
      { x: 1, y: 2, z: 0 },
      { x: 0, y: 2, z: 0 },
    ],
    color: 0x0000ff,
  },
  // S shape
  {
    blocks: [
      { x: 1, y: 0, z: 0 },
      { x: 2, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 },
      { x: 1, y: 1, z: 0 },
    ],
    color: 0x00ff00,
  },
  // Z shape
  {
    blocks: [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 1, y: 1, z: 0 },
      { x: 2, y: 1, z: 0 },
    ],
    color: 0xff0000,
  },
];

const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;
const BLOCK_SIZE = 1;

const Tetris3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const currentTetrominoRef = useRef<Block[]>([]);
  const currentPositionRef = useRef<Position>({ x: 4, y: 0, z: 0 });
  const gridRef = useRef<(THREE.Mesh | null)[][][]>([]);
  const gameLoopRef = useRef<number | null>(null);
  const lastMoveTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    sceneRef.current = scene;

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 10, 20);
    camera.lookAt(5, 10, 0);
    cameraRef.current = camera;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);

    // Create grid
    initializeGrid(scene);

    // Create game boundaries
    createBoundaries(scene);

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer?.dispose();
    };
  }, []);

  const initializeGrid = (scene: THREE.Scene) => {
    gridRef.current = Array(GRID_HEIGHT)
      .fill(null)
      .map(() =>
        Array(GRID_WIDTH)
          .fill(null)
          .map(() => Array(1).fill(null))
      );
  };

  const createBoundaries = (scene: THREE.Scene) => {
    const material = new THREE.LineBasicMaterial({ color: 0x444444 });

    // Bottom
    const bottomGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(GRID_WIDTH, 0, 0),
      new THREE.Vector3(GRID_WIDTH, 0, 1),
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(0, 0, 0),
    ]);
    scene.add(new THREE.Line(bottomGeometry, material));

    // Sides
    for (let i = 0; i <= GRID_WIDTH; i++) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(i, 0, 0),
        new THREE.Vector3(i, GRID_HEIGHT, 0),
      ]);
      scene.add(new THREE.Line(geometry, material));
    }

    for (let i = 0; i <= GRID_HEIGHT; i++) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, i, 0),
        new THREE.Vector3(GRID_WIDTH, i, 0),
      ]);
      scene.add(new THREE.Line(geometry, material));
    }
  };

  const createBlock = (x: number, y: number, z: number, color: number): THREE.Mesh => {
    const geometry = new THREE.BoxGeometry(BLOCK_SIZE * 0.9, BLOCK_SIZE * 0.9, BLOCK_SIZE * 0.9);
    const material = new THREE.MeshPhongMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x + BLOCK_SIZE / 2, y + BLOCK_SIZE / 2, z + BLOCK_SIZE / 2);
    return mesh;
  };

  const spawnTetromino = () => {
    const tetromino = TETROMINOS[Math.floor(Math.random() * TETROMINOS.length)];
    const startX = Math.floor(GRID_WIDTH / 2) - 2;
    const startY = GRID_HEIGHT - 1;

    currentTetrominoRef.current = tetromino.blocks.map((block) => {
      const mesh = createBlock(startX + block.x, startY - block.y, block.z, tetromino.color);
      sceneRef.current?.add(mesh);
      return {
        position: { x: startX + block.x, y: startY - block.y, z: block.z },
        mesh,
      };
    });

    currentPositionRef.current = { x: startX, y: startY, z: 0 };

    // Check if game over
    if (!canMove(0, 0, 0)) {
      setGameOver(true);
      setIsPlaying(false);
      return false;
    }
    return true;
  };

  const canMove = (dx: number, dy: number, dz: number): boolean => {
    return currentTetrominoRef.current.every((block) => {
      const newX = block.position.x + dx;
      const newY = block.position.y + dy;
      const newZ = block.position.z + dz;

      if (newX < 0 || newX >= GRID_WIDTH || newY < 0 || newY >= GRID_HEIGHT) {
        return false;
      }

      if (gridRef.current[newY]?.[newX]?.[newZ]) {
        return false;
      }

      return true;
    });
  };

  const moveTetromino = (dx: number, dy: number, dz: number) => {
    if (canMove(dx, dy, dz)) {
      currentTetrominoRef.current.forEach((block) => {
        block.position.x += dx;
        block.position.y += dy;
        block.position.z += dz;
        block.mesh.position.set(
          block.position.x + BLOCK_SIZE / 2,
          block.position.y + BLOCK_SIZE / 2,
          block.position.z + BLOCK_SIZE / 2
        );
      });
      currentPositionRef.current.x += dx;
      currentPositionRef.current.y += dy;
      currentPositionRef.current.z += dz;
    }
  };

  const rotateTetromino = () => {
    const centerX = currentPositionRef.current.x + 1.5;
    const centerY = currentPositionRef.current.y - 1.5;

    const newPositions = currentTetrominoRef.current.map((block) => {
      const relX = block.position.x - centerX;
      const relY = block.position.y - centerY;
      return {
        x: Math.round(centerX - relY),
        y: Math.round(centerY + relX),
        z: block.position.z,
      };
    });

    // Check if rotation is valid
    const isValid = newPositions.every((pos) => {
      return (
        pos.x >= 0 &&
        pos.x < GRID_WIDTH &&
        pos.y >= 0 &&
        pos.y < GRID_HEIGHT &&
        !gridRef.current[pos.y]?.[pos.x]?.[pos.z]
      );
    });

    if (isValid) {
      currentTetrominoRef.current.forEach((block, i) => {
        block.position = newPositions[i];
        block.mesh.position.set(
          block.position.x + BLOCK_SIZE / 2,
          block.position.y + BLOCK_SIZE / 2,
          block.position.z + BLOCK_SIZE / 2
        );
      });
    }
  };

  const lockTetromino = () => {
    currentTetrominoRef.current.forEach((block) => {
      const { x, y, z } = block.position;
      gridRef.current[y][x][z] = block.mesh;
    });

    clearLines();
    currentTetrominoRef.current = [];
  };

  const clearLines = () => {
    let linesCleared = 0;

    for (let y = 0; y < GRID_HEIGHT; y++) {
      let isLineFull = true;
      for (let x = 0; x < GRID_WIDTH; x++) {
        if (!gridRef.current[y][x][0]) {
          isLineFull = false;
          break;
        }
      }

      if (isLineFull) {
        linesCleared++;
        // Remove line
        for (let x = 0; x < GRID_WIDTH; x++) {
          const mesh = gridRef.current[y][x][0];
          if (mesh) {
            sceneRef.current?.remove(mesh);
          }
        }

        // Move lines down
        for (let yy = y; yy < GRID_HEIGHT - 1; yy++) {
          for (let x = 0; x < GRID_WIDTH; x++) {
            gridRef.current[yy][x][0] = gridRef.current[yy + 1][x][0];
            const mesh = gridRef.current[yy][x][0];
            if (mesh) {
              mesh.position.y -= BLOCK_SIZE;
            }
          }
        }

        // Clear top line
        for (let x = 0; x < GRID_WIDTH; x++) {
          gridRef.current[GRID_HEIGHT - 1][x][0] = null;
        }

        y--;
      }
    }

    if (linesCleared > 0) {
      setScore((prev) => prev + linesCleared * 100 * level);
    }
  };

  const gameLoop = (timestamp: number) => {
    if (!isPlaying) return;

    const elapsed = timestamp - lastMoveTimeRef.current;
    const moveInterval = Math.max(200, 1000 - level * 50);

    if (elapsed > moveInterval) {
      if (canMove(0, -1, 0)) {
        moveTetromino(0, -1, 0);
      } else {
        lockTetromino();
        if (!spawnTetromino()) {
          return;
        }
      }
      lastMoveTimeRef.current = timestamp;
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  const startGame = () => {
    // Clear existing game
    currentTetrominoRef.current.forEach((block) => {
      sceneRef.current?.remove(block.mesh);
    });

    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        const mesh = gridRef.current[y][x][0];
        if (mesh) {
          sceneRef.current?.remove(mesh);
        }
      }
    }

    initializeGrid(sceneRef.current!);

    setScore(0);
    setLevel(1);
    setGameOver(false);
    setIsPlaying(true);

    spawnTetromino();
    lastMoveTimeRef.current = performance.now();
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  const pauseGame = () => {
    setIsPlaying(false);
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
  };

  const resumeGame = () => {
    setIsPlaying(true);
    lastMoveTimeRef.current = performance.now();
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;

      switch (e.key) {
        case 'ArrowLeft':
          moveTetromino(-1, 0, 0);
          break;
        case 'ArrowRight':
          moveTetromino(1, 0, 0);
          break;
        case 'ArrowDown':
          moveTetromino(0, -1, 0);
          break;
        case 'ArrowUp':
          rotateTetromino();
          break;
        case ' ':
          // Hard drop
          while (canMove(0, -1, 0)) {
            moveTetromino(0, -1, 0);
          }
          lockTetromino();
          spawnTetromino();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  useEffect(() => {
    if (score > 0 && score % 500 === 0) {
      setLevel((prev) => prev + 1);
    }
  }, [score]);

  return (
    <div className="tetris-3d">
      <div className="tetris-3d__header">
        <Title level={2}>3D Tetris</Title>
        <div className="tetris-3d__stats">
          <div className="tetris-3d__stat">
            <Text strong>Score:</Text>
            <Text className="tetris-3d__stat-value">{score}</Text>
          </div>
          <div className="tetris-3d__stat">
            <Text strong>Level:</Text>
            <Text className="tetris-3d__stat-value">{level}</Text>
          </div>
        </div>
      </div>

      <div className="tetris-3d__content">
        <div ref={mountRef} className="tetris-3d__canvas" />
        <div className="tetris-3d__controls">
          <Space direction="vertical" size="large">
            {!isPlaying && !gameOver && (
              <Button type="primary" size="large" onClick={startGame}>
                Start Game
              </Button>
            )}
            {isPlaying && (
              <Button size="large" onClick={pauseGame}>
                Pause
              </Button>
            )}
            {!isPlaying && !gameOver && currentTetrominoRef.current.length > 0 && (
              <Button type="primary" size="large" onClick={resumeGame}>
                Resume
              </Button>
            )}
            {gameOver && (
              <Button type="primary" size="large" onClick={startGame}>
                Restart
              </Button>
            )}
            <div className="tetris-3d__instructions">
              <Title level={5}>Controls:</Title>
              <Text>← → : Move left/right</Text>
              <Text>↓ : Move down</Text>
              <Text>↑ : Rotate</Text>
              <Text>Space : Hard drop</Text>
            </div>
          </Space>
        </div>
      </div>

      {gameOver && (
        <div className="tetris-3d__game-over">
          <Title level={3}>Game Over!</Title>
          <Text>Final Score: {score}</Text>
        </div>
      )}
    </div>
  );
};

export default Tetris3D;
