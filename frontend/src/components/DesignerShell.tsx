import React, { ReactNode } from 'react';

/**
 * Wrapper that scopes the redesign UI to the `.vi-app-shell` class.
 * All designer styles (variables prefixed with `--vi-`) are applied only
 * inside this wrapper, preventing leaks into the Puck editor, intake,
 * builder, published sites, etc.
 */
export const DesignerShell: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="vi-app-shell">{children}</div>;
};

