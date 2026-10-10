import React from 'react';
import {At, kf, useF} from './kit';
import {BoxCard, CalendarCard, SHEET_CY, SheetCard} from './props';
import {T} from './timing';

// Lapisan persisten: kalender, kotak barang, dan lembar kalimat hidup dari S01 sampai S29.
// Hanya berpindah posisi, skala, dan opasitas. Isi lembar dipasang babak (scenes/) di atasnya.
// Semua anchor = detik narasi (lihat storyboard).

type K = [number, number][];

// Kalender: masuk dari kiri → tengah (membesar) → lajur kiri · lajur kiri/tengah bergantian
const CAL_X: K = [
  [0.2, -420], [1.0, 250], [2.5, 250], [3.2, 470], [16.4, 470], [17.2, 290], [25.4, 290], [26.2, 420],
  [33.0, 420], [33.8, 290], [43.8, 290], [44.6, 470], [49.8, 470], [50.6, 150], [71.2, 150], [72.0, 200],
  [74.9, 200], [75.7, 400], [78.8, 400], [79.6, 250], [83.6, 250], [84.4, 420],
];
const CAL_Y: K = [
  [0.2, 960], [1.0, 960], [2.5, 960], [3.2, 880], [16.4, 880], [17.2, 1010], [25.4, 1010], [26.2, 860],
  [33.0, 860], [33.8, 1010], [43.8, 1010], [44.6, 880], [49.8, 880], [50.6, 940], [71.2, 940], [72.0, 1010],
  [74.9, 1010], [75.7, 880], [78.8, 880], [79.6, 1010],
];
const CAL_S: K = [
  [0.2, 0.8], [1.0, 0.9], [2.5, 0.9], [3.2, 1.25], [16.4, 1.25], [17.2, 0.95], [25.4, 0.95], [26.2, 1.15],
  [33.0, 1.15], [33.8, 0.9], [43.8, 0.9], [44.6, 1.0], [49.8, 1.0], [50.6, 0.75], [71.2, 0.75], [72.0, 0.95],
  [74.9, 0.95], [75.7, 1.05], [78.8, 1.05], [79.6, 0.9],
];
const CAL_O: K = [[0.2, 0], [0.6, 1], [49.8, 1], [50.6, 0.45], [52.5, 0.45], [53.5, 0], [71.2, 0], [72.0, 1], [83.6, 1], [84.6, 0]];

// Kotak: masuk dari kanan → lajur kanan · meluncur & pantul di atas kalender · lalu turun ke lantai
const BOX_X: K = [
  [0.9, 1500], [1.8, 830], [9.2, 830], [9.8, 540], [16.4, 540], [17.2, 830], [22.25, 830], [23.0, 640],
  [25.4, 640], [26.2, 830], [43.8, 830], [44.6, 830], [49.8, 540], [59.9, 540], [60.6, 540], [71.2, 540],
  [72.0, 830], [74.9, 830], [75.7, 740], [78.8, 740], [79.6, 830],
];
const BOX_Y: K = [
  [0.9, 960], [1.8, 960], [9.2, 960], [9.8, 610], [10.1, 585], [10.4, 610], [16.4, 610], [17.2, 1010],
  [22.25, 1010], [23.0, 1040], [25.4, 1040], [26.2, 1010], [43.8, 1010], [44.6, 1010], [49.8, 880],
  [59.9, 880], [60.6, 1010], [71.2, 1010],
];
const BOX_S: K = [
  [0.9, 0.9], [9.8, 0.55], [16.4, 0.55], [17.2, 0.95], [22.25, 0.95], [23.0, 0.8], [25.4, 0.8], [26.2, 0.95],
  [43.8, 0.95], [44.6, 0.95], [49.8, 1.25], [59.9, 1.25], [60.6, 1.05], [71.2, 1.05], [72.0, 0.95],
];
const BOX_O: K = [[0.9, 0], [1.5, 1], [83.6, 1], [84.6, 0]];

// Lembar: naik dari bawah, di bawah tengah layar, memudar saat ponsel CTA masuk
const SHEET_Y: K = [[0.5, 1900], [1.4, SHEET_CY]];
const SHEET_O: K = [[0.5, 0], [1.0, 1], [100.6, 1], [101.1, 0]];

export const Stage: React.FC = () => {
  const f = useF();
  // kalender "berputar" di S02: halaman hari ini terangkat untuk memperlihatkan besok (kembali di S08)
  const turn = kf(f, [
    [3.0, 0],
    [4.2, 1],
    [22.25, 1],
    [23.0, 0],
  ]);
  // halaman besok menampilkan 試験 mulai S09
  const exam = f >= T(29.66);

  return (
    <>
      <At x={kf(f, CAL_X)} y={kf(f, CAL_Y)} s={kf(f, CAL_S)} o={kf(f, CAL_O)} z={20}>
        <CalendarCard turn={turn} exam={exam} />
      </At>
      <At x={kf(f, BOX_X)} y={kf(f, BOX_Y)} s={kf(f, BOX_S)} o={kf(f, BOX_O)} z={21}>
        <BoxCard />
      </At>
      <At x={540} y={kf(f, SHEET_Y)} o={kf(f, SHEET_O)} z={22}>
        <SheetCard />
      </At>
    </>
  );
};
