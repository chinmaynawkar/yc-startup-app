import Image from "next/image";
import Link from "next/link";
import markdownIt from "markdown-it";
import { StartupTypeCard } from "./StartupCard";

const md = markdownIt();

interface StartupDetailsProps {
  data: StartupTypeCard;
}

const StartupDetails = ({ data }: StartupDetailsProps) => {
  const parsedPitch = md.render(data?.pitch || "");

  return (
    <div className="section_container">
      <img
        src={data.image}
        alt="thumbnail"
        className="w-full h-auto object-cover rounded-xl"
      />

      <div className="space-y-5 mt-10 max-w-4xl mx-auto">
        <div className="flex-between gap-5">
          <Link
            href={`/user/${data.author?._id}`}
            className="flex gap-2 items-center mb-3"
          >
            <Image
              src={data.author?.image || ''}
              alt={data.author?.name || ''}
              width={64}
              height={64}
              className="rounded-full aspect-square object-cover drop-shadow-lg"
            />

            <div>
              <p className="text-20-medium">{data.author?.name}</p>
              <p className="text-16-regular !text-black-300">
                @{data.author?.username}
              </p>
            </div>
          </Link>

          <p className="category-tag">{data.category}</p>
        </div>

        <h3 className="text-30-bold">Pitch Details</h3>
        {parsedPitch ? (
          <article
            className="prose max-w-4xl font-work-sans break-all"
            dangerouslySetInnerHTML={{ __html: parsedPitch }}
          />
        ) : (
          <p className="no-result">No pitch details available</p>
        )}
      </div>
    </div>
  );
};

export default StartupDetails;
