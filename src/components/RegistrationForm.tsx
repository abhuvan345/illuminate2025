import React, { useState } from "react";
import {
  User,
  Phone,
  Mail,
  GraduationCap,
  Calendar,
  Lightbulb,
  Upload,
  Send,
} from "lucide-react";
import { RegistrationService } from "../lib/registrationService";
// import paymentImg from "../payment.jpg";
const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    college: "",
    year: "",
    startupIdea: "",
    paymentScreenshot: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      // 5MB limit
      setFormData((prev) => ({
        ...prev,
        paymentScreenshot: file,
      }));
    } else {
      alert("File size must be less than 5MB");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.paymentScreenshot) {
        throw new Error("Payment screenshot is required");
      }

      // Submit registration to Supabase
      const registration = await RegistrationService.submitRegistration({
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        college: formData.college,
        year: formData.year,
        startupIdea: formData.startupIdea,
        paymentScreenshot: formData.paymentScreenshot,
      });

      console.log("Registration successful:", registration);

      setSubmitStatus("success");
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        college: "",
        year: "",
        startupIdea: "",
        paymentScreenshot: null,
      });
    } catch (error) {
      console.error("Registration error:", error);
      setSubmitStatus("error");
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.fullName &&
    formData.phoneNumber &&
    formData.email &&
    formData.college &&
    formData.year &&
    formData.paymentScreenshot;

  return (
    <section
      id="register"
      className="py-20 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Register Now
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Secure your spot in Illuminate 2025 and begin your entrepreneurial
            journey with India's premier startup ecosystem.
          </p>
        </div>

        <div className="bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-yellow-400/30">
          {submitStatus === "success" ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-400 rounded-full text-black mb-6">
                <Send className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Registration Successful!
              </h3>
              <p className="text-gray-300 mb-6">
                Your registration has been received. Awaiting payment
                verification. You will receive a confirmation email shortly.
              </p>
              <button
                onClick={() => setSubmitStatus("idle")}
                className="btn-primary text-black font-semibold py-3 px-6 rounded-lg"
              >
                Register Another Participant
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-white font-semibold mb-2">
                    <User className="h-5 w-5 mr-2 text-yellow-400" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="form-input w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="flex items-center text-white font-semibold mb-2">
                    <Phone className="h-5 w-5 mr-2 text-yellow-400" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="form-input w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-white font-semibold mb-2">
                    <Mail className="h-5 w-5 mr-2 text-yellow-400" />
                    Email ID *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="flex items-center text-white font-semibold mb-2">
                    <GraduationCap className="h-5 w-5 mr-2 text-yellow-400" />
                    College *
                  </label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                    required
                    className="form-input w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none"
                    placeholder="Enter your college name"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center text-white font-semibold mb-2">
                  <Calendar className="h-5 w-5 mr-2 text-yellow-400" />
                  Year *
                </label>

                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="" className="bg-gray-800 text-white">
                    Select your year
                  </option>
                  <option value="1st" className="bg-gray-800 text-white">
                    1st Year
                  </option>
                  <option value="2nd" className="bg-gray-800 text-white">
                    2nd Year
                  </option>
                  <option value="3rd" className="bg-gray-800 text-white">
                    3rd Year
                  </option>
                  <option value="4th" className="bg-gray-800 text-white">
                    4th Year
                  </option>
                  <option value="Other" className="bg-gray-800 text-white">
                    Other
                  </option>
                </select>
              </div>

              <div>
                <label className="flex items-center text-white font-semibold mb-2">
                  <Lightbulb className="h-5 w-5 mr-2 text-yellow-400" />
                  Startup Idea (Optional)
                </label>
                <textarea
                  name="startupIdea"
                  value={formData.startupIdea}
                  onChange={handleInputChange}
                  rows={4}
                  className="form-input w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none resize-none"
                  placeholder="Briefly describe your startup idea or entrepreneurial interests..."
                />
              </div>
              <div>
                <label className="flex items-center  text-white font-semibold mb-2">
                  <Lightbulb className="h-5 w-5 mr-2 text-yellow-400" />
                  Payment Details
                </label>
                <h3 className="mb-4 ">
                  If any problem exists with the payment contact the
                  coordinators !!!
                </h3>
                <div className="flex items-center justify-center h-full">
                  <img
                    src="/image.png"
                    alt=""
                    className="h-80 w-50 rounded-lg shadow-md "
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center text-white font-semibold mb-2">
                  <Upload className="h-5 w-5 mr-2 text-yellow-400" />
                  Payment Screenshot *
                </label>
                <div className="border-2 border-dashed border-yellow-400/30 rounded-lg p-6 text-center hover:border-yellow-400/50 transition-colors duration-300">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileChange}
                    required
                    className="hidden"
                    id="payment-upload"
                  />
                  <label htmlFor="payment-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                    <p className="text-white font-semibold mb-2">
                      {formData.paymentScreenshot
                        ? formData.paymentScreenshot.name
                        : "Upload Payment Screenshot"}
                    </p>
                    <p className="text-gray-400 text-sm">
                      JPG, PNG, or PDF (Max 5MB)
                    </p>
                  </label>
                </div>
              </div>

              <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4">
                <h4 className="text-yellow-400 font-semibold mb-2">
                  Payment Details:
                </h4>
                <p className="text-gray-300 text-sm">
                  Registration Fee: ₹250 per participant
                  <br />
                  Please make payment and upload the screenshot above.
                </p>
                <h2 className="text-green-500">
                  After the payment verified you will get the event ticket to
                  your regisered mail id check once.
                </h2>
                <p className="text-red-300 text-sm">
                  If you didn't receive the mail after the 24 hrs of your
                  registration contact coordinators.
                </p>
              </div>

              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 ${
                  isFormValid && !isSubmitting
                    ? "btn-primary text-black hover:scale-105"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-current mr-3"></div>
                    Submitting Registration...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="h-6 w-6 mr-2" />
                    Register for Illuminate 2025
                  </div>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
