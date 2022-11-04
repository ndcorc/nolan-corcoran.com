import React, { useState } from 'react';

import { links } from '@/data';
import { AppShell } from '@mantine/core';

import {
  Footer,
  NavHeader,
} from './';

const Layout = ({ children }) => {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      header={<NavHeader links={links} />}
      footer={<Footer links={links} />}
      styles={(theme) => ({
        main: {
          backgroundColor: theme.other.background,
          color: theme.other.text.primary,
          padding: "0px 0px 90px 0px !important",
          //margin: "0px !important",
          minHeight: "100vh !important",
          width: "unset !important",
          maxWidth: "100vw !important",
        },
      })}>
      {children}
    </AppShell>
  );
};

export default Layout;
