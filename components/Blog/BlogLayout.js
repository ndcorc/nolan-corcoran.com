import moment from 'moment';
import Link from 'next/link';
import { RiNewspaperLine } from 'react-icons/ri';

import {
  ArticleCard,
  Featured,
} from '@/components';
import {
  AspectRatio,
  Box,
  Card,
  Container,
  Group,
  Image,
  Loader,
  SimpleGrid,
  Space,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { useStyles } from './styles';

const BlogLayout = ({ posts, initialDisplayPosts }) => {
  const theme = useMantineTheme();
  const sm = useMediaQuery("(max-width: 768px)");

  console.log("theme smaller than sm", theme.fn.smallerThan("sm"));

  let { classes } = useStyles();
  let featured = posts.filter((post) => post.featured === true)[0];
  let isDark = theme.colorScheme === "dark";
  return (
    <div className={classes.bg}>
      <Container pt={"5rem"} px={"5rem"} fluid>
        <Box
          mt={"4rem"}
          mb={0}
          px={"10rem"}
          sx={(theme) => ({
            [theme.fn.smallerThan("sm")]: {
              margin: "0px !important",
              padding: "0px !important",
            },
            [theme.fn.largerThan("sm")]: {
              margin: "4rem 2rem 2rem !important",
              padding: "0 0rem !important",
            },
            [theme.fn.largerThan("md")]: {
              margin: "4rem 2rem 0rem !important",
              padding: "0 8rem !important",
            },
          })}>
          <Title
            order={1}
            color={isDark ? theme.colors.gray[4] : null}
            weight="normal"
            mb={4}
            align="center"
            sx={(theme) => ({
              [theme.fn.smallerThan("xs")]: {
                fontSize: "2.5rem !important",
              },
            })}>
            The Christian life isn&#39;t always easy, but it&#39;s{" "}
            <em
              style={{
                color: isDark ? theme.white : theme.other.primary,
                fontWeight: isDark ? "600" : "600",
                textDecoration: isDark ? "underline" : null,
                textDecorationThickness: isDark ? "1px !important" : null,
              }}>
              always
            </em>{" "}
            good.
          </Title>
        </Box>
        <Featured />
        <Space my="4rem" />
        <Box>
          <Title
            order={1}
            weight="600"
            mx={"0rem"}
            my={"0rem !important"}
            px={"md"}
            align="left"
            sx={(theme) => ({
              [theme.fn.smallerThan("xs")]: {
                margin: "2.5rem 0px 1rem 0 !important",
                fontSize: "3rem !important",
                textAlign: "center !important",
              },
              [theme.fn.largerThan("xs")]: {
                margin: "0rem !important",
                fontSize: "3rem !important",
                textAlign: "center !important",
              },
              [theme.fn.largerThan("sm")]: {
                textAlign: "left !important",
              },
            })}>
            All Posts
          </Title>
          <ArticlesCardsGrid posts={posts} />
        </Box>
      </Container>
    </div>
  );
};

const ArticlesCardsGrid = ({ posts }) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  let isDark = theme.colorScheme === "dark";

  const cards = posts.map((article, index) => (
    <ArticleCard key={index} post={article} />
  ));
  const cards2 = posts.map((article) => (
    <Link key={article.title} href={"/blog/" + article.slug}>
      <Card
        shadow="sm"
        radius="24px !important"
        p={0}
        withBorder
        className={classes.blogCard}
        align="flex-start">
        <AspectRatio ratio={2400 / 1080}>
          <Image
            placeholder={<Loader size="lg" />}
            alt="ArticleCard2"
            src={article.cover}
          />
        </AspectRatio>
        <Container fluid py={"1.25rem !important"} px={0} m={0}>
          <Group
            px="0.5rem !important"
            spacing={0}
            sx={{ justifyContent: "flex-start !important" }}>
            <ThemeIcon
              size="xl"
              color="transparent"
              sx={{ justifyContent: "flext-start !important" }}>
              <RiNewspaperLine
                size={24}
                style={{ justifyContent: "flext-start !important" }}
                color={isDark ? theme.white : theme.colors.primary[3]}
              />
            </ThemeIcon>
            <Title
              order={4}
              px="0rem !important"
              //py="0.25rem !important"
              my="0rem !important">
              {" Article"}
            </Title>
          </Group>
          <Title
            order={4}
            pl="1rem !important"
            my="0rem !important"
            pt="0.5rem !important"
            className={classes.blogTitle}>
            {article.title}
          </Title>

          <Title
            order={5}
            color="dimmed"
            pl="1rem !important"
            my="0rem !important"
            pt="0.5rem !important"
            pb="1rem !important">
            {article.description}
          </Title>
          <Card.Section
            px={"1rem !important"}
            pt={"0.5rem !important"}
            className={classes.footer}>
            <Text
              color="dimmed"
              size="0.75rem !important"
              transform="uppercase"
              weight={700}
              my="0rem !important">
              {moment(article.publishedOn).format("MMMM Do YYYY")}
            </Text>
          </Card.Section>
        </Container>
      </Card>
    </Link>
  ));

  return (
    <Container py="xl" mx="auto" fluid>
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: "xs", cols: 1 },
          { minWidth: "xs", cols: 2 },
          { minWidth: "sm", cols: 3 },
          { minWidth: "lg", cols: 3 },
        ]}
        align="flex-start">
        {cards}
      </SimpleGrid>
    </Container>
  );
};

export default BlogLayout;
