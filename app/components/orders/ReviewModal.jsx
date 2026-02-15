"use client";
import { useState } from "react";
import { Star, X, Loader2 } from "lucide-react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast"; // Recommend adding toast for better UX

// Add onSuccess to props
export default function ReviewModal({ product, isOpen, onClose, onSuccess }) {
  const { data: session } = useSession();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
    
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return null;

    setLoading(true);
    
    // Determine the ID safely
    const targetProductId = product.product || product.productId || product._id;

    try {      
      await axios.post("/api/reviews", {
        userId: session.user.id,
        productId: targetProductId,
        userEmail: session.user.email,
        rating,
        comment,
      });

      // --- 🔥 CALL SUCCESS FUNCTION ---
      if (onSuccess) {
        onSuccess(targetProductId);
      }
      
      onClose(); // Close modal
      
    } catch (error) {
       console.error(error);
       alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      
      {/* Modal Content */}
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 relative">
        
        {/* Header */}
        <div className="bg-bg-secondary p-6 flex justify-between items-center border-b border-gray-100">
          <div>
            <h3 className="text-xl font-bold text-text-primary">Write a Review</h3>
            <p className="text-sm text-gray-500 truncate max-w-[250px]">{product.title || product.name}</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Star Rating */}
            <div className="flex flex-col items-center gap-2">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Rate this product</span>
                <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(rating)}
                    className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                    >
                    <Star
                        size={32}
                        className={`${
                        star <= (hover || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-200"
                        } transition-colors`}
                    />
                    </button>
                ))}
                </div>
            </div>

            {/* Comment Box */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Your Experience</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    placeholder="Did you like the quality? How was the fit?"
                    className="w-full p-4 rounded-xl bg-bg-secondary border-none focus:ring-2 focus:ring-nexus-color outline-none resize-none text-gray-700"
                    required
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-action hover:bg-action-hover text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
                {loading ? <Loader2 className="animate-spin" /> : "Post Review"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}