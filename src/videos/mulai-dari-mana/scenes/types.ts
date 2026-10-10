// Props yang diterima setiap scene dari MulaiDariManaVideo.
export type SceneProps = {
  dur: number; // durasi scene (frame)
  sfx: boolean;
  captions: boolean;
  caption: string; // teks subtitle scene ini (lihat CAPTIONS di ../timing.ts)
};
