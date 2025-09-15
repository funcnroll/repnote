import { Link, useNavigate } from "react-router";
import {
  createDraftTemplate,
  deleteTemplate,
  loadDraftTemplate,
} from "../../app/templateSlice";
import { startTemplate } from "../../app/activeTemplateSlice";
import { ChevronRight, Play, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import H1 from "../../components/reusable/H1";
import { isWorkingOut } from "@/app/homeSlice";

function Templates() {
  const templates = useAppSelector((state) => state.templates.templates);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  return (
    <div className="h-screen overflow-y-auto bg-backgroundColor text-textPrimary px-4 py-6 pb-24">
      <H1
        variant="small"
        centered
      >
        Templates
      </H1>

      <div className="flex justify-center mb-8">
        <Link
          to="/add-template"
          className="bg-blue hover:bg-blueHover text-textPrimary font-medium px-6 py-3 rounded-md shadow-md transition"
          onClick={() => dispatch(createDraftTemplate())}
        >
          New Template
        </Link>
      </div>

      <h2 className=" text-textSecondary mb-3 text-2xl">Saved templates</h2>
      <div className="space-y-3">
        {templates.length === 0 ? (
          <div className="text-textMuted text-regular">
            No templates available
          </div>
        ) : (
          templates.map((template, index) => (
            <div
              key={index}
              className="bg-primaryColor flex justify-between items-center px-4 py-3 rounded-md hover:bg-secondaryColor transition cursor-pointer"
            >
              <div className="flex items-center justify-between w-full">
                <span>{template.name}</span>
                <div className="flex items-center space-x-4">
                  <Play
                    size={18}
                    className="text-textSecondary hover:text-green cursor-pointer transition"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(startTemplate(template));
                      dispatch(isWorkingOut());
                      navigate(`/activeTemplate/${template.id}`);
                    }}
                  />
                  <X
                    size={18}
                    className="text-textSecondary hover:text-red cursor-pointer transition"
                    onClick={(e) => {
                      e.preventDefault();

                      dispatch(deleteTemplate(template.id));
                    }}
                  />
                  <ChevronRight
                    size={22}
                    className="text-textSecondary hover:text-blue transition cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(loadDraftTemplate(template.id));
                      navigate(`/add-template/${template.id}`);
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Templates;
