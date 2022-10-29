import {
  Button,
  Container,
  Group,
  Paper,
  SimpleGrid,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import { ContactIconsList } from './ContactIcons';
import useStyles from './styles';

const fetcher = (values) =>
  fetch("/api/contact", values).then((res) => console.log(res.json()));

const Contact = () => {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      subject: "",
      message: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <Container fluid p="10rem" id="contact">
      <Paper className={classes.paper} radius="lg">
        <div className={classes.wrapper}>
          <div className={classes.contacts}>
            <Title
              order={4}
              pb={"1rem"}
              mt={"0.25rem !important"}
              weight={700}
              className={classes.title}
              sx={{ color: "#fff" }}>
              Contact information
            </Title>

            <ContactIconsList variant="white" />
          </div>

          <form
            className={classes.form}
            onSubmit={form.onSubmit((values) => fetcher(values))}>
            <Title order={2} weight={700} className={classes.title} pb={"1rem"}>
              Get in touch
            </Title>

            <div className={classes.fields}>
              <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
                <TextInput
                  label="Your name"
                  placeholder="Your name"
                  {...form.getInputProps("name")}
                />
                <TextInput
                  label="Your email"
                  placeholder="hello@mantine.dev"
                  {...form.getInputProps("email")}
                  required
                />
              </SimpleGrid>

              <TextInput
                mt="md"
                label="Subject"
                placeholder="Subject"
                {...form.getInputProps("subject")}
                required
              />

              <Textarea
                mt="md"
                label="Your message"
                placeholder="Please include all relevant information"
                minRows={3}
                {...form.getInputProps("message")}
              />

              <Group position="right" mt="md">
                <Button type="submit" className={classes.control}>
                  Send message
                </Button>
              </Group>
            </div>
          </form>
        </div>
      </Paper>
    </Container>
  );
};
export default Contact;
