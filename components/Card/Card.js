import { createStyles } from '@mantine/core';

//import styles from '../styles/Card.module.css';

const useStyles = createStyles((theme) => ({
  title: {
    fontWeight: 700,
  },
}));

export default function Card(props) {
  //   const data = {
  //     title: "Twitter Promotion",
  //     icon: HiSpeakerphone,
  //     color: "green",
  //     desc: `We have 2 different services for twitter promotion <br/><br />
  //       1. Specific news or information provided by the project will be shared on our twitter handle.<br /> <br />
  //       2. A detailed thread about the project/company will be written and shared on our twitter.`,
  //   };

  const { theme } = useStyles();
  return (
    <div /* className={styles.wrapper} */>
      {/* <div className={styles.card}>
        <div className={styles.card__div}>
          <HiSpeakerphone color={theme.colors[data.color][0]} />
        </div>
        <div className={styles.info}>
          <Text size="xl" weight="bold" mt={7}>
            {data.title}
          </Text>
          <p dangerouslySetInnerHTML={{ __html: data.desc }}></p>
        </div>
      </div> */}
    </div>
  );
}
