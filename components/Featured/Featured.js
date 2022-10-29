import { motion } from 'framer-motion';

import {
  Button,
  Center,
  Container,
  Grid,
  Image,
  Stack,
  Title,
  useMantineTheme,
} from '@mantine/core';
//import { HiOutlineArrowLongRight } from 'react-icons/hi';
import { IconArrowNarrowRight } from '@tabler/icons';

import contactDark from '../Contact/contactDark.svg';
import contactLight from '../Contact/contactLight.svg';
import useStyles from './styles';

const data = [
  { title: "Members in the community", num: "100000+" },
  { title: "Total rewards distributed", num: "$15000+" },
  { title: "AMAs Completed", num: "150+" },
];

const Featured = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

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
                  spacing="0px !important" /* sx={{ alignItems: "center !important" }} */
                >
                  <Title
                    order={5}
                    m={"0 !important"}
                    py="0.25rem"
                    sx={{ lineHeight: "1 !important" }}
                    /* className="head-text" */
                    /*   sx={{
                      padding: "0px !important",
                      margin: "0px !important",
                    }} */
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
                    //mx={"5rem !important"}
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
                radius="150px"
                src={
                  theme.colorScheme === "dark"
                    ? contactDark.src
                    : contactLight.src
                }
                /*  src="https://img.freepik.com/free-vector/blue-background-with-halftone-diagonal-lines_1017-30146.jpg?w=2000&t=st=1666901498~exp=1666902098~hmac=c92f76aa14580250589adbf730771a66e0e0983a7c2ffdbf946e7b53f439d729" */
                alt="featured_img"
                /*  height={"100% !important"}*/
                width="auto"
                //height={"20"}
                height={"60vh"}
                styles={{
                  imageWrapper: { height: "50% !important" },
                  root: { height: "50% !important" },
                }}
              />
            </Grid.Col>
            {/*  <Container id="stats" sx={{ position: "relative" }}>
          <div className={classes.root}>{stats}</div>
        </Container> */}
          </Grid>
        </Container>
      </motion.div>
    </div>
  );
};

export default Featured;
