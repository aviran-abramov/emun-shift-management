interface GuardPillProps {
  name: string;
  hasNotes: boolean;
}

export function GuardPill({ name, hasNotes }: GuardPillProps) {
  return (
    <p className="bg-[#C0DD97] rounded-xl px-2 py-0.5 items-center gap-1 inline-flex">
      <span>{name}</span>
      {hasNotes && (
        <span className="inline-block size-1.5 rounded-full bg-orange-500" />
      )}
    </p>
  );
}
