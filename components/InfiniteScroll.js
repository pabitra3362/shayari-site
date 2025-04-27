"use client"
import { useEffect, useRef } from 'react';

export default function InfiniteScroll({ loadMore }) {
  const observerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && loadMore(),
      { threshold: 0.1 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  return <div ref={observerRef} className="h-10" />;
}