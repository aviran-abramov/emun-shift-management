export function PageContainer({ children }: { children: React.ReactNode }) {
  return <div className="p-2 flex flex-col max-w-3xl">{children}</div>;
}
