import { useState } from 'react';

import {
  Aside,
  Box,
  Group,
  Text,
} from '@mantine/core';
import { IconListSearch } from '@tabler/icons';

import { useStyles } from './styles';

const LINK_HEIGHT = 38;
const INDICATOR_SIZE = 10;
const INDICATOR_OFFSET = (LINK_HEIGHT - INDICATOR_SIZE) / 2;

const TOC = (/* { links } */) => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(2);
  let links = [
    {
      label: "Usage",
      link: "#usage",
      order: 1,
    },
    {
      label: "Position and placement",
      link: "#position",
      order: 1,
    },
    {
      label: "With other overlays",
      link: "#overlays",
      order: 1,
    },
    {
      label: "Manage focus",
      link: "#focus",
      order: 1,
    },
    {
      label: "Examples",
      link: "#1",
      order: 1,
    },
    {
      label: "Show on focus",
      link: "#2",
      order: 2,
    },
    {
      label: "Show on hover",
      link: "#3",
      order: 2,
    },
    {
      label: "With form",
      link: "#4",
      order: 2,
    },
  ];

  const items = links.map((item, index) => (
    <Box
      component="a"
      href={item.link}
      onClick={(event) => {
        event.preventDefault();
        setActive(index);
      }}
      key={item.label}
      className={cx(classes.link, { [classes.linkActive]: active === index })}
      sx={(theme) => ({ paddingLeft: item.order * theme.spacing.lg })}>
      {item.label}
    </Box>
  ));

  return (
    <div>
      <Aside
        p="md"
        hiddenBreakpoint="lg"
        fixed={true}
        width={{ lg: 200 }}
        sx={(theme) => ({
          backgroundColor: theme.other.background,
          [theme.fn.smallerThan("lg")]: {
            display: "none",
          },
        })}>
        <Group mb="md">
          <IconListSearch size={18} stroke={1.5} />
          <Text>Table of contents</Text>
        </Group>
        <div className={classes.links}>
          <div
            className={classes.indicator}
            style={{
              transform: `translateY(${
                active * LINK_HEIGHT + INDICATOR_OFFSET
              }px)`,
            }}
          />
          {items}
        </div>
        <Text>Application sidebar</Text>
      </Aside>
    </div>
  );
};

export default TOC;
