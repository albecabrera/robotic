import { BookOpen, Code2, PlayCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ResourceCard {
  value: string
  icon: React.ReactNode
  label: string
  badge: string
  title: string
  description: string
}

interface Feature108Props {
  badge?: string
  heading?: string
  description?: string
  cards?: ResourceCard[]
}

const defaultCards: ResourceCard[] = [
  {
    value: "materialien",
    icon: <BookOpen className="h-auto w-4 shrink-0" />,
    label: "Unterrichtsmaterialien",
    badge: "Arbeitsblätter & Aufgaben",
    title: "Alles für die nächste Stunde.",
    description: "Materialien nach Thema und Niveau: Grundlagen, Übungsaufgaben, Musterlösungen und Lernziele.",
  },
  {
    value: "projekte",
    icon: <Code2 className="h-auto w-4 shrink-0" />,
    label: "Projekte",
    badge: "Praxis & Teamarbeit",
    title: "Lernen durch eigene Produkte.",
    description: "Projektideen mit klaren Anforderungen: Webseiten, Datenbanken, kleine Programme und kreative Challenges.",
  },
  {
    value: "videos",
    icon: <PlayCircle className="h-auto w-4 shrink-0" />,
    label: "Lernvideos",
    badge: "Wiederholen & Vertiefen",
    title: "Kurz erklärt, direkt anwendbar.",
    description: "Videos zu wichtigen Konzepten, damit du zu Hause wiederholen und gezielt üben kannst.",
  },
]

const Feature108 = ({
  badge = "Schnellzugriff",
  heading = "Finde schnell, was du für Informatik brauchst",
  description = "Materialien, Projekte und Lernvideos sind so aufgebaut, dass du selbstständig weiterarbeiten kannst.",
  cards = defaultCards,
}: Feature108Props) => {
  return (
    <section className="section-shell section-gap">
      <div className="mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline">{badge}</Badge>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h2>
          <p className="max-w-2xl text-muted-foreground">{description}</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <a key={card.value} href={`#${card.value === "videos" ? "lernvideos" : card.value}`} className="rounded-2xl border bg-card p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                {card.icon} {card.label}
              </div>
              <Badge variant="outline" className="w-fit bg-background">{card.badge}</Badge>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{card.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Feature108 }
