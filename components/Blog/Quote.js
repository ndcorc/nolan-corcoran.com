import { GrBlockQuote } from 'react-icons/gr';
import twitterShare from 'twitter-share';

import {
  ActionIcon,
  Blockquote,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import {
  IconBrandFacebook,
  IconBrandTwitter,
} from '@tabler/icons';

const Quote = ({ m, cite, quote, dir, matches }) => {
  const theme = useMantineTheme();
  return (
    <Stack
      spacing={"0px !important"}
      //mt={"1rem !important"}
      sx={(theme) => ({
        margin: `${m} !important`,
        float: dir,
        shapeOutside: "circle(100%) !important",
        //shapeMargin: "50px",
        // alignSelf: "center !important",
        width: `${!matches ? "50%" : null} !important`,
        height: "50% !important",
        borderRadius: "20px !important",
        boxShadow:
          theme.colorScheme !== "dark"
            ? "rgba(0, 0, 0, 0.24) 0px 3px 8px"
            : "rgba(0, 0, 0, 1) 0px 3px 8px",
        backgroundColor:
          theme.colorScheme !== "dark"
            ? theme.other.background
            : theme.colors.dark[6],
      })}>
      <Blockquote
        cite={
          <Text
            size={"1rem"}
            px={"1rem"}
            mt={"0rem !important"}
            py={"0rem !important"}
            sx={{
              marginTop: "0rem !important",
            }}>
            {cite}
          </Text>
        }
        mb={"0rem !important"}
        mt={"0rem !important"}
        pb={"0rem !important"}
        pt={"0.25rem !important"}
        sx={(theme) => ({
          fontSize: "1rem !important",
        })}
        icon={
          <GrBlockQuote
            size={"70px"}
            style={{
              marginLeft: "0rem !important",
              marginRight: "0rem !important",
            }}
          />
        }>
        <Text pr={"20px"} sx={{ margin: "4.5rem 0rem 0rem 0px !important" }}>
          <em>{quote}</em>
        </Text>
      </Blockquote>
      <Group
        spacing={0}
        pr={"1rem"}
        pb="2px"
        sx={{
          [theme.fn.smallerThan("xs")]: {
            marginTop: theme.spacing.md,
          },
        }}
        position="right"
        noWrap>
        <ActionIcon
          component="a"
          href={twitterShare({
            text: `${quote}${cite ? ` - ${cite}` : ""}\n`,
            url: "https://nolancorcoran.dev",
            //hashtags: ["some", "cool", "hashtags"], // optional Array of Strings
            //via: "twitterusername", // optional String
            /* related: [
              {
                username: "letiagoalves",
                description: "developer",
              },
              {
                username: "twitter",
                description: "social network",
              },
            ], */
          })}
          size="lg">
          <IconBrandTwitter size={18} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          component="a"
          href={`https://www.facebook.com/sharer/sharer.php?u=https://nolancorcoran.dev`}
          size="lg">
          <IconBrandFacebook size={18} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Stack>
  );
};

export default Quote;
