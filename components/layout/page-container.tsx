export function PageContainer({children}: {children: React.ReactNode}) {
    return (
        <div className="p-6 flex flex-col items-start gap-8">{children}</div>
    );
}
