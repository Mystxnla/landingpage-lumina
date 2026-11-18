import { useState } from "react";
import { Button } from "../components/base";
import { Dialog, Notice } from "../components/overlay";
import type { Story, StoryMeta } from "./types";

export default {
  title: "Dialog dan pemberitahuan",
  description: "Popup konfirmasi bergaya game dan pita pemberitahuan.",
  order: ["Konfirmasi", "Pemberitahuan"],
} satisfies StoryMeta;

function DialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        Buka dialog
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Keluar dari latsol?"
        confirmLabel="Keluar"
      >
        Progres soal yang belum dijawab tidak akan disimpan.
      </Dialog>
    </>
  );
}

export const Konfirmasi: Story = {
  name: "Dialog konfirmasi (coba klik)",
  render: () => <DialogDemo />,
};

export const Pemberitahuan: Story = {
  name: "Pemberitahuan",
  dark: true,
  render: () => <Notice title="Pulau selesai">Kamu mendapat 3 bintang dan 90 XP.</Notice>,
};
