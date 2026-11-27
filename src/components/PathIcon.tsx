import { BookOpen, Compass, Flame, Flower2, Landmark, Sparkles, Sprout, type LucideProps } from "lucide-react";

const icons = { BookOpen, Compass, Flame, Flower2, Landmark, Sparkles, Sprout };

export function PathIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = icons[name as keyof typeof icons] ?? BookOpen;
  return <Icon {...props} />;
}
