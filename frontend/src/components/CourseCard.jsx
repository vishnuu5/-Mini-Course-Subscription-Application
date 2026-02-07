import { Clock, User } from "lucide-react";

export const CourseCard = ({ course, index }) => {
  const images = [
    "/images/img_1.jpg",
    "/images/img_2.jpg", 
    "/images/img_3.png",
    "/images/img_4.jpg",
  ];
  
  const fallbackImage = images[index % images.length];

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  return (
    <div className="group h-full flex flex-col w-[20rem] bg-bg-primary rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-border">
      <div className="relative overflow-hidden aspect-video bg-bg-tertiary">
        <img
          src={course.image || fallbackImage}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={handleImageError}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="flex-1 flex flex-col p-10">
        <h3 className="text-xl font-bold text-text-primary mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300">
          {course.title}
        </h3>
        <p className="text-text-secondary text-sm mb-8 line-clamp-3 leading-relaxed flex-1">
          {course.description}
        </p>
        <div className="mt-auto pt-6 border-t border-border">
          <div className="flex justify-between items-center mb-4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase tracking-wide">
              {course.level}
            </span>
            <span className="text-xl font-bold text-primary">
              {course.price === 0 ? "Free" : `$${course.price}`}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="truncate max-w-[120px] font-medium">
                {course.instructor}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
