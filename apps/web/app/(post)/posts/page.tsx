import { auth } from "@/lib/auth";

async function PostList() {
  const session = await auth();

  return <div>{JSON.stringify(session)}</div>;
}

export default PostList;
