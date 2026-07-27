import React, { useState } from 'react';
import { X, ShoppingCart, Check, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { PRODUCT_CARDS } from '../data/djiData';
import { ProductCard } from '../types';

interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: ProductCard | null;
}

export const BuyModal: React.FC<BuyModalProps> = ({ isOpen, onClose, selectedProduct }) => {
  const [activeItem, setActiveItem] = useState<ProductCard>(
    selectedProduct || PRODUCT_CARDS[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  React.useEffect(() => {
    if (selectedProduct) {
      setActiveItem(selectedProduct);
    }
  }, [selectedProduct]);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-lg text-slate-900">Aero Vision Official Store</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
              In Stock
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Product Selector Tabs */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Select Product Model
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PRODUCT_CARDS.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => setActiveItem(prod)}
                  className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                    activeItem.id === prod.id
                      ? 'border-[#0070d2] bg-blue-50/50 text-[#0070d2] shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <p className="truncate">{prod.title}</p>
                  <p className="text-[10px] text-slate-500 font-normal truncate">{prod.subtitle}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Active Product Preview */}
          <div className="flex flex-col sm:flex-row gap-6 items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="w-full sm:w-48 h-40 flex items-center justify-center bg-white rounded-lg p-2 shadow-2xs">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="max-h-full max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <span className="text-xs font-medium text-slate-500">{activeItem.category}</span>
              <h3 className="text-xl font-bold text-slate-900">{activeItem.title}</h3>
              <p className="text-xs text-slate-600">{activeItem.subtitle}</p>

              <div className="pt-1 flex items-baseline justify-center sm:justify-start space-x-2">
                <span className="text-2xl font-black text-[#0070d2]">{activeItem.price}</span>
                {activeItem.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">{activeItem.originalPrice}</span>
                )}
              </div>

              <div className="flex items-center justify-center sm:justify-start space-x-1 text-amber-500 text-xs pt-1">
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-slate-500 text-[11px] ml-1">({activeItem.rating || 4.9} • 1,280 reviews)</span>
              </div>
            </div>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-600 border-y border-slate-100 py-3">
            <div className="flex items-center space-x-1.5 justify-center">
              <Truck className="w-4 h-4 text-[#0070d2]" />
              <span>Free Express Shipping</span>
            </div>
            <div className="flex items-center space-x-1.5 justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Official Warranty</span>
            </div>
            <div className="flex items-center space-x-1.5 justify-center">
              <RotateCcw className="w-4 h-4 text-slate-600" />
              <span>14-Day Free Returns</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-slate-500">Qty:</span>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="bg-white border border-slate-200 rounded-md text-xs font-semibold px-2 py-1 focus:outline-hidden"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-6 py-2.5 rounded-full text-xs font-bold text-white flex items-center space-x-2 transition-all cursor-pointer ${
              added ? 'bg-emerald-600' : 'bg-[#0070d2] hover:bg-[#005fb3] shadow-md'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Bag!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export const FeedbackModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFeedback('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 border border-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-bold text-slate-900 mb-2">Web Experience Feedback</h3>
        <p className="text-xs text-slate-600 mb-4">
          Help us improve the Aero Vision showcase experience by sharing your thoughts or reporting any issues.
        </p>

        {submitted ? (
          <div className="py-8 text-center space-y-2 text-emerald-600">
            <Check className="w-10 h-10 mx-auto" />
            <p className="font-bold text-sm">Thank you for your valuable feedback!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              required
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us what you think about the website layout or responsiveness..."
              className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#0070d2] text-slate-800"
            />
            <button
              type="submit"
              className="w-full bg-[#0070d2] hover:bg-[#005fb3] text-white font-bold text-xs py-2.5 rounded-full transition-colors cursor-pointer shadow-md"
            >
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
