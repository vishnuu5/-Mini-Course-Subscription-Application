import { useApi } from "../hooks/useApi";
import { AlertCircle, Calendar } from "lucide-react";
import Loading from "../components/Loading";

export const MyCourses = () => {
  const { data: courses, loading, error } = useApi("/subscriptions/my-courses");

  if (loading) return <Loading />;

  if (!courses || courses.length === 0) {
    return (
      <div className="min-h-screen bg-bg-secondary">
        <div className="container mx-auto max-w-8xl px-6 md:px-8 py-16 md:py-20">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">
            My Courses
          </h1>
          <div className="text-center py-20 bg-bg-primary rounded-2xl border border-border shadow-sm">
            <div className="inline-block p-4 rounded-full bg-bg-tertiary mb-4">
              <span className="text-4xl">📚</span>
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No courses yet
            </h3>
            <p className="text-text-secondary text-lg mb-6">
              You haven't subscribed to any courses yet.
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary-dark transition-colors duration-300 shadow-lg shadow-primary/25"
            >
              Explore Courses
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-secondary">
      <div className="container mx-auto max-w-8xl px-6 md:px-8 py-16 md:py-20">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">
          My Courses
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {courses.map((course) => (
            <div
              key={course.courseId}
              className="group bg-bg-primary rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-border flex flex-col h-full"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={
                    course.image && !String(course.image).includes("placeholder.com")
                      ? course.image
                      : [
                          "/images/img_1.jpg",
                          "/images/img_2.jpg",
                          "/images/img_3.png",
                          "/images/img_4.jpg",
                        ][
                          (course?.title || "")
                            .split("")
                            .reduce((a, c) => a + c.charCodeAt(0), 0) % 4
                        ]
                  }
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const images = [
                      "/images/img_1.jpg",
                      "/images/img_2.jpg",
                      "/images/img_3.png",
                      "/images/img_4.jpg",
                    ];
                    const i = (course?.title || "")
                      .split("")
                      .reduce((a, c) => a + c.charCodeAt(0), 0) % images.length;
                    e.target.src = images[i];
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-text-primary mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300">
                  {course.title}
                </h3>
                <p className="text-text-secondary text-sm mb-6 line-clamp-2">
                  {course.description}
                </p>

                <div className="space-y-3 mt-auto pt-4 border-t border-border">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-secondary">Original Price:</span>
                    <span className="font-medium text-text-secondary line-through">
                      ${course.originalPrice}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-secondary">Price Paid:</span>
                    <span className="font-bold text-text-primary text-lg">
                      ${course.pricePaid.toFixed(2)}
                    </span>
                  </div>

                  {course.discountPercentage > 0 && (
                    <div className="flex items-center justify-between bg-success/10 px-3 py-1.5 rounded-lg">
                      <span className="text-xs font-medium text-success">
                        Discount Applied
                      </span>
                      <span className="text-sm font-bold text-success">
                        -{course.discountPercentage}%
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs text-text-secondary mt-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Subscribed on{" "}
                      {new Date(course.subscribedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
