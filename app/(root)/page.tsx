import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";


export default async function Home({searchParams}: {searchParams: Promise<{query: string}>}) {
  //searchParams is a promise that resolves to an object with a query property
  const query = (await searchParams).query;

  const posts = [{ 
    _createdAt: new Date().toISOString(),
    views: 100,
    _id: '123',
    author: { _id: 1, name: 'Chinmay'},
    description: 'CyberTech Platform is a platform for startups to pitch their ideas to investors.',
    image: 'https://picsum.photos/100/100',
    category: 'Technology',
    title: 'CyberTech Platform',
  },
  {
    _createdAt: new Date().toISOString(),
    views: 250,
    _id: '125',
    author: { _id: 2, name: 'Sarah'},
    description: 'EcoGrow is an innovative app that helps urban dwellers create and maintain sustainable home gardens.',
    image: 'https://picsum.photos/300/400',
    category: 'Sustainability',
    title: 'EcoGrow: Urban Gardening Made Easy',
  }
]
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

      <section className='section_container'>
        <p className="text-3xl font-semibold">
          {query ? `Search results for "${query}"` : 'Latest startups'}
        </p>

        <ul className="mt-7 card_grid">
          {/* TODO: Fetch startups from database */}
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-result">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
