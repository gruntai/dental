"use client";
import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Custom Pagination Component
// const CustomPagination = ({
//   activeIndex,
//   onSlideChange,
// }: {
//   activeIndex: number;
//   onSlideChange: (index: number) => void;
// }) => {
//   return (
//     <div className="flex justify-center gap-3 mt-5">
//       {[...Array(4)].map((_, index) => {
//         return (
//           <button
//             key={index}
//             onClick={() => onSlideChange(index)} // Navigate to the corresponding slide
//             className={cn(
//               `w-3 h-3 rounded-full bg-gray-300 transition-all duration-300`,
//               {
//                 "bg-[#0E3A78]": index === activeIndex, // Change color when active
//               }
//             )}
//           />
//         );
//       })}
//     </div>
//   );
// };

export function CarouselInfo() {
  // const [activeIndex, setActiveIndex] = React.useState(0); // Track active index

//   // Handle the slide change event
//   const handleSlideChange = (swiper: any) => {
//     setActiveIndex(swiper.activeIndex); // Update the active index state
//   };

  return (
    <div className="flex items-center justify-center h-full w-full px-20 mx-auto text-2xl">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        className="relative"
        modules={[Pagination]}
        // onSlideChange={handleSlideChange} // Update state when the slide changes
      >
        {[...Array(4)].map((_, index) => (
          <SwiperSlide key={index}>
            <div className="p-1 space-y-5">
              <p>
                60% of new patients come from marketing, and their trust needs
                to be massaged. Your current appointment system can’t do that on
                its own.
              </p>
              <p>Grunt is here to help with that!</p>
            </div>
          </SwiperSlide>
        ))}
        {/* Custom Pagination */}
        {/* <CustomPagination
          activeIndex={activeIndex}
          onSlideChange={(index) => setActiveIndex(index)}
        /> */}
      </Swiper>
    </div>
  );
}
