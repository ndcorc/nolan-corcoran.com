import { motion } from 'framer-motion';
import Link from 'next/link';

import {
  BackgroundImage,
  Button,
  Card,
  Container,
  Group,
  Image,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconArrowNarrowRight } from '@tabler/icons';

import { images } from '../../data';
import useStyles from './styles';

const HeroHeader = () => {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const { hovered, ref } = useHover();

  const isDark = theme.colorScheme === "dark";

  return (
    <div id="home" className={classes.bgImg}>
      <BackgroundImage
        src={isDark ? "/assets/bgDark.png" : "/assets/bgIMG.png"}>
        <Container fluid>
          <div className={classes.header} id="headerFlex">
            <motion.div
              whileInView={{ x: [-100, 0], opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className={classes.headerInfo}
              id="headerInfo">
              <Stack
                className={classes.headerBadge}
                id="headerBadge"
                justify="center"
                mb={"2rem"}
                spacing={5}>
                <Card
                  id="badgeCmp"
                  shadow="sm"
                  radius="lg"
                  px={40}
                  sx={{ margin: "0px" }}
                  withBorder>
                  <Group>
                    <span id="span" className={classes.span}>
                      👋
                    </span>
                    <Stack spacing={0} ml={20} align="center" id="stack">
                      <Text
                        weight={200}
                        align="left"
                        size="xs"
                        id="badgeText"
                        sx={(theme) => ({
                          width: "100%",
                          textTransform: "uppercase",
                          lineHeight: "1.5",
                          alignItems: "center",
                          fontFamily: `${theme.other.fonts[1]} !important`,
                        })}>
                        Hello, I am
                      </Text>
                      <Title
                        order={2}
                        weight="bold"
                        id="badgeText"
                        sx={(theme) => ({
                          marginTop: "0px !important",
                          marginBottom: "0px !important",
                          marginLeft: "-2px !important",
                          fontFamily: `${theme.other.fonts[1]} !important`,
                        })}>
                        Nolan
                      </Title>
                    </Stack>
                  </Group>
                </Card>
                <Card
                  shadow="sm"
                  radius="lg"
                  px={40}
                  mt={10}
                  sx={{ margin: "0px" }}
                  withBorder>
                  <Stack align="flex-end" spacing={0}>
                    <Text
                      transform="uppercase"
                      size="xs"
                      sx={(theme) => ({
                        fontFamily: `${theme.other.fonts[1]} !important`,
                      })}>
                      {"Full Stack Developer"}
                    </Text>
                    <Text
                      transform="uppercase"
                      size="xs"
                      sx={(theme) => ({
                        fontFamily: `${theme.other.fonts[1]} !important`,
                      })}>
                      Software Engineer
                    </Text>
                    <Text
                      transform="uppercase"
                      size="xs"
                      sx={(theme) => ({
                        fontFamily: `${theme.other.fonts[1]} !important`,
                      })}>
                      Cloud Architect
                    </Text>
                  </Stack>
                </Card>
                <Link
                  href="https://drive.google.com/file/d/1BhExKCESOD1DhMEkqAbgqTRT2P6cTBEs/view?usp=sharing"
                  passHref>
                  <Button
                    ref={ref}
                    variant={hovered ? "outline" : "gradient"}
                    size="xl"
                    radius="lg"
                    px={30}
                    my={10}
                    //className={classes.control}

                    rightIcon={<IconArrowNarrowRight />}>
                    <Text
                      size={"20px"}
                      color={hovered ? theme.other.primary : null}
                      weight={"500"}
                      sx={{ lineHeight: "3 !important" }}>
                      {"Read On"}
                    </Text>
                  </Button>
                </Link>
              </Stack>
            </motion.div>
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5, delayChildren: 0.5 }}
              className={classes.headerImg}
              id="headerImg">
              <Image
                className={classes.imgElement}
                src={images.profile}
                alt="profile_bg"
              />
              <motion.img
                whileInView={{ scale: [0, 1] }}
                transition={{ duration: 1, ease: "easeInOut" }}
                src={images.circle}
                alt="profile_circle"
                className={classes.overlayCircle}
              />
            </motion.div>
          </div>
        </Container>
      </BackgroundImage>
    </div>
  );
};

export default HeroHeader;
