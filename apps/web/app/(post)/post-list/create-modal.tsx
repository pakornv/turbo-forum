"use client";

import { communityQueries } from "@/app/(post)/queries";
import { requireAuth } from "@/lib/auth/actions";
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
import { ProgressCircle } from "@repo/ui/progress-circle";
import {
  Select,
  SelectList,
  SelectOption,
  SelectTrigger,
} from "@repo/ui/select";
import { TextArea } from "@repo/ui/text-area";
import { TextField } from "@repo/ui/text-field";
import { useQuery } from "@tanstack/react-query";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";
import { createPost } from "./actions";

export function CreatePostModal() {
  const communities = useQuery(communityQueries.list());

  const [open, setOpen] = useState(false);

  const { execute, isPending, result } = useAction(createPost, {
    onError: ({ error }) => error.serverError && toast.error(error.serverError),
    onSuccess: () => {
      toast.success("Post created successfully");
      setOpen(false);
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    execute(formData);
  }

  return (
    <>
      <Button
        onPress={async () => {
          await requireAuth();
          setOpen(true);
        }}
      >
        Create +
      </Button>
      <Modal isOpen={open} onOpenChange={setOpen}>
        <ModalContent size="2xl" isBlurred closeButton isDismissable={false}>
          <ModalHeader>
            <ModalTitle level={1}>Create Post</ModalTitle>
          </ModalHeader>
          <Form
            onSubmit={handleSubmit}
            validationErrors={result.validationErrors?.fieldErrors}
          >
            <ModalBody className="gap-y-3.5">
              <div className="w-full sm:max-w-fit">
                <Select
                  name="communityId"
                  aria-label="community"
                  placeholder="Choose a community"
                  isRequired
                >
                  <SelectTrigger />
                  <SelectList items={communities.data}>
                    {(item) => (
                      <SelectOption id={item.id} textValue={item.name}>
                        {item.name}
                      </SelectOption>
                    )}
                  </SelectList>
                </Select>
              </div>
              <TextField
                name="title"
                aria-label="title"
                placeholder="Title"
                isRequired
              />
              <TextArea
                name="body"
                aria-label="body"
                placeholder="What's on your mind..."
                className="max-h-[234px] min-h-[234px] resize-none"
                isRequired
              />
            </ModalBody>
            <ModalFooter>
              <ModalClose>Cancel</ModalClose>
              <Button type="submit" isPending={isPending}>
                {({ isPending }) =>
                  isPending ? (
                    <ProgressCircle isIndeterminate aria-label="Submitting" />
                  ) : (
                    "Post"
                  )
                }
              </Button>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
}
