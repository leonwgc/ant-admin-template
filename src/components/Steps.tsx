import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';
import { SuccessCircleOutlined } from '@derbysoft/neat-design-icons';
import { Space } from '@derbysoft/neat-design';
import './Steps.scss';

interface StepProps {
  icon?: React.ReactNode;
  title?: string;
}

const baseClassName = 'ds-steps-nav';

const getElementClassName = (name) => baseClassName + '__' + name;

const CircleWithNumber = ({ number }) => {
  return (
    <div
      className="circle-with-number"
      style={{
        width: 32,
        height: 32,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        fontSize: 16,
      }}
    >
      {number}
    </div>
  );
};

type Props = {
  steps: StepProps[];
  currentStep: number;
} & HTMLAttributes<HTMLDivElement>;

/**
 * A React functional component that renders a step-by-step progress indicator.
 *
 * @component
 * @param {Props} props - The props for the Steps component.
 * @param {Array<{ icon?: React.ReactNode; title: string }>} props.steps - An array of step objects, each containing an optional `icon` and a `title`.
 * @param {number} props.currentStep - The index of the current step in the progress indicator.
 * @param {React.HTMLAttributes<HTMLDivElement>} [props.rest] - Additional props to be passed to the root div element.
 *
 * @returns {JSX.Element} A JSX element representing the steps component.
 *
 * @example
 * ```tsx
 * const steps = [
 *   { title: 'Step 1' },
 *   { title: 'Step 2' },
 *   { title: 'Step 3' },
 * ];
 *
 * <Steps steps={steps} currentStep={1} />
 * ```
 */
const Steps: React.FC<Props> = ({ steps, currentStep, ...rest }) => {
  return (
    <div className={baseClassName} {...rest}>
      {steps.map((step, index) => (
        <div
          key={index}
          className={classNames(getElementClassName('item'), {
            current: index === currentStep,
            done: index < currentStep,
            wait: index > currentStep,
          })}
        >
          <Space size={16} style={{ marginLeft: index === 0 ? 24 : 48 }}>
            {step.icon ? (
              step.icon
            ) : index < currentStep ? (
              <SuccessCircleOutlined
                style={{ color: 'rgba(42, 189, 19, 1)', fontSize: 32 }}
              />
            ) : (
              <CircleWithNumber number={index + 1} />
            )}
            <span>{step.title}</span>
          </Space>

          {index < steps.length - 1 && <div className="arrow" />}
        </div>
      ))}
    </div>
  );
};

export default Steps;
