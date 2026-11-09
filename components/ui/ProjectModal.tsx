'use client';

import React, { useEffect, useState } from 'react';
import { Project } from '@/types/project';
import Icon from '@/components/Icon';
import Button from '@/components/ui/Buttons';
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
    status,
    githubUrl,
    details,
  } = project;

  const mediaList = details?.media || [];
  const currentMedia = mediaList[selectedMediaIndex];

  return (
    <div
      className="modal-backdrop project-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div className="modal-container project-modal-container bg-[#131B2E] border border-sky-500/20 rounded-xl max-w-4xl w-[94vw] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="modal-header project-modal-header flex items-center justify-between border-b border-slate-700/60 bg-[#131B2E]/95 px-6 py-4">
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
              {status && (
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 uppercase">
                  {status}
                </span>
              )}
            </div>
            <h2 id="project-modal-title" className="text-xl md:text-2xl font-bold text-white tracking-tight">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="modal-close-button p-2 text-slate-400 hover:text-white rounded border border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition-colors"
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
        <div className="modal-body project-modal-body p-6 space-y-6 text-slate-300">
          {/* Tagline / Main Description */}
          <div>
            <p className="text-base text-slate-200 leading-relaxed font-normal">
              {tagline || description}
            </p>
          </div>

          {/* Hero Media + Thumbnail Gallery */}
          {mediaList.length > 0 && (
            <div className="space-y-3 bg-slate-900/60 p-4 rounded-lg border border-slate-800">
              <div className="project-media-viewer relative overflow-hidden rounded-md bg-slate-950 flex items-center justify-center min-h-[220px] max-h-[420px]">
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
                      className="project-media-arrow project-media-arrow-previous"
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
                      className="project-media-arrow project-media-arrow-next"
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
