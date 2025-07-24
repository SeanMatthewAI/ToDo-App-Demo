/// <reference types="vite/client" /> 
declare global {
  namespace JSX {
    interface IntrinsicElements {
      style: React.DetailedHTMLProps<React.StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement> & {
        jsx?: boolean;
        global?: boolean;
      };
    }
  }
} 