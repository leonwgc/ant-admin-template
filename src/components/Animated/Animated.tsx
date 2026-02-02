/**
 * @file components/Animated/Animated.tsx
 * @author leon.wang
 */
import React, { FC, ReactNode, useState, useEffect, useRef } from 'react';
import { useInViewport } from 'ahooks';

import './Animated.scss';

export type AnimationType =
  | 'fade'
  | 'fadeUp'
  | 'fadeDown'
  | 'fadeLeft'
  | 'fadeRight'
  | 'slideUp'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'scale'
  | 'scaleUp'
  | 'scaleDown'
  | 'rotate'
  | 'bounce'
  | 'flip'
  | 'zoom';

export type TriggerType = 'onLoad' | 'onHover' | 'onVisible' | 'onClick' | 'manual';

export interface AnimatedProps {
  /** Child elements to be animated */
  children: ReactNode;
  /** Animation type */
  type?: AnimationType;
  /** Animation trigger timing */
  trigger?: TriggerType;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Animation delay in milliseconds */
  delay?: number;
  /** Animation timing function */
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
  /** Whether to repeat animation */
  repeat?: boolean;
  /** Repeat count, infinite if repeat is true and count is not set */
  repeatCount?: number;
  /** Custom class name */
  className?: string;
  /** Whether to play animation initially (for manual trigger) */
  play?: boolean;
  /** Callback when animation ends */
  onAnimationEnd?: () => void;
  /** Callback when animation starts */
  onAnimationStart?: () => void;
}

/**
 * Animated component
 * Provides common animation effects for child components with configurable trigger timing
 * Supports animations on load, hover, viewport visibility, click, or manual control
 */
export const Animated: FC<AnimatedProps> = ({
  children,
  type = 'fade',
  trigger = 'onLoad',
  duration = 600,
  delay = 0,
  easing = 'ease-out',
  repeat = false,
  repeatCount,
  className = '',
  play = false,
  onAnimationEnd,
  onAnimationStart,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationCount, setAnimationCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inViewport] = useInViewport(containerRef);

  // Handle onLoad trigger
  useEffect(() => {
    if (trigger === 'onLoad') {
      const timer = setTimeout(() => {
        setIsAnimating(true);
        onAnimationStart?.();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [trigger, delay, onAnimationStart]);

  // Handle onVisible trigger
  useEffect(() => {
    if (trigger === 'onVisible' && inViewport && !isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
        onAnimationStart?.();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [trigger, inViewport, delay, isAnimating, onAnimationStart]);

  // Handle manual trigger
  useEffect(() => {
    if (trigger === 'manual' && play) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
        onAnimationStart?.();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [trigger, play, delay, onAnimationStart]);

  const handleMouseEnter = () => {
    if (trigger === 'onHover') {
      setIsAnimating(true);
      onAnimationStart?.();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'onHover' && !repeat) {
      setIsAnimating(false);
    }
  };

  const handleClick = () => {
    if (trigger === 'onClick') {
      setIsAnimating(true);
      onAnimationStart?.();
      setAnimationCount((prev) => prev + 1);
    }
  };

  const handleAnimationEnd = () => {
    onAnimationEnd?.();

    if (repeat) {
      if (repeatCount && animationCount >= repeatCount - 1) {
        setIsAnimating(false);
      } else {
        // Reset animation to replay
        setAnimationCount((prev) => prev + 1);
        setIsAnimating(false);
        setTimeout(() => {
          setIsAnimating(true);
        }, 50);
      }
    } else {
      if (trigger === 'onClick' || trigger === 'onHover') {
        setIsAnimating(false);
      }
    }
  };

  const animationClasses = [
    'animated',
    isAnimating && `animated--${type}`,
    isAnimating && 'animated--active',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style = {
    '--animation-duration': `${duration}ms`,
    '--animation-delay': `${delay}ms`,
    '--animation-timing': easing,
  } as React.CSSProperties;

  return (
    <div
      ref={containerRef}
      className={animationClasses}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>
  );
};
