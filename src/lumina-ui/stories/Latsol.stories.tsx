import { useState } from "react";
import { Button } from "../components/base";
import { AnswerOption, XRayCard, type AnswerState } from "../components/quiz";
import type { Story, StoryMeta } from "./types";

export default {
  title: "Latsol dan X-Ray",
  description: "Pilihan jawaban dengan status, dan kartu penjelasan kesalahan dari AI.",
  order: ["Pilihan", "XRay"],
} satisfies StoryMeta;

const options = ["12", "16", "18", "24"];
const CORRECT = 2;

function QuizDemo() {
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const stateOf = (i: number): AnswerState => {
    if (!checked) return picked === i ? "selected" : "idle";
    if (i === CORRECT) return "correct";
    return picked === i ? "wrong" : "idle";
  };
  return (
    <div className="max-w-md space-y-2.5">
      <p className="mb-3 font-display text-lg text-slate">Jika 3x + 6 = 60, berapakah nilai x?</p>
      {options.map((o, i) => (
        <AnswerOption
          key={o}
          letter={"ABCD"[i]}
          state={stateOf(i)}
          disabled={checked}
          onSelect={() => setPicked(i)}
        >
          {o}
        </AnswerOption>
      ))}
      <div className="flex gap-3 pt-3">
        <Button size="sm" disabled={picked === null || checked} onClick={() => setChecked(true)}>
          Periksa
        </Button>
        <Button
          size="sm"
          icon="none"
          variant="ghost-dark"
          onClick={() => {
            setPicked(null);
            setChecked(false);
          }}
        >
          Ulangi
        </Button>
      </div>
    </div>
  );
}

export const Pilihan: Story = { name: "Pilihan jawaban (coba klik)", render: () => <QuizDemo /> };

export const XRay: Story = {
  name: "Kartu X-Ray Kesalahan",
  render: () => (
    <div className="max-w-md">
      <XRayCard
        yourAnswer="x = 22"
        correctAnswer="x = 18"
        misconception="Kedua ruas belum dibagi 3 setelah memindahkan 6."
        explanation="Setelah 3x = 54, bagi kedua ruas dengan 3 sehingga x = 18. Contoh ini hanya ilustrasi; isinya nanti dari AI."
        subtopic="Persamaan linear satu variabel"
      />
    </div>
  ),
};
