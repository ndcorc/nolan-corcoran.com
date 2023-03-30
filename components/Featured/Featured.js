import { motion } from 'framer-motion';
import moment from 'moment';

import { images } from '@/data';
import {
  Button,
  Center,
  Container,
  Grid,
  Image,
  Loader,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { IconArrowNarrowRight } from '@tabler/icons';

import useStyles from './styles';

const data = [
  { title: "Members in the community", num: "100000+" },
  { title: "Total rewards distributed", num: "$15000+" },
  { title: "AMAs Completed", num: "150+" },
];

const Featured = ({post}) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  console.log(images.contactDark);
  console.log("slug = ", post.slug);


  return (
    <div id="about">
      <motion.div
        whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
        transition={{ duration: 0.5 }}>
        <Container pt="3rem" pb="0rem">
          <Grid align="center">
            <Grid.Col span={7}>
              <Center>
                <Stack
                  spacing="0px !important">
                  <Title
                    order={5}
                    m={"0 !important"}
                    py="0.25rem"
                    sx={{ lineHeight: "1 !important" }}
                  >
                    {moment(post.publishedOn).format("MMMM Do YYYY")}
                  </Title>
                  <Title
                    order={2}
                    m={"0 !important"}
                    pt="0.5rem"
                    sx={{ lineHeight: "1 !important" }}>
                    {post.title}
                  </Title>
                  <Title order={4}
                    m={"0.5rem 0rem 0rem !important"}
                    sx={{ lineHeight: "1 !important" }}
                  >
                    {post.description}
                  </Title>
                  <Text mt={"0.5rem"} lineClamp={3} color={theme.other.text.secondary} >
                    {post.preview}
                  </Text>
                  <Button
                    size="lg"
                    radius="md"
                    component="a"
                    my="1.5rem !important"
                    href={post.slug}
                    pr="1rem"
                    variant="outline"
                    fullWidth={false}
                    rightIcon={<IconArrowNarrowRight />}
                    sx={(theme) => ({
                      "&:hover": {
                        backgroundColor: theme.other.primary,
                        color: theme.white,
                        border: 0,
                      },
                      alignSelf: "flex-start !important",
                      transitionDuration: "0.3s !important",
                    })}>
                    {"Read More"}
                  </Button>
                </Stack>
              </Center>
            </Grid.Col>
            <Grid.Col span={5} pl={"2rem"}>
              <Image
                placeholder={<Loader size="lg" />}
                radius="150px"
                src={
                  theme.colorScheme === "dark"
                    ? "/assets/contactDark.svg"
                    : "/assets/contactLight.svg"
                }
                alt="featured_img"
                width="auto"
                height={"60vh"}
                styles={{
                  imageWrapper: { height: "50% !important" },
                  root: { height: "50% !important" },
                }}
              />
            </Grid.Col>
          </Grid>
        </Container>
      </motion.div>
    </div>
  );
};

export default Featured;
