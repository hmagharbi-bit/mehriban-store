import { groq } from "next-sanity";

export const ALL_PRODUCTS_QUERY = groq`
  *[_type == "product" || _type == "parfum"] | order(_createdAt asc) {
    _id,
    nom,
    maison,
    prix,
    image,
    slug,
    volume,
    notes
  }
`;

export const PRODUCT_BY_SLUG_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    nom,
    maison,
    prix,
    image,
    slug,
    volume,
    notes
  }
`;

export const HOME_PAGE_QUERY = groq`
  *[_type == "home"][0] {
    heroTitle,
    heroSubtitle,
    heroImage
  }
`;
