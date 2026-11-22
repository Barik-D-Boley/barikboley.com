import { CalendarClock, Check, RefreshCw, Wrench } from "lucide-react"
import { Project } from "@/types/project"

export default function ProjectStatusBadge({ status }: { status: Project["status"] }) {
  const badge = (() => {
    switch (status) {
      case "planned":
        return {
          label: "Planned",
          className: "border-[rgba(251,191,36,0.5)] bg-[rgba(251,191,36,0.08)] text-[#fcd34d]",
          Icon: CalendarClock,
        }
      case "under development":
        return {
          label: "Under Development",
          className: "border-[rgba(56,189,248,0.5)] bg-[rgba(14,165,233,0.08)] text-[#7dd3fc]",
          Icon: Wrench,
        }
      case "maintenance":
        return {
          label: "Evergreen",
          className: "border-[rgba(34,197,94,0.5)] bg-[rgba(34,197,94,0.08)] text-[#86efac]",
          Icon: RefreshCw,
        }
      case "complete":
        return {
          label: "Complete",
          className: "border-[rgba(148,163,184,0.4)] bg-[rgba(148,163,184,0.08)] text-[#cbd5e1]",
          Icon: Check,
        }
      default:
        return null
    }
  })()

  if (!badge) return null

  const { Icon: StatusIcon } = badge

  return (
    <span
      className={`inline-flex items-center gap-[5px] whitespace-nowrap rounded-full border px-[7px] py-1 font-mono text-[9px] font-bold tracking-[0.08em] uppercase ${badge.className}`}
    >
      <StatusIcon size={11} strokeWidth={2.2} aria-hidden="true" />
      {badge.label}
    </span>
  )
}
