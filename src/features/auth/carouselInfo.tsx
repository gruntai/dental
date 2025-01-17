"use client";
import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { cn } from "@/lib/utils";

const slidesContent = [
  {
    p1: "Did you know that just one missed lead or no-show per day can cost $20K–$70K annually?",
    p2: "Most practices miss up to 60% of leads and face 15–20% no-show rates!",
  },
  {
    p1: "60% of new patients come from marketing, and their trust needs to be massaged. Your current appointment system can’t do that on its own.",
    p2: "Grunt is here to help with that!",
  },
  {
    p1: "The current PMS and under-resourced front desks only handle basic scheduling and patient communication.",
    p2: "They do nothing for conversions or loss prevention.",
  },
  {
    p1: "Existing patients are sometimes unreliable, 15-20% of them miss their appointments or cancel last minute.",
    p2: "Grunt detects no shows and instantly fills gaps with your waitlist.",
  },
];

export function CarouselInfo() {
  const [activeIndex, setActiveIndex] = React.useState(0); // Track active index
  const [swiperInstance, setSwiperInstance] = React.useState<any>(null); // Store Swiper instance

  // Handle the slide change event
  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex); // Update the active index (use `realIndex` for looped sliders)
  };

  // Handle custom pagination click
  const handlePaginationClick = (index: number) => {
    setActiveIndex(index); // Update the active index
    if (swiperInstance) {
      swiperInstance.slideToLoop(index); // Navigate to the clicked slide (handles loop)
    }
  };

  // Auto-slide functionality
  React.useEffect(() => {
    if (swiperInstance) {
      const autoSlideInterval = setInterval(() => {
        swiperInstance.slideNext(); // Automatically move to the next slide
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
        onSlideChange={handleSlideChange} // Update active index on slide change
        onSwiper={(swiper) => setSwiperInstance(swiper)} // Store Swiper instance
        loop={true} // Enable looping
      >
        {slidesContent.map((content, index) => (
          <SwiperSlide key={index}>
            <div className="space-y-10">
              <p className="text-2xl 2xl:text-3xl leading-10 2xl:leading-relaxed">
                {content.p1}
              </p>
              <p className="text-2xl 2xl:text-3xl leading-10 2xl:leading-relaxed">
                {content.p2}
              </p>
            </div>
          </SwiperSlide>
        ))}
        {/* Custom Pagination */}
        <CustomPagination
          activeIndex={activeIndex}
          totalSlides={slidesContent.length}
          onSlideChange={handlePaginationClick} // Pass handler for slide change
        />
      </Swiper>
    </div>
  );
}

const CustomPagination = ({
  activeIndex,
  totalSlides,
  onSlideChange,
}: {
  activeIndex: number;
  totalSlides: number;
  onSlideChange: (index: number) => void;
}) => {
  return (
    <div className="flex justify-start gap-2 2xl:gap-3 mt-10 ml-1">
      {[...Array(totalSlides)].map((_, index) => (
        <button
          key={index}
          onClick={() => onSlideChange(index)} // Navigate to the corresponding slide
          className={cn(
            `w-2 h-2 2xl:w-4 2xl:h-4 rounded-full bg-gray-300 transition-all duration-300`,
            {
              "bg-[#0E3A78]": index === activeIndex, // Change color for the active dot
            }
          )}
        />
      ))}
    </div>
  );
};
