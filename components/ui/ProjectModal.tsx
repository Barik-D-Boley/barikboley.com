'use client';

import React, { useEffect, useState } from 'react';
import { Project } from '@/types/project';
import Icon from '@/components/Icon';
import Button from '@/components/ui/Button';
import ProjectStatusBadge from '@/components/ui/ProjectStatusBadge';
import { getProjectCoverMediaIndex } from '@/lib/project-media';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(() => {
    const coverIndex = getProjectCoverMediaIndex(project?.details?.media);
    return coverIndex === -1 ? 0 : coverIndex;
  });
  const [failedMediaUrls, setFailedMediaUrls] = useState<Set<string>>(() => new Set());

  // Handle keyboard ESC and body scroll lock
  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      const mediaCount = project.details?.media.length ?? 0;
      const target = e.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable || ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName))
      ) {
        return;
      }

      if (mediaCount < 2) return;

      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        setSelectedMediaIndex((currentIndex) =>
          e.key === 'ArrowRight'
            ? (currentIndex + 1) % mediaCount
            : (currentIndex - 1 + mediaCount) % mediaCount
        );
        return;
      }

      if (/^[1-9]$/.test(e.key)) {
        const imageIndex = Number(e.key) - 1;
        if (imageIndex < mediaCount) {
          e.preventDefault();
          setSelectedMediaIndex(imageIndex);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const {
    title,
    tagline,
    description,
    tags,
    category,
    number,
    githubUrl,
    details,
  } = project;

  const mediaList = details?.media || [];
  const currentMedia = mediaList[selectedMediaIndex];

  return (
    <div
      className="fixed inset-0 z-[100] block overflow-y-auto bg-[rgba(15,23,42,0.88)] px-4 py-10 backdrop-blur-[12px] max-[780px]:px-3 max-[780px]:py-5"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div className="relative m-0 mx-auto flex w-[min(1000px,94vw)] flex-col overflow-visible rounded-lg border border-[var(--line-strong)] bg-[#1e293b] shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
        {/* Header */}
        <div className="relative top-auto z-auto flex items-center justify-between gap-3 border-b border-[var(--line)] bg-[#1e293b] px-6 py-5 max-[780px]:p-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-amber-500 tracking-wider uppercase">
                PRJ / {number}
              </span>
              {category && (
                <span className="text-xs text-slate-400 font-mono">
                  • {category}
                </span>
              )}
              <ProjectStatusBadge status={project.status} />
            </div>
            <h2 id="project-modal-title" className="mt-[7px] text-[clamp(1.25rem,2vw,1.75rem)] font-extrabold tracking-[-0.035em] text-white">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded border border-[var(--line)] bg-[var(--panel-deep)] p-2 text-[var(--muted)] transition-colors hover:border-sky-500 hover:text-white max-[780px]:h-11 max-[780px]:w-11"
              onClick={onClose}
              aria-label="Close modal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Project details */}
        <div className="flex-none space-y-6 overflow-visible p-6 text-slate-300 max-[780px]:p-4">
          {/* Tagline / Main Description */}
          <div>
            <p className="text-base text-slate-200 leading-relaxed font-normal">
              {tagline || description}
            </p>
          </div>

          {/* Hero Media + Thumbnail Gallery */}
          {mediaList.length > 0 && (
            <div className="space-y-3 bg-slate-900/60 p-4 rounded-lg border border-slate-800">
              <div className="relative flex min-h-[220px] max-h-[420px] items-center justify-center overflow-hidden rounded-md bg-slate-950">
                {failedMediaUrls.has(currentMedia.url) ? (
                  <p className="p-6 text-center font-mono text-sm text-slate-400" role="status">
                    Project media could not be loaded.
                  </p>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={currentMedia.url}
                    alt={currentMedia.alt || currentMedia.caption || title}
                    className="w-full h-full object-contain max-h-[400px]"
                    onError={() => {
                      setFailedMediaUrls((failedUrls) => new Set(failedUrls).add(currentMedia.url));
                    }}
                  />
                )}
                {mediaList.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="absolute top-1/2 left-3 z-1 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-[rgba(255,255,255,0.78)] opacity-50 backdrop-blur-[3px] transition-[background,opacity,color] duration-150 hover:bg-[rgba(255,255,255,0.22)] hover:text-white hover:opacity-90 focus-visible:bg-[rgba(255,255,255,0.22)] focus-visible:text-white focus-visible:opacity-90 max-[780px]:h-11 max-[780px]:w-11"
                      onClick={() =>
                        setSelectedMediaIndex((index) => (index - 1 + mediaList.length) % mediaList.length)
                      }
                      aria-label="Show previous image"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 z-1 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-[rgba(255,255,255,0.78)] opacity-50 backdrop-blur-[3px] transition-[background,opacity,color] duration-150 hover:bg-[rgba(255,255,255,0.22)] hover:text-white hover:opacity-90 focus-visible:bg-[rgba(255,255,255,0.22)] focus-visible:text-white focus-visible:opacity-90 max-[780px]:h-11 max-[780px]:w-11"
                      onClick={() =>
                        setSelectedMediaIndex((index) => (index + 1) % mediaList.length)
                      }
                      aria-label="Show next image"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              {currentMedia.caption && (
                <p className="text-xs font-mono text-slate-400 text-center">
                  {currentMedia.caption}
                </p>
              )}
              {mediaList.length > 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {mediaList.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedMediaIndex(idx)}
                      aria-label={`Show ${item.alt || item.caption || `${title} image ${idx + 1}`}`}
                      aria-pressed={selectedMediaIndex === idx}
                      className={`relative flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                        selectedMediaIndex === idx
                          ? 'border-sky-400 opacity-100 scale-105'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      {failedMediaUrls.has(item.url) ? (
                        <span className="flex h-full w-full items-center justify-center bg-slate-900 text-[8px] text-slate-400">
                          Unavailable
                        </span>
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.url}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                          onError={() => {
                            setFailedMediaUrls((failedUrls) => new Set(failedUrls).add(item.url));
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Sub-sections */}
          {/* 1. Problem Statement */}
          {details?.problemStatement && (
            <div className="space-y-2 border-t border-slate-800/80 pt-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-sky-400">
                Problem Statement
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {details.problemStatement}
              </p>
            </div>
          )}

          {/* 2. Key Challenges */}
          {details?.keyChallenges && details.keyChallenges.length > 0 && (
            <div className="space-y-2 border-t border-slate-800/80 pt-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-sky-400">
                Key Challenges
              </h3>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-300">
                {details.keyChallenges.map((challenge, i) => (
                  <li key={i} className="leading-relaxed">
                    <span className="text-slate-300">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 3. System Architecture */}
          {details?.systemArchitecture && (
            <div className="space-y-2 border-t border-slate-800/80 pt-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-sky-400">
                System Architecture
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {details.systemArchitecture}
              </p>
            </div>
          )}

          {/* 4. Relevant Metrics */}
          {details?.metrics && details.metrics.length > 0 && (
            <div className="space-y-3 border-t border-slate-800/80 pt-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-sky-400">
                Key Metrics
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {details.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg flex flex-col gap-1"
                  >
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">
                      {metric.label}
                    </span>
                    <span className="text-lg font-bold text-sky-300 font-mono">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tools & Tech Stack */}
          {((details?.toolsUsed && details.toolsUsed.length > 0) || (tags && tags.length > 0)) && (
            <div className="space-y-2 border-t border-slate-800/80 pt-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-sky-400">
                Tools & Technologies
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {(details?.toolsUsed || tags).map((tool, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs font-mono uppercase bg-slate-900 border border-sky-500/30 text-sky-200 rounded"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {githubUrl && (
            <div className="border-t border-slate-800/80 pt-5">
              <Button
                variant="primary"
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs"
              >
                <Icon name="github" size={14} />
                <span>View Repository on GitHub</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
