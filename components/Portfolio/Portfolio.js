import React from 'react';

import {
  Container,
  Grid,
  Text,
  Title,
} from '@mantine/core';

import { services } from '../../data';
//import classes from "../styles-old/Card.module.css";
import useStyles from './styles';

const Portfolio = () => {
  const { classes, theme } = useStyles();

  const items = services.map((item) => {
    return (
      <Grid.Col key={item.title} className={classes.item} span={12} lg={4}>
        <div className={classes.wrapper}>
          <div className={classes.card}>
            <div className={classes.cardDiv}>
              <item.icon
                className={classes.svg}
                color={theme.colors[item.color][6]}
              />
            </div>
            <div className={classes.info}>
              <Text size="xl" weight="bold" mt={7}>
                {item.title}
              </Text>
              {/* <p dangerouslySetInnerHTML={{ __html: item.desc }}></p> */}
            </div>
          </div>
        </div>
        {/* <Card data={item}/>  */}
        {/* <div className={styles.card}>
          <div className={styles.cardIcon}>
            <item.icon color={theme.colors[item.color][6]} size={64} />
            <Text
              size="xl"
              weight="bold"
              mt={7}
              color={theme.colors[item.color][6]}
            >
              {item.title}
            </Text>
          </div>
          <Text
          size="lg"
            className={styles.onhover}
            dangerouslySetInnerHTML={{ __html: item.desc }}
          >
          </Text>
        </div> */}
      </Grid.Col>
    );
  });

  return (
    <div id="portfolio">
      <Container pt={64} pb={32} id="services" sx={{ position: "relative" }}>
        <Title
          align="center"
          mb={32}
          styles={(theme) => ({
            color: theme.other.text.primary,
          })}>
          Portfolio
        </Title>
        <Grid justify="center" style={{ overflow: "hidden" }}>
          {items}
        </Grid>
      </Container>
    </div>
  );
};

export default Portfolio;
