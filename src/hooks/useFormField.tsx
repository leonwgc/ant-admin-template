/**
 * @file src/hooks/useFormField.tsx
 * @author leon.wang
 */

import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Validation rule type - can be synchronous or asynchronous
 */
export type ValidationRule<T = string> = (
  value: T
) => string | null | undefined | Promise<string | null | undefined>;

/**
 * Field state interface
 */
export interface FieldState<T = string> {
  /** Current value of the field */
  value: T;
  /** Whether the field has been touched (focused and blurred) */
  touched: boolean;
  /** Whether the field value has been modified from its initial value */
  dirty: boolean;
  /** Whether the field value has not been modified from its initial value */
  pristine: boolean;
  /** Whether the field is currently valid */
  valid: boolean;
  /** Whether the field is currently invalid */
  invalid: boolean;
  /** Current validation error message, if any */
  error: string | null;
  /** Whether the field is currently being validated (for async validation) */
  validating: boolean;
  /** Whether the field has been visited (focused at least once) */
  visited: boolean;
}

/**
 * Field actions interface
 */
export interface FieldActions<T = string> {
  /** Handler for value change events */
  onChange: (value: T) => void;
  /** Handler for blur events */
  onBlur: () => void;
  /** Handler for focus events */
  onFocus: () => void;
  /** Manually set the field value */
  setValue: (value: T) => void;
  /** Reset the field to its initial state */
  reset: () => void;
  /** Manually trigger validation */
  validate: () => Promise<boolean>;
  /** Set error message manually */
  setError: (error: string | null) => void;
  /** Mark field as touched */
  setTouched: (touched: boolean) => void;
}

/**
 * Options for useFormField hook
 */
export interface UseFormFieldOptions<T = string> {
  /** Initial value of the field */
  initialValue?: T;
  /** Array of validation rules to apply */
  rules?: ValidationRule<T>[];
  /** Whether to validate on change (default: true) */
  validateOnChange?: boolean;
  /** Whether to validate on blur (default: true) */
  validateOnBlur?: boolean;
  /** Debounce delay for validation in milliseconds (default: 0) */
  validateDebounce?: number;
  /** Callback fired when value changes */
  onValueChange?: (value: T) => void;
  /** Callback fired when validation status changes */
  onValidationChange?: (valid: boolean, error: string | null) => void;
}

/**
 * A comprehensive form field validation hook that manages field state and validation
 *
 * Features:
 * - Tracks multiple field states: touched, dirty, pristine, valid, invalid, visited
 * - Supports both synchronous and asynchronous validation rules
 * - Configurable validation timing (onChange, onBlur)
 * - Debounced validation support
 * - Manual validation trigger
 * - Field reset functionality
 * - Error message management
 *
 * @example
 * ```tsx
 * const emailField = useFormField({
 *   initialValue: '',
 *   rules: [
 *     (value) => !value ? 'Email is required' : null,
 *     (value) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email format' : null,
 *   ],
 *   validateOnChange: true,
 *   validateOnBlur: true,
 * });
 *
 * <Input
 *   value={emailField.value}
 *   onChange={(e) => emailField.onChange(e.target.value)}
 *   onBlur={emailField.onBlur}
 *   status={emailField.touched && emailField.invalid ? 'error' : undefined}
 * />
 * {emailField.touched && emailField.error && (
 *   <div className="error">{emailField.error}</div>
 * )}
 * ```
 */
export function useFormField<T = string>(
  options: UseFormFieldOptions<T> = {}
): FieldState<T> & FieldActions<T> {
  const {
    initialValue = '' as T,
    rules = [],
    validateOnChange = true,
    validateOnBlur = true,
    validateDebounce = 0,
    onValueChange,
    onValidationChange,
  } = options;

  const [value, setValue] = useState<T>(initialValue);
  const [touched, setTouched] = useState(false);
  const [visited, setVisited] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validating, setValidating] = useState(false);

  const initialValueRef = useRef(initialValue);
  const validateTimeoutRef = useRef<NodeJS.Timeout>();
  const validationCounterRef = useRef(0);

  // Calculate derived states
  const dirty = value !== initialValueRef.current;
  const pristine = !dirty;
  const invalid = error !== null;
  const valid = !invalid && !validating;

  /**
   * Run validation rules against the current value
   */
  const runValidation = useCallback(
    async (valueToValidate: T): Promise<string | null> => {
      if (rules.length === 0) {
        return null;
      }

      const currentValidation = ++validationCounterRef.current;
      setValidating(true);

      try {
        for (const rule of rules) {
          const result = await Promise.resolve(rule(valueToValidate));

          // Check if this is still the latest validation
          if (currentValidation !== validationCounterRef.current) {
            return null; // Discard outdated validation
          }

          if (result) {
            setValidating(false);
            return result;
          }
        }
        setValidating(false);
        return null;
      } catch {
        setValidating(false);
        return 'Validation error occurred';
      }
    },
    [rules]
  );

  /**
   * Trigger validation with optional debounce
   */
  const triggerValidation = useCallback(
    async (valueToValidate: T, immediate = false) => {
      if (validateTimeoutRef.current) {
        clearTimeout(validateTimeoutRef.current);
      }

      const validate = async () => {
        const validationError = await runValidation(valueToValidate);
        setError(validationError);

        if (onValidationChange) {
          onValidationChange(validationError === null, validationError);
        }
      };

      if (immediate || validateDebounce === 0) {
        await validate();
      } else {
        validateTimeoutRef.current = setTimeout(validate, validateDebounce);
      }
    },
    [runValidation, validateDebounce, onValidationChange]
  );

  /**
   * Handle value change
   */
  const handleChange = useCallback(
    (newValue: T) => {
      setValue(newValue);

      if (onValueChange) {
        onValueChange(newValue);
      }

      if (validateOnChange) {
        triggerValidation(newValue);
      }
    },
    [validateOnChange, triggerValidation, onValueChange]
  );

  /**
   * Handle blur event
   */
  const handleBlur = useCallback(() => {
    setTouched(true);

    if (validateOnBlur) {
      triggerValidation(value, true); // Immediate validation on blur
    }
  }, [value, validateOnBlur, triggerValidation]);

  /**
   * Handle focus event
   */
  const handleFocus = useCallback(() => {
    setVisited(true);
  }, []);

  /**
   * Manually trigger validation
   */
  const validate = useCallback(async (): Promise<boolean> => {
    const validationError = await runValidation(value);
    setError(validationError);
    setTouched(true);

    if (onValidationChange) {
      onValidationChange(validationError === null, validationError);
    }

    return validationError === null;
  }, [value, runValidation, onValidationChange]);

  /**
   * Reset field to initial state
   */
  const reset = useCallback(() => {
    setValue(initialValue);
    setTouched(false);
    setVisited(false);
    setError(null);
    setValidating(false);
    initialValueRef.current = initialValue;

    if (validateTimeoutRef.current) {
      clearTimeout(validateTimeoutRef.current);
    }
  }, [initialValue]);

  /**
   * Manually set value
   */
  const handleSetValue = useCallback(
    (newValue: T) => {
      setValue(newValue);

      if (onValueChange) {
        onValueChange(newValue);
      }
    },
    [onValueChange]
  );

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (validateTimeoutRef.current) {
        clearTimeout(validateTimeoutRef.current);
      }
    };
  }, []);

  return {
    // State
    value,
    touched,
    dirty,
    pristine,
    valid,
    invalid,
    error,
    validating,
    visited,
    // Actions
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: handleFocus,
    setValue: handleSetValue,
    reset,
    validate,
    setError,
    setTouched,
  };
}
