import { motion } from 'framer-motion';

import {
  Center,
  Container,
  Image,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';

import { abouts } from '../../data';
import useStyles from './styles';

const data = [
  { title: "Members in the community", num: "100000+" },
  { title: "Total rewards distributed", num: "$15000+" },
  { title: "AMAs Completed", num: "150+" },
];

const About = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.num}</Text>
      <Text className={classes.title}>{stat.title}</Text>
    </div>
  ));
  return (
    <div id="about">
      <motion.div
        whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
        transition={{ duration: 0.5 }}>
        <Container fluid py={"3rem"}>
          <Center>
            <Title order={2} className="head-text">
              Continuous{" "}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{
                  from: theme.colors.primary[3],
                  to: theme.colors.primary[6],
                }}>
                Learning
              </Text>{" "}
              Is The Minimum
              <br />
              Requirement For{" "}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{
                  from: theme.colors.primary[3],
                  to: theme.colors.primary[6],
                }}>
                Success
              </Text>{" "}
              In Any Field
            </Title>
          </Center>
          <div className={classes.profiles}>
            {abouts.map((about, index) => {
              return (
                <motion.div
                  whileInView={{ opacity: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.8, type: "tween" }}
                  className={classes.profileItem}
                  key={about.title + index}>
                  <Image
                    src={about.imgUrl}
                    alt={about.title}
                    className={classes.itemImg}
                    radius="lg"
                    width={200}
                    height={200}
                  />
                  <Title
                    order={5}
                    m={0}
                    sx={{
                      fontSize: "0.75rem",
                      color: theme.other.text.primary,
                      margin: "1.5rem 0px 0.2rem !important",
                      textAlign: "left",
                      [theme.fn.largerThan(2000)]: {
                        fontSize: "1rem",
                      },
                      [theme.fn.smallerThan(450)]: {
                        fontSize: "0.5rem",
                      },
                    }}>
                    {about.title}
                  </Title>
                  <Text
                    size="sm"
                    sx={{
                      marginTop: 0,
                      textAlign: "left",
                      color: theme.other.brown,
                      lineHeight: "1.35",

                      [theme.fn.largerThan(2000)]: {
                        fontSize: "1.75rem",
                      },
                    }}>
                    {about.description}
                  </Text>
                </motion.div>
              );
            })}
          </div>
          {/*  <Container id="stats" sx={{ position: "relative" }}>
          <div className={classes.root}>{stats}</div>
        </Container> */}
        </Container>
      </motion.div>
    </div>
  );
};

export default About;
