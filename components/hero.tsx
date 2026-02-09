import { BookOpen, Brain, TrendingUp, Lightbulb } from "lucide-react"

const stats = [
  { icon: BookOpen, label: "Educacao" },
  { icon: Brain, label: "Filosofia" },
  { icon: TrendingUp, label: "Economia" },
  { icon: Lightbulb, label: "Tecnologia" },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b bg-card px-4 py-12 md:px-6 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Troque o scroll por{" "}
            <span className="text-primary">conhecimento</span>
          </h1>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Uma curadoria comunitaria de videos que realmente importam. Cole um
            link, compartilhe sabedoria e descubra conteudo que transforma.
          </p>
        </div>
        <div className="mx-auto mt-10 flex max-w-md flex-wrap items-center justify-center gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <stat.icon className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
