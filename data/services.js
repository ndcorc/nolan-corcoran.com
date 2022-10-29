import { AiFillProject } from "react-icons/ai";
import { BsPinAngleFill, BsTwitter } from "react-icons/bs";
import { HiSpeakerphone } from "react-icons/hi";
import { MdQuestionAnswer } from "react-icons/md";

export const services = [
  {
    title: "AMA",
    icon: MdQuestionAnswer,
    color: "violet",
    desc: "We host text/video AMA sessions. AMAs help projects to reach a wider audience and also act as an introductory medium for the project to our community.",
  },
  {
    title: "Paid Promotion",
    icon: HiSpeakerphone,
    color: "green",
    desc: "We'll share the important news and specific requested posts for the predetermined time.",
  },
  {
    title: "Pin post",
    icon: BsPinAngleFill,
    color: "blue",
    desc: "We will share specific post requested by the project in our telegram group and channel.",
  },
  {
    title: "Twitter Promotion",
    icon: BsTwitter,
    color: "gray",
    desc: `We provide 2 different services. <br/>
    <ul style="padding:0 0 0 10px">
    <li>Tweet on specific news provided by the project</li>
    <li>Detailed thread about the project/company</li>
    </ul>
`,
  },
  {
    title: "KOL services",
    icon: AiFillProject,
    color: "teal",
    desc: "We'll take free/paid allocation of projects of our interest and provide them marketing and promotion services.",
  },
];
