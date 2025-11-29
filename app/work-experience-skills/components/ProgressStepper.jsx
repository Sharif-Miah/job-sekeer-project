export default function ProgressStepper({ currentStep, totalSteps }) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  const stepLabels = [
    'Profile',
    'Experience',
    'Skills',
    'Education',
    'Certifications',
    'Recommendations',
  ];

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        {steps.map((step, index) => (
          <div
            key={step}
            className='flex items-center flex-1'>
            <div className='flex flex-col items-center flex-1'>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                  step < currentStep
                    ? 'bg-green-600 text-white'
                    : step === currentStep
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}>
                {step < currentStep ? '✓' : step}
              </div>
              <p className='text-xs text-muted-foreground mt-2 text-center'>
                {stepLabels[index]}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 flex-1 mx-2 ${
                  step < currentStep ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
