import type { Metadata } from 'next';
import { generateMetadata as generateTdkMetadata } from '@/lib/tdk';

export const metadata: Metadata = generateTdkMetadata('/tutorial');

export default function TutorialLayout({ children }: { children: React.ReactNode }) {
  return children;
}
