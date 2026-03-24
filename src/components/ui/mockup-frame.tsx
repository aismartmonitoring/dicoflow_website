'use client';

import { ReactNode } from 'react';

interface MockupFrameProps {
  url?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

export function MockupFrame({ url = 'app.dicoflow.com', children, className = '', dark = true }: MockupFrameProps) {
  return (
    <div className={`mockup-browser ${className}`}>
      <div className="titlebar">
        <div className="dot dot-red" />
        <div className="dot dot-yellow" />
        <div className="dot dot-green" />
        <div className="url-bar">{url}</div>
      </div>
      <div className={dark ? 'bg-slate-900' : 'bg-white'}>
        {children}
      </div>
    </div>
  );
}
