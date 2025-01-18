// src/lib/sanity.queries.ts
import { groq } from 'next-sanity';

// Get all posts for the blog listing
export const getAllPostsQuery = groq`
*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  subtitle,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  "categories": categories[]->{ _id, title, slug, color },
}
`;

export const getAllPostsWithCountQuery = groq`
{
  "posts": *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    slug,
    mainImage,
    publishedAt,
    excerpt,
    "categories": categories[]->{ _id, title, slug, color },
  },
  "total": count(*[_type == "post"])
}
`;

// Get a single post by slug with full content
export const getPostBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  subtitle,
  slug,
  mainImage,
  body,
  publishedAt,
  excerpt,
  "categories": categories[]->{ _id, title, slug, color },
}
`;

// Get all categories
export const getAllCategoriesQuery = groq`
*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug,
  color,
  description,
}
`;

// Get posts by category
export const getPostsByCategoryQuery = groq`
*[_type == "post" && $categoryId in categories[]._ref] | order(publishedAt desc) {
  _id,
  title,
  subtitle,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  "categories": categories[]->{ _id, title, slug, color },
}
`;

// Get featured posts
export const getFeaturedPostsQuery = groq`
*[_type == "post" && featured == true] | order(publishedAt desc) {
  _id,
  title,
  subtitle,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  "categories": categories[]->{ _id, title, slug, color },
}[0...3]
`;

// Get related posts (posts with same categories, excluding current post)
export const getRelatedPostsQuery = groq`
*[_type == "post" 
  && slug.current != $slug 
  && count(categories[@._ref in *[_type=="post" && slug.current==$slug][0].categories[]._ref]) > 0
] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  "categories": categories[]->{ _id, title, slug, color },
}
`;

// Get post count by category
export const getPostCountByCategoryQuery = groq`
*[_type == "category"] {
  _id,
  title,
  "postCount": count(*[_type == "post" && references(^._id)])
}
`;

// Search posts
export const searchPostsQuery = groq`
*[_type == "post" && (
  title match "*" + $searchTerm + "*" ||
  excerpt match "*" + $searchTerm + "*" ||
  pt::text(body) match "*" + $searchTerm + "*"
)] | order(publishedAt desc) {
  _id,
  title,
  subtitle,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  "categories": categories[]->{ _id, title, slug, color },
}
`;

// Query for getting the featured post
export const getFeaturedPostQuery = groq`
*[_type == "post" && featured == true][0] {
  _id,
  title,
  subtitle,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  categories[]-> {
    _id,
    title,
    color
  }
}
`;

// Fallback query to get latest post if no featured post exists
export const getLatestPostQuery = groq`
*[_type == "post"] | order(publishedAt desc)[0] {
  _id,
  title,
  subtitle,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  categories[]-> {
    _id,
    title,
    color
  }
}
`;

// Get all projects with basic info
export const getAllProjectsQuery = groq`
  *[_type == "project"] | order(featured desc) {
    _id,
    title,
    slug,
    description,
    company,
    period,
    type,
    image,
    technologies,
    "techStack": techStack[] {
      "category": category,
      "items": items
    },
    githubUrl,
    liveUrl,
    featured
}`;

export const getProjectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    company,
    period,
    type,
    image,
    technologies,
    "techStack": techStack[] {
      "category": category,
      "items": items
    },
    githubUrl,
    liveUrl,
    featured,
    challenges,
    "solutions": solutions[] {
      title,
      icon,
      description
    },
    implementation,
    results,
    "architectureDiagram": architectureDiagram {
      title,
      mermaidCode
    },
    "architectureDiagramUrl": architectureDiagramImage.asset->url
}`;

// Get featured projects
export const getFeaturedProjectsQuery = groq`
*[_type == "project" && featured == true] | order(_createdAt desc) {
  _id,
  title,
  slug,
  description,
  company,
  period,
  type,
  image,
  techStack,
  links
}[0...3]`;

// Get projects by type
export const getProjectsByTypeQuery = groq`
*[_type == "project" && type == $type] | order(_createdAt desc) {
  _id,
  title,
  slug,
  description,
  company,
  period,
  type,
  image,
  techStack,
  links,
  featured
}`;

export const getAllDiagramsQuery = groq`
*[_type == "project" && defined(architectureDiagram)] {
  _id,
  title,
  slug,
  type,
  architectureDiagram {
    title,
    mermaidCode
  }
}`;

// Get diagram by project ID
export const getDiagramByProjectIdQuery = groq`
*[_type == "project" && id.current == $id][0] {
  _id,
  title,
  id,
  type,
  architectureDiagram {
    title,
    mermaidCode
  }
}`;
