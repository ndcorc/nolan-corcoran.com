import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API });

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
    "";

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
