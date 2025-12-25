
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { EthosForm } from './components/Form/Form';
import { Field } from './components/Form/Field';
import { Input, TextArea, Select, Switch } from './components/Form/Inputs';
import { Button } from './components/General/Button';
import { Alert } from './components/Feedback/Alert';
import { Progress } from './components/Feedback/Progress';
import { Accordion, AccordionItem } from './components/Disclosure/Accordion';
import { EnvironmentSwitcher } from './components/Theme/EnvironmentSwitcher';
import { FormValues } from './types';

const AppContent: React.FC = () => {
  const [submitted, setSubmitted] = useState<FormValues | null>(null);
  const [demoProgress, setDemoProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDemoProgress(prev => (prev < 100 ? prev + 0.5 : 0));
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (values: FormValues) => {
    setSubmitted(values);
  };

  return (
    <div className="min-h-screen py-20 px-6 md:px-0 bg-[var(--ethos-bg)] text-[var(--ethos-text)] ethos-transition">
      <div className="max-w-4xl mx-auto space-y-32">
        
        {/* Header Section */}
        <header className="space-y-6 text-center">
          <h1 className="text-7xl md:text-9xl font-serif tracking-tighter animate-in fade-in slide-in-from-top-12 duration-1000">
            Ethos <span className="italic opacity-50 text-[var(--ethos-primary)]">UI</span>
          </h1>
          <p className="text-xl md:text-2xl text-[var(--ethos-muted)] font-medium max-w-xl mx-auto leading-relaxed italic">
            "Interfaces that respect the space between actions."
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button intent="action">Explore Components</Button>
            <Button intent="quiet">Read Philosophy</Button>
          </div>
        </header>

        {/* New Components Showcase */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-sm uppercase tracking-[0.2em] text-[var(--ethos-primary)] font-bold">Feedback Systems</h2>
              <Alert title="Intentional Communication" intent="success">
                Success messages in Ethos aren't noisy. They use the environmental theme to gently signal completion.
              </Alert>
              <Alert title="Supportive Guidance" intent="warning">
                Warnings serve as proactive hints to help you stay on track without punishment.
              </Alert>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-sm uppercase tracking-[0.2em] text-[var(--ethos-primary)] font-bold">Motion as Meaning</h2>
              <Progress value={demoProgress} label="Environmental Synchronicity" />
              <p className="text-xs text-[var(--ethos-muted)] leading-relaxed">
                Notice how the progress bar responds with the theme's specific motion duration. It's built into the core tokens.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-sm uppercase tracking-[0.2em] text-[var(--ethos-primary)] font-bold">Disclosure Patterns</h2>
            <Accordion>
              <AccordionItem title="Clarity over Decoration">
                We strip away borders and shadows to let content breathe. Every pixel must earn its right to exist.
              </AccordionItem>
              <AccordionItem title="Human-Centric API" defaultOpen>
                Developers deserve a system that feels natural to write. Components are composable by default, reducing documentation fatigue.
              </AccordionItem>
              <AccordionItem title="Semantic Theming">
                Themes aren't just colors. They are moods. Switching to "Energy" changes not just the palette, but the intensity of every transition.
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Conversational Form Section */}
        <section id="form-demo" className="relative">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-center">
             <h2 className="text-sm uppercase tracking-[0.4em] text-[var(--ethos-muted)] opacity-40 font-bold">The Conversational Form</h2>
          </div>
          
          <div className="bg-[var(--ethos-glass-bg)] p-8 md:p-20 rounded-[var(--ethos-border-radius)] border border-[var(--ethos-muted)] border-opacity-10 shadow-[var(--ethos-shadow)] glass-effect ethos-transition">
            {!submitted ? (
              <EthosForm onSubmit={handleSubmit}>
                <div className="space-y-20">
                  <Field name="name" label="What should we call you?">
                    <Input placeholder="E.g. Julian Aubrey" />
                  </Field>

                  <Field name="discovery" label="How did you find us?">
                    <Select options={[
                      { label: 'Word of mouth', value: 'referral' },
                      { label: 'Design community', value: 'community' },
                      { label: 'Pure chance', value: 'random' }
                    ]} />
                  </Field>

                  <Field name="thought" label="What is your design philosophy?">
                    <TextArea placeholder="Tell us about your approach to interfaces..." />
                  </Field>

                  <div className="flex flex-col gap-6">
                     <Switch name="newsletter" label="Stay connected with quiet notifications" />
                  </div>

                  <div className="flex justify-between items-center pt-8">
                    <Button type="submit">Submit Vision</Button>
                    <p className="text-[10px] uppercase tracking-widest text-[var(--ethos-muted)]">
                      ESC to clear form
                    </p>
                  </div>
                </div>
              </EthosForm>
            ) : (
              <div className="text-center space-y-12 animate-in zoom-in duration-700">
                <div className="text-6xl font-serif italic text-[var(--ethos-primary)] tracking-tight">Onward, {submitted.name.split(' ')[0]}.</div>
                <div className="max-w-md mx-auto space-y-4">
                  <Alert title="Submission Received" intent="success">
                    Your design vision has been integrated into our shared ethos.
                  </Alert>
                </div>
                <Button intent="quiet" onClick={() => setSubmitted(null)}>
                  Return to Beginning
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Philosophical Footer */}
        <footer className="pt-32 pb-12 border-t border-[var(--ethos-muted)] border-opacity-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-2 space-y-6">
              <h3 className="text-3xl font-serif italic">Ethos UI</h3>
              <p className="text-[var(--ethos-muted)] leading-relaxed max-w-sm">
                A toolkit for those who believe that the best interface is the one that disappears when you're done thinking.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--ethos-primary)]">Principles</h4>
              <ul className="text-sm space-y-2 text-[var(--ethos-muted)]">
                <li>Intent-Aware</li>
                <li>Calm Interaction</li>
                <li>Semantic Motion</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--ethos-primary)]">Community</h4>
              <ul className="text-sm space-y-2 text-[var(--ethos-muted)]">
                <li>Github</li>
                <li>Philosophy Journal</li>
                <li>Environment Tokens</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>

      <EnvironmentSwitcher />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
