
import  { useContext, useEffect } from "react";
import { useTranslation } from 'react-i18next'
import {  Dropdown } from "flowbite-react";
import { CustomizerContext } from "src/context/CustomizerContext";

import en from "/src/assets/images/flag/icon-flag-en.svg";
import cn from "/src/assets/images/flag/icon-flag-cn.svg";
import fr from "/src/assets/images/flag/icon-flag-fr.svg";
import sa from "/src/assets/images/flag/icon-flag-sa.svg";


const Languages = [
  {
    flagname: "English (UK)",
    icon: en,
    value: "en",
  },
  {
    flagname: "中国人 (Chinese)",
    icon: cn,
    value: "ch",
  },
  {
    flagname: "français (French)",
    icon: fr,
    value: "fr",
  },

  {
    flagname: "عربي (Arabic)",
    icon: sa,
    value: "ar",
  },
];

export const Language = () => {
  const { i18n } = useTranslation();

  const {
    isLanguage, setIsLanguage
  } = useContext(CustomizerContext);
  const currentLang =
    Languages.find((_lang) => _lang.value === isLanguage) || Languages[1];

  useEffect(() => {
    i18n.changeLanguage(isLanguage);
  }, [isLanguage]);

  return (
    <>
     <div className="relative group/menu">
        <Dropdown
          label=""
          className="w-56  rounded-sm"
          dismissOnClick={false}
          renderTrigger={() => (
            <span className="h-8 w-8 hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary ">
              <img
                src={currentLang.icon}
                height={35}
                width={32}
                alt="language"
                className="rounded-full h-5 w-5 object-cover cursor-pointer"
              />
            </span>
          )}
        >
          {Languages.map((item, index) => (
            <Dropdown.Item
              className="flex gap-3 items-center py-3 w-full"
              key={index}
              onClick={() => setIsLanguage(item.value)}
            >
              <img
                src={item.icon}
                alt="flag"
                height={24}
                width={24}
                className="rounded-full object-cover h-6 w-6"
              />
              <span>{item.flagname}</span>
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>
    </>
  );
};

