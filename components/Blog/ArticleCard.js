import moment from 'moment';
import { GrArticle } from 'react-icons/gr';
import Link from 'next/link';

import {
  Badge,
  Card,
  Group,
  Image,
  Loader,
  Text,
  Title,
  Box,
  Stack,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { useStyles } from './styles';

const ArticleCard = (props) => {
  let { featured } = props;
  let sm = useMediaQuery('(max-width: 768px)');
  let order = featured ? 2 : 4;
  let { post } = props;
  let theme = useMantineTheme();
  let { classes } = useStyles();
  return (
    <Card shadow='sm' mx={'0rem'} py={0} radius='xl' withBorder>
      <Stack
        justify='space-between'
        height={'100% !important'}
        spacing={'0px !important'}
      >
        <Card.Section
          my='0px'
          sx={{
            //height: "30% !important",
            [theme.fn.smallerThan('sm')]: {
              //height: "30% !important",
              padding: '0px !important',
            },
          }}
          radius='md'
        >
          <Link href={'/blog/' + post.slug}>
            <Image
              placeholder={<Loader size='lg' />}
              src={post.cover}
              //fit="contain"
              alt='Norway'
              height={150}
              sx={{
                // height: "100% !important",
                // maxHeight: "100% !important",
                [theme.fn.smallerThan('sm')]: {
                  height: '100% !important',
                },
              }}
            />
          </Link>
        </Card.Section>
        <Card.Section py={'1rem'} px={'1.25rem'}>
          <Group pb={'1rem'} pt='1rem'>
            <GrArticle />
            <Title
              size={'1.1rem !important'}
              weight={'550 !important'}
              p={'0rem !important'}
              my={'0rem !important'}
              color={theme.other.text.primary + ' !important'}
            >
              {'Article'}
            </Title>
          </Group>
          <Link href={'/blog/' + post.slug}>
            <Title
              component='a'
              order={4}
              px='0rem !important'
              py='0rem !important'
              my={'0rem !important'}
              color={theme.other.text.primary + ' !important'}
            >
              {post.title}
            </Title>
          </Link>
          {/* <Text
          px='0rem !important'
          pt={'0.75rem !important'}
          mb={'1rem !important'}
          lineClamp={3}
          color='dimmed'
          size='lg'
          sx={{ lineHeight: '1.25 !important' }}
        >
          {post.preview}
        </Text> */}
        </Card.Section>
        <Card.Section
          pb={'1rem !important'}
          px={'1.25rem'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100% !important',
          }}
        >
          <Text size='lg' pb='0.5rem'>
            {moment(post.publishedOn).format('MMMM Do YYYY')}
          </Text>
          {/*   <Group position="apart" className={classes.footer}>
  <Text size="lg">

         <Group spacing={0} px="1rem !important" pb="0rem !important"><RWebShare
              data={{
                text: post.title + ": " + post.description,
                url: "https://nolancorcoran.dev/blog/" + post.slug,
                title: post.title + ": " + post.description,
              }}
              onClick={() => console.log("shared successfully!")}>
              <ActionIcon
                variant="gradient"
                size="lg"
                gradient={{ deg: 0, from: "secondary", to: "primary" }}>
                <IconShare size={18} color={theme.white} stroke={1.5} />
              </ActionIcon>
            </RWebShare></Group>  </Group>*/}
          <Group position='left' mt='0' mb='xs' spacing={2}>
            {post.tags.map((tag, index) => (
              <Badge key={index} color={tag.color} variant='light'>
                {tag.name}
              </Badge>
            ))}
          </Group>
        </Card.Section>
      </Stack>
    </Card>
  );
};

export default ArticleCard;
