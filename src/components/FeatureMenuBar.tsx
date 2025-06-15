
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@/components/ui/menubar";
import { useNavigate, useLocation } from "react-router-dom";
import { Brain, Sparkles, BookOpen, Users } from "lucide-react";

export default function FeatureMenuBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      id: "decide",
      label: "Main Decision Maker",
      icon: <Brain className="mr-2 h-4 w-4" />,
      to: "/",
      match: /^\/$/,
    },
    {
      id: "horoscope",
      label: "Horoscope",
      icon: <Sparkles className="mr-2 h-4 w-4" />,
      to: "/horoscope",
      match: /^\/horoscope/,
    },
    {
      id: "roast",
      label: "Roast My Day",
      icon: <BookOpen className="mr-2 h-4 w-4" />,
      to: "/roast",
      match: /^\/roast/,
    },
    {
      id: "quiz",
      label: "Personality Quiz",
      icon: <Users className="mr-2 h-4 w-4" />,
      to: "/quiz",
      match: /^\/quiz/,
    }
  ];

  return (
    <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-orange-100 shadow-sm">
      <Menubar className="w-full max-w-2xl mx-auto justify-center">
        {menuItems.map(item => (
          <MenubarMenu key={item.id}>
            <MenubarTrigger
              onClick={() => {
                if (!location.pathname.match(item.match)) navigate(item.to);
              }}
              className={
                location.pathname.match(item.match)
                  ? "bg-orange-100 text-orange-700 font-semibold"
                  : ""
              }
              aria-current={location.pathname.match(item.match) ? "page" : undefined}
            >
              {item.icon}
              <span className="hidden sm:inline">{item.label}</span>
            </MenubarTrigger>
          </MenubarMenu>
        ))}
      </Menubar>
    </nav>
  );
}
