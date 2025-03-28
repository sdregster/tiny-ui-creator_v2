
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface ProgressModalProps {
  open: boolean;
  onClose: () => void;
}

const ProgressModal = ({ open, onClose }: ProgressModalProps) => {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [objectId, setObjectId] = useState("");

  useEffect(() => {
    if (open) {
      setProgress(0);
      setCompleted(false);
      
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setCompleted(true);
            setObjectId("OBJ-" + Math.floor(Math.random() * 10000));
            return 100;
          }
          return prev + 10;
        });
      }, 300);
      
      return () => clearInterval(timer);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {completed ? "Объект успешно создан" : "Создание объекта"}
          </DialogTitle>
          <DialogDescription>
            {completed 
              ? `Объект был успешно создан с идентификатором ${objectId}` 
              : "Пожалуйста, подождите пока объект создается..."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {!completed ? (
            <>
              <Progress value={progress} className="h-2 w-full" />
              <p className="text-center text-sm text-muted-foreground">{progress}%</p>
            </>
          ) : (
            <div className="flex items-center justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
          )}
        </div>
        
        {completed && (
          <div className="flex justify-end">
            <Button onClick={onClose}>Закрыть</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProgressModal;
