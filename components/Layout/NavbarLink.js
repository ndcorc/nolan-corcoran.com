import React, { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  Indicator,
  NavLink,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';

import useStyles from './styles';

const NavbarLink = ({ link, drawer }) => {
  // console.log("drawer", drawer);
  const { hovered, ref } = useHover();
  const router = useRouter();
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes, cx } = useStyles();

  let isDark = colorScheme === 'dark';

  return (
    <Indicator
      inline
      size={7}
      offset={-10}
      ref={ref}
      disabled={
        (!hovered && router.route !== link.link) || drawer
        // && `/${link.label.toLowerCase()}` !== router.route
      }
      position='top-center'
      color={isDark ? theme.colors.dark[1] : theme.colors.primary[6]}
    >
      <NavLink
        label={
          <Text
            size='0.9rem'
            sx={(theme) => ({
              fontFamily: theme.other.fonts[1],
            })}
          >
            {link.label}
          </Text>
        }
        href={link.label}
        active={router.pathname === link.link && drawer !== false}
        color={isDark ? theme.white : theme.colors.primary[1]}
        variant='light'
        className={cx(classes.link, {
          [classes.drawer]: drawer !== false,
        })}
      />
    </Indicator>
  );
};

export default NavbarLink;
