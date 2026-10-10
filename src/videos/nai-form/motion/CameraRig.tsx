import React from 'react';

export interface CameraRigProps {
  x?: number; // Pan X (px)
  y?: number; // Pan Y (px)
  z?: number; // Camera Z distance / dolly (px)
  zoom?: number; // Scale factor, default 1
  rotate?: number; // Rotation Z (degrees)
  pitch?: number; // Rotation X (tilt)
  yaw?: number; // Rotation Y (pan angle)
  shake?: number; // Screen shake intensity (px)
  seed?: number; // Seed for deterministic shake
  origin?: string; // Transform origin, default '540px 960px'
  children: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * 60 FPS 3D Cinematic Camera Rig for SevnQuest videos.
 * Supports dolly, orbital pans, dynamic rack focus, and subtle physical hand-held shakes.
 */
export const CameraRig: React.FC<CameraRigProps> = ({
  x = 0,
  y = 0,
  z = 0,
  zoom = 1,
  rotate = 0,
  pitch = 0,
  yaw = 0,
  shake = 0,
  seed = 0,
  origin = '540px 960px',
  children,
  style,
}) => {
  // Deterministic shake based on seed
  const shakeX = shake !== 0 ? Math.sin(seed * 12.345) * shake : 0;
  const shakeY = shake !== 0 ? Math.cos(seed * 17.891) * shake : 0;

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        perspective: 1200,
        perspectiveOrigin: '540px 960px',
        transformStyle: 'preserve-3d',
        transform: `translate3d(${x + shakeX}px, ${y + shakeY}px, ${z}px) scale(${zoom}) rotate(${rotate}deg) rotateX(${pitch}deg) rotateY(${yaw}deg)`,
        transformOrigin: origin,
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
