
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectCloseButtonProps {
  onClose: () => void;
}

const ProjectCloseButton = ({ onClose }: ProjectCloseButtonProps) => {
  return (
    <Button
      onClick={onClose}
      variant="ghost"
      size="icon"
      className="absolute top-4 right-4 bg-background/80 hover:bg-background/60 z-10 rounded-full"
      aria-label="Close project"
    >
      <X className="h-5 w-5" />
    </Button>
  );
};

export default ProjectCloseButton;
