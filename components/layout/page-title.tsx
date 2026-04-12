import {cn} from "@/lib/utils";

interface PageTitleProps {
    title: string;
    count?: number;
    className?: string;
}

export function PageTitle({title, count, className}: PageTitleProps) {
    return (
        <h1 className={cn("text-2xl font-bold mb-2 mr-2", className)}>
            {title} {count !== undefined && `(${count})`}
        </h1>
    );
}
