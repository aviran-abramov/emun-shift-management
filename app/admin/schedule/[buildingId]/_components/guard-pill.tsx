interface GuardPillProps {
  name: string;
  hasNotes: boolean;
}

export function GuardPill({ name, hasNotes }: GuardPillProps) {
  return (
    <p className="bg-[#C0DD97] rounded px-1 flex items-center gap-1">
      <span>{name}</span>
      {hasNotes && (
        <span className="inline-block size-1.5 rounded-full bg-orange-500" />
      )}
    </p>
  );
}
