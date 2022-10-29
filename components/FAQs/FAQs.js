import React from 'react';

import {
  Container,
  Title,
} from '@mantine/core';

import { faqs } from '../../data';
import { FAQ } from './';

const FAQs = () => {
  return (
    <Container pt={64} pb={32} id="faqs">
      <div>
        <Title align="center" mb={32} style={{ color: "white" }}>
          FAQs
        </Title>
        {faqs.map((item, _index) => (
          <FAQ
            key={_index}
            question={item.question}
            answer={item.answer}
            link={item.link}
          />
        ))}
      </div>
    </Container>
  );
};
/*
const FAQ = ({ question, answer, link }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { classes } = useStyles();
  return (
    <div>
      <Collapsible
        transitionTime={200}
        trigger={
          <Box>
            <Text color="hsl(0 0% 95%)" weight="bolder" size="lg">
              {question}
            </Text>
            <button onClick={() => setIsOpen(!isOpen)} className="btn">
              {isOpen ? <MdCloseFullscreen /> : <RiArrowUpDownLine />}
            </button>
          </Box>
        }
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}>
        <Box my="0.75em">
          <Text color="hsl(0 0% 80%)" size="md">
            {answer}
          </Text>
          {link && (
            <Link href={link} passHref>
              <Group align="center" className={classes.social}>
                <MdMail />
                <p>Mail</p>
              </Group>
            </Link>
          )}
        </Box>
      </Collapsible>
    </div>
  );
}; */

export default FAQs;
