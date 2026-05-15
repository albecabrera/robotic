"use client";
import { Mail, MapPin, BookOpen, GraduationCap, Video } from "lucide-react";
import { TextHoverEffect, FooterBackgroundGradient } from "@/components/ui/hover-footer";

const footerLinks = [
  {
    title: "Materialien",
    links: [
      { label: "Arbeitsblätter", href: "#materialien" },
      { label: "Aufgaben", href: "#materialien" },
      { label: "Musterlösungen", href: "#materialien" },
      { label: "Lernziele", href: "#materialien" },
    ],
  },
  {
    title: "Themen",
    links: [
      { label: "Python", href: "#programmieren" },
      { label: "Datenbanken", href: "#programmieren" },
      { label: "Webentwicklung", href: "#programmieren" },
      { label: "KI-Grundlagen", href: "#programmieren" },
    ],
  },
  {
    title: "Schnellzugriff",
    links: [
      { label: "Unterrichtsmaterialien", href: "#materialien" },
      { label: "Lernvideos", href: "#kurse" },
      { label: "Lehrpläne", href: "#lehrplaene" },
      { label: "Kontakt", href: "#kontakt", pulse: true },
    ],
  },
];

const contactInfo = [
  { icon: Mail, text: "Herr Cabrera", href: "mailto:cabrera@esg-bonn.de" },
  { icon: MapPin, text: "Elisabeth-Selbert-Gesamtschule, Bonn" },
];

const socialLinks = [
  { icon: BookOpen, label: "Materialien", href: "#materialien" },
  { icon: GraduationCap, label: "Projekte", href: "#kurse" },
  { icon: Video, label: "Lernvideos", href: "#kurse" },
];

export default function Footer4Col() {
  return (
    <footer className="bg-[#0F0F11]/60 relative h-fit rounded-3xl overflow-hidden m-4 md:m-8 border border-white/5">
      <div className="max-w-7xl mx-auto px-8 pt-14 pb-6 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 pb-12">
          {/* Brand */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[#3ca2fa] text-3xl font-extrabold">&lt;/&gt;</span>
              <span className="text-white text-xl font-bold">ESG Informatik</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Materialien, Aufgaben, Projekte und Lernvideos für den Informatikunterricht bei Herrn Cabrera an der Elisabeth-Selbert-Gesamtschule Bonn.
            </p>
            <div className="flex gap-4 pt-2">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} aria-label={label} className="text-gray-400 hover:text-[#3ca2fa] transition-colors">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-base font-semibold mb-5">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <a href={link.href} className="text-sm text-gray-400 hover:text-[#3ca2fa] transition-colors flex items-center gap-2">
                      {link.label}
                      {"pulse" in link && link.pulse && (
                        <span className="relative flex size-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3ca2fa] opacity-75" />
                          <span className="relative inline-flex size-2 rounded-full bg-[#3ca2fa]" />
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="border-t border-white/10 my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {contactInfo.map(({ icon: Icon, text, href }) => (
              <div key={text} className="flex items-center gap-2 text-gray-400">
                <Icon size={15} className="text-[#3ca2fa] shrink-0" />
                {href
                  ? <a href={href} className="hover:text-[#3ca2fa] transition-colors">{text}</a>
                  : <span>{text}</span>
                }
              </div>
            ))}
          </div>
          <p className="text-gray-500">&copy; {new Date().getFullYear()} Informatik an der ESG</p>
        </div>
      </div>

      {/* Neon Informatik text */}
      <div className="lg:flex hidden h-[15rem] -mt-24 -mb-16">
        <TextHoverEffect text="esg" className="z-50" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}
