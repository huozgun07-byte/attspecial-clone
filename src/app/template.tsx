/**
 * Re-mounts on every route change (unlike layout.tsx), which is what makes the
 * page-in animation replay on client-side navigation.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
