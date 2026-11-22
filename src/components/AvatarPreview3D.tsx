import React, { useEffect, useRef, useState } from 'react';
import type { AvatarConfig } from '../types/game';
import { SoftwareRenderer3D } from '../engine/renderer3d';

interface AvatarPreview3DProps {
  avatar: AvatarConfig;
  weaponLevel?: number;
  previewAction?: 'idle' | 'attack' | 'power';
  className?: string;
  autoRotate?: boolean;
  caption?: string;
}

export const AvatarPreview3D: React.FC<AvatarPreview3DProps> = ({
  avatar,
  weaponLevel = 1,
  previewAction = 'idle',
  className = '',
  autoRotate = true,
  caption,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<SoftwareRenderer3D | null>(null);
  const yawRef = useRef(0.35);
  const dragRef = useRef<{ active: boolean; lastX: number }>({ active: false, lastX: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const avatarRef = useRef(avatar);
  avatarRef.current = avatar;
  const actionRef = useRef(previewAction);
  actionRef.current = previewAction;
  const weaponLevelRef = useRef(weaponLevel);
  weaponLevelRef.current = weaponLevel;
  const autoRotateRef = useRef(autoRotate);
  autoRotateRef.current = autoRotate;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!rendererRef.current) {
      rendererRef.current = new SoftwareRenderer3D();
    }

    let rafId = 0;
    let lastTs = performance.now();
    let elapsed = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(240, Math.floor(rect.width * dpr));
      const h = Math.max(220, Math.floor(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - lastTs) / 1000);
      lastTs = now;
      elapsed += dt;

      if (autoRotateRef.current && !dragRef.current.active) {
        yawRef.current += dt * 0.42;
      }

      rendererRef.current?.renderAvatarShowcase(
        ctx,
        canvas.width,
        canvas.height,
        avatarRef.current,
        yawRef.current,
        elapsed,
        actionRef.current,
        weaponLevelRef.current
      );

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    dragRef.current = { active: true, lastX: e.clientX };
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.lastX;
    dragRef.current.lastX = e.clientX;
    yawRef.current -= dx * 0.012;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    dragRef.current.active = false;
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div className={`relative overflow-hidden bg-[#0D1422] select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`w-full h-full block ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      />
      {caption && (
        <div className="pointer-events-none absolute bottom-3 inset-x-0 flex justify-center">
          <span className="text-xs text-[#CBD5E1] bg-[#0B101D]/85 px-3 py-1 rounded border border-[#E6B85C]/25">
            {caption}
          </span>
        </div>
      )}
    </div>
  );
};
