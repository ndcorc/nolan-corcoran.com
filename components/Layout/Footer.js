import Link from 'next/link';

import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Group,
  Image,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from '@tabler/icons';

import useStyles from './styles';

const Footer = ({ links }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const { classes } = useStyles();
  let logo =
    colorScheme == "dark" ? "/assets/logoDark.png" : "/assets/logoLight.png";

  const items = links.map((link) => (
    <Anchor
      color="dimmed"
      key={link.label}
      href={link.link}
      sx={(theme) => ({
        lineHeight: 1,
        color: `${
          theme.colorScheme === "dark"
            ? theme.colors.dark[0]
            : theme.other.primary
        } !important`,
      })}
      onClick={(event) => event.preventDefault()}
      size="sm">
      {link.label}
    </Anchor>
  ));

  return (
    <div
      style={{ paddingTop: "120px", backgroundColor: theme.other.background }}>
      <div className={classes.footer}>
        <div className={classes.fInner}>
          <Box className={classes.logo} pl={"1rem"}>
            <Link href="/" passHref>
              <Button
                variant="subtle"
                radius="32"
                component={Image}
                src={logo}
                m={0}
                p={0}
                style={{ width: "10rem" }}
                alt="logo"
              />
            </Link>
          </Box>
          <Group className={classes.fLinks}>{items}</Group>

          <Group spacing="xs" position="right" pr={"4rem"} noWrap>
            <ActionIcon size="lg" variant="default" radius="xl">
              <IconBrandTwitter size={18} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" variant="default" radius="xl">
              <IconBrandYoutube size={18} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" variant="default" radius="xl">
              <IconBrandInstagram size={18} stroke={1.5} />
            </ActionIcon>
          </Group>
        </div>
      </div>
    </div>
  );
};

export default Footer;
