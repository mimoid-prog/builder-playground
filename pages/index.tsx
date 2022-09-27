import builder, { BuilderComponent } from "@builder.io/react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { BuilderContent } from "@builder.io/sdk";

export const getStaticProps: GetStaticProps<{
  content: BuilderContent;
}> = async () => {
  const content: BuilderContent = await builder
    .get("page", {
      userAttributes: {
        urlPath: "/",
      },
    })
    .toPromise();

  return {
    props: {
      content: content || null,
    },
    revalidate: 5,
  };
};

function index({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return <BuilderComponent model="page" content={content} />;
}

export default index;
