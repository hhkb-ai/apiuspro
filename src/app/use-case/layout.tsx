import type { Metadata } from 'next';
import { generateMetadata as generateTdkMetadata } from '@/lib/tdk';

export const metadata: Metadata = generateTdkMetadata('/use-case');

export default function UseCaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
