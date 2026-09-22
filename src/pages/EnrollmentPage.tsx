import { useState } from "react";
import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import { courses, currentStudent, enrollments as initialEnrollments } from "@/lib/mock-data";

export default function EnrollmentPage() {
  const [enrollments, setEnrollments] = useState(initialEnrollments);

  const isCourseEnrolled = (courseId: string) => {
    return enrollments.some(
      (e) => e.studentId === currentStudent.studentId && e.courseId === courseId
    );
  };

  const getEnrolledAt = (courseId: string) => {
    return enrollments.find(
      (e) => e.studentId === currentStudent.studentId && e.courseId === courseId
    )?.enrolledAt;
  };

  const availableCourses = courses.filter((c) => !isCourseEnrolled(c.courseId));

  const handleRegister = (courseId: string, time: string) => {
    const today = new Date().toISOString().split("T")[0];
    const newEnrolledAt = `${today}T${time}:00`;

    setEnrollments((prev) => [
      ...prev,
      {
        studentId: currentStudent.studentId,
        courseId,
        enrolledAt: newEnrolledAt,
      },
    ]);
  };

  const handleCancelEnrollment = (courseId: string) => {
    setEnrollments((prev) =>
      prev.filter(
        (e) =>
          !(e.studentId === currentStudent.studentId && e.courseId === courseId)
      )
    );
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">รายวิชาทั้งหมด</h1>
        <RegisterDialog
          availableCourses={availableCourses}
          currentStudent={currentStudent}
          onRegister={handleRegister}
        />
      </div>

      <div className="flex flex-col gap-4">
        {courses.map((course) => {
          const enrolled = isCourseEnrolled(course.courseId);
          return (
            <CourseCard
              key={course.courseId}
              course={course}
              student={currentStudent}
              isEnrolled={enrolled}
              enrolledAt={getEnrolledAt(course.courseId)}
              onCancelEnrollment={handleCancelEnrollment}
            />
          );
        })}
      </div>
    </div>
  );
}