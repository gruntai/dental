"use client";
import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { cn } from "@/lib/utils";
const NUMBER_OF_SLIDES = 5;
// Custom Pagination Component
const CustomPagination = ({
  activeIndex,
  onSlideChange,
}: {
  activeIndex: number;
  onSlideChange: (index: number) => void;
}) => {
  return (
    <div className="flex justify-start gap-2 2xl:gap-3 mt-10 ml-1">
      {[...Array(NUMBER_OF_SLIDES)].map((_, index) => {
        return (
          <button
            key={index}
            onClick={() => onSlideChange(index)} // Navigate to the corresponding slide
            className={cn(
              `w-2 h-2 2xl:w-4 2xl:h-4 rounded-full bg-gray-300 transition-all duration-300`,
              {
                "bg-[#0E3A78]": index === activeIndex, // Change color when active
              }
            )}
          />
        );
      })}
    </div>
  );
};

export function CarouselInfo() {
  const [activeIndex, setActiveIndex] = React.useState(0); // Track active index
  const [swiperInstance, setSwiperInstance] = React.useState<any>(null); // Store Swiper instance

  // Handle the slide change event
  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex); // Update the active index state
  };

  // Handle custom pagination click
  const handlePaginationClick = (index: number) => {
    setActiveIndex(index); // Update the active index state
    if (swiperInstance) {
      swiperInstance.slideTo(index); // Navigate to the clicked slide
    }
  };

  // Auto-slide functionality
  React.useEffect(() => {
    if (swiperInstance) {
      const autoSlideInterval = setInterval(() => {
        swiperInstance.slideNext();
      }, 5000);

      return () => clearInterval(autoSlideInterval);
    }
  }, [swiperInstance]);

  return (
    <div className="flex items-center justify-center h-full w-full max-w-[400px] 2xl:max-w-2xl px-5 xl:px-0 2xl:px-20 mx-auto">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        className="relative"
        modules={[Pagination]}
        onSlideChange={handleSlideChange} // Update state when the slide changes
        onSwiper={(swiper) => setSwiperInstance(swiper)} // Store Swiper instance
      >
        {[...Array(NUMBER_OF_SLIDES)].map((_, index) => (
          <SwiperSlide key={index}>
            <div className="space-y-10">
              <p className="text-2xl 2xl:text-3xl leading-10 2xl:leading-relaxed">
                60% of new patients come from marketing, and their trust needs
                to be massaged. Your current appointment system can’t do that on
                its own.
              </p>
              <p className="text-2xl 2xl:text-3xl leading-10 2xl:leading-relaxed">
                Grunt is here to help with that!
              </p>
            </div>
          </SwiperSlide>
        ))}
        {/* Custom Pagination */}
        <CustomPagination
          activeIndex={activeIndex}
          onSlideChange={handlePaginationClick} // Pass the handler to navigate slides
        />
      </Swiper>
    </div>
  );
}
