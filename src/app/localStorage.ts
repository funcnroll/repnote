import { Template } from "./templateSlice";

export const saveTemplatesToLocalStorage = (templates: Template[]) => {
  localStorage.setItem("templates", JSON.stringify(templates));
};

export const loadTemplatesFromLocalStorage = () => {
  const saved = localStorage.getItem("templates");
  return saved ? JSON.parse(saved) : [];
};
