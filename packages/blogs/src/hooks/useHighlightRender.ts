"use client";
import React, { useEffect } from 'react';

const useHighlightRender = () => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const isFirstRender = React.useRef(true);
  const timerRef = React.useRef<number | null>(null);
  useEffect(() => {
    if (ref.current) {
      if (isFirstRender.current) {
        ref.current.style.outline = '1px solid yellow'
        isFirstRender.current = false
      } else {
        ref.current.style.outline = "1px solid red";
      }
    }

    timerRef.current = window.setTimeout(() => {
      if (ref.current) {
        ref.current.style.outline = "none";
      }
    }, 300);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        if (ref.current) {
          ref.current.style.outline = "none";
        }
      }
    };
  })
  return ref;
}

export default useHighlightRender;