import { CalendarClock, Check, RefreshCw, Wrench } from "lucide-react"
import { Project } from "@/types/project"

export default function ProjectStatusBadge({ status }: { status: Project["status"] }) {
  const badge = (() => {
    switch (status) {
      case "planned":
        return { label: "Planned", className: "status-planned", Icon: CalendarClock }
      case "under development":
        return { label: "Under Development", className: "status-under-development", Icon: Wrench }
      case "maintenance":
        return { label: "Evergreen", className: "status-maintenance", Icon: RefreshCw }
      case "complete":
        return { label: "Complete", className: "status-complete", Icon: Check }
      default:
        return null
    }
  })()

  if (!badge) return null

  const { Icon: StatusIcon } = badge

  return (
    <span className={`project-status-badge ${badge.className}`}>
      <StatusIcon size={11} strokeWidth={2.2} aria-hidden="true" />
      {badge.label}
    </span>
  )
}
