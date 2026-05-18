import { Badge } from "@/components/ui/badge";

const tone = {
  PENDING: "gold",
  CONFIRMED: "green",
  ONGOING: "blue",
  DONE: "neutral",
  CANCELED: "red",
} as const;

export function StatusBadge({ status }: { status: keyof typeof tone }) {
  return <Badge tone={tone[status]}>{status}</Badge>;
}
