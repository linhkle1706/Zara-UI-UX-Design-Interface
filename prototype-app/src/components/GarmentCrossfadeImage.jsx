import React, { useState, useEffect, useRef } from 'react';

export const GarmentCrossfadeImage = ({
  src,
  alt = 'Product Image',
  className = '',
  style = {},
  zoomLevel = 1,
}) => {
  const [layers, setLayers] = useState([
    { id: 1, src, isNew: false }
  ]);
  const prevSrcRef = useRef(src);

  useEffect(() => {
    if (!src || src === prevSrcRef.current) return;
    prevSrcRef.current = src;

    const newLayerId = Date.now();
    setLayers(prev => {
      const top = prev[prev.length - 1];
      return [
        { ...top, isNew: false },
        { id: newLayerId, src, isNew: true }
      ];
    });

    const timer = setTimeout(() => {
      setLayers(prev => {
        const latest = prev.find(l => l.id === newLayerId);
        return latest ? [{ ...latest, isNew: false }] : prev;
      });
    }, 450);

    return () => clearTimeout(timer);
  }, [src]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {layers.map((layer, index) => {
        const isTopIncoming = layer.isNew;
        return (
          <img
            key={layer.id}
            src={layer.src}
            alt={alt}
            style={{
              ...style,
              transform: `scale(${zoomLevel})`,
            }}
            className={`w-full h-full object-cover object-top ${
              index > 0 ? 'absolute inset-0' : 'relative'
            } ${
              isTopIncoming ? 'animate-garment-dissolve' : 'opacity-100'
            }`}
          />
        );
      })}
    </div>
  );
};
