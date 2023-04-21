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
    Title: "Хянах самбар",
    toLink: "dashboard",
    icon: FiGrid,
  },
  {
    Title: "Баталгаажуулалт",
    toLink: "/attendance",
    icon: BiFace,
  },
  {
    Title: "Дүн оруулах",
    toLink: "/mark",
    icon: BiBuildings,
  },
  {
    Title: "Гомдол илгээх",
    toLink: "/complain",
    icon: FiSlack,
  },
  {
    Title: "Хуанли",
    toLink: "/calendar",
    icon: BiCalendar,
  },

  {
    Title: "мэдэгдэл",
    toLink: "/notice",
    icon: BiCalendarEvent,
  },
  {
    Title: "Чат",
    toLink: "/chat",
    icon: BiChat,
  },
];
