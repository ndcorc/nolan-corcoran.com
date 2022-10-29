import { motion } from 'framer-motion';

import ArticleCard from '@/components/Blog/ArticleCard';
import { Carousel } from '@mantine/carousel';
import {
  Box,
  Container,
  Title,
  useMantineTheme,
} from '@mantine/core';

import useStyles from './styles';

const data = [
  { title: "Members in the community", num: "100000+" },
  { title: "Total rewards distributed", num: "$15000+" },
  { title: "AMAs Completed", num: "150+" },
];

const Latest = ({ posts }) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <div id="about">
      <motion.div
        whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
        transition={{ duration: 0.5 }}>
        <Container pt="3rem" pb="0rem" px="5rem" fluid>
          <Box>
            <Title
              order={1}
              weight="600"
              mx={"0rem"}
              my={"1rem !important"}
              px={"md"}
              align="left"
              sx={(theme) => ({
                [theme.fn.smallerThan("xs")]: {
                  margin: "2.5rem 0px 1rem 0 !important",
                  fontSize: "3rem !important",
                  textAlign: "center !important",
                },
                [theme.fn.largerThan("xs")]: {
                  margin: "2.5rem 0px 2rem 0 !important",
                  fontSize: "3rem !important",
                  textAlign: "center !important",
                },
                [theme.fn.largerThan("sm")]: {
                  textAlign: "left !important",
                },
              })}>
              Latest from the blog
            </Title>
            <Carousel
              withIndicators
              //height={200}
              withControls={false}
              slideSize="33.3333%"
              slideGap="2rem"
              breakpoints={[
                { maxWidth: "md", slideSize: "50%" },
                { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
              ]}
              align="start"
              styles={{
                indicator: {
                  width: 12,
                  height: 4,
                  transition: "width 250ms ease",
                  backgroundColor: theme.other.primary,
                  marginTop: "80px !important",
                  "&[data-active]": {
                    width: 30,
                  },
                },
              }}>
              {posts.map((post, i) => (
                <Carousel.Slide key={i} sx={{ marginBottom: "3rem" }}>
                  <ArticleCard post={post} />
                </Carousel.Slide>
              ))}
              {/*        <Carousel.Slide key={2}>
                <ArticleCard post={posts[0]} />
              </Carousel.Slide> */}

              {/* <Carousel.Slide>
              <ArticleCard post={featured} />
            </Carousel.Slide>
            <Carousel.Slide>
              {" "}
              <ArticleCard post={featured} />
            </Carousel.Slide>
            <Carousel.Slide>
              {" "}
              <ArticleCard post={featured} />
            </Carousel.Slide> */}
              {/* ...other slides */}
            </Carousel>
          </Box>
        </Container>
      </motion.div>
    </div>
  );
};

export default Latest;
