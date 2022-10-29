import React, { useState } from 'react';

import Collapsible from 'react-collapsible';
import { MdCloseFullscreen } from 'react-icons/md';
import { RiArrowUpDownLine } from 'react-icons/ri';

import {
  Box,
  Text,
} from '@mantine/core';

//import styles from '../styles/Faqitem.module.scss';

const FAQ = ({ question, answer, link }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div /* className={styles.container} */>
      <Collapsible
        trigger={
          <Box /*  className={styles.que_container} */>
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
          <Text size="md">{answer}</Text>
        </Box>
      </Collapsible>
    </div>
  );
};

export default FAQ;
