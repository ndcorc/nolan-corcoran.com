import {
  Paragraph,
  Quote,
} from '@/components';
import {
  Divider,
  Image,
  List,
  Loader,
  Space,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';

export const BlockComponent = ({ block, matches, dir }) => {
  const theme = useMantineTheme();
  const { type, id } = block;
  const value = block[type];
  let returnBlock;
  switch (type) {
    case "heading_1":
      returnBlock = (
        <Title order={1} mt="10" weight={500}>
          {value?.rich_text[0]?.plain_text}
        </Title>
      );
      break;

    case "heading_2":
      returnBlock = (
        <Title order={2} mt="10" weight={500}>
          {value?.rich_text[0]?.plain_text}
        </Title>
      );
      break;

    case "heading_3":
      returnBlock = (
        <Title order={3} mt="10" weight={500}>
          {value?.rich_text[0]?.plain_text}
        </Title>
      );
      break;

    case "paragraph":
      let elements = value?.rich_text;
      returnBlock = <Paragraph text={value?.rich_text} />;
      break;

    case "bulleted_list_item":
      returnBlock = (
        <List>
          <List.Item>{value?.rich_text[0].text.content}</List.Item>
        </List>
      );
      break;

    case "numbered_list_item":
      let items = block?.rich_text;
      returnBlock = (
        <List type="ordered">
          {items.map((item, i) => (
            <List.Item key={i}>{item.text.content}</List.Item>
          ))}
        </List>
      );
      break;

    case "to_do":
      returnBlock = (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} readOnly />{" "}
            <div className="inline-block">
              <Paragraph text={value?.rich_text} />
            </div>
          </label>
        </div>
      );
      break;

    case "quote":
      let split = value?.rich_text[0]?.plain_text.split(/ \-/i);
      let margin =
        dir === null
          ? "0rem 0rem"
          : dir === "right"
          ? `0rem ${!matches ? "-2rem 3px 1rem" : "0rem 3px 0rem"}`
          : `0rem ${!matches ? "1rem 3px -2rem" : "0rem 3px 0rem"}`;
      let cite = split.length > 1 ? "– " + split[1] : null;
      returnBlock = (
        <Quote
          m={margin}
          cite={cite}
          dir={dir}
          matches={matches}
          quote={split[0].replaceAll(/["“”‘’]/gi, "")}
        />
      );
      break;

    case "callout":
      returnBlock = (
        <div className="p-4 bg-primary rounded flex items-center">
          <span className="mr-2">{value?.icon?.emoji}</span>
          <span>{value?.rich_text[0]?.plain_text}</span>
        </div>
      );
      break;

    case "divider":
      returnBlock = (
        <div>
          <Divider my="sm" />
          <Space h="sm" />
        </div>
      );
      break;

    case "image":
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const caption = value?.caption ? value.caption[0]?.plain_text : "";
      returnBlock = (
        <figure>
          <Image
            src={src}
            alt={caption}
            width={600}
            height={200}
            placeholder={<Loader size="lg" />}
          />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
      break;

    case "column_list":
      let columns = value;
      let quote = columns.find((colBlocks) => colBlocks[0].type === "quote")[0];
      let paragraph = columns.find(
        (colBlocks) => colBlocks[0].type === "paragraph",
      )[0];
      let isQuote = columns[0][0].type === "quote";
      quote = (
        <BlockComponent
          block={quote}
          dir={isQuote ? "left" : "right"}
          matches={matches}
        />
      );
      paragraph = (
        <BlockComponent
          block={paragraph}
          dir={isQuote ? "right" : "left"}
          matches={matches}
        />
      );
      returnBlock = (
        <div
          style={{
            columnCount: 1,
            height: "100%",
          }}>
          {quote}
          {paragraph}
        </div>
      );
      break;

    default:
      if (block.type !== "text") returnBlock = <Text>{"known"}</Text>;
      break;
  }
  return <>{returnBlock}</>;
};
