'use client';

import dynamic from 'next/dynamic';

const Inspector = dynamic(
  () => import('react-dev-inspector').then(mod => ({ default: mod.Inspector })),
  { ssr: false },
);

export default function DevInspector() {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';
  return isDev ? <Inspector /> : null;
}
