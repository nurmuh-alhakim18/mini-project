import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EventEase',
  description: 'EventEase is a platform for finding and creating events.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
