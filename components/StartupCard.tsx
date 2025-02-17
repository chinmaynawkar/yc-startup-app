import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity/types";
import { ROUTES } from '@/constants';

//Omit the author field from the Startup type and add an optional author field
export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author }

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
    const {
      _createdAt,
      views,
      author,
      title,
      category,
      _id,
      image,
      description,
    } = post;
  
    return (
      <li className="startup-card group">
        <div className="flex-between">
          <p className="startup_card_date">{formatDate(_createdAt)}</p>
          <div className="flex gap-1.5">
            <EyeIcon className="size-6 text-primary" />
            <span className="text-16-medium">{views}</span>
          </div>
        </div>
  
        <div className="flex-between mt-5 gap-5">
          <div className="flex-1">
            <Link href={`${ROUTES.USER}/${author?._id}`}>
              <p className="text-16-medium line-clamp-1">{author?.name}</p>
            </Link>
            <Link href={`${ROUTES.STARTUP}/${_id}`}>
              <h3 className="text-26-semibold line-clamp-1">{title}</h3>
            </Link>
          </div>
          <Link href={`${ROUTES.USER}/${author?._id}`}>
            <Image
              src={author?.image || "https://picsum.photos/100/100"}
              alt={`${author?.name}'s profile`}
              width={48}
              height={48}
              className="rounded-full"
            />
          </Link>
        </div>
  
        <Link href={`${ROUTES.STARTUP}/${_id}`}>
          <p className="startup-card_desc">{description}</p>
  
          <Image 
            src={image || '/placeholder.jpg'} 
            alt={title || "Startup image"}
            width={400}
            height={164}
            className="startup-card_img"
            priority={false}
            loading="lazy"
          />
        </Link>
  
        <div className="flex-between gap-3 mt-5">
          <Link href={`${ROUTES.HOME}?query=${category?.toLowerCase()}`}>
            <p className="text-16-medium">{category}</p>
          </Link>
          <Button className="startup-card_btn" asChild>
            <Link href={`${ROUTES.STARTUP}/${_id}`}>Details</Link>
          </Button>
        </div>
      </li>
    );
  };

export default StartupCard;
