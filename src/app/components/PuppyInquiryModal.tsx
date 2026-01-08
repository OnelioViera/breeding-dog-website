'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { submitContact } from '../../lib/payload';
import type { Puppy } from '../../lib/payload';

interface PuppyInquiryModalProps {
  puppy: Puppy | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PuppyInquiryModal({ puppy, open, onOpenChange }: PuppyInquiryModalProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isImageOpen, setIsImageOpen] = useState(false);

  // Default form fields
  const defaultFormFields = [
    { label: 'Name', name: 'name', type: 'text', required: true, placeholder: 'Your name' },
    { label: 'Email', name: 'email', type: 'email', required: true, placeholder: 'your@email.com' },
    { label: 'Phone', name: 'phone', type: 'tel', required: false, placeholder: '(555) 123-4567' },
    { label: 'Message', name: 'message', type: 'textarea', required: true, placeholder: 'Tell us about your interest...' },
  ];

  useEffect(() => {
    if (open) {
      setFormData({});
      setSubmitStatus('idle');
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!puppy) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const message = `Inquiry about ${puppy.name} (${puppy.breed})\n\n${formData.message || 'Interested in this puppy'}`;
      const success = await submitContact({
        name: formData.name || '',
        email: formData.email || '',
        phone: formData.phone || undefined,
        message: message,
      });

      if (success) {
        setSubmitStatus('success');
        setFormData({});
        setTimeout(() => {
          onOpenChange(false);
          setSubmitStatus('idle');
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!puppy) return null;

  // Use puppy-specific modal data, fallback to hardcoded defaults
  const modalTitle = puppy.inquiryModalTitle || 'Inquire About This Puppy';
  const modalDescription = puppy.inquiryModalDescription || 'Please fill out the form below and we will get back to you as soon as possible.';
  const formFields = defaultFormFields;
  const submitButtonText = 'Submit Inquiry';
  const successMessage = 'Thank you for your inquiry! We will get back to you soon.';
  const footerText = puppy.inquiryModalFooterText || '';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[55vw] w-[55vw] sm:!max-w-[55vw] max-h-[90vh] overflow-y-auto p-8">
        <DialogHeader>
          <DialogTitle className="text-3xl text-gray-800">
            {modalTitle}
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600">
            {modalDescription}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-8 md:grid-cols-2 mt-6">
          {/* Puppy Image and Info */}
          <div className="space-y-4">
            <div 
              className="relative h-64 w-full overflow-hidden rounded-lg cursor-pointer group bg-gray-100"
              onClick={() => setIsImageOpen(true)}
            >
              <img
                src={puppy.image}
                alt={puppy.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                style={{ display: 'block' }}
              />
              <div className="absolute inset-0 flex items-center justify-center transition-all pointer-events-none">
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative opacity-0 group-hover:opacity-100 text-white text-sm font-medium bg-black bg-opacity-50 px-4 py-2 rounded-lg transition-opacity pointer-events-none">
                  Click to enlarge
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-800">{puppy.name}</h3>
              <p className="text-lg text-amber-600">{puppy.breed}</p>
              <div className="space-y-1 text-sm text-gray-600">
                <p><strong>Age:</strong> {puppy.age}</p>
                <p><strong>Gender:</strong> {puppy.gender}</p>
                <p><strong>Price:</strong> {puppy.price}</p>
              </div>
              {puppy.description && (
                <p className="text-sm text-gray-600 mt-4">{puppy.description}</p>
              )}
            </div>
          </div>

          {/* Inquiry Form */}
          <div>
            {submitStatus === 'success' ? (
              <div className="rounded-lg bg-green-100 px-6 py-8 text-center">
                <p className="text-green-800 text-lg font-semibold">
                  {successMessage}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {formFields.map((field) => (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="block mb-2 text-sm font-medium text-gray-700">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        placeholder={field.placeholder}
                        rows={5}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                      />
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        placeholder={field.placeholder}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                      />
                    )}
                  </div>
                ))}

                {submitStatus === 'error' && (
                  <div className="rounded-lg bg-red-100 px-4 py-3 text-red-800">
                    There was an error sending your inquiry. Please try again or contact us directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-amber-600 px-8 py-4 text-white transition-colors hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : submitButtonText}
                </button>

                {footerText && (
                  <div className="mt-6 rounded-lg bg-gray-50 p-6 text-sm text-gray-600 whitespace-pre-line">
                    {footerText}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </DialogContent>

      {/* Image Lightbox */}
      {isImageOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setIsImageOpen(false)}
        >
          <button
            onClick={() => setIsImageOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Close image"
          >
            <X size={32} />
          </button>
          <div 
            className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageWithFallback
              src={puppy.image}
              alt={puppy.name}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </Dialog>
  );
}

