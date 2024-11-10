// this file contains all the queries for the sanity studio for the startup app
import { defineQuery } from "next-sanity";

/**
 * Query to fetch startup documents from Sanity
 * 
 * Conditions:
 * - Document type must be "startup" 
 * - If no search parameter is provided, returns all startups
 * - If search parameter exists, matches against:
 *   - Startup title
 *   - Author name
 * 
 * Returns: _id (Startup ID), _createdAt (timestamp), title, description, 
 * author (with _id, name, image, username),
 * views, slug, category, image, pitch
 * 
 * Results sorted by creation date (newest first)
 */
export const STARTUPS_QUERY = `
  *[_type == "startup" && 
    ($search == null || 
      title match $search + "*" || 
      author->name match $search + "*"
    )] {
    _id,
    _createdAt,
    title,
    description,
    "author": author->{
      _id,
      name,
      image,
      username
    },
    views,
    slug,
    category,
    image,
    pitch
  } | order(_createdAt desc)
`;


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
      bio,
      username
    },
    views,
    category,
    image,
    pitch
  }
`);

/**
 * Query to fetch view count for a single startup document by ID from Sanity
 * 
 * Conditions:
 * - Document type must be "startup"
 * - Matches exact _id parameter
 * - Returns first (and should be only) matching document
 * 
 * Returns:
 * - Startup ID
 * - View count
 */
export const STARTUP_VIEWS_QUERY = defineQuery(`
  *[_type == "startup" && _id == $id][0] {
    _id,
    views
  }
`);

/**
 * Query to fetch a single author document by GitHub ID from Sanity
 * 
 * Conditions:
 * - Document type must be "author" 
 * - Matches exact GitHub id parameter
 * - Returns first (and should be only) matching document
 * 
 * Returns author details including:
 * - Internal Sanity ID (_id)
 * - GitHub ID (id)
 * - Display name
 * - Profile image
 * - Bio text
 * - GitHub username
 * - Email address
 */
export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
  *[_type == "author" && id == $id][0] {
    _id,
    id,
    name,
    image,
    bio,
    username,
    email
  }
`);

/**
 * Query to fetch a single author document by ID from Sanity
 * 
 * Conditions:
 * - Document type must be "author" 
 * - Matches exact _id parameter
 * - Returns first (and should be only) matching document
 */
export const AUTHOR_BY_ID_QUERY = defineQuery(`
  *[_type == "author" && _id == $id][0]{
      _id,
      id,
      name,
      username,
      email,
      image,
      bio
  }
  `);

  
  /**
   * Query to fetch all startup documents by author ID from Sanity
   * 
   * Conditions:
   * - Document type must be "startup"
   * - Author reference matches exact ID parameter
   * - Orders results by creation date descending (newest first)
   * 
   * Returns startup details including: Internal Sanity ID (_id), Title, URL slug, Creation date, 
   * Author details (ID, name, image, bio), View count, Description, Category, Featured image
   */
  export const STARTUPS_BY_AUTHOR_QUERY =
  defineQuery(`*[_type == "startup" && author._ref == $id] | order(_createdAt desc) {
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  }, 
  views,
  description,
  category,
    image,
  }
`);
