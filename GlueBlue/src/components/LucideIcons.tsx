import React from 'react';
import { LucideIcon } from 'lucide-react';

const LucideIcons = {
  // Define your icons here
  Home: (props) => <LucideIcon name="home" {...props} />,
  Message: (props) => <LucideIcon name="message-circle" {...props} />,
  Notifications: (props) => <LucideIcon name="bell" {...props} />,
  Wallet: (props) => <LucideIcon name="credit-card" {...props} />,
  Settings: (props) => <LucideIcon name="settings" {...props} />,
  // Add more icons as needed
};

export default LucideIcons;