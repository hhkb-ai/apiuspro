import type { Metadata } from 'next';
import { generateMetadata as generateTdkMetadata } from '@/lib/tdk';

export const metadata: Metadata = generateTdkMetadata('/cloud-api');

export default function CloudApiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
