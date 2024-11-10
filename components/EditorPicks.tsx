import { client } from "@/sanity/lib/client";
import { PLAYLIST_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import StartupCard, { StartupTypeCard } from "./StartupCard";

interface EditorPicksProps {
  slug: string;
}

const EditorPicks = async ({ slug }: EditorPicksProps) => {
  const { select: editorPosts } = await client.fetch(PLAYLIST_BY_SLUG_QUERY, {
    slug,
  });

  if (!editorPosts?.length) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <p className="text-30-semibold">Editor&apos;s Top Picks</p>
      <ul className="mt-7 card_grid-sm">
        {editorPosts.map((post: StartupTypeCard, i: number) => (
          <StartupCard key={`editor-pick-${post._id}-${i}`} post={post} />
        ))}
      </ul>
    </div>
  );
};

export default EditorPicks; 