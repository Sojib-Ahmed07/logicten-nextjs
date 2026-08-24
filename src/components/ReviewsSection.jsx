"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Turnstile } from '@marsidev/react-turnstile';
import { supabase } from '@/lib/supabase'; // Ensure this points to your standard public Supabase client
import { 
  Star, 
  ShieldCheck, 
  Quote, 
  ThumbsUp, 
  MapPin, 
  CheckCircle2, 
  PlusCircle, 
  X, 
  Send,
  Loader2
} from 'lucide-react';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    service: '',
    comment: ''
  });
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [captchaToken, setCaptchaToken] = useState('');

  // 1. Fetch Approved Reviews from Supabase
  useEffect(() => {
    async function fetchReviews() {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .eq('is_approved', true)
          .order('created_at', { ascending: false });

        if (!error && data) {
          setReviews(data);
        }
      } catch (err) {
        console.error('Failed to load reviews:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  // Calculate Dynamic Average Rating & Total Count
  const totalReviewsCount = reviews.length;
  const averageRating = totalReviewsCount > 0
    ? (reviews.reduce((acc, r) => acc + Number(r.rating), 0) / totalReviewsCount).toFixed(1)
    : "5.0";

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Submit Review to API Endpoint
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!captchaToken) {
      setErrorMessage('Please complete the Cloudflare security verification.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/submit-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          location: formData.location,
          service: formData.service,
          comment: formData.comment,
          rating: newRating,
          captchaToken
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit review.');
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsModalOpen(false);
        setFormData({ name: '', location: '', service: '', comment: '' });
        setNewRating(5);
        setCaptchaToken('');
      }, 3000);
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="relative z-10 pt-8 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-600 dark:text-amber-300 text-xs font-black tracking-widest uppercase backdrop-blur-md">
            <ThumbsUp className="w-3.5 h-3.5 fill-current" /> Verified Local Feedback
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Trusted by <span className="text-yellow-600 dark:text-amber-300">Sydney Homes & Businesses</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            See why homeowners and commercial clients rely on Logic Ten Electrical for safety, speed, and standard compliance.
          </p>
        </div>

        {/* Dynamic Overall Rating Banner */}
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-yellow-500/20 shadow-xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-yellow-500/10 dark:bg-yellow-400/20 text-yellow-600 dark:text-amber-300 rounded-2xl shrink-0">
              <Star className="w-8 h-8 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black text-slate-900 dark:text-white">{averageRating}</span>
                <div className="flex text-yellow-500 dark:text-amber-300">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
                Based on {totalReviewsCount > 0 ? totalReviewsCount : '120+'} Sydney Electrical Projects
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="hidden lg:flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-100/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <ShieldCheck className="w-5 h-5 text-yellow-600 dark:text-amber-300 shrink-0" />
              <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                100% Guaranteed
              </span>
            </div>

            {/* Modal Trigger */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsModalOpen(true)}
              className="relative group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all cursor-pointer overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <PlusCircle className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" />
              <span>Write a Review</span>
            </motion.button>
          </div>
        </div>

        {/* Dynamic Reviews Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-yellow-500 animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-yellow-500/20 shadow-lg dark:shadow-[0_0_30px_rgba(250,204,21,0.05)] backdrop-blur-xl transition-all"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-200/60 dark:text-slate-800/40 pointer-events-none" />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex text-yellow-500 dark:text-amber-300">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    {review.service && (
                      <span className="inline-block text-[11px] font-black uppercase tracking-wider text-yellow-600 dark:text-amber-300 bg-yellow-500/10 px-2.5 py-1 rounded-md">
                        {review.service}
                      </span>
                    )}
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                        {review.name}
                      </h3>
                      <CheckCircle2 className="w-4 h-4 text-yellow-600 dark:text-amber-300 shrink-0" />
                    </div>
                    {review.location && (
                      <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-xs mt-0.5">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span>{review.location}</span>
                      </div>
                    )}
                  </div>

                  <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                    {review.created_at ? new Date(review.created_at).toLocaleDateString() : 'Verified Client'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Review Submission Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-yellow-500/30 shadow-2xl dark:shadow-[0_0_50px_rgba(250,204,21,0.15)] z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-yellow-500/20 text-yellow-600 dark:text-amber-300 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    Submitted for Moderation!
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Thank you! Your feedback will go live on the site as soon as it is reviewed by our team.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <span className="text-xs font-black tracking-widest text-yellow-600 dark:text-amber-300 uppercase">
                      Client Feedback
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                      Rate Your Experience
                    </h3>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium">
                      {errorMessage}
                    </div>
                  )}

                  {/* Rating Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                      Rating
                    </label>
                    <div className="flex gap-2 text-yellow-500 dark:text-amber-300">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 transition-transform hover:scale-125 focus:outline-none"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              star <= (hoverRating || newRating)
                                ? 'fill-current'
                                : 'text-slate-300 dark:text-slate-700'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Text Inputs */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                        Your Name
                      </label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-yellow-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                        Suburb / Location
                      </label>
                      <input
                        required
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g. Parramatta, NSW"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-yellow-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                      Service Delivered
                    </label>
                    <input
                      required
                      type="text"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      placeholder="e.g. EV Charger Installation"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-yellow-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                      Your Feedback
                    </label>
                    <textarea
                      required
                      rows={3}
                      name="comment"
                      value={formData.comment}
                      onChange={handleInputChange}
                      placeholder="How was the service, timing, and safety standards?"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Cloudflare Turnstile Verification */}
                  <div className="flex justify-center py-2">
                    <Turnstile
                      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                      onSuccess={(token) => {
                        setCaptchaToken(token);
                        setErrorMessage('');
                      }}
                      onError={() => {
                        setCaptchaToken('');
                        setErrorMessage('Captcha verification failed. Please try again.');
                      }}
                      onExpire={() => {
                        setCaptchaToken('');
                        setErrorMessage('Captcha token expired. Please verify again.');
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Review</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}