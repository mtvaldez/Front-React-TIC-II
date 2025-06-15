import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { X } from "lucide-react"; // Optional: for a nice close icon
export function ImageToast({ base64Image, message, toastId }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-between w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md">
      <span className="text-sm text-gray-800">{message}</span>

      <button
        onClick={() => {
          setIsOpen(true);
          // Make the toast persistent
          toast.update(toastId, { duration: Infinity });
        }}
        className="ml-4 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
      >
        View
      </button>

      <Dialog.Root
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            // Resume auto-dismiss when modal closes
            toast.update(toastId, { duration: 4000 });
          }
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
          <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-semibold text-gray-900">Cropped Face</Dialog.Title>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <span className="text-xl">&times;</span>
              </button>
            </div>

            {base64Image ? (
              <img
                src={`data:image/jpeg;base64,${base64Image}`}
                alt="Cropped face"
                className="rounded-md w-full max-h-[60vh] object-contain"
              />
            ) : (
              <p className="text-sm text-gray-500 italic">No image provided.</p>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
