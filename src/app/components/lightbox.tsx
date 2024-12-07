'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from "next/image"

interface LightboxProps {
    images: string[];
}

const Lightbox: React.FC<LightboxProps> = ({ images }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    // Ref to hold all thumbnail elements
    const thumbnailRefs = useRef<(HTMLImageElement | undefined | null)[]>([]);

    const closeLightbox = () => setIsOpen(false);

    const nextImage = () => setCurrentIndex((currentIndex + 1) % images.length);

    const prevImage = () =>
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);

    const handleThumbnailClick = (index: number) => setCurrentIndex(index);

    // Keyboard Navigation
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (!isOpen) return;

            switch (event.key) {
                case 'ArrowRight':
                    nextImage();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'Escape':
                    closeLightbox();
                    break;
            }
        },
        [isOpen, currentIndex]
    );

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        } else {
            window.removeEventListener('keydown', handleKeyDown);
        }

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleKeyDown]);

    // Focus the current thumbnail whenever currentIndex changes
    useEffect(() => {
        if (thumbnailRefs.current[currentIndex]) {
            thumbnailRefs.current[currentIndex]?.focus();
        }
    }, [currentIndex]);

    // Disable scroll when lightbox is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = ''; // Reset on unmount
        };
    }, [isOpen]);

    return (
        <div onScroll={(e) => alert("sdsd")}>
            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                    <div className='relative flex items-center border bg-black w-28 h-20 sm:w-72 sm:h-72' key={index}>
                        <Image
                            src={'/uploads/' + image}
                            alt={`Thumbnail ${index}`}
                            style={{ objectFit: "contain" }}
                            fill
                            sizes="(max-width: 768px) 20vw, (max-width: 1200px) 50vw, 33vw"
                            className="cursor-pointer rounded shadow hover:scale-105 transition-transform duration-200"
                            onClick={() => openLightbox(index)}
                        />
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black  flex flex-col items-center justify-center z-50"
                //   onClick={closeLightbox}
                >
                    <div
                        className="relative max-w-4xl max-h-screen"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                        {/* Close Button */}
                        <button
                            className="fixed top-2 right-5 text-white text-3xl font-bold"
                            onClick={closeLightbox}
                        >
                            &times;
                        </button>

                        {/* Navigation Buttons */}
                        <button
                            className="fixed top-1/2 left-2 text-white text-3xl font-bold transform -translate-y-1/2"
                            onClick={prevImage}
                            aria-label="Previous Image"
                        >
                            &larr;
                        </button>
                        <button
                            className="fixed top-1/2 right-2 text-white text-3xl font-bold transform -translate-y-1/2"
                            onClick={nextImage}
                            aria-label="Next Image"
                        >
                            &rarr;
                        </button>

                        {/* Current Image */}
                        <div className='w-screen h-screen rounded'>
                            <Image
                                src={'/uploads/' + images[currentIndex]}
                                alt={`Lightbox ${currentIndex}`}
                                fill
                                style={{ objectFit: "contain" }}
                                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 70vw"
                            // className="max-w-full max-h-screen rounded"
                            />
                        </div>
                    </div>

                    {/* Thumbnail Carousel */}
                    <div className="fixed bottom-8 mt-6 flex gap-2 overflow-x-auto">
                        {images.map((image, index) => (
                            <Image
                                key={index}
                                src={'/uploads/' + image}
                                alt={`Thumbnail ${index}`}
                                width={50}
                                height={50}
                                // @ts-ignore
                                ref={(el) => (thumbnailRefs.current[index] = el)} // Attach ref to each thumbnail
                                tabIndex={0} // Make it focusable
                                className={`cursor-pointer w-20 h-20 rounded border-2 ${currentIndex === index
                                    ? 'border-lime-300 border-4'
                                    : 'border-transparent'
                                    } hover:border-white transition duration-200`}
                                onClick={() => handleThumbnailClick(index)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Lightbox;
