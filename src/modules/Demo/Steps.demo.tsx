import React, { useState } from 'react';
import Steps from '~/components/Steps';
import { SuccessCircleFilled } from '@derbysoft/neat-design-icons';
import { Button } from '@derbysoft/neat-design';

const steps = [
  { title: 'Company Info' },
  { title: 'Confirm Subscribe' },
  { title: 'Payment' },
  {
    title: 'Finished',
    icon: (
      <SuccessCircleFilled
        style={{ color: 'rgba(209, 213, 214, 1)', fontSize: 32 }}
      />
    ),
  },
];

const StepsDemo: React.FC = () => {
  const [step, setStep] = useState(0);
  return (
    <div>
      <h1>Steps</h1>
      <div>
        <Steps steps={steps} currentStep={step} style={{ margin: '48px 0' }} />

        <Button
          type="primary"
          onClick={() => setStep((s) => (s + 1 < steps.length ? s + 1 : 0))}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default StepsDemo;
