import React from 'react';
import {
  At,
  Avatar,
  BOUNCY,
  ContextCard,
  DialogueBalloon,
  HighlightSou,
  MotionArrow,
  NarrationSub,
  Win,
  mix,
  pp,
  ps,
  useT,
} from '../kit';
import {C, FONT} from '../../../shared/theme';

export const World2_Conversation: React.FC<{sfx?: boolean}> = () => {
  const T = useT(); // 0 .. 16.0s (relatif terhadap start 13.5s)
  // Subtitle timeline:
  // S06: 0.0 - 2.5s (Misalnya aku bilang: Besok libur)
  // S07: 2.5 - 5.0s (Terus kamu jawab: そうです)
  // S08: 5.0 - 7.5s ('Begitu' yang mana? Besok libur)
  // S09: 7.5 - 10.0s (Terus kalau ditambah か: そうですか)
  // S10: 10.0 - 12.0s ('Memang keadaannya seperti itu?')
  // S11: 12.0 - 14.0s (Terus ada: そう思います)
  // S12: 14.0 - 16.0s (Begitu yang dimaksud tetap hal atau pendapat)

  // S06: Balon 1 masuk dari kiri
  const b1In = pp(T, 0.2, BOUNCY);

  // S07: Balon 2 masuk dari kanan
  const b2In = pp(T, 2.7, BOUNCY);

  // S08: Panah dari Balon 2 ke Balon 1
  const arrowBack = ps(T, 5.2, 6.2);

  // S09: Huruf か menempel
  const kaPop = pp(T, 7.8, BOUNCY);

  // S11: そう思います
  const omoimasuPop = pp(T, 12.2, BOUNCY);
  const splitHighlight = T >= 13.0;

  // S12: Balon pikiran terhubung ke kartu pendapat
  const thoughtArrow = ps(T, 14.3, 15.3);

  return (
    <div style={{width: '100%', height: '100%', position: 'relative', overflow: 'hidden'}}>
      {/* S06 - S10: Percakapan 明日休み ➔ そうです ➔ そうですか (0.0s - 12.0s) */}
      <Win T={T} a={0} b={12.0}>
        {/* Header Konteks */}
        <At y={260}>
          <div
            style={{
              padding: '6px 22px',
              borderRadius: 999,
              background: `${C.indigo}22`,
              border: `1.5px solid ${C.indigo}`,
              color: C.indigoSoft,
              fontFamily: FONT.display,
              fontWeight: 800,
              fontSize: 20,
              letterSpacing: 2,
            }}
          >
            KASUS 1: PERCAKAPAN SEHARI-HARI
          </div>
        </At>

        {/* Karakter Kiri (Speaker 1 - Male) */}
        <div style={{position: 'absolute', left: 100, top: 400}}>
          <Avatar gender="male" expression="happy" height={190} />
        </div>

        {/* Balon 1: Besok libur (明日休み) */}
        <div
          style={{
            position: 'absolute',
            left: 310,
            top: 380,
            transform: `scale(${b1In})`,
            transformOrigin: 'left center',
          }}
        >
          <DialogueBalloon
            speaker="Pembicara A"
            japanese="明日休み (Ashita yasumi)"
            translation="“Besok libur.”"
            side="left"
            active={T < 2.5 || (T >= 5.0 && T < 7.5) || (T >= 10.0 && T < 12.0)}
            icon="📅"
          />
        </div>

        {/* Karakter Kanan (Speaker 2 - Female) */}
        <div style={{position: 'absolute', right: 100, top: 680}}>
          <Avatar
            gender="female"
            expression={T >= 7.5 ? 'confused' : 'confident'}
            height={190}
            flip
          />
        </div>

        {/* Balon 2: そうです / そうですか */}
        {T >= 2.5 && (
          <div
            style={{
              position: 'absolute',
              right: 310,
              top: 660,
              transform: `scale(${b2In})`,
              transformOrigin: 'right center',
            }}
          >
            <DialogueBalloon
              speaker="Kamu (Menjawab)"
              japanese={
                <span>
                  <HighlightSou />
                  {T < 7.5 ? (
                    'です。'
                  ) : (
                    <span>
                      です
                      <span
                        style={{
                          color: '#ff5c7c',
                          display: 'inline-block',
                          transform: `scale(${mix(1.3, 1, kaPop)})`,
                          marginLeft: 4,
                        }}
                      >
                        か
                      </span>
                      。
                    </span>
                  )}
                </span>
              }
              translation={T < 7.5 ? '“Memang begitu.”' : '“Begitukah? (Masa sih?)”'}
              side="right"
              active={!(T >= 5.0 && T < 7.5)}
              icon="💡"
            />
          </div>
        )}

        {/* S08: Panah kembali dari "そう" ke "Besok libur" */}
        {T >= 5.0 && T < 7.5 && (
          <>
            <MotionArrow
              x1={620}
              y1={720}
              x2={520}
              y2={480}
              p={arrowBack}
              color={C.gold}
              w={7}
              label="‘Begitu’ = Besok libur!"
            />
            <At y={960}>
              <div
                style={{
                  background: 'rgba(240, 190, 82, 0.15)',
                  border: `2px solid ${C.gold}`,
                  borderRadius: 22,
                  padding: '14px 28px',
                  color: C.goldSoft,
                  fontFamily: FONT.display,
                  fontWeight: 800,
                  fontSize: 24,
                  boxShadow: `0 0 24px ${C.gold}44`,
                  textAlign: 'center',
                }}
              >
                🎯 KATA ‘SOURESU’ MENUNJUK KE ‘BESOK LIBUR’
              </div>
            </At>
          </>
        )}

        {/* S10: Tambahan か ➔ Bertanya kebenaran keadaan */}
        {T >= 10.0 && T < 12.0 && (
          <At y={980}>
            <div
              style={{
                background: '#1f2535',
                border: `2px solid ${C.indigo}`,
                borderRadius: 24,
                padding: '18px 32px',
                textAlign: 'center',
                boxShadow: '0 12px 28px rgba(0,0,0,0.5)',
              }}
            >
              <div
                style={{
                  color: C.goldSoft,
                  fontSize: 22,
                  fontWeight: 800,
                  fontFamily: FONT.display,
                  marginBottom: 6,
                }}
              >
                PERTANYAAN KEADAAN (?):
              </div>
              <div style={{color: '#ffffff', fontSize: 26, fontWeight: 700}}>
                “Apakah keadaannya memang seperti itu?”
              </div>
            </div>
          </At>
        )}
      </Win>

      {/* S11 - S12: そう思います (12.0s - 16.0s) */}
      <Win T={T} a={12.0} b={16.0}>
        <At y={360}>
          <div
            style={{
              padding: '6px 20px',
              borderRadius: 999,
              background: `${C.gold}22`,
              border: `1.5px solid ${C.gold}`,
              color: C.gold,
              fontFamily: FONT.display,
              fontWeight: 800,
              fontSize: 20,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            BENTUK LAIN: BERPIKIR BEGITU
          </div>

          {/* Kalimat Utama: そう思います */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: '#1d2332',
              border: `2px solid ${C.borderPrimary}`,
              borderRadius: 24,
              padding: '16px 36px',
              transform: `scale(${omoimasuPop})`,
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            }}
          >
            <span
              style={{
                fontFamily: FONT.jp,
                fontSize: 60,
                color: C.gold,
                fontWeight: 900,
                padding: '4px 10px',
                borderRadius: 12,
                background: !splitHighlight ? `${C.gold}22` : 'transparent',
              }}
            >
              そう
            </span>
            <span
              style={{
                fontFamily: FONT.jp,
                fontSize: 60,
                color: '#ffffff',
                fontWeight: 900,
                padding: '4px 10px',
                borderRadius: 12,
                background: splitHighlight ? `${C.indigo}44` : 'transparent',
              }}
            >
              思います。
            </span>
          </div>
        </At>

        {/* S11: Breakdown dua bagian */}
        <At y={580}>
          <div style={{display: 'flex', gap: 20}}>
            <div
              style={{
                background: !splitHighlight ? '#2b364c' : '#1b2230',
                border: `2px solid ${!splitHighlight ? C.gold : C.borderSubtle}`,
                borderRadius: 18,
                padding: '12px 24px',
                textAlign: 'center',
              }}
            >
              <div style={{color: C.gold, fontSize: 28, fontWeight: 900, fontFamily: FONT.jp}}>
                そう
              </div>
              <div style={{color: C.goldSoft, fontSize: 18, fontWeight: 700}}>“Begitu”</div>
            </div>

            <div
              style={{
                background: splitHighlight ? '#2b364c' : '#1b2230',
                border: `2px solid ${splitHighlight ? C.indigo : C.borderSubtle}`,
                borderRadius: 18,
                padding: '12px 24px',
                textAlign: 'center',
              }}
            >
              <div style={{color: '#ffffff', fontSize: 28, fontWeight: 900, fontFamily: FONT.jp}}>
                思います
              </div>
              <div style={{color: C.indigoSoft, fontSize: 18, fontWeight: 700}}>“Berpikir / Merasa”</div>
            </div>
          </div>
        </At>

        {/* S12: Kartu Pendapat ➔ Balon Pikiran Karakter */}
        <At y={860}>
          <ContextCard
            w={520}
            title="Pendapat / Pernyataan Lawan Bicara"
            subtitle="“Begitu yang dimaksud tetaplah hal yang tadi dibicarakan”"
            icon="💭"
            active
          />
        </At>

        {thoughtArrow > 0 && (
          <MotionArrow
            x1={540}
            y1={980}
            x2={540}
            y2={1140}
            p={thoughtArrow}
            color={C.gold}
            w={6}
            label="merujuk ke"
          />
        )}

        <At y={1260}>
          <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
            <Avatar gender="female" expression="satisfied" height={190} />
            <div
              style={{
                background: '#1d273a',
                border: `1.5px solid ${C.indigo}`,
                borderRadius: 20,
                padding: '12px 20px',
                color: '#edf0f6',
                fontFamily: FONT.display,
                fontWeight: 700,
                fontSize: 22,
                maxWidth: 320,
              }}
            >
              “Saya berpendapat demikian.” (Saya pikir begitu)
            </div>
          </div>
        </At>
      </Win>

      {/* Subtitle Narasi */}
      <NarrationSub t={T} at={0.0} until={2.5}>
        “Misalnya aku bilang: ‘Besok libur.’”
      </NarrationSub>
      <NarrationSub t={T} at={2.5} until={5.0}>
        “Terus kamu jawab: <span style={{color: C.gold}}>そうです</span> (Memang begitu).”
      </NarrationSub>
      <NarrationSub t={T} at={5.0} until={7.5}>
        “‘Begitu’ yang mana? … Besok libur.”
      </NarrationSub>
      <NarrationSub t={T} at={7.5} until={10.0}>
        “Terus kalau ditambah <span style={{color: '#ff5c7c'}}>か</span>: そうですか (Begitukah?).”
      </NarrationSub>
      <NarrationSub t={T} at={10.0} until={12.0}>
        “‘Memang keadaannya seperti itu?’”
      </NarrationSub>
      <NarrationSub t={T} at={12.0} until={14.0}>
        “Terus ada: <span style={{color: C.gold}}>そう</span>思います (そう = begitu, 思います = berpikir).”
      </NarrationSub>
      <NarrationSub t={T} at={14.0} until={16.0}>
        “Begitu yang dimaksud tetap hal atau pendapat yang dibicarakan.”
      </NarrationSub>
    </div>
  );
};
