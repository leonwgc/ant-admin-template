import React, { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react';
import './VerificationCodeInput.scss';

export interface VerificationCodeInputProps {
  /**
   * 验证码长度
   */
  length?: number;
  /**
   * 输入完成回调
   */
  onComplete?: (code: string) => void;
  /**
   * 值变化回调
   */
  onChange?: (code: string) => void;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否自动聚焦
   */
  autoFocus?: boolean;
}

/**
 * 验证码输入组件
 * 支持单个字符输入、自动跳转、粘贴、删除等功能
 */
export const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
  length = 6,
  onComplete,
  onChange,
  className = '',
  disabled = false,
  autoFocus = true,
}) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0] && !disabled) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus, disabled]);

  const handleChange = (index: number, value: string) => {
    if (disabled) return;

    // 只允许输入数字
    const newValue = value.replace(/[^0-9]/g, '');

    if (newValue.length > 1) {
      // 处理粘贴多个字符的情况
      const chars = newValue.split('').slice(0, length - index);
      const newValues = [...values];
      chars.forEach((char, i) => {
        if (index + i < length) {
          newValues[index + i] = char;
        }
      });
      setValues(newValues);
      onChange?.(newValues.join(''));

      // 聚焦到最后一个输入的位置
      const nextIndex = Math.min(index + chars.length, length - 1);
      inputRefs.current[nextIndex]?.focus();

      // 检查是否完成
      if (newValues.every(v => v !== '')) {
        onComplete?.(newValues.join(''));
      }
      return;
    }

    const newValues = [...values];
    newValues[index] = newValue;
    setValues(newValues);
    onChange?.(newValues.join(''));

    // 如果输入了值，自动跳转到下一个输入框
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // 检查是否完成
    if (newValues.every(v => v !== '') && newValues[length - 1] !== '') {
      onComplete?.(newValues.join(''));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    // 按下 Backspace 键
    if (e.key === 'Backspace') {
      e.preventDefault();

      if (values[index]) {
        // 当前有值，清空当前值
        const newValues = [...values];
        newValues[index] = '';
        setValues(newValues);
        onChange?.(newValues.join(''));
      } else if (index > 0) {
        // 当前无值，跳转到前一个并清空
        const newValues = [...values];
        newValues[index - 1] = '';
        setValues(newValues);
        onChange?.(newValues.join(''));
        inputRefs.current[index - 1]?.focus();
      }
    }
    // 按下左箭头
    else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }
    // 按下右箭头
    else if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').replace(/[^0-9]/g, '');
    const chars = pastedData.split('').slice(0, length);

    const newValues = Array(length).fill('');
    chars.forEach((char, i) => {
      newValues[i] = char;
    });

    setValues(newValues);
    onChange?.(newValues.join(''));

    // 聚焦到最后一个输入的位置
    const nextIndex = Math.min(chars.length, length - 1);
    inputRefs.current[nextIndex]?.focus();

    // 检查是否完成
    if (newValues.every(v => v !== '')) {
      onComplete?.(newValues.join(''));
    }
  };

  const handleFocus = (index: number) => {
    // 聚焦时选中内容
    inputRefs.current[index]?.select();
  };

  return (
    <div className={`verification-code-input ${className}`}>
      {values.map((value, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => handleFocus(index)}
          disabled={disabled}
          className="verification-code-input__box"
        />
      ))}
    </div>
  );
};

export default VerificationCodeInput;
