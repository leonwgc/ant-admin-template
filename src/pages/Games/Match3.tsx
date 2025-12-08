/**
 * @file src/pages/Games/Match3.tsx
 * @author leon.wang
 */

import React, { useEffect, useRef, useState } from 'react';
import { Button, Space, Typography } from '@derbysoft/neat-design';
import './Match3.scss';

const { Title, Text } = Typography;

interface Cell {
  type: number;
  row: number;
  col: number;
  id: string;
  matched: boolean;
}

interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
}

const GRID_SIZE = 8;
const CELL_SIZE = 60;
const COLORS = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
const EMOJI = ['🍎', '🍊', '🍋', '🍇', '🍓', '🍉'];

const Match3: React.FC = () => {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [moves, setMoves] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [combo, setCombo] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const boardRef = useRef<Cell[][]>([]);
  const scoreRef = useRef<number>(0);
  const comboRef = useRef<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize audio context
  useEffect(() => {
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioContextRef.current = new AudioContextClass();
    }

    // Load best score from localStorage
    const savedBestScore = localStorage.getItem('match3-bestscore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }

    return () => {
      audioContextRef.current?.close();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Create explosion particles
  const createExplosion = (row: number, col: number, color: string, matchCount: number) => {
    const centerX = col * (CELL_SIZE + 4) + 10 + CELL_SIZE / 2;
    const centerY = row * (CELL_SIZE + 4) + 10 + CELL_SIZE / 2;
    const particleCount = Math.min(15 + matchCount * 3, 30); // Reduced particles for better performance
    const newParticles: Particle[] = [];

    // Main explosion particles
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
      const speed = 2 + Math.random() * 4;
      const size = 3 + Math.random() * 5;

      newParticles.push({
        id: `particle-${Date.now()}-${i}-${Math.random()}`,
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: color,
        size: size,
        life: 1,
      });
    }

    // Add sparks
    const sparkCount = Math.min(8 + matchCount, 15);
    for (let i = 0; i < sparkCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 5;
      const size = 2 + Math.random() * 3;

      newParticles.push({
        id: `spark-${Date.now()}-${i}-${Math.random()}`,
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: '#ffffff',
        size: size,
        life: 0.7,
      });
    }

    particlesRef.current.push(...newParticles);

    // Start animation loop if not already running
    if (!animationFrameRef.current) {
      startParticleAnimation();
    }
  };

  // Particle animation loop
  const startParticleAnimation = () => {
    let lastUpdate = Date.now();

    const updateParticles = () => {
      const now = Date.now();
      const delta = (now - lastUpdate) / 16.67; // Normalize to 60fps
      lastUpdate = now;

      if (particlesRef.current.length === 0) {
        animationFrameRef.current = null;
        setParticles([]);
        return;
      }

      // Update particles in place for better performance
      const particles = particlesRef.current;
      let aliveCount = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update properties
        p.x += p.vx * delta;
        p.y += p.vy * delta;
        p.vy += 0.3 * delta; // Gravity
        p.vx *= Math.pow(0.97, delta); // Air resistance
        p.life -= 0.025 * delta;
        p.size *= Math.pow(0.95, delta);

        // Keep alive particles
        if (p.life > 0 && p.size > 0.5) {
          if (aliveCount !== i) {
            particles[aliveCount] = p;
          }
          aliveCount++;
        }
      }

      // Trim dead particles
      particles.length = aliveCount;

      // Update state less frequently to reduce re-renders
      if (Math.random() < 0.3) {
        setParticles([...particles]);
      }

      if (particles.length > 0) {
        animationFrameRef.current = requestAnimationFrame(updateParticles);
      } else {
        animationFrameRef.current = null;
        setParticles([]);
      }
    };

    if (!animationFrameRef.current) {
      lastUpdate = Date.now();
      animationFrameRef.current = requestAnimationFrame(updateParticles);
    }
  };

  // Sound generation functions
  const playSwapSound = () => {
    if (!isSoundEnabled || !audioContextRef.current) return;

    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, context.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.2, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.1);
  };

  const playMatchSound = (matchCount: number, combo: number) => {
    if (!isSoundEnabled || !audioContextRef.current) return;

    const context = audioContextRef.current;
    const baseFreq = 523.25 + matchCount * 50 + combo * 30;

    for (let i = 0; i < Math.min(matchCount, 3); i++) {
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      oscillator.type = 'sine';
      oscillator.frequency.value = baseFreq + i * 100;

      const startTime = context.currentTime + i * 0.05;
      gainNode.gain.setValueAtTime(0.3, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.2);
    }
  };

  const playComboSound = (combo: number) => {
    if (!isSoundEnabled || !audioContextRef.current || combo <= 1) return;

    const context = audioContextRef.current;
    const frequencies = [659.25, 783.99, 1046.5];

    frequencies.forEach((freq, index) => {
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      oscillator.type = 'sine';
      oscillator.frequency.value = freq;

      const startTime = context.currentTime + index * 0.08;
      gainNode.gain.setValueAtTime(0.25, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.2);
    });
  };

  const playGameOverSound = () => {
    if (!isSoundEnabled || !audioContextRef.current) return;

    const context = audioContextRef.current;
    const frequencies = [400, 350, 300];

    frequencies.forEach((freq, index) => {
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      oscillator.type = 'sawtooth';
      oscillator.frequency.value = freq;

      const startTime = context.currentTime + index * 0.15;
      gainNode.gain.setValueAtTime(0.2, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.3);
    });
  };

  // Create initial board
  const createBoard = (): Cell[][] => {
    const newBoard: Cell[][] = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      newBoard[row] = [];
      for (let col = 0; col < GRID_SIZE; col++) {
        newBoard[row][col] = {
          type: Math.floor(Math.random() * COLORS.length),
          row,
          col,
          id: `${row}-${col}-${Date.now()}-${Math.random()}`,
          matched: false,
        };
      }
    }
    return newBoard;
  };

  // Check for matches
  const findMatches = (board: Cell[][]): Cell[][] => {
    const matches: Cell[][] = [];

    // Check horizontal matches
    for (let row = 0; row < GRID_SIZE; row++) {
      let matchLength = 1;
      for (let col = 0; col < GRID_SIZE; col++) {
        if (col < GRID_SIZE - 1 && board[row][col].type === board[row][col + 1].type) {
          matchLength++;
        } else {
          if (matchLength >= 3) {
            const matchedCells: Cell[] = [];
            for (let i = col - matchLength + 1; i <= col; i++) {
              matchedCells.push(board[row][i]);
            }
            matches.push(matchedCells);
          }
          matchLength = 1;
        }
      }
    }

    // Check vertical matches
    for (let col = 0; col < GRID_SIZE; col++) {
      let matchLength = 1;
      for (let row = 0; row < GRID_SIZE; row++) {
        if (row < GRID_SIZE - 1 && board[row][col].type === board[row + 1][col].type) {
          matchLength++;
        } else {
          if (matchLength >= 3) {
            const matchedCells: Cell[] = [];
            for (let i = row - matchLength + 1; i <= row; i++) {
              matchedCells.push(board[i][col]);
            }
            matches.push(matchedCells);
          }
          matchLength = 1;
        }
      }
    }

    return matches;
  };

  // Remove matched cells and drop down
  const processMatches = async () => {
    setIsAnimating(true);
    let currentBoard = [...boardRef.current.map(row => [...row])];
    let hasMatches = true;
    let currentCombo = 0;

    while (hasMatches) {
      const matches = findMatches(currentBoard);

      if (matches.length === 0) {
        hasMatches = false;
        break;
      }

      currentCombo++;
      comboRef.current = currentCombo;
      setCombo(currentCombo);

      // Mark matched cells and create explosions
      const matchedCells = new Set<string>();
      matches.forEach(match => {
        match.forEach(cell => {
          matchedCells.add(`${cell.row}-${cell.col}`);
          // Create explosion for each matched cell
          createExplosion(cell.row, cell.col, COLORS[cell.type], matches.length);
        });
      });

      // Calculate score
      const matchCount = matchedCells.size;
      const points = matchCount * 10 * currentCombo;
      scoreRef.current += points;
      setScore(scoreRef.current);

      playMatchSound(matchCount, currentCombo);
      if (currentCombo > 1) {
        playComboSound(currentCombo);
      }

      // Update best score
      if (scoreRef.current > bestScore) {
        setBestScore(scoreRef.current);
        localStorage.setItem('match3-bestscore', scoreRef.current.toString());
      }

      // Remove matched cells
      currentBoard = currentBoard.map(row =>
        row.map(cell =>
          matchedCells.has(`${cell.row}-${cell.col}`)
            ? { ...cell, matched: true }
            : cell
        )
      );

      await new Promise(resolve => setTimeout(resolve, 300));

      // Drop cells down
      for (let col = 0; col < GRID_SIZE; col++) {
        let emptyRow = GRID_SIZE - 1;
        for (let row = GRID_SIZE - 1; row >= 0; row--) {
          if (!currentBoard[row][col].matched) {
            if (row !== emptyRow) {
              currentBoard[emptyRow][col] = {
                ...currentBoard[row][col],
                row: emptyRow,
                id: `${emptyRow}-${col}-${Date.now()}-${Math.random()}`,
              };
            }
            emptyRow--;
          }
        }

        // Fill empty spaces with new cells
        for (let row = emptyRow; row >= 0; row--) {
          currentBoard[row][col] = {
            type: Math.floor(Math.random() * COLORS.length),
            row,
            col,
            id: `${row}-${col}-${Date.now()}-${Math.random()}`,
            matched: false,
          };
        }
      }

      boardRef.current = currentBoard;
      setBoard([...currentBoard]);

      await new Promise(resolve => setTimeout(resolve, 200));
    }

    if (currentCombo === 0) {
      comboRef.current = 0;
      setCombo(0);
    }

    setIsAnimating(false);
  };

  // Swap cells
  const swapCells = async (row1: number, col1: number, row2: number, col2: number) => {
    if (isAnimating) return;

    const newBoard = boardRef.current.map(row => [...row]);
    const temp = newBoard[row1][col1];
    newBoard[row1][col1] = { ...newBoard[row2][col2], row: row1, col: col1 };
    newBoard[row2][col2] = { ...temp, row: row2, col: col2 };

    boardRef.current = newBoard;
    setBoard([...newBoard]);
    playSwapSound();

    await new Promise(resolve => setTimeout(resolve, 200));

    const matches = findMatches(newBoard);

    if (matches.length > 0) {
      setMoves(prev => prev - 1);
      await processMatches();

      if (moves - 1 <= 0) {
        setGameOver(true);
        setIsPlaying(false);
        playGameOverSound();
      }
    } else {
      // Swap back if no match
      const revertBoard = newBoard.map(row => [...row]);
      const temp2 = revertBoard[row1][col1];
      revertBoard[row1][col1] = { ...revertBoard[row2][col2], row: row1, col: col1 };
      revertBoard[row2][col2] = { ...temp2, row: row2, col: col2 };

      boardRef.current = revertBoard;
      setBoard([...revertBoard]);
    }

    setSelectedCell(null);
  };

  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    if (!isPlaying || gameOver || isAnimating) return;

    if (!selectedCell) {
      setSelectedCell({ row, col });
    } else {
      const rowDiff = Math.abs(selectedCell.row - row);
      const colDiff = Math.abs(selectedCell.col - col);

      if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
        swapCells(selectedCell.row, selectedCell.col, row, col);
      } else {
        setSelectedCell({ row, col });
      }
    }
  };

  // Start new game
  const startGame = () => {
    let newBoard = createBoard();

    // Ensure no initial matches
    while (findMatches(newBoard).length > 0) {
      newBoard = createBoard();
    }

    boardRef.current = newBoard;
    setBoard(newBoard);
    scoreRef.current = 0;
    setScore(0);
    comboRef.current = 0;
    setCombo(0);
    setMoves(30);
    setGameOver(false);
    setIsPlaying(true);
    setSelectedCell(null);
    setIsAnimating(false);

    // Clear particles on new game
    particlesRef.current = [];
    setParticles([]);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  return (
    <div className="match-3">
      <div className="match-3__header">
        <Title level={2}>Match 3</Title>
        <div className="match-3__stats">
          <div className="match-3__stat">
            <Text strong>Score:</Text>
            <Text className="match-3__stat-value">{score}</Text>
          </div>
          <div className="match-3__stat">
            <Text strong>Best:</Text>
            <Text className="match-3__stat-value match-3__stat-value--best">{bestScore}</Text>
          </div>
          <div className="match-3__stat">
            <Text strong>Moves:</Text>
            <Text className="match-3__stat-value match-3__stat-value--moves">{moves}</Text>
          </div>
          {combo > 1 && (
            <div className="match-3__stat match-3__stat--combo">
              <Text strong>Combo:</Text>
              <Text className="match-3__stat-value match-3__stat-value--combo">
                {combo}x 🔥
              </Text>
            </div>
          )}
        </div>
      </div>

      <div className="match-3__content">
        <div className="match-3__board-container">
          <div
            className="match-3__board"
            style={{
              width: GRID_SIZE * (CELL_SIZE + 4) + 20,
              height: GRID_SIZE * (CELL_SIZE + 4) + 20,
            }}
          >
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={cell.id}
                  className={`match-3__cell ${
                    selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                      ? 'match-3__cell--selected'
                      : ''
                  } ${cell.matched ? 'match-3__cell--matched' : ''}`}
                  style={{
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    top: rowIndex * (CELL_SIZE + 4) + 10,
                    left: colIndex * (CELL_SIZE + 4) + 10,
                    backgroundColor: COLORS[cell.type],
                    transition: 'all 0.2s ease-out',
                  }}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  <span className="match-3__emoji">{EMOJI[cell.type]}</span>
                </div>
              ))
            )}

            {/* Particles */}
            {particles.map(particle => (
              <div
                key={particle.id}
                className="match-3__particle"
                style={{
                  left: particle.x,
                  top: particle.y,
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                  opacity: particle.life,
                  boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="match-3__controls">
          <Space direction="vertical" size="large">
            {!isPlaying && (
              <Button type="primary" size="large" onClick={startGame}>
                New Game
              </Button>
            )}
            {isPlaying && (
              <Button type="primary" size="large" onClick={startGame}>
                Restart
              </Button>
            )}
            <Button
              size="large"
              onClick={() => setIsSoundEnabled(!isSoundEnabled)}
            >
              {isSoundEnabled ? '🔊 Sound On' : '🔇 Sound Off'}
            </Button>
            <div className="match-3__instructions">
              <Title level={5}>How to Play:</Title>
              <Text>Click two adjacent tiles to swap them.</Text>
              <Text>Match 3 or more same tiles to score!</Text>
              <Text>Create combos for bonus points!</Text>
              <br />
              <Title level={5}>Scoring:</Title>
              <Text>3 tiles = 30 points</Text>
              <Text>4 tiles = 40 points</Text>
              <Text>5 tiles = 50 points</Text>
              <Text>Combo multiplier!</Text>
            </div>
          </Space>
        </div>
      </div>

      {gameOver && (
        <div className="match-3__overlay">
          <div className="match-3__message">
            <Title level={2}>Game Over!</Title>
            <Text>Final Score: {score}</Text>
            <Text>Moves Used: {30}</Text>
            {score === bestScore && score > 0 && (
              <Text className="match-3__new-record">🎉 New Best Score! 🎉</Text>
            )}
            <Button type="primary" size="large" onClick={startGame} style={{ marginTop: 20 }}>
              Play Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Match3;
