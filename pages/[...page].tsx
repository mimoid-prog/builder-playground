import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import React from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Footer from "../components/footer";
import { BuilderContent } from "@builder.io/sdk";

export const getStaticProps: GetStaticProps<{
  content: BuilderContent;
  announcementContent: BuilderContent;
}> = async ({ params }) => {
  const content: BuilderContent = await builder
    .get("page", {
      userAttributes: {
        //@ts-ignore
        urlPath: "/" + (params?.page?.join("/") || ""),
      },
    })
    .toPromise();

  const announcementContent: BuilderContent = await builder
    .get("announcement")
    .toPromise();

  return {
    props: {
      content,
      announcementContent,
    },
    revalidate: 5,
  };
};

export async function getStaticPaths() {
  //  Fetch all published pages for the current model.
  //  Using the `fields` option will limit the size of the response
  //  and only return the `data.url` field from the matching pages.
  const pages = await builder.getAll("page", {
    fields: "data.url", // only request the `data.url` field
    options: { noTargeting: true },
    limit: 0,
  });

  return {
    paths: pages.map((page) => `${page.data?.url}`),
    fallback: true,
  };
}

export default function Page({
  content,
  announcementContent,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  //  This flag indicates if you are viewing the page in the Builder editor.
  const isPreviewing = useIsPreviewing();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  //  Add your error page here to return if there are no matching
  //  content entries published in Builder.
  if (!content && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{content?.data?.title}</title>
        <meta name="description" content={content?.data?.descripton} />
      </Head>

      {/* Render the Builder page */}

      <div style={{ padding: 20 }}>
        <BuilderComponent model="page" content={content} />
      </div>

      <BuilderComponent model="announcement" content={announcementContent} />

      <Footer />
    </>
  );
}
