'use client';

import React, { useMemo } from 'react';
import katex from 'katex';
import { formatMathEquation } from '../data/dysonClusterData';

interface MathEquationProps {
  equation: string;
  className?: string;
  displayMode?: boolean;
  color?: string;
}

export function MathEquation({
  equation,
  className = '',
  displayMode = false,
  color,
}: MathEquationProps) {
  const html = useMemo(() => {
    if (!equation) return '';
    try {
      let sanitized = equation.trim();

      // Wrap unescaped parenthetical notes after \quad in \text{(...)} if needed
      if (/\\quad\s*\([A-Za-z0-9\s—–,-]+\)/.test(sanitized)) {
        sanitized = sanitized.replace(/\\quad\s*\(([^)]+)\)/g, '\\quad \\text{($1)}');
      }

      // Attempt KaTeX render with throwOnError: true so it cleanly fails to fallback instead of dumping raw red error tokens
      const rendered = katex.renderToString(sanitized, {
        throwOnError: false,
        displayMode: displayMode,
      });

      // If KaTeX produced an error span, reject it and use clean Unicode fallback
      if (rendered.includes('class="katex-error"')) {
        return '';
      }

      return rendered;
    } catch {
      return '';
    }
  }, [equation, displayMode]);

  // If KaTeX rendered cleanly, render the math typography
  if (html) {
    return (
      <span
        className={`math-equation inline-block select-text overflow-x-auto max-w-full align-middle ${className}`}
        style={color ? { color } : undefined}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  // Graceful fallback to pristine Unicode formatted equation (never raw LaTeX)
  return (
    <span 
      className={`font-mono text-xs select-text tracking-wide ${className}`}
      style={color ? { color } : undefined}
    >
      {formatMathEquation(equation)}
    </span>
  );
}
