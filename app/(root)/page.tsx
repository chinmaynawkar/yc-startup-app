import SearchForm from "../../components/SearchForm";


export default async function Home({searchParams}: {searchParams: Promise<{query: string}>}) {
  //searchParams is a promise that resolves to an object with a query property
  const query = (await searchParams).query;

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
    </>
  );
}
