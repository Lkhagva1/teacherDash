import { FiGrid, FiSlack } from "react-icons/fi";
import {
  BiBuildings,
  BiCalendar,
  BiChat,
  BiCalendarEvent,
  BiFace,
} from "react-icons/bi";

export const navData = [
  {
    title: "Хянах самбар",
    toLink: "/dashboard",
    icon: FiGrid,
    drop: [
      {
        title: "Бүх сурагч",
        toLink: "/students",
        icon: BiFace,
      },
      {
        title: "Сурагч нэмэх",
        toLink: "/students/add",
        icon: BiFace,
      },
    ],
  },
  {
    title: "Баталгаажуулалт",
    toLink: "/attendance",
    icon: BiFace,
  },
  {
    title: "Дүн оруулах",
    toLink: "/mark",
    icon: BiBuildings,
  },
  {
    title: "Гомдол илгээх",
    toLink: "/complain",
    icon: FiSlack,
  },
  {
    title: "Хуанли",
    toLink: "/calendar",
    icon: BiCalendar,
  },

  {
    title: "мэдэгдэл",
    toLink: "/notice",
    icon: BiCalendarEvent,
  },
  {
    title: "Чат",
    toLink: "/chat",
    icon: BiChat,
  },
  {
    title: "профайл",
    toLink: "/profile",
    icon: BiChat,
  },
];
