import React from 'react';

export interface CameraRigProps {
  x?: number; // Pan X in px
  y?: number; // Pan Y in px
  zoom?: number; // Zoom factor, default 1
  rotate?: number; // Rotation in degrees
  shake?: number; // Shake intensity in px
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const CameraRig: React.FC<CameraRigProps> = ({
  x = 0,
  y = 0,
  zoom = 1,
  rotate = 0,
  shake = 0,
  children,
  style,
}) => {
  const shakeX = shake !== 0 ? (Math.random() - 0.5) * 2 * shake : 0;
  const shakeY = shake !== 0 ? (Math.random() - 0.5) * 2 * shake : 0;

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        perspective: 1200,
        transformStyle: 'preserve-3d',
        transform: `translate3d(${x + shakeX}px, ${y + shakeY}px, 0px) scale(${zoom}) rotate(${rotate}deg)`,
        transformOrigin: '540px 960px',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
