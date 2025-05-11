import ImageWithFallback from "@/shared/ImageWithFallback";
import React from "react";
import Image from "@/assets/test.jpg";
import BooksDetails from "@/components/books/booksDetails";
import RelatedBooks from "@/components/books/RelatedBooks";

type Props = {};

export default function page({}: Props) {
  return (
    <>
      <div className="overflow-hidden">
        <div className="container grid grid-cols-[auto_1fr] gap-12 lg:py-20 py-12">
          <ImageWithFallback
            src={Image}
            alt="Image"
            width={800}
            height={800}
            className="w-[350px] h-[500px] object-cover rounded-2xl"
          />

          <BooksDetails book={null} />
        </div>
        <div className="bg-greynormal">
          <RelatedBooks books={null} />
        </div>
      </div>
    </>
  );
}
