"use client";
import React from 'react';
import { Star, Calendar } from 'lucide-react';

const Reviews = ({ reviews }) => {
  // If no reviews, show empty state
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-bg-secondary rounded-3xl mt-8 border border-dashed border-gray-200">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="w-8 h-8 text-gray-300" />
        </div>
        <h3 className="text-lg font-bold text-gray-500">No reviews yet</h3>
        <p className="text-sm text-gray-400">Be the first to rate this product!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 mt-12">
      <div className="flex items-center gap-3">
        <h3 className="text-2xl font-black text-text-primary uppercase tracking-tight">
          Customer Reviews 
        </h3>
        <span className="px-3 py-1 bg-nexus-color/10 text-nexus-color font-bold rounded-full text-sm">
          {reviews.length}
        </span>
      </div>

      <div className="grid gap-6">
        {reviews.map((review) => {
          // 1. Get Name safely
          const userName = review.user?.name || "Nexus Customer";
          
          // 2. Get First Letter (for the Avatar)
          const firstLetter = userName.charAt(0).toUpperCase();

          // 3. Format Date
          const date = new Date(review.createdAt).toLocaleDateString("en-PK", {
            year: 'numeric', month: 'short', day: 'numeric'
          });

          return (
            <div 
              key={review._id} 
              className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  
                  {/* --- THE LETTER AVATAR --- */}
                  <div className="w-12 h-12 rounded-full bg-nexus-color/10 flex items-center justify-center shrink-0 border border-nexus-color/20">
                    <span className="text-xl font-black text-nexus-color">
                      {firstLetter}
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-text-primary text-base">
                      {userName}
                    </h4>
                    {/* Stars Row */}
                    <div className="flex items-center mt-1 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={`${
                            i < review.rating 
                              ? "fill-yellow-400 text-yellow-400" 
                              : "fill-gray-100 text-gray-200"
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Date */}
                <span className="text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Calendar size={12} />
                  {date}
                </span>
              </div>

              {/* Review Comment (Indented to align with name) */}
              <div className="pl-16">
                <p className="text-gray-600 leading-relaxed text-sm bg-bg-secondary/30 p-4 rounded-xl rounded-tl-none">
                  "{review.comment}"
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reviews;