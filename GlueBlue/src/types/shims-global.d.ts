// Ambient module declarations to allow TypeScript checks to run in this dev environment
declare module 'react' {
  const React: any;
  export = React;
}

declare module 'react-native' {
  const RN: any;
  export = RN;
}

declare module 'react-redux' {
  const R: any;
  export = R;
}

declare module 'axios' {
  const axios: any;
  export default axios;
}

declare module 'lucide-react-native' {
  const Lucide: any;
  export const Icon: any;
  export default Lucide;
}

declare module '@react-navigation/bottom-tabs' { const x: any; export = x; }
declare module '@react-navigation/native-stack' { const x: any; export = x; }
declare module '@react-navigation/native' { const x: any; export = x; }
declare module 'react-native-webview' { const x: any; export const WebView: any; export default x; }
declare module 'react-native-chart-kit' { const x: any; export = x; }
declare module '@reduxjs/toolkit' { const x: any; export = x; }

// Allow importing JSON and other assets without type errors
declare module '*.png';
declare module '*.jpg';
declare module '*.svg';

export {};
