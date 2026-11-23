// Confirmed wedding information — preserve exactly as supplied by the couple.
export const wedding = {
  bride: { bn: "অনামিকা", en: "Anamika" },
  groom: { bn: "শুভদীপ", en: "Subhadip" },
  date: {
    bn: "রবিবার, ১৩ ডিসেম্বর ২০২৬",
    en: "Sunday · 13 December 2026",
    short: "13 · 12 · 2026",
    // Wedding ceremony start, India Standard Time
    iso: "2026-12-13T16:50:00+05:30",
  },
  events: [
    {
      id: "haldi",
      bn: "গায়ে হলুদ",
      en: "Gaye Holud · Haldi Ceremony",
      time: "12:30 PM – 2:45 PM",
      start: "20261213T123000",
      end: "20261213T144500",
    },
    {
      id: "lagna",
      bn: "বিবাহ লগ্ন",
      en: "Bibaho Lagna · Wedding ceremony",
      time: "4:50 PM – 12:00 AM",
      start: "20261213T165000",
      end: "20261214T000000",
    },
    {
      id: "bhoj",
      bn: "প্রীতিভোজ",
      en: "Preetibhoj · Wedding feast",
      time: "7:00 PM",
      start: "20261213T190000",
      end: "20261213T220000",
    },
  ],
  venue: {
    name: { bn: "কুমুদিনী গেস্ট হাউস", en: "Kumudini Guest House" },
    lines: ["Jogalbari, Garmoyna, Moyna", "Purba Medinipur, West Bengal, India"],
    en: "Jogalbari, Garmoyna, Moyna, Purba Medinipur, West Bengal",
  },
} as const;

export type WeddingEvent = (typeof wedding.events)[number];

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Kumudini Guest House, Moyna, Purba Medinipur, West Bengal",
)}`;

export function calendarUrl(e: WeddingEvent) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${e.en} — Anamika & Subhadip`,
    dates: `${e.start}/${e.end}`,
    ctz: "Asia/Kolkata",
    details: `Wedding celebration of Anamika & Subhadip: ${e.en}`,
    location: `${wedding.venue.name.en}, ${wedding.venue.en}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function icsDataUrl(e: WeddingEvent): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Anamika and Subhadip Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${e.id}-20261213@anamika-subhadip.wedding`,
    `DTSTAMP:20261123T000000Z`,
    `DTSTART;TZID=Asia/Kolkata:${e.start}`,
    `DTEND;TZID=Asia/Kolkata:${e.end}`,
    `SUMMARY:${e.en} — Anamika & Subhadip`,
    `DESCRIPTION:You are warmly invited to celebrate the ${e.en} of Anamika & Subhadip.`,
    `LOCATION:${wedding.venue.name.en}, ${wedding.venue.en}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}
