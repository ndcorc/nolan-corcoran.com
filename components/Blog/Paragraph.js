import {
  Space,
  Text,
  useMantineTheme,
} from '@mantine/core';

import { useStyles } from './styles';

const Paragraph = ({ dir, text }) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  let paragraph = text.map((element, index) => {
    if (element?.href) {
      return (
        <a href={element.href} key={index} className="bg-emerald-100">
          {element?.plain_text || "Embeded Link"}
        </a>
      );
    }
    return (
      <Text
        span
        align="justify"
        transform="full-width"
        key={index}
        color={theme.other.text.primary}
        className={[
          element?.annotations?.bold ? classes.bold : "",
          element?.annotations?.italic ? classes.italic : "",
          element?.annotations?.strikethrough ? classes.line : "",
          classes.default,
        ].join(" ")}
        sx={
          element?.annotations?.color !== "default"
            ? {
                color: element?.annotations?.color,
                padding: "1px 1px",
                borderRadius: "1px",
                textAlign: "justify !important",
              }
            : {
                color: theme.other.text.primary,
                textAlign: "justify !important",
              }
        }>
        {element?.plain_text}
      </Text>
    );
  });

  return (
    <div>
      <Text align="justify" span>
        {paragraph}
      </Text>
      <Space h="md" />
    </div>
  );
};

export default Paragraph;
