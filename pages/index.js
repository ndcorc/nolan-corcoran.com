import { AnimatePresence } from 'framer-motion';

import { getHomePosts } from '@/lib/notion/notion';

import { Contact, HeroHeader, Latest } from '../components';

export const Home = ({ posts, initialDisplayPosts, pagination }) => {
  const handExitComplete = () => {
    if (typeof window !== 'undefined') {
      const hashId = window.location.hash;

      if (hashId) {
        const element = document.querySelector(hashId);

        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });
        }
      }
    }
  };

  return (
    <AnimatePresence exitBeforeEnter onExitComplete={handExitComplete}>
      <HeroHeader />
      <Latest posts={posts} />
      <Contact />
    </AnimatePresence>
  );
};

export const getServerSideProps = () => getHomePosts();

export default Home;
