import { useState } from 'react';

import moment from 'moment';
import { useRouter } from 'next/router';

import { BlockComponent } from '@/components';
import {
  Box,
  Center,
  Divider,
  Image,
  Loader,
  Paper,
  Space,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import {
  useMediaQuery,
  useScrollIntoView,
} from '@mantine/hooks';

const Post = ({data, blocks}) => {
  const router = useRouter();
  const theme = useMantineTheme();
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView();
  const matches = useMediaQuery("(max-width: 1200px)");
  console.log("data", data);
  let { cover, title, author, publishedOn, id, description } = data;
  let isDark = theme.colorScheme === "dark";
  let [toggleDir, setToggleDir] = useState(false);
  let [wasQuote, setWasQuote] = useState(false);

  return noId ? (
    router.push("/")
  ) : !data ? (
    <Paper />
  ) : (
    <Stack
      spacing={0}
      align="center"
      pt={"7rem"}
      pb={"2rem"}
      sx={(theme) => ({
        [theme.fn.smallerThan("sm")]: {
          marginTop: "0rem !important",
          paddingTop: "7rem !important",
        },
      })}>
      <Image
        placeholder={<Loader size="lg" />}
        radius="lg"
        src={cover}
        alt="done"
        width="70rem"
        height="30rem"
        sx={(theme) => ({
          maxWidth: "100vw !important",
          [theme.fn.smallerThan("sm")]: {
            borderRadius: "0px !important",
            marginTop: "0rem !important",
            paddingTop: "0rem !important",
          },
        })}
      />
      <Paper
        p={"1rem 1rem"}
        radius="md"
        shadow="xl"
        mt="-12rem"
        sx={(theme) => ({
          backgroundColor: theme.other.surface,
          overflow: "visible",
          width: "60rem",
          maxWidth: "100%",
          boxShadow: `${theme.fn.rgba(
            isDark ? theme.black : theme.other.text.primary,
            0.35,
          )} 0px 5px ${isDark ? "15px" : "15px"}`,
          zIndex: 2,
          [theme.fn.smallerThan("sm")]: {
            fontSize: "1em !important",
            margin: "-5rem !important",
            padding: "10px !important",
          },
        })}>
        <Space h="lg" p={"2rem 0rem"} />
        <Text weight="500" align="center" size="1rem" transform="uppercase">
          {moment(publishedOn).format("MMMM Do YYYY")}
        </Text>
        <Space h="lg" p={"0.5rem 0rem"} />
        <Title
          order={1}
          m={"0rem auto !important"}
          p={"0rem 0.5rem"}
          weight={500}
          align="center"
          sx={(theme) => ({
            color: isDark ? theme.other.text.primary : theme.other.primary,
            maxWidth: "100rem",
            [theme.fn.smallerThan("sm")]: {
              margin: "1rem 0rem !important",
              fontSize: "3rem !important",
            },
          })}>
          {title}
        </Title>
        <Center>
          <Divider
            m={"1.5rem"}
            p={"0rem"}
            size="lg"
            sx={{ width: "5vw" }}
            color="dark"
          />
        </Center>
        <Title
          order={4}
          p={"0 1rem"}
          m={"1rem 8rem !important"}
          align="center"
          size={"1.25rem !important"}
          italic
          weight={500}
          sx={(theme) => ({
            color: theme.other.text.secondary,
            maxWidth: "80rem",
            zIndex: 1,
            [theme.fn.smallerThan("sm")]: {
              margin: "1rem 0rem !important",
              fontSize: "1rem !important",
            },
          })}>
          {description}
        </Title>

        <Box component="article">
          <Box
            m="4rem"
            p={"0 1rem"}
            sx={{
              minHeight: "50vh",
              [theme.fn.smallerThan("sm")]: {
                padding: "1rem !important",
                margin: "0rem !important",
              },
            }}>
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
  );
};


export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: false,
  };
};

export const getStaticProps = async ({params}) => {
  return await getPost(params.slug)
};


export default Post;
