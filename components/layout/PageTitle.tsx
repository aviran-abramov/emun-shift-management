interface PageTitleProps {
    title: string;
    count?: number;
}

export function PageTitle({title, count}: PageTitleProps) {
    return (
        <h2 className="text-2xl font-bold mb-2 mr-2">
            {title} {count !== undefined && `(${count})`}
        </h2>
    );
}
