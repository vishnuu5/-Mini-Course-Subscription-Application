import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { ArrowLeft, User, Clock, Zap } from "lucide-react";
import { subscriptionAPI } from "../utils/api";
import { useToast, Toast } from "../components/Toast";
import PromoInput from "../components/PromoInput";
import Loading from "../components/Loading";

export const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: course, loading } = useApi(`/courses/${id}`, [id]);

  const [promoCode, setPromoCode] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const { toast, showToast, hideToast } = useToast();

  if (loading) return <Loading />;

  const handleApplyPromo = () => {
    if (promoCode === "BFSALE25") {
      const discounted = course.price * 0.5;
      setDiscountedPrice(discounted);
      showToast("Promo code applied! 50% discount", "success");
    } else {
      showToast("Invalid promo code", "error");
    }
  };

  const handleSubscribe = async () => {
    setIsSubscribing(true);
    setPaymentStatus("processing");
    try {
      const result = await subscriptionAPI.subscribe(id, promoCode);
      setPaymentStatus("success");
      showToast("Payment successful! 🎉", "success");
      setTimeout(() => navigate("/my-courses"), 2000);
    } catch (error) {
      setPaymentStatus("failed");
      showToast(error.message, "error");
    } finally {
      setTimeout(() => {
        setIsSubscribing(false);
        setPaymentStatus(null);
      }, 2000);
    }
  };

  const images = [
    "/images/img_1.jpg",
    "/images/img_2.jpg",
    "/images/img_3.png",
    "/images/img_4.jpg",
  ];
  const key = (course?.title || "")
    .split("")
    .reduce((a, c) => a + c.charCodeAt(0), 0);
  const fallbackImage = images[key % images.length];

  return (
    <div className="min-h-screen bg-bg-secondary">
      <div className="container mx-auto max-w-8xl px-6 md:px-8 py-16 md:py-24">
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={hideToast}
          />
        )}
        <button
          onClick={() => navigate("/")}
          className="mb-8 md:mb-12 inline-flex items-center text-primary hover:text-primary-dark font-semibold transition-colors duration-300 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Courses
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-start">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="overflow-hidden rounded-2xl shadow-xl border border-border bg-bg-primary">
              <img
                src={
                  course?.image &&
                  !String(course.image).includes("placeholder.com")
                    ? course.image
                    : fallbackImage
                }
                alt={course.title}
                className="w-full h-auto aspect-video object-cover transition-transform duration-500 hover:scale-105"
                onError={(e) => (e.target.src = fallbackImage)}
              />
            </div>
          </div>

          <div className="space-y-10 lg:space-y-14 order-1 lg:order-2">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight">
                {course.title}
              </h1>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                {course.description}
              </p>
            </div>

            <div className="bg-gradient-to-br from-bg-primary to-bg-secondary p-8 md:p-10 rounded-2xl border border-border shadow-sm">
              <h3 className="text-xl font-bold text-text-primary mb-6">
                Course Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 bg-bg-primary p-4 rounded-xl shadow-sm border border-border">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">Instructor</p>
                    <p className="font-semibold text-text-primary truncate">
                      {course.instructor}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-bg-primary p-4 rounded-xl shadow-sm border border-border">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">Duration</p>
                    <p className="font-semibold text-text-primary">
                      {course.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-bg-primary p-4 rounded-xl shadow-sm border border-border">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">Level</p>
                    <p className="font-semibold text-text-primary">
                      {course.level}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {paymentStatus && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
                  <div className="text-center">
                    <div className="mb-4">
                      {paymentStatus === "processing" && (
                        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary mx-auto mb-4"></div>
                      )}
                      {paymentStatus === "success" && (
                        <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white text-2xl">✓</span>
                        </div>
                      )}
                      {paymentStatus === "failed" && (
                        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white text-2xl">✗</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      {paymentStatus === "processing" && "Processing Payment..."}
                      {paymentStatus === "success" && "Payment Successful!"}
                      {paymentStatus === "failed" && "Payment Failed"}
                    </h3>
                    <p className="text-text-secondary">
                      {paymentStatus === "processing" && "Please wait while we process your payment securely."}
                      {paymentStatus === "success" && "Your subscription has been activated successfully!"}
                      {paymentStatus === "failed" && "There was an issue processing your payment. Please try again."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className={`transition-opacity duration-300 ${paymentStatus ? "opacity-50 pointer-events-none" : ""}`}>
              {course.price > 0 ? (
                <div className="space-y-6">
                  <PromoInput
                    promoCode={promoCode}
                    setPromoCode={setPromoCode}
                    onApply={handleApplyPromo}
                  />

                  <button
                    onClick={handleSubscribe}
                    disabled={!promoCode || isSubscribing}
                    className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    {isSubscribing ? "Processing..." : "Subscribe Now"}
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSubscribe}
                  disabled={isSubscribing}
                  className="w-full bg-gradient-to-r from-success to-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-success/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {isSubscribing ? "Processing..." : "Subscribe for Free"}
                </button>
              )}

              <p className="text-xs text-center text-text-secondary">
                30-day money-back guarantee • Lifetime access
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
