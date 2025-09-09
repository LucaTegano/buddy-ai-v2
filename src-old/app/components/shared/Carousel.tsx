"use client"
import React, { useRef, useState, Children, isValidElement } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@/app/components/icons';

interface CarouselProps {
    title: string;
    children: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ title, children }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    const validChildren = Children.toArray(children).filter(isValidElement);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setIsAtStart(scrollLeft === 0);
            setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1); // -1 for precision
        }
    };
    
    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = current.clientWidth * 0.8;
            current.scrollBy({ 
                left: direction === 'left' ? -scrollAmount : scrollAmount, 
                behavior: 'smooth' 
            });
        }
    };
    
    React.useEffect(() => {
        handleScroll(); // Initial check
        const currentRef = scrollContainerRef.current;
        currentRef?.addEventListener('scroll', handleScroll);
        
        // Also check on resize
        const resizeObserver = new ResizeObserver(handleScroll);
        if (currentRef) {
            resizeObserver.observe(currentRef);
        }

        return () => {
            currentRef?.removeEventListener('scroll', handleScroll);
            if (currentRef) {
                resizeObserver.unobserve(currentRef);
            }
        };
    }, [validChildren.length]);

    if (validChildren.length === 0) {
        return null;
    }

    return (
        <div className="relative">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-text-primary">{title}</h2>
                <div className="hidden sm:flex items-center gap-2">
                    <button 
                        onClick={() => scroll('left')} 
                        disabled={isAtStart}
                        className="p-1.5 rounded-full bg-hover/60 hover:bg-hover disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        aria-label="Scroll left"
                    >
                        <ChevronLeftIcon className="w-5 h-5 text-text-primary" />
                    </button>
                    <button 
                        onClick={() => scroll('right')} 
                        disabled={isAtEnd}
                        className="p-1.5 rounded-full bg-hover/60 hover:bg-hover disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        aria-label="Scroll right"
                    >
                        <ChevronRightIcon className="w-5 h-5 text-text-primary" />
                    </button>
                </div>
            </div>
            <div 
                ref={scrollContainerRef} 
                className="flex gap-4 overflow-x-auto pt-1 pb-4 -mb-4 snap-x snap-mandatory scrollbar-hide"
            >
                {validChildren}
            </div>
        </div>
    );
};

export default Carousel;