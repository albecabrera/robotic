import { ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => (
  <div
    className={cn(
      "grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3",
      className,
    )}
  >
    {children}
  </div>
)

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string
  className: string
  background: ReactNode
  Icon: React.ElementType
  description: string
  href: string
  cta: string
}) => (
  <div
    className={cn(
      "group relative flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-2xl",
      "border border-border bg-card shadow-sm",
      "transform-gpu transition-shadow duration-300 hover:shadow-lg",
      "dark:[border:1px_solid_rgba(255,255,255,.08)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff0f_inset]",
      className,
    )}
  >
    <div className="pointer-events-none">{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <Icon className="h-10 w-10 origin-left transform-gpu text-primary/60 transition-all duration-300 ease-in-out group-hover:scale-75" />
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">{name}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
    <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
      <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
        <a href={href}>
          {cta}
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.02] group-hover:dark:bg-neutral-800/10" />
  </div>
)

export { BentoCard, BentoGrid }
