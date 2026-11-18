import { useState } from "react";
import { AccordionItem, Tabs, TextField } from "../components/forms";
import type { Story, StoryMeta } from "./types";

export default {
  title: "Formulir",
  description: "Kolom isian, tab, dan baris tanya-jawab.",
  order: ["Isian", "Tab", "TanyaJawab"],
} satisfies StoryMeta;

export const Isian: Story = {
  name: "Kolom isian",
  render: () => (
    <div className="grid max-w-sm gap-4">
      <TextField
        label="Email"
        type="email"
        placeholder="nama@email.com"
        hint="Gunakan email akun demo."
      />
      <TextField
        label="Kata sandi"
        type="password"
        defaultValue="rahasia"
        error="Kata sandi salah."
      />
    </div>
  ),
};

function TabsDemo() {
  const [tab, setTab] = useState<"belajar" | "latsol" | "review">("belajar");
  return (
    <div className="space-y-3">
      <Tabs
        label="Tahap bab"
        value={tab}
        onChange={setTab}
        tabs={[
          { value: "belajar", label: "Belajar" },
          { value: "latsol", label: "Latsol" },
          { value: "review", label: "Review" },
        ]}
      />
      <p className="text-sm text-slate-mute">Tab aktif: {tab}</p>
    </div>
  );
}

export const Tab: Story = { name: "Tab", render: () => <TabsDemo /> };

function AccordionDemo() {
  const [open, setOpen] = useState(0);
  const items = [
    ["Apa itu bar kampus?", "Bar yang terisi setiap kamu menyelesaikan tahap bab."],
    ["Kapan pulau terbuka?", "Setelah bab sebelumnya selesai."],
  ];
  return (
    <div className="grid max-w-xl gap-3">
      {items.map(([q, a], i) => (
        <AccordionItem
          key={q}
          question={q}
          open={open === i}
          onToggle={() => setOpen(open === i ? -1 : i)}
        >
          {a}
        </AccordionItem>
      ))}
    </div>
  );
}

export const TanyaJawab: Story = { name: "Tanya-jawab", render: () => <AccordionDemo /> };
