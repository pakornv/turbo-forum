"use client";

import { Button } from "@repo/ui/button";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@repo/ui/modal";
import { useState } from "react";
import { toast } from "sonner";
import { deletePost } from "./actions";

type DeletePostModalProps = {
  id: string;
};

export function DeletePostModal({ id }: DeletePostModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deletePost(id);
      toast.success("Post deleted successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }

    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button variant="plain" size="square-petite" className="size-7">
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-4 text-ui-green-300"
        >
          <path
            d="M10.9279 4.57536V4.04202C10.9279 3.29529 10.9279 2.92192 10.7826 2.6367C10.6547 2.38582 10.4508 2.18185 10.1999 2.05402C9.91467 1.90869 9.5413 1.90869 8.79456 1.90869H7.7279C6.98116 1.90869 6.60779 1.90869 6.32258 2.05402C6.07169 2.18185 5.86772 2.38582 5.73989 2.6367C5.59456 2.92192 5.59456 3.29529 5.59456 4.04202V4.57536M6.9279 8.24202V11.5754M9.59456 8.24202V11.5754M2.26123 4.57536H14.2612M12.9279 4.57536V12.042C12.9279 13.1621 12.9279 13.7222 12.7099 14.15C12.5182 14.5263 12.2122 14.8323 11.8359 15.024C11.4081 15.242 10.848 15.242 9.7279 15.242H6.79456C5.67446 15.242 5.11441 15.242 4.68658 15.024C4.31026 14.8323 4.0043 14.5263 3.81255 14.15C3.59456 13.7222 3.59456 13.1621 3.59456 12.042V4.57536"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
      <ModalContent role="alertdialog" size="sm">
        <ModalHeader className="sm:px-6">
          <ModalTitle className="text-center font-semibold text-[#101828]">
            Please confirm if you wish to delete the post
          </ModalTitle>
          <ModalDescription className="mt-2 text-center text-[#475467]">
            Are you sure you want to delete the post? Once deleted, it cannot be
            recovered.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter className="justify-between pt-6 sm:px-6 sm:pt-8">
          <ModalClose color="secondary" variant="outline" className="w-full">
            Cancel
          </ModalClose>
          <Button
            color="danger"
            variant="solid"
            className="w-full"
            onPress={handleDelete}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
