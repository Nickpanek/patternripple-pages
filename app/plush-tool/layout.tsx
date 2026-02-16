import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plush Pattern Generator - PatternRipple',
  description: 'Convert 3D meshes into sewable plush toy patterns',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PlushToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
