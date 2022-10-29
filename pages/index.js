import { AnimatePresence } from 'framer-motion';

import {
  getDatabase,
  getPreview,
} from '@/lib/notion';
import { createStyles } from '@mantine/core';

import {
  Contact,
  HeroHeader,
  Latest,
} from '../components';

export const POSTS_PER_PAGE = 5;

const useStyles = createStyles((theme, _params, getRef) => {
  return {
    "& #home": {
      position: "relative",
      background: 'url("/bgIMG.png")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "repeat",
      [`& .${getRef("wrapper")}`]: {
        padding: "0",
        [`& .${getRef("copyright")}`]: { display: "none" },
      },
    },
  };
});

const Home = ({ posts, initialDisplayPosts, pagination }) => {
  const handExitComplete = () => {
    if (typeof window !== "undefined") {
      const hashId = window.location.hash;

      if (hashId) {
        const element = document.querySelector(hashId);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }
      }
    }
  };

  return (
    <AnimatePresence exitBeforeEnter onExitComplete={handExitComplete}>
      <HeroHeader />
      <Latest posts={posts} />
      {/*       <About />
      <Portfolio /> */}
      <Contact />
    </AnimatePresence>
  );
};

export async function getStaticProps() {
  let postsTable = await getDatabase(process.env.NOTION_DB);

  let posts = await postsTable.map(async (post) => {
    let preview = await getPreview(post.id);
    let mapped = {
      cover:
        post.cover?.file?.url ||
        post.cover?.external?.url ||
        "https://images.unsplash.com/photo-1626202378343-1e8b2a828a78",
      title: post.properties.Name.title[0]?.plain_text || "",
      author: post.properties.Author.rich_text[0].plain_text || "",
      publishedOn: post.properties.Published?.date?.start || "",
      id: post.id || "",
      description: post.properties.Description.rich_text[0].plain_text || "",
      slug: post.properties.Slug.rich_text[0].plain_text || "",
      featured: post.properties.Featured.checkbox || false,
      public: post.properties.Public.checkbox || false,
      tags: post.properties.Tags.multi_select || [],
      preview,
    };
    return mapped;
  });
  posts = await Promise.all(posts);
  posts = posts.filter((post) => post.public === true);
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return { props: { initialDisplayPosts, posts, pagination } };
}

export default Home;
