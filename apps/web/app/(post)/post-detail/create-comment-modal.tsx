"use client";

import { Button } from "@repo/ui/button";
import { Form } from "@repo/ui/form";
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@repo/ui/modal";
import { TextArea } from "@repo/ui/text-area";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";
import { createComment } from "./actions";

type CreateCommentModalProps = {
  postId: string;
};

export function CreateCommentModal({ postId }: CreateCommentModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { execute, isPending } = useAction(createComment.bind(null, postId), {
    onError: ({ error }) => toast.error(error.serverError),
    onSuccess: () => {
      toast.success("Comment posted successfully");
      setIsOpen(false);
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    execute(formData);
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button variant="outline">Add Comments</Button>
      <ModalContent>
        <Form onSubmit={handleSubmit}>
          <ModalHeader className="pb-0">
            <ModalTitle>Add Comments</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <TextArea
              name="body"
              aria-label="body"
              placeholder="What's on your mind..."
              className="min-h-[120px] w-full resize-none"
              isRequired
            />
          </ModalBody>
          <ModalFooter>
            <ModalClose>Cancel</ModalClose>
            <Button type="submit" isPending={isPending}>
              Post
            </Button>
          </ModalFooter>
        </Form>
      </ModalContent>
    </Modal>
  );
}
