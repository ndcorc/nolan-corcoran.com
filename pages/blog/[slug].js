import { useState } from 'react';

import moment from 'moment';
import { useRouter } from 'next/router';
import { getPost } from '@/lib/notion/notion';

import { BlockComponent } from '@/components';
import {
  Box,
  Center,
  Divider,
  Image,
  Loader,
  Paper,
  Space,
  Container,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery, useScrollIntoView } from '@mantine/hooks';

const Post = ({ data, blocks, noId }) => {
  console.log('data', data);
  const router = useRouter();
  const theme = useMantineTheme();
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView();
  const matches = useMediaQuery('(max-width: 1200px)');

  let { cover, title, author, publishedOn, id, description } = data;
  let isDark = theme.colorScheme === 'dark';
  let [toggleDir, setToggleDir] = useState(false);
  let [wasQuote, setWasQuote] = useState(false);

  return noId ? (
    router.push('/')
  ) : !data ? (
    <Paper />
  ) : (
    <Container
      px={0}
      sx={(theme) => ({
        [theme.fn.smallerThan('sm')]: {
          marginLeft: '0rem !important',
          marginRight: '0rem !important',
          paddingLeft: '0rem !important',
          paddingRight: '0rem !important',
        },
      })}
    >
      <Stack
        spacing={0}
        align='center'
        pt={'7rem'}
        pb={'2rem'}
        sx={(theme) => ({
          [theme.fn.smallerThan('sm')]: {
            marginTop: '0rem !important',
            paddingTop: '7rem !important',
            padding: '0rem',
          },
        })}
      >
        <Image
          placeholder={<Loader size='lg' />}
          radius='lg'
          src={cover}
          alt='done'
          width='140%'
          height='30rem'
          sx={(theme) => ({
            maxWidth: '100vw !important',
            [theme.fn.smallerThan('sm')]: {
              borderRadius: '0px !important',
              marginTop: '0rem !important',
              paddingTop: '0rem !important',
            },
          })}
        />
        <Paper
          p={'1rem 2rem'}
          radius='md'
          shadow='xl'
          mt='-12rem'
          sx={(theme) => ({
            width: '120% !important',
            backgroundColor: theme.other.surface,
            overflow: 'visible',
            maxWidth: '100vw !important',
            boxShadow: `${theme.fn.rgba(
              isDark ? theme.black : theme.other.text.primary,
              0.35
            )} 0px 5px ${isDark ? '15px' : '15px'}`,
            zIndex: 2,
            [theme.fn.smallerThan('sm')]: {
              fontSize: '1em !important',
              margin: '-5rem 0 !important',
              padding: '10px',
            },
          })}
        >
          <Space h='lg' p={'2rem 0rem'} />
          <Text weight='500' align='center' size='1rem' transform='uppercase'>
            {moment(publishedOn).format('MMMM Do YYYY')}
          </Text>
          <Space h='lg' p={'0.5rem 0rem'} />
          <Title
            order={1}
            m={'0rem auto !important'}
            p={'0rem 0.5rem'}
            weight={500}
            align='center'
            sx={(theme) => ({
              color: isDark ? theme.other.text.primary : theme.other.primary,
              maxWidth: '100rem',
              [theme.fn.smallerThan('sm')]: {
                margin: '1rem 0rem !important',
                fontSize: '3rem !important',
              },
            })}
          >
            {title}
          </Title>
          <Center>
            <Divider
              m={'1.5rem'}
              p={'0rem'}
              size='lg'
              sx={{ width: '5vw' }}
              color='dark'
            />
          </Center>
          <Title
            order={4}
            p={'0 1rem'}
            m={'1rem 8rem !important'}
            align='center'
            size={'1.25rem !important'}
            italic
            weight={500}
            sx={(theme) => ({
              color: theme.other.text.secondary,
              maxWidth: '80rem',
              zIndex: 1,
              [theme.fn.smallerThan('sm')]: {
                margin: '1rem 0rem !important',
                fontSize: '1rem !important',
              },
            })}
          >
            {description}
          </Title>

          <Box component='article'>
            <Box
              m='4rem 0rem'
              p={'0 2rem'}
              sx={{
                minHeight: '50vh',
                [theme.fn.smallerThan('sm')]: {
                  padding: '1rem !important',
                  margin: '0rem !important',
                },
              }}
            >
              {blocks?.map((block, index) => {
                const { type, id } = block;
                const value = block[type];
                let blockComponent = (
                  <BlockComponent
                    key={index}
                    block={block}
                    matches={matches}
                    dir={null}
                    quoteDir={toggleDir}
                  />
                );
                return blockComponent;
              })}
            </Box>
          </Box>
        </Paper>
      </Stack>
    </Container>
  );
};

/* export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
}; */

export const getServerSideProps = ({ params }) => getPost(params.slug);

export default Post;
