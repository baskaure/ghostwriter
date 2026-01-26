import { Button } from "@/components/ui/button";
import type { PostType } from "@/types/post";

interface PostTypeSelectorProps {
  value: PostType;
  onChange: (type: PostType) => void;
}

const types: { value: PostType; label: string }[] = [
  { value: "conseil", label: "Conseil" },
  { value: "story", label: "Story" },
  { value: "question", label: "Question" },
  { value: "annonce", label: "Annonce" },
  { value: "thread", label: "Thread" },
];

export function PostTypeSelector({ value, onChange }: PostTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {types.map((type) => (
        <Button
          key={type.value}
          variant={value === type.value ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(type.value)}
        >
          {type.label}
        </Button>
      ))}
    </div>
  );
}
