import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default function page({ params }: Props) {
  return (
    <>
      <div>course details {params.slug}</div>
    </>
  );
}
