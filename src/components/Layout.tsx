import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-white p-4 shadow-custom rounded-lg">{children}</div>
  );
}
