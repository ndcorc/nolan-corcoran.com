import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API });
export const POSTS_PER_PAGE = 5;

export const getDatabase = async (database_id) => {
  // console.log("database_id = ", database_id);
  const response = await notion.databases.query({ database_id });
  // console.log("response", response);
  return response.results;
};

export const getPreview = async (block_id) => {
  const response = await notion.blocks.children.list({
    block_id,
    page_size: 3,
  });
  let preview =
    response.results[0].paragraph?.rich_text[0].plain_text ||
    response.results[1].paragraph?.rich_text[0].plain_text ||
    response.results[2].paragraph?.rich_text[0].plain_text ||
    '';

  return preview;
};

export const getPage = async (page_id) => {
  const response = await notion.pages.retrieve({ page_id });
  return response;
};

export const getBlocks = async (block_id) => {
  const response = await notion.blocks.children.list({
    block_id,
    page_size: 100,
  });
  return response.results;
};

export const getHomePosts = async () => {
  let postsTable = await getDatabase(process.env.NOTION_DB);

  let posts = (
    await Promise.all(
      await postsTable.map(async (post) => {
        let preview = await getPreview(post.id);
        let mapped = {
          cover:
            post.cover?.file?.url ||
            post.cover?.external?.url ||
            'https://images.unsplash.com/photo-1626202378343-1e8b2a828a78',
          title: post.properties.Name.title[0]?.plain_text || '',
          author: post.properties.Author.rich_text[0].plain_text || '',
          publishedOn: post.properties.Published?.date?.start || '',
          id: post.id || '',
          description:
            post.properties.Description.rich_text[0].plain_text || '',
          slug: post.properties.Slug.rich_text[0].plain_text || '',
          featured: post.properties.Featured.checkbox || false,
          public: post.properties.Public.checkbox || false,
          tags: post.properties.Tags.multi_select || [],
          preview,
        };
        return mapped;
      })
    )
  ).filter((post) => post.public === true);
  let featured = posts.find((post) => post.featured === true);
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return { props: { posts, initialDisplayPosts, pagination, featured } };
};

export const getPost = async (slug) => {
  let allPosts = await getDatabase(process.env.NOTION_DB);

  let post = allPosts.find(
    (post) => post.properties.Slug.rich_text[0].plain_text === slug
  );
  let page = await getPage(post.id);
  let blocks = (
    await (await getBlocks(post.id)).reduce(reducer, { store: {}, list: [] })
  ).list;

  let data = {
    cover:
      page.properties.cover?.file?.url ||
      page.cover?.external?.url ||
      'https://images.unsplash.com/photo-1626202378343-1e8b2a828a78',
    title: page.properties.Name.title[0]?.plain_text || '',
    author: page.properties.Author.rich_text[0].plain_text || '',
    publishedOn: page.properties.Published?.date?.start || '',
    description: page.properties.Description?.rich_text[0]?.plain_text,
    id: page.properties.id || '',
  };

  return {
    props: {
      data,
      blocks,
      noId: !page,
    },
  };
};

let reducer = async (collector, curr) => {
  collector = await collector;
  var key = curr.type;
  if (key === 'numbered_list_item') {
    curr.rich_text = curr.numbered_list_item.rich_text;
    delete curr.numbered_list_item;
  }
  var storedType = collector.store[key];
  if (storedType && key === 'numbered_list_item') {
    /*     curr.rich_text = curr.numbered_list_item.rich_text;
    delete curr.numbered_list_item; */
    storedType.rich_text = storedType.rich_text.concat(curr.rich_text);
  } else {
    if (key === 'column_list') {
      let columns = await getBlocks(curr.id);
      columns = columns.map((column) => getBlocks(column.id));
      columns = await Promise.all(columns);
      curr.column_list = columns;
    }
    collector.store[key] = curr;
    collector.list.push(curr);
  }
  return collector;
};
