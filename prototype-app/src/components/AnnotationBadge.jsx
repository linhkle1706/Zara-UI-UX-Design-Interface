import React from 'react';
import { useFlow } from '../context/FlowContext';

export const AnnotationBadge = ({ id, number = '1', className = '', variant = 'red' }) => {
  const { showAnnotations, setActiveAnnotationId, activeAnnotationId } = useFlow();

  if (!showAnnotations) return null;

  const isSelected = activeAnnotationId === id;
  const isRed = variant === 'red';

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setActiveAnnotationId(isSelected ? null : id);
      }}
      title="Click to view UI/UX Audit analysis"
      className={`absolute z-30 flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-black font-sans shadow-lg transition-transform transform hover:scale-125 cursor-pointer ring-2 ${
        isRed
          ? 'bg-rose-600 text-white ring-rose-300/80 animate-pulse'
          : 'bg-emerald-600 text-white ring-emerald-300/80 hover:bg-emerald-500'
      } ${isSelected ? 'scale-125 ring-4 ring-yellow-400' : ''} ${className}`}
    >
      {number}
    </button>
  );
};
