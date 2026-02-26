
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Ensure you have lucide-react installed

const ProductImageGallery = ({ images, selectedImage, setSelectedImage }) => {
  
  // Handlers for arrows
  const handlePrev = (e) => {
    e.stopPropagation(); 
    setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
    
      {/* 1. MAIN IMAGE */}
      <div className="order-1 lg:order-1 border  flex-1 relative aspect-4/5 bg-gray-100 rounded-2xl overflow-hidden group">
        <Image
          src={images[selectedImage]}
          alt="Product Main"
          className="w-full h-full object-cover"
          priority
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        {/* Navigation Arrows (Only show if multiple images) */}
        {images.length > 1 && (
          <>
            <button  
            aria-label="Button to left"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
            aria-label="Button to right"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            {/* Mobile-only Dots Indicator at bottom */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 lg:hidden">
                {images.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`w-2 h-2 rounded-full transition-all ${selectedImage === idx ? "bg-white scale-125" : "bg-white/50"}`}
                    />
                ))}
            </div>
          </>
        )}
      </div>

      {/* 2. Other Images */}
      {images.length > 1 && (
        <div className="order-2 lg:order-1 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:w-20 lg:h-125 scrollbar-hide">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative shrink-0 aspect-square w-16 lg:w-full rounded-xl overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? "border-action ring-2 ring-action/20"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                width={100}
                height={100}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;