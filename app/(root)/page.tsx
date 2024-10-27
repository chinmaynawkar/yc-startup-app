import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

// Add at the top of your page component
export const revalidate = 0;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  //searchParams is a promise that resolves to an object with a query property
  const query = (await searchParams).query;
  let posts = [];

  try {
    const data = await sanityFetch({ query: STARTUPS_QUERY });
    posts = data.data || [];
  } catch (error) {
    console.error("Sanity query error:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    }
  }

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch your startup, <br /> Connect with investors
        </h1>

        <p className="sub-heading !max-w-3xl">
          YC Startup App is a platform for startups to pitch their ideas to
          investors.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-3xl font-semibold">
          {query ? `Search results for "${query}"` : "Latest startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p className="no-result">No startups found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
