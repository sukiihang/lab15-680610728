import type { Course, Student } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type CourseCardProps = {
  course: Course;
  student: Student;
  isEnrolled: boolean;
  enrolledAt?: string;
  onCancelEnrollment?: (courseId: string) => void;
};

export function CourseCard({
  course,
  student,
  isEnrolled,
  enrolledAt,
  onCancelEnrollment,
}: CourseCardProps) {
  const formatThaiDateTime = (isoString?: string) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{course.courseTitle}</CardTitle>
          <Badge
            variant="outline"
            className={
              isEnrolled
                ? "bg-amber-100 text-amber-800 border-amber-300 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800"
                : "bg-purple-100 text-purple-800 border-purple-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800"
            }
          >
            {isEnrolled ? "ลงทะเบียนแล้ว" : "เปิดรับ"}
          </Badge>
        </div>
        <CardDescription>
          รหัสวิชา: {course.courseId} • ผู้สอน: {course.instructors.join(", ")}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex items-end justify-between">
        {isEnrolled ? (
          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              ชื่อ นศ.: {student.firstName} {student.lastName}
            </p>
            <p>โปรแกรม: {student.program}</p>
            <p>ลงทะเบียนเมื่อ: {formatThaiDateTime(enrolledAt)}</p>
          </div>
        ) : (
          <div />
        )}

        {isEnrolled && (
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive"
            onClick={() => onCancelEnrollment?.(course.courseId)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}