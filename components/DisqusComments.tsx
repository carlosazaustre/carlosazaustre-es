"use client";

import { DiscussionEmbed } from "disqus-react";

interface Props {
  slug: string;
  title: string;
}

export default function DisqusComments({ slug, title }: Props) {
  return (
    <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "3px solid var(--border)" }}>
      <DiscussionEmbed
        shortname="carlosazaustre"
        config={{
          url: `https://carlosazaustre.es/blog/${slug}`,
          identifier: slug,
          title,
          language: "es_ES",
        }}
      />
    </div>
  );
}
