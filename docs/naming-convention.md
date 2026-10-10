# Naming Convention

Aturan penamaan supaya mudah dicari manusia maupun agent.

| Hal | Aturan | Contoh |
| :--- | :--- | :--- |
| Slug video | kebab-case, nama topik | `kunyomi-onyomi`, `houga-ta`, `kotoba-dasar` |
| Folder video | `src/videos/<slug>/` | `src/videos/shoku/` |
| Komponen utama video | `<Pascal>Video.tsx` | `ShokuVideo.tsx` |
| Scene | `SceneNN_Nama.tsx` (NN dua digit) | `Scene03_Okurigana.tsx` |
| Composition ID | `SevnQuest<Pascal>` + `…Clean` | `SevnQuestShoku`, `SevnQuestShokuClean` |
| Voice-over | `public/audio/voice/<slug>.wav` | `kunyomi-onyomi.wav` |
| Storyboard | `content/<slug>/storyboard.md` | |
| Hyperframes | `hyperframes/<slug>/` | `hyperframes/promo-ramadan/` |
| Aset (gambar/audio/font) | huruf kecil + tanda hubung | `tier-3.png`, `whoosh.wav` |
| Render | `out/renders/<CompositionId>.mp4` | `out/renders/SevnQuestShoku.mp4` |
| Folder khusus (bukan video) | awalan `_` | `_template`, `_showcase` |

Larangan: spasi di nama file/folder, nama generik (`final.mp4`, `new.png`, `temp`), dan duplikat dengan nama berbeda.
