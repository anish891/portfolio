/** A template re-mounts on every navigation, so the page content fades up each time. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in flex flex-1 flex-col">{children}</div>;
}
