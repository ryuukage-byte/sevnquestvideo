import React from 'react';
import {Composition} from 'remotion';
import {KunyomiOnyomiVideo, KunyomiOnyomiVideoProps} from './videos/kunyomi-onyomi/KunyomiOnyomiVideo';
import {TOTAL_FRAMES as TOTAL_FRAMES_KUNYOMI} from './videos/kunyomi-onyomi/timing';
import {AuVideo, AuVideoProps} from './videos/au/AuVideo';
import {TOTAL_FRAMES as TOTAL_FRAMES_AU} from './videos/au/timing';
import {ShokuVideo, ShokuVideoProps} from './videos/shoku/ShokuVideo';
import {TOTAL_FRAMES as TOTAL_FRAMES_SHOKU} from './videos/shoku/timing';
import {IPhoneVideo, IPhoneVideoProps} from './videos/iphone/IPhoneVideo';
import {TOTAL_FRAMES as TOTAL_FRAMES_IPHONE} from './videos/iphone/timing';
import {HougaIiVideo, HougaIiVideoProps} from './videos/houga-ii/HougaIiVideo';
import {TOTAL_FRAMES as TOTAL_FRAMES_HOUGA} from './videos/houga-ii/timing';
import {HougaTaVideo, HougaTaVideoProps} from './videos/houga-ta/HougaTaVideo';
import {TOTAL_FRAMES as TOTAL_FRAMES_HOUGA_TA} from './videos/houga-ta/timing';
import {TeiruVideo, TeiruVideoProps} from './videos/teiru/TeiruVideo';
import {TOTAL_FRAMES as TOTAL_FRAMES_TEIRU} from './videos/teiru/timing';
import {SouVideo, SouVideoProps} from './videos/sou/SouVideo';
import {TOTAL_FRAMES as TOTAL_FRAMES_SOU} from './videos/sou/timing';
import {TemplateVideo} from './videos/_template/TemplateVideo';
import {TOTAL_FRAMES as TOTAL_FRAMES_TEMPLATE} from './videos/_template/timing';
import {AvatarShowcase} from './videos/_showcase/AvatarShowcase';
import {MulaiDariManaVideo} from './videos/mulai-dari-mana/MulaiDariManaVideo';
import {TOTAL_FRAMES as TOTAL_FRAMES_MULAIDARIMANA} from './videos/mulai-dari-mana/timing';
import {NaiFormVideo} from './videos/nai-form/NaiFormVideo';
import {TOTAL_FRAMES as TOTAL_FRAMES_NAI} from './videos/nai-form/timing';
import {Explainer as GrammarFusionVideo} from './videos/grammar-fusion/Explainer';
import {TOTAL_FRAMES as TOTAL_FRAMES_GRAMMAR_FUSION} from './videos/grammar-fusion/timing';
import {TeShimauVideo} from './videos/te-shimau/TeShimauVideo';
import {TOTAL_FRAMES as TOTAL_FRAMES_TESHIMAU} from './videos/te-shimau/timing';
import {BeresBeresVideo} from './videos/beres-beres/BeresBeresVideo';
import {TOTAL_FRAMES as TOTAL_FRAMES_BERES_BERES} from './videos/beres-beres/timing';
import {TeOkuVideo} from './videos/te-oku/TeOkuVideo';
import {TOTAL_FRAMES as TOTAL_FRAMES_TEOKU} from './videos/te-oku/timing';
// @new-video:imports
import {FPS, H, W} from './shared/theme';

const defaultPropsSou: SouVideoProps = {
  sfx: true,
};

const defaultPropsKunyomi: KunyomiOnyomiVideoProps = {
  sfx: true,
  captions: true,
  voiceover: true,
};

const defaultPropsAu: AuVideoProps = {
  sfx: true,
  captions: true,
};

const defaultPropsShoku: ShokuVideoProps = {
  sfx: true,
  captions: true,
  voiceover: true,
};

const defaultPropsIPhone: IPhoneVideoProps = {
  sfx: true,
  captions: true,
  voiceover: true,
};

const defaultPropsHouga: HougaIiVideoProps = {
  sfx: true,
};

const defaultPropsHougaTa: HougaTaVideoProps = {
  sfx: true,
};

const defaultPropsTeiru: TeiruVideoProps = {
  sfx: true,
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Sou Explainer Master: そう — Satu Kata, Banyak Terjemahan (03:42.48 @ 60 FPS = 13,349 frames) */}

      {/* そう (Begitu · Kelihatannya · Katanya) — 33 Scene Storyboard (01:20.16 = 2405 frame), tanpa audio */}
      <Composition
        id="SevnQuestSou"
        component={SouVideo}
        durationInFrames={TOTAL_FRAMES_SOU}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={defaultPropsSou}
      />

      {/* ている tidak selalu berarti "sedang" — 8 Dunia Visual (02:59.64 = 5389 frame), tanpa voiceover */}
      <Composition
        id="SevnQuestTeiru"
        component={TeiruVideo}
        durationInFrames={TOTAL_FRAMES_TEIRU}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={defaultPropsTeiru}
      />

      {/* Vた + ほうがいい — 27 scene storyboard (01:56), tanpa voiceover */}
      <Composition
        id="SevnQuestHougaTa"
        component={HougaTaVideo}
        durationInFrames={TOTAL_FRAMES_HOUGA_TA}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={defaultPropsHougaTa}
      />
      {/* 〜ほうがいい — RU vs TA (01:24.12), tanpa voiceover */}
      <Composition
        id="SevnQuestHougaIi"
        component={HougaIiVideo}
        durationInFrames={TOTAL_FRAMES_HOUGA}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={defaultPropsHouga}
      />

      {/* Master Render: Kunyomi Onyomi Explainer (01:13.00) */}
      <Composition
        id="KunyomiOnyomiVideo"
        component={KunyomiOnyomiVideo}
        durationInFrames={TOTAL_FRAMES_KUNYOMI}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={defaultPropsKunyomi}
      />

      {/* Clean Track: Kunyomi Onyomi Explainer without captions */}
      <Composition
        id="KunyomiOnyomiVideoClean"
        component={KunyomiOnyomiVideo}
        durationInFrames={TOTAL_FRAMES_KUNYOMI}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={{
          ...defaultPropsKunyomi,
          captions: false,
        }}
      />
      {/* Master Render: SevnQuest Install on iPhone (01:09.04) */}
      <Composition
        id="SevnQuestIPhone"
        component={IPhoneVideo}
        durationInFrames={TOTAL_FRAMES_IPHONE}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={defaultPropsIPhone}
      />

      {/* Clean Track: Tanpa subtitle on-screen */}
      <Composition
        id="SevnQuestIPhoneClean"
        component={IPhoneVideo}
        durationInFrames={TOTAL_FRAMES_IPHONE}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={{
          ...defaultPropsIPhone,
          captions: false,
        }}
      />

      {/* Master Render: SevnQuest 食 Kunyomi vs Onyomi (02:09.32) */}
      <Composition
        id="SevnQuestShoku"
        component={ShokuVideo}
        durationInFrames={TOTAL_FRAMES_SHOKU}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={defaultPropsShoku}
      />

      {/* Clean Track: Tanpa subtitle on-screen */}
      <Composition
        id="SevnQuestShokuClean"
        component={ShokuVideo}
        durationInFrames={TOTAL_FRAMES_SHOKU}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={{
          ...defaultPropsShoku,
          captions: false,
        }}
      />

      {/* Previous Master Render: SevnQuest Au Diff (会う vs 合う) */}
      <Composition
        id="SevnQuestAuDiff"
        component={AuVideo}
        durationInFrames={TOTAL_FRAMES_AU}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={defaultPropsAu}
      />

      {/* Clean Track: Tanpa subtitle / clean track untuk dubbing / b-roll */}
      <Composition
        id="SevnQuestAuDiffClean"
        component={AuVideo}
        durationInFrames={TOTAL_FRAMES_AU}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={{
          ...defaultPropsAu,
          captions: false,
        }}
      />

      {/* Video baru dari `npm run new-video` ditambahkan otomatis di atas baris marker ini */}
      {/* Mulai Dari Mana */}
      <Composition
        id="SevnQuestMulaiDariMana"
        component={MulaiDariManaVideo}
        durationInFrames={TOTAL_FRAMES_MULAIDARIMANA}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={{sfx: true, captions: true, voiceover: true}}
      />

      {/* Mulai Dari Mana: tanpa subtitle (clean track) */}
      <Composition
        id="SevnQuestMulaiDariManaClean"
        component={MulaiDariManaVideo}
        durationInFrames={TOTAL_FRAMES_MULAIDARIMANA}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={{sfx: true, captions: false, voiceover: false}}
      />

      {/* Bentuk ない (Nai) · The Transformation System (01:50.880 @ 60 FPS = 6653 frame) */}
      <Composition
        id="SevnQuestNai"
        component={NaiFormVideo}
        durationInFrames={TOTAL_FRAMES_NAI}
        fps={60}
        width={1080}
        height={1920}
        defaultProps={{sfx: true, captions: true, voiceover: true, music: true}}
      />

      {/* Bentuk ない (Nai): tanpa subtitle (clean track) */}
      <Composition
        id="SevnQuestNaiClean"
        component={NaiFormVideo}
        durationInFrames={TOTAL_FRAMES_NAI}
        fps={60}
        width={1080}
        height={1920}
        defaultProps={{sfx: true, captions: false, voiceover: false, music: true}}
      />

      {/* Grammar Fusion: 勉強しなければならない (02:14.400 @ 30 FPS = 4032 frame) */}
      <Composition
        id="SevnQuestGrammarFusion"
        component={GrammarFusionVideo}
        durationInFrames={TOTAL_FRAMES_GRAMMAR_FUSION}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={{sfx: true, captions: true, voiceover: true, music: true}}
      />

      {/* Grammar Fusion: tanpa subtitle (clean track) */}
      <Composition
        id="SevnQuestGrammarFusionClean"
        component={GrammarFusionVideo}
        durationInFrames={TOTAL_FRAMES_GRAMMAR_FUSION}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={{sfx: true, captions: false, voiceover: false, music: true}}
      />

      {/* ～てしまう — selesai, menyesal, tidak disengaja (01:06.760 = 2003 frame) */}
      <Composition
        id="SevnQuestTeShimau"
        component={TeShimauVideo}
        durationInFrames={TOTAL_FRAMES_TESHIMAU}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={{sfx: true, captions: true, voiceover: true, music: false}}
      />

      {/* ～てしまう: tanpa subtitle (clean track) */}
      <Composition
        id="SevnQuestTeShimauClean"
        component={TeShimauVideo}
        durationInFrames={TOTAL_FRAMES_TESHIMAU}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={{sfx: true, captions: false, voiceover: true, music: false}}
      />

      {/* 4 Kata Kerja Beres-Beres Rumah (01:13.600 = 2208 frame @ 30 FPS) */}
      <Composition
        id="SevnQuestBeresBeres"
        component={BeresBeresVideo}
        durationInFrames={TOTAL_FRAMES_BERES_BERES}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={{sfx: true}}
      />

      {/* ～ておく — persiapan atau membiarkan? (01:48.080 = 3243 frame) */}
      <Composition
        id="SevnQuestTeOku"
        component={TeOkuVideo}
        durationInFrames={TOTAL_FRAMES_TEOKU}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={{sfx: true, captions: true, voiceover: true, music: false}}
      />

      {/* ～ておく: tanpa subtitle (clean track) */}
      <Composition
        id="SevnQuestTeOkuClean"
        component={TeOkuVideo}
        durationInFrames={TOTAL_FRAMES_TEOKU}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={{sfx: true, captions: false, voiceover: true, music: false}}
      />

      {/* @new-video:compositions */}

      {/* Starter: salin lewat `npm run new-video -- <slug>`, jangan edit langsung */}
      <Composition
        id="SevnQuestTemplate"
        component={TemplateVideo}
        durationInFrames={TOTAL_FRAMES_TEMPLATE}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={{sfx: true, captions: true, voiceover: false}}
      />

      {/* Catalog & Preview Showcase: 16 Expressions × Male & Female */}
      <Composition
        id="AvatarExpressionsShowcase"
        component={AvatarShowcase}
        durationInFrames={FPS * 20}
        fps={FPS}
        width={W}
        height={H}
      />
    </>
  );
};

