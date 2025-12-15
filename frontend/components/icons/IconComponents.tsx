import React from 'react';

interface IconProps {
  className?: string;
}

const BaseIcon: React.FC<IconProps & { children: React.ReactNode }> = ({ className = "w-6 h-6", children }) => (
  <svg className={className} strokeWidth="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export const DashboardIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </BaseIcon>
);

export const DocumentIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </BaseIcon>
);

export const WrenchIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
  </BaseIcon>
);

export const BoxIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </BaseIcon>
);

export const TruckIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <rect x="1" y="3" width="15" height="13"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5"></circle>
    <circle cx="18.5" cy="18.5" r="2.5"></circle>
  </BaseIcon>
);

export const ImageIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </BaseIcon>
);

export const MenuIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </BaseIcon>
);

export const PlusIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </BaseIcon>
);

export const PencilIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </BaseIcon>
);

export const AnalyticsIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </BaseIcon>
);

export const TrendingUpIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </BaseIcon>
);

export const CapacityIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
    <path d="M12 22V12"></path>
    <path d="M12 12V2"></path>
    <path d="M19 9l3-3"></path>
    <path d="M5 9l-3-3"></path>
  </BaseIcon>
);

export const BookOpenIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </BaseIcon>
);

export const DownloadIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </BaseIcon>
);

export const SunIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
  </BaseIcon>
);

export const MoonIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
  </BaseIcon>
);

export const UserIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
  </BaseIcon>
);

export const LockIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
  </BaseIcon>
);

export const TreeIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M12 19V6M5 19h14M12 6l-6 6m6-6l6 6M12 3v3" />
  </BaseIcon>
);

export const FlameIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M12 2c0 5-4 6-4 11a4 4 0 0 0 8 0c0-5-4-6-4-11z" />
  </BaseIcon>
);

export const LayersIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
    <polyline points="2 17 12 22 17"></polyline>
    <polyline points="2 12 12 17 22 12"></polyline>
  </BaseIcon>
);

export const SawIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
     <circle cx="12" cy="12" r="10"></circle>
     <circle cx="12" cy="12" r="3"></circle>
     <path d="M12 2l2 2-2 2-2-2z" />
     <path d="M12 22v-4" />
     <path d="M12 6V2" />
     <path d="M22 12h-4" />
     <path d="M6 12H2" />
  </BaseIcon>
);

export const GlobeIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </BaseIcon>
);

export const CurrencyDollarIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </BaseIcon>
);
