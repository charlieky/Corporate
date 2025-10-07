interface SectionTitleProps {
  children: string;
  variant?: 'default' | 'light';
}

export function SectionTitle({ children, variant = 'default' }: SectionTitleProps) {
  const isLight = variant === 'light';

  return (
    <div className="flex items-center gap-4 mb-16">
      <div className={`w-12 border-t ${isLight ? 'border-white/30' : 'border-muted-foreground/30'}`} />
      <span className={`text-xs uppercase tracking-widest font-medium ${isLight ? 'text-white/70' : 'text-muted-foreground'}`}>
        {children}
      </span>
    </div>
  );
}
