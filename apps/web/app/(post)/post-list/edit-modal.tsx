"use client";

import { communityQueries } from "@/app/(post)/queries";
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
import { updatePost } from "./actions";

type EditPostModalProps = {
  id: string;
  title: string;
  body: string;
  communityId: string;
};

export function EditPostModal(props: EditPostModalProps) {
  const { id, title, body, communityId } = props;

  const communities = useQuery(communityQueries.list());

  const [open, setOpen] = useState(false);

  const { execute, isPending, result } = useAction(updatePost.bind(null, id), {
    onError: ({ error }) => error.serverError && toast.error(error.serverError),
    onSuccess: () => {
      toast.success("Post updated successfully");
      setOpen(false);
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    execute(formData);
  }

  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
      <Button
        variant="plain"
        size="square-petite"
        className="size-7"
        onPress={() => setOpen(true)}
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-4 text-ui-green-300"
        >
          <path
            d="M8.26121 13.9084H14.2612M2.26123 13.9084H3.37759C3.70371 13.9084 3.86677 13.9084 4.02022 13.8715C4.15627 13.8389 4.28633 13.785 4.40563 13.7119C4.54018 13.6294 4.65548 13.5141 4.88609 13.2835L13.2612 4.90835C13.8135 4.35607 13.8135 3.46064 13.2612 2.90835C12.709 2.35607 11.8135 2.35607 11.2612 2.90835L2.88607 11.2835C2.65547 11.5141 2.54017 11.6294 2.45771 11.764C2.38461 11.8833 2.33073 12.0133 2.29807 12.1494C2.26123 12.3028 2.26123 12.4659 2.26123 12.792V13.9084Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>

      <ModalContent size="2xl" isBlurred closeButton isDismissable={false}>
        <ModalHeader>
          <ModalTitle level={1}>Edit Post</ModalTitle>
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
                defaultSelectedKey={communityId}
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
              defaultValue={title}
              isRequired
            />
            <TextArea
              name="body"
              aria-label="body"
              placeholder="What's on your mind..."
              className="max-h-[234px] min-h-[234px] resize-none"
              defaultValue={body}
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
                  "Confirm"
                )
              }
            </Button>
          </ModalFooter>
        </Form>
      </ModalContent>
    </Modal>
  );
}
