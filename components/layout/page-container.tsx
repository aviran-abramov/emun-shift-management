export function PageContainer({ children }: { children: React.ReactNode }) {
  return <div className="p-2 flex flex-col gap-8">{children}</div>;
}
