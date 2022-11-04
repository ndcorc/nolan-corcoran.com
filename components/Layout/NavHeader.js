import {
  useEffect,
  useState,
} from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

import { images } from '@/data';
import {
  Box,
  Burger,
  Container,
  Group,
  Header,
  Image,
  Paper,
  Stack,
  Transition,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import {
  useDisclosure,
  useHover,
  useScrollLock,
  useWindowScroll,
} from '@mantine/hooks';

import NavbarLink from './NavbarLink';
import useStyles from './styles';

const HEADER_HEIGHT = 80;

const NavHeader = ({ links }) => {
  const [scroll, scrollTo] = useWindowScroll();
  const [scrollLocked, setScrollLocked] = useScrollLock();
  const router = useRouter();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes, cx } = useStyles();
  const { hovered, ref } = useHover();
  const { isHovered, setIsHovered } = useState(false);

  const handleToggle = (value) => toggleColorScheme(value ? "dark" : "light");

  let logo =
    colorScheme == "dark" ? images.logoDark : images.logoLight;
  let scrolled = scroll.y >= HEADER_HEIGHT * 2 ? true : false;
  let blog = router.asPath.split("/").length > 2;

  useEffect(() => {
    setScrollLocked(false);
    close();
  }, [router]);

  return (
    <Header
      height={HEADER_HEIGHT}
      className={cx(
        classes.header,
        { [classes.scrolled]: scrolled === true },
        { [classes.unscrolled]: scrolled === false },
      )}>
      <Container className={classes.hInner}>
        <Burger
          opened={opened}
          onClick={() => {
            setScrollLocked(!opened);
            toggle();
          }}
          className={classes.burger}
          size="sm"
        />
        <Box className={classes.logo}>
          <Link href="/" passHref>
            <UnstyledButton
              radius="32"
              component={Image}
              src={logo}
              m={0}
              p={0}
              style={{
                width: "10rem",
              }}
              alt="logo"
            />
          </Link>
        </Box>
        <div className={classes.hLinks}>
          <Group spacing={2} position="center">
            {links.map((link) => (
              <NavbarLink key={link.label} link={link} drawer={false} />
            ))}
          </Group>
        </div>
        <Box
          pr={50}
          style={{
            width: "10rem",
            display: "flex",
            justifyContent: "flex-end",
          }}>
          <DarkModeSwitch
            checked={colorScheme == "dark"}
            onChange={handleToggle}
            style={{ textAlign: "right" }}
            size={24}
          />
        </Box>
        {/*  <ThemeToggle /> */}

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              <Stack
                pl={15}
                pt={15}
                sx={(theme) => ({
                  borderTop: `1px solid ${
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[9]
                      : theme.colors.gray[4]
                  }`,
                })}>
                {links.map((link) => (
                  <NavbarLink key={link.label} link={link} drawer={true} />
                ))}
              </Stack>
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
};

export default NavHeader;
