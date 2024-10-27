// this file contains all the queries for the sanity studio for the startup app
import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(`
  *[_type == "startup" && defined(slug.current)] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    category,
    image,
    views,
    _createdAt,
    author -> {
      _id,
      name,
      image,
      bio
    }
  }
`);
