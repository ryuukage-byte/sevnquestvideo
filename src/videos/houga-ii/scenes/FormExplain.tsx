import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Sfx} from '../../../shared/components/Sfx';
import {ArrowRight, Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {
  AtY,
  Avatar,
  BOUNCY,
  Form,
  FORM,
  Formula,
  Hi,
  JpSpan,
  MoonIcon,
  SOFT,
  SunIcon,
  VerbSentence,
  hexA,
  pp,
  ps,
  sec,
  useT,
} from '../kit';

export type FormExplainProps = {
  end: Form;
  verb: {kanji: string; ruby: string; kana?: string};
  translation: React.ReactNode;
  // langkah (detik lokal)
  at: {sentence: number; translation: number; transform?: number; breakdown: number; formula: number; conclusion: number};
  transform?: {from: React.ReactNode; to: React.ReactNode; note: string};
  conclusion: React.ReactNode;
  mood: 'awake' | 'sleepy';
  sfx?: boolean;
};

const Chip: React.FC<{
  p: number;
  border: string;
  color: string;
  children: React.ReactNode;
  label: React.ReactNode;
  labelColor: string;
}> = ({p, border, color, children, label, labelColor}) => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, opacity: p, transform: `scale(${p})`}}>
    <Surface tone="elevated" radius={34} border={border} style={{padding: '4px 30px'}}>
      <JpSpan style={{fontSize: 66, color, lineHeight: 1.4, whiteSpace: 'nowrap'}}>{children}</JpSpan>
    </Surface>
    <Pill color={labelColor} size={26}>
      {label}
    </Pill>
  </div>
);

// Satu struktur untuk S16 (る) dan S17 (た) — urutan & posisi sengaja sama supaya mudah dibandingkan.
export const FormExplain: React.FC<FormExplainProps> = ({end, verb, translation, at, transform, conclusion, mood, sfx = true}) => {
  const t = useT();
  const acc = FORM[end];
  const hasT = transform !== undefined;

  const yTrans = 775;
  const yTransform = 905;
  const yBreak = hasT ? 1065 : 935;
  const yFormula = hasT ? 1245 : 1110;
  const yConc = hasT ? 1390 : 1305;

  const pSentence = pp(t, at.sentence, SOFT);
  const hl = ps(t, at.sentence + 0.5, at.sentence + 0.9);
  const pTrans = pp(t, at.translation, SOFT);
  const pTf = at.transform !== undefined ? pp(t, at.transform, SOFT) : 0;
  const pTfTo = at.transform !== undefined ? pp(t, at.transform + 0.7, BOUNCY) : 0;
  const pB1 = pp(t, at.breakdown, BOUNCY);
  const pB2 = pp(t, at.breakdown + 0.3, BOUNCY);
  const pF = pp(t, at.formula, BOUNCY);
  const pC = pp(t, at.conclusion, BOUNCY);
  // saat breakdown muncul, kalimat utama sedikit meredup agar fokus berpindah
  const dim = 1 - 0.4 * ps(t, at.breakdown, at.breakdown + 0.4);

  const bob = Math.sin(t * 3.2) * 6;

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="impact-soft" at={sec(at.sentence)} volume={0.45} />
          <Sfx name="pop" at={sec(at.translation)} volume={0.4} />
          {hasT && at.transform !== undefined && (
            <>
              <Sfx name="pop" at={sec(at.transform)} volume={0.4} />
              <Sfx name="swipe" at={sec(at.transform + 0.5)} volume={0.35} />
              <Sfx name="sparkle" at={sec(at.transform + 0.7)} volume={0.4} />
            </>
          )}
          <Sfx name="pop" at={sec(at.breakdown)} volume={0.45} />
          <Sfx name="pop" at={sec(at.breakdown + 0.3)} volume={0.45} />
          <Sfx name="click" at={sec(at.formula)} volume={0.5} />
          <Sfx name={end === 'ta' ? 'success' : 'ding'} at={sec(at.conclusion)} volume={0.5} />
        </>
      )}

      {/* karakter di slot atas (sama untuk S16 & S17) */}
      <AtY y={330} style={{opacity: pSentence}}>
        <div style={{position: 'relative', width: 420, height: 250, display: 'flex', justifyContent: 'center'}}>
          <Avatar
            tier={1}
            height={240}
            style={{
              transform:
                mood === 'sleepy'
                  ? `translateY(${14 + bob * 0.6}px) rotate(${14 + Math.sin(t * 1.6) * 2}deg)`
                  : `translateY(${bob}px)`,
              transformOrigin: '50% 100%',
            }}
          />
          {mood === 'awake' ? (
            <div style={{position: 'absolute', right: 30, top: 10}}>
              <SunIcon size={104} spin={t * 18} />
            </div>
          ) : (
            <>
              <div style={{position: 'absolute', left: 20, top: 0}}>
                <MoonIcon size={96} />
              </div>
              {[0, 1, 2].map((i) => {
                const p = ps((t + i * 0.55) % 1.65, 0, 1.65, (x) => x);
                return (
                  <span
                    key={i}
                    style={{
                      position: 'absolute',
                      left: 270 + i * 34,
                      top: 70 - i * 44,
                      fontFamily: FONT.hand,
                      fontWeight: 700,
                      fontSize: 54 + i * 8,
                      color: C.indigoSoft,
                      opacity: Math.sin(Math.PI * p),
                      transform: `translateY(${-p * 22}px)`,
                    }}
                  >
                    z
                  </span>
                );
              })}
            </>
          )}
        </div>
      </AtY>

      {/* kalimat */}
      <AtY y={620} style={{opacity: pSentence * dim, transform: `translateY(-50%) scale(${0.94 + 0.06 * pSentence})`}}>
        <VerbSentence kanji={verb.kanji} ruby={verb.ruby} kana={verb.kana} end={end} size={108} hlVerb={hl} />
      </AtY>

      {/* terjemahan */}
      <AtY y={yTrans} style={{opacity: pTrans, transform: `translateY(calc(-50% + ${(1 - pTrans) * 24}px))`}}>
        <span
          style={{
            fontFamily: FONT.display,
            fontWeight: 800,
            fontSize: 64,
            color: C.text,
            textShadow: '0 8px 30px rgba(0,0,0,0.85)',
          }}
        >
          {translation}
        </span>
      </AtY>

      {/* transform: 寝る → 寝た (hanya S17) */}
      {hasT && transform && at.transform !== undefined && t >= at.transform && (
        <AtY y={yTransform} style={{gap: 30, alignItems: 'center'}}>
          <div style={{opacity: pTf * 0.65, transform: `scale(${pTf})`}}>
            <JpSpan style={{fontSize: 88, color: FORM.ru.color, lineHeight: 1.4}}>{transform.from}</JpSpan>
          </div>
          <div style={{opacity: pTf, transform: `scaleX(${pTf})`, color: C.gold}}>
            <ArrowRight size={78} stroke={3.4} />
          </div>
          <div style={{opacity: pTfTo, transform: `scale(${pTfTo})`}}>
            <JpSpan
              style={{
                fontSize: 96,
                color: FORM.ta.color,
                lineHeight: 1.4,
                textShadow: `0 0 34px ${hexA(FORM.ta.color, 0.55)}`,
              }}
            >
              {transform.to}
            </JpSpan>
          </div>
        </AtY>
      )}

      {/* breakdown: kata kerja + ほうがいい */}
      {t >= at.breakdown && (
        <AtY y={yBreak} style={{gap: 26, alignItems: 'flex-start'}}>
          <Chip p={pB1} border={acc.color} color={acc.color} label={end === 'ru' ? 'Vる' : 'Vた'} labelColor={acc.color}>
            {verb.kanji}
            {verb.kana}
            {acc.ch}
          </Chip>
          <div style={{opacity: pB2, transform: `scale(${pB2})`, paddingTop: 36}}>
            <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 64, color: C.textSecondary}}>+</span>
          </div>
          <Chip p={pB2} border={C.borderPrimary} color={C.text} label="pola" labelColor={C.textSecondary}>
            ほうがいい
          </Chip>
        </AtY>
      )}

      {/* rumus */}
      {t >= at.formula && (
        <AtY y={yFormula} style={{opacity: pF, transform: `translateY(-50%) scale(${pF})`}}>
          <Surface
            tone="inset"
            radius={46}
            border={hexA(acc.color, 0.6)}
            style={{padding: '18px 54px', boxShadow: `inset 4px 4px 10px rgba(0,0,0,0.5), 0 0 40px ${hexA(acc.color, 0.18)}`}}
          >
            <Formula end={end} size={72} />
          </Surface>
        </AtY>
      )}

      {/* kesimpulan */}
      {t >= at.conclusion && (
        <AtY y={yConc} style={{opacity: pC, transform: `translateY(-50%) scale(${pC})`}}>
          {conclusion}
        </AtY>
      )}
    </AbsoluteFill>
  );
};

// ---------- S16 · 0:38.08 → 0:49.17 · bentuk る = perbandingan ----------
const ConclusionRu: React.FC = () => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 28}}>
      {['A', 'B'].map((l, i) => (
        <React.Fragment key={l}>
          {i === 1 && <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 40, color: C.textSecondary}}>vs</span>}
          <Surface tone="elevated" radius={30} border={FORM.ru.color} style={{padding: '4px 40px'}}>
            <span style={{fontFamily: FONT.display, fontWeight: 900, fontSize: 70, color: FORM.ru.color}}>{l}</span>
          </Surface>
        </React.Fragment>
      ))}
    </div>
    <div style={{color: C.gold, transform: 'rotate(90deg)', height: 64, display: 'flex', alignItems: 'center'}}>
      <ArrowRight size={64} stroke={3.4} />
    </div>
    <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 52, color: C.text, textShadow: '0 8px 30px rgba(0,0,0,0.8)'}}>
      pilih yang <Hi>lebih baik</Hi>
    </span>
  </div>
);

export const Scene16_RuForm: React.FC<{sfx?: boolean}> = ({sfx = true}) => (
  <FormExplain
    end="ru"
    verb={{kanji: '起', ruby: 'お', kana: 'き'}}
    translation={
      <>
        <Hi c={FORM.ru.color}>Lebih baik</Hi> bangun.
      </>
    }
    at={{sentence: 0.3, translation: 2.2, breakdown: 4.2, formula: 6.3, conclusion: 8.0}}
    conclusion={<ConclusionRu />}
    mood="awake"
    sfx={sfx}
  />
);

// ---------- S17 · 0:49.17 → 1:03.45 · bentuk た = saran ----------
const ConclusionTa: React.FC = () => (
  <Pill color={C.gold} size={46} filled style={{padding: '22px 60px'}}>
    SARAN / REKOMENDASI
  </Pill>
);

export const Scene17_TaForm: React.FC<{sfx?: boolean}> = ({sfx = true}) => (
  <FormExplain
    end="ta"
    verb={{kanji: '寝', ruby: 'ね', kana: ''}}
    translation={
      <>
        <Hi c={FORM.ta.color}>Sebaiknya</Hi> tidur.
      </>
    }
    at={{sentence: 0.3, translation: 2.4, transform: 4.6, breakdown: 7.0, formula: 9.2, conclusion: 11.2}}
    transform={{
      from: (
        <>
          <ruby>
            寝<rt style={{fontSize: 26, color: C.gold}}>ね</rt>
          </ruby>
          る
        </>
      ),
      to: (
        <>
          <ruby>
            寝<rt style={{fontSize: 26, color: C.gold}}>ね</rt>
          </ruby>
          た
        </>
      ),
      note: 'る → た',
    }}
    conclusion={<ConclusionTa />}
    mood="sleepy"
    sfx={sfx}
  />
);
