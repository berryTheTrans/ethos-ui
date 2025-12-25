
import React from 'react';
import { useTheme } from '../ThemeProvider';
import { Environment } from '../../types';

export const EnvironmentSwitcher: React.FC = () => {
  const { env, setEnv } = useTheme();

  const envs = [
    { id: Environment.CALM, icon: '🌿' },
    { id: Environment.ENERGY, icon: '⚡' },
    { id: Environment.GLASS, icon: '💎' },
    { id: Environment.PAPER, icon: '📄' },
    { id: Environment.INK, icon: '🖋️' },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50 flex gap-2 p-2 bg-[var(--ethos-bg)] border border-[var(--ethos-muted)] border-opacity-20 rounded-[var(--ethos-border-radius)] shadow-2xl glass-effect ethos-transition">
      {envs.map((e) => (
        <button
          key={e.id}
          onClick={() => setEnv(e.id)}
          title={e.id}
          className={`
            w-10 h-10 flex items-center justify-center rounded-[calc(var(--ethos-border-radius)-4px)] 
            ethos-transition text-xl hover:scale-110
            ${env === e.id ? 'bg-[var(--ethos-primary)] text-white' : 'hover:bg-[var(--ethos-muted)] hover:bg-opacity-10'}
          `}
        >
          {e.icon}
        </button>
      ))}
    </div>
  );
};
