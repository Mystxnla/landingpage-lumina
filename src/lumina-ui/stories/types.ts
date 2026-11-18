import type { ReactElement } from "react";

/** Format story sederhana (mirip CSF): ekspor default berisi judul, ekspor bernama berisi contoh. */
export type StoryMeta = {
  title: string;
  description?: string;
  /** Urutan nama ekspor story untuk ditampilkan. */
  order?: string[];
};
export type Story = {
  name: string;
  render: () => ReactElement;
  /** Tampilkan contoh di atas latar malam. */
  dark?: boolean;
};
