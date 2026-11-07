'use client';

import React, { useEffect, useState } from 'react';
import { Project } from '@/types/project';
import Icon from '@/components/Icon';
import Button from '@/components/ui/Buttons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  // Reset image index when project changes
  useEffect(() => {
    setSelectedMediaIndex(0);
  }, [project]);

  // Handle keyboard ESC and body scroll lock
  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
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
    liveUrl,
    demoUrl,
    details,
  } = project;

  const activeLiveUrl = liveUrl || demoUrl;
  const mediaList = details?.media || [];
  const currentMedia = mediaList[selectedMediaIndex];

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div className="modal-container bg-[#131B2E] border border-sky-500/20 rounded-xl max-w-4xl w-[94vw] max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="modal-header sticky top-0 z-30 flex items-center justify-between border-b border-slate-700/60 bg-[#131B2E]/95 backdrop-blur-md px-6 py-4">
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
            {/* Header CTAs */}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-slate-600/50 rounded transition-colors"
              >
                <Icon name="github" size={14} />
                <span>GitHub</span>
              </a>
            )}
            {activeLiveUrl && (
              <a
                href={activeLiveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-sky-300 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 rounded transition-colors"
              >
                <Icon name="arrow" size={14} />
                <span>Live Demo</span>
              </a>
            )}
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

        {/* Scrollable Body */}
        <div className="modal-body overflow-y-auto p-6 space-y-6 flex-1 text-slate-300">
          {/* Tagline / Main Description */}
          <div>
            <p className="text-base text-slate-200 leading-relaxed font-normal">
              {tagline || description}
            </p>
          </div>

          {/* Hero Media + Thumbnail Gallery */}
          {mediaList.length > 0 && (
            <div className="space-y-3 bg-slate-900/60 p-4 rounded-lg border border-slate-800">
              <div className="relative overflow-hidden rounded-md bg-slate-950 flex items-center justify-center min-h-[220px] max-h-[420px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentMedia.url}
                  alt={currentMedia.caption || title}
                  className="w-full h-full object-contain max-h-[400px]"
                />
              </div>
              {currentMedia.caption && (
                <p className="text-xs font-mono text-slate-400 text-center">
                  {currentMedia.caption}
                </p>
              )}
              {mediaList.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pt-2">
                  {mediaList.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedMediaIndex(idx)}
                      className={`relative flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                        selectedMediaIndex === idx
                          ? 'border-sky-400 opacity-100 scale-105'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.url}
                        alt={item.caption || `Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
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
              <h3 className="text-sm font-mono uppercase tracking-wider text-sky-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
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
              <h3 className="text-sm font-mono uppercase tracking-wider text-sky-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
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
              <h3 className="text-sm font-mono uppercase tracking-wider text-sky-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
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
              <h3 className="text-sm font-mono uppercase tracking-wider text-sky-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
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
              <h3 className="text-sm font-mono uppercase tracking-wider text-sky-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
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
        </div>

        {/* Footer CTAs */}
        {(githubUrl || activeLiveUrl) && (
          <div className="modal-footer border-t border-slate-700/60 bg-[#131B2E]/95 backdrop-blur-md px-6 py-4 flex flex-wrap items-center justify-end gap-3">
            {githubUrl && (
              <Button
                variant="primary"
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-xs"
              >
                <Icon name="github" size={14} />
                <span>View Repository on GitHub</span>
              </Button>
            )}
            {activeLiveUrl && (
              <Button
                variant="see-more"
                href={activeLiveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-xs"
              >
                <Icon name="arrow" size={14} />
                <span>Live Demo</span>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
