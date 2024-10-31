// this file contains all the queries for the sanity studio for the startup app
import { defineQuery } from "next-sanity";

/**
 * Query to fetch startup documents from Sanity
 * 
 * Conditions:
 * - Document type must be "startup"
 * - Must have a defined slug
 * - If no search parameter is provided, returns all startups
 * - If search parameter exists, matches against:
 *   - Startup title
 *   - Category
 *   - Author name
 * 
 * Returns sorted by creation date (newest first) with:
 * - Startup ID, title, slug, description, category
 */
export const STARTUPS_QUERY = defineQuery(`
  *[_type == "startup" && defined(slug.current) && !defined($search) || 
  title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
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


/**
 * Query to fetch a single startup document by ID from Sanity
 * 
 * Conditions:
 * - Document type must be "startup"
 * - Matches exact _id parameter
 * - Returns first (and should be only) matching document
 * 
 * Returns startup details including:
 * - Startup ID, title, slug, description
 * - Creation date
 * - Author details (ID, name, image, bio)
 * - View count, category, image, pitch
 */
export const STARTUP_BY_ID_QUERY = defineQuery(`
  *[_type == "startup" && _id == $id][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    _createdAt,
    author -> {
      _id,
      name,
      image,
      bio
    },
    views,
    category,
    image,
    pitch
  }
`);