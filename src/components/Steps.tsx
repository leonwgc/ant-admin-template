import React from 'react';
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

const Steps: React.FC<{ steps: StepProps[]; currentStep: number }> = ({
  steps,
  currentStep,
  ...rest
}) => {
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
