import { motion } from 'framer-motion';

import { images } from '@/data';
import {
  Button,
  Center,
  Container,
  Grid,
  Image,
  Loader,
  Stack,
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

const Featured = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  console.log(images.contactDark);

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
                    {"August 12, 2021"}
                  </Title>
                  <Title
                    order={2}
                    m={"0 !important"}
                    py="0.5rem"
                    sx={{ lineHeight: "1 !important" }}>
                    <em>{"Purpose "}</em>
                    {"A blog template for Super & Notion"}
                  </Title>
                  <Title
                    order={5}
                    m={"0 !important"}
                    py="0.5rem"
                    sx={{ lineHeight: "1.25 !important" }}>
                    {
                      "Controversial or not, microdosing is proving to have some incredible benefits, learn more about what microdosing is and who's doing it."
                    }
                  </Title>
                  <Button
                    size="lg"
                    radius="lg"
                    my="1rem !important"
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
