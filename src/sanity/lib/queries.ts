import { groq } from "next-sanity";

export const ALL_PRODUCTS_QUERY = groq`
  *[_type == "product" || _type == "parfum"] | order(_createdAt asc) {
    _id,
    nom,
    maison,
    prix,
    image,
    images,
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
    images,
    slug,
    volume,
    notes
  }
`;

export const RELATED_PRODUCTS_QUERY = groq`
  *[_type in ["product", "parfum"] && maison == $maison && slug.current != $slug][0...4] | order(_createdAt desc) {
    _id,
    nom,
    maison,
    prix,
    image,
    images,
    slug
  }
`;
