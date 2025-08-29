import { Template } from "./templateSlice";

export const templateUtils = {
  find(id: string, templateArr: Template[]) {
    const found = templateArr.findIndex((template) => template.id === id);

    return found;
  },
  update(id: string, templateArr: Template[], template: Template) {
    const index = templateArr.findIndex((t) => t.id === id);

    if (index !== -1) {
      return templateArr.map((t, i) => (i === index ? template : t));
    }

    return templateArr;
  },
  delete(id: string, templateArr: Template[]) {
    const del = templateArr.filter((template) => template.id !== String(id));

    return del;
  },
};
