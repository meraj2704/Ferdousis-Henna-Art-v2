import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-white rounded-lg p-8 shadow-lg">
        <DialogHeader className="text-center mb-4">
          <DialogTitle className="text-2xl font-semibold text-primary">Order Placed Successfully!</DialogTitle>
          <DialogDescription className="text-base text-gray-600 mt-2">
            Thank you for your order. You’ll receive a confirmation email shortly.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center mt-4">
          <Button
            onClick={onClose}
            className="bg-primary text-white py-2 px-6 rounded-md hover:bg-secondary transition duration-300"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
