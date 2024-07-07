import connectMongo from "@/libs/mongoose";
import Posts from "@/models/Posts";

async function getData(businessId: string) {
  await connectMongo();

  const posts = await Posts.find({ businessId }).exec();

  return posts;
}

export default async function SocialPosts({
  params: { businessId },
}: {
  params: { businessId: string };
}) {
  const posts = await getData(businessId);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Social Posts</h1>
      {posts.length === 0 ? (
        <div className="flex flex-col items-center">
          <p>No posts available.</p>
          {/* <button
            onClick={handleGeneratePosts}
            className="btn btn-primary mt-4"
          >
            Generate Posts
          </button> */}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post) => (
            <div key={post._id} className="bg-white p-4 shadow rounded">
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
