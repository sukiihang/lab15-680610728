import { useState } from "react";
import type { Course, Student } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type RegisterDialogProps = {
  availableCourses: Course[];
  currentStudent: Student;
  onRegister: (courseId: string, time: string) => void;
};

export function RegisterDialog({
  availableCourses,
  currentStudent,
  onRegister,
}: RegisterDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [time, setTime] = useState(getCurrentTime());

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedCourseId) return;

    onRegister(selectedCourseId, time);
    setSelectedCourseId("");
    setTime(getCurrentTime());
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        ลงทะเบียน
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ฟอร์มป้อนข้อมูลการลงทะเบียน</DialogTitle>
            <DialogDescription>
              เลือกวิชาและเวลาที่ต้องการลงทะเบียน
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="course">วิชา</Label>
            <Select
              value={selectedCourseId}
              onValueChange={(val) => setSelectedCourseId(val ?? "")}
            >
              <SelectTrigger id="course">
                <SelectValue placeholder="เลือกวิชา" />
              </SelectTrigger>
              <SelectContent>
                {availableCourses.map((c) => (
                  <SelectItem key={c.courseId} value={c.courseId}>
                    {c.courseId} - {c.courseTitle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">เลือกเวลา</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">ชื่อ นศ.</Label>
            <Input
              id="fullName"
              value={`${currentStudent.firstName} ${currentStudent.lastName}`}
              readOnly
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="program">โปรแกรม</Label>
            <Input
              id="program"
              value={currentStudent.program}
              readOnly
              className="bg-muted"
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!selectedCourseId}>
              ยืนยันการลงทะเบียน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}