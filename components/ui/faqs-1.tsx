import React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const questions = [
  { id: "item-1", title: "Für welche Jahrgänge sind die Kurse?", content: "Die Inhalte sind für Mittelstufe und Oberstufe aufgebaut und werden je nach Niveau angepasst." },
  { id: "item-2", title: "Welche Themen behandeln wir?", content: "Programmierung, Datenbanken, Webentwicklung, algorithmisches Denken und verantwortungsvoller KI-Einsatz." },
  { id: "item-3", title: "Brauche ich Vorkenntnisse?", content: "Nein. Wir starten bei den Grundlagen und arbeiten uns Schritt für Schritt zu Projekten vor." },
  { id: "item-4", title: "Wie läuft der Unterricht ab?", content: "Kurze Theorieblöcke, direkte Übungen und projektorientiertes Arbeiten mit klarem Feedback." },
  { id: "item-5", title: "Gibt es Materialien für zu Hause?", content: "Ja. Es gibt strukturierte Materialien und Übungsaufgaben zum eigenständigen Vertiefen." },
  { id: "item-6", title: "Wie wird Leistung bewertet?", content: "Transparente Kriterien: Verständnis der Konzepte, saubere Umsetzung und Dokumentation im Projekt." },
  { id: "item-7", title: "Wer unterrichtet die Kurse?", content: "Herr Cabrera an der Elisabeth-Selbert-Gesamtschule in Bonn." },
]

export function FaqsSection() {
  return (
    <div className="mx-auto w-full space-y-7 pt-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold md:text-4xl">Häufige Fragen</h2>
        <p className="max-w-2xl text-muted-foreground">Alles Wichtige zu Ablauf, Inhalten und Erwartungen.</p>
      </div>
      <Accordion type="single" collapsible className="w-full -space-y-px rounded-lg bg-card dark:bg-card/50" defaultValue="item-1">
        {questions.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="relative border-x first:rounded-t-lg first:border-t last:rounded-b-lg last:border-b">
            <AccordionTrigger className="px-4 py-4 text-[15px] leading-6 hover:no-underline">{item.title}</AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-muted-foreground">{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <p className="text-muted-foreground">Noch Fragen? <a href="#" className="text-primary hover:underline">Sprich uns direkt an</a></p>
    </div>
  )
}
