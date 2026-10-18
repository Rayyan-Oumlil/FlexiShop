import { storeCatalog } from "@/lib/sfcc/constants"
import ProductList from "./components/product-list"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FlexiShop | Shop - Tech, Fashion & Lifestyle",
  description: "Browse our curated collection of tech, fashion, and lifestyle products at FlexiShop.",
}

export default async function Shop() {
  return <ProductList collection={storeCatalog.rootCategoryId} />
}
