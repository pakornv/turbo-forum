import { Button } from "@repo/ui/button";
import { Form } from "@repo/ui/form";
import { TextArea } from "@repo/ui/text-area";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { createComment } from "./actions";

type CreateCommentFormProps = {
  postId: string;
  onCancel?: () => void;
  onSuccess?: () => void;
};

export function CreateCommentForm({
  postId,
  onCancel,
  onSuccess,
}: CreateCommentFormProps) {
  const { execute, isPending } = useAction(createComment.bind(null, postId), {
    onError: ({ error }) => error.serverError && toast.error(error.serverError),
    onSuccess: () => {
      toast.success("Comment posted successfully");
      onSuccess?.();
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    execute(formData);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <TextArea
        name="body"
        aria-label="body"
        placeholder="What's on your mind..."
        className="min-h-[100px] w-full resize-none"
        isRequired
      />
      <div className="mt-2.5 flex justify-end gap-x-3">
        <Button variant="outline" onPress={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isPending={isPending}>
          Post
        </Button>
      </div>
    </Form>
  );
}
