

import './components.css'

export const Section = ({ children }) => {
    return (

        <>

            <section className="section">
                {children}
            </section>

        </>
    );
}



export const ImgContainer = ({ children }) => {
    return (

        <>

            <div className="imagen-container">
                {children}
            </div>

        </>
    );
}




export const StepIndicators = ({ totalSteps, currentStep, onStepClick }) => {
    return (
      <div className="step-indicators">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <button
            key={index}
            type="button"
            className={`step-dot ${index === currentStep ? 'active' : ''}`}
            onClick={() => onStepClick(index)}
            aria-label={`Ir al paso ${index + 1}`}
            aria-current={index === currentStep ? 'true' : undefined}
          />
        ))}
      </div>
    );
  };
