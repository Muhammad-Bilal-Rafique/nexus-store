'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Send, Loader2, Instagram, Facebook } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate a network request (we can hook this to an API later)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    setSent(true);
  };

  return (
    <>
        <Navbar/>
    <div className="mt-14 min-h-screen bg-bg-secondary py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* --- LEFT SIDE: Info & Vibe --- */}
        <div className="flex flex-col justify-between space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-text-primary mb-2">Let's Chat, Get in Touch</h1>
            <p className="text-lg text-gray-500">
              Have a question about your order or just want to say salam? We are here for you.
            </p>
          </div>

          <div className="space-y-6">
            {/* Address Card */}
            <div className="flex items-start space-x-4 p-6 bg-bg-primary rounded-3xl shadow-sm border border-gray-100">
              <div className="p-3 bg-action/10 rounded-full text-action">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-text-primary">Headquarters</h3>
                <p className="text-gray-500">Nexus Tower, Main Blvd<br/>Gulberg III, Lahore, Pakistan</p>
              </div>
            </div>

            {/* Email Card */}
            <div className="flex items-start space-x-4 p-6 bg-bg-primary rounded-3xl shadow-sm border border-gray-100">
              <div className="p-3 bg-action/10 rounded-full text-action">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-text-primary">Email Us</h3>
                <p className="text-gray-500">bilalrafique271@gmail.com</p>
                <p className="text-gray-500">nexus@gmail.com</p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="flex items-start space-x-4 p-6 bg-bg-primary rounded-3xl shadow-sm border border-gray-100">
              <div className="p-3 bg-action/10 rounded-full text-action">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-text-primary">Call Us</h3>
                <p className="text-gray-500">+92041054477</p>
                <p className="text-gray-400 text-sm">(Mon-Fri, 9am - 6pm)</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: The Form --- */}
        <div className="bg-bg-primary rounded-[2.5rem] shadow-xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative background blob */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-nexus-color/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

            <h2 className="text-2xl font-bold text-text-primary mb-8">Send a Message</h2>

            {sent ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-state-success/10 rounded-full flex items-center justify-center mb-6">
                        <CheckmarkIcon className="w-10 h-10 text-state-success" />
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary">Message Received!</h3>
                    <p className="text-gray-500 mt-2">Shukriya! Our team will get back to you within 24 hours.</p>
                    <button 
                        onClick={() => setSent(false)}
                        className="mt-8 text-action font-semibold hover:underline"
                    >
                        Send another message
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 ml-1">Name</label>
                            <input 
                                required
                                type="text" 
                                placeholder="Ali Khan"
                                className="w-full px-4 py-3 rounded-xl bg-bg-secondary border-none focus:ring-2 focus:ring-nexus-color transition-all outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
                            <input 
                                required
                                type="email" 
                                placeholder="ali@example.com"
                                className="w-full px-4 py-3 rounded-xl bg-bg-secondary border-none focus:ring-2 focus:ring-nexus-color transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 ml-1">Subject</label>
                        <select className="w-full px-4 py-3 rounded-xl bg-bg-secondary border-none focus:ring-2 focus:ring-nexus-color transition-all outline-none text-gray-600">
                            <option>Order Status</option>
                            <option>Product Inquiry</option>
                            <option>Returns & Exchange</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 ml-1">Message</label>
                        <textarea 
                            required
                            rows={5}
                            placeholder="How can we help you today?"
                            className="w-full px-4 py-3 rounded-xl bg-bg-secondary border-none focus:ring-2 focus:ring-nexus-color transition-all outline-none resize-none"
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-4 bg-action hover:bg-action-hover text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <>Send Message <Send size={20} /></>}
                    </button>
                </form>
            )}
        </div>

      </div>
    </div>
      <Footer/>
      </>
  );
}