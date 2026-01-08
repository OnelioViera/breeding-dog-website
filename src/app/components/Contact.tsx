import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
} from "lucide-react";
import { useState } from "react";
import { submitContact } from "../../lib/payload";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const success = await submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message,
      });

      if (success) {
        setSubmitStatus('success');
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        // Reset status message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="bg-white px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl text-gray-800">
            Contact Us
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Interested in one of our puppies? Get in touch with
            us today!
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="mb-6 text-2xl text-gray-800">
              Get in Touch
            </h3>

            <div className="mb-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-amber-100 p-3">
                  <Phone className="text-amber-600" size={24} />
                </div>
                <div>
                  <p className="text-gray-600">Phone</p>
                  <p className="text-lg text-gray-800">
                    (555) 123-4567
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-amber-100 p-3">
                  <Mail className="text-amber-600" size={24} />
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="text-lg text-gray-800">
                    info@aussiedoodlehaven.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-amber-100 p-3">
                  <MapPin
                    className="text-amber-600"
                    size={24}
                  />
                </div>
                <div>
                  <p className="text-gray-600">Location</p>
                  <p className="text-lg text-gray-800">
                    Sacramento, California
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-xl text-gray-800">
                Follow Us
              </h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="rounded-full bg-amber-100 p-3 text-amber-600 transition-colors hover:bg-amber-200"
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="#"
                  className="rounded-full bg-amber-100 p-3 text-amber-600 transition-colors hover:bg-amber-200"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-2xl text-gray-800">
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-gray-700"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-gray-700"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-gray-700"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                ></textarea>
              </div>

              {submitStatus === 'success' && (
                <div className="rounded-lg bg-green-100 px-4 py-3 text-green-800">
                  Thank you for your interest! We will get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="rounded-lg bg-red-100 px-4 py-3 text-red-800">
                  There was an error sending your message. Please try again or contact us directly.
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-amber-600 px-8 py-4 text-white transition-colors hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}