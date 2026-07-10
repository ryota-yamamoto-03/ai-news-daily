import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-[11px] font-bold uppercase tracking-widest transition-colors",
  {
    variants: {
      variant: {
        breaking: "bg-breaking text-white shadow-[0_0_16px_rgba(225,29,46,0.5)]",
        live: "bg-breaking/15 text-breaking-bright border border-breaking/40",
        blue: "bg-signal-blue/15 text-signal-cyan border border-signal-blue/40",
        outline: "border border-white/20 text-white/80",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
