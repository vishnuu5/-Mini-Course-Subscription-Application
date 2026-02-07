import { Link } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { AlertCircle } from "lucide-react";
import CourseCard from "../components/CourseCard";
import Loading from "../components/Loading";

export const Home = () => {
  const { data: courses, loading, error } = useApi("/courses");

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-bg-secondary">
      <div className="container mx-auto max-w-8xl px-6 md:px-8 py-16 md:py-20">
        <div className="mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 leading-tight">
            Explore Courses
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl">
            Discover our collection of high-quality courses and expand your
            skills with industry experts.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
          {courses?.map((course, index) => (
            <Link
              key={course._id}
              to={`/course/${course._id}`}
              className="block h-full"
            >
              <CourseCard course={course} index={index} />
            </Link>
          ))}
        </div>

        {!loading && courses?.length === 0 && !error && (
          <div className="text-center py-20">
            <div className="inline-block p-4 rounded-full bg-bg-tertiary mb-4">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-text-primary">
              No courses found
            </h3>
            <p className="text-text-secondary mt-2">
              Check back later for new content!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
