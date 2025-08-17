import { Link, useNavigate } from "react-router";
import {
  createdraftTemplate,
  deleteTemplate,
  loaddraftTemplate,
  startTemplate,
} from "../../app/templateSlice";
import { ChevronRight, Play, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

function Templates() {
  const templates = useAppSelector((state) => state.templates.templates);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  return (
    <div className="h-full bg-backgroundColor text-white px-4 py-6">
      <h1 className="text-center text-lg font-semibold mb-6">Templates</h1>

      <div className="flex justify-center mb-8">
        <Link
          to="/add-template"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-md shadow-md transition"
          onClick={() => dispatch(createdraftTemplate())}
        >
          New Template
        </Link>
      </div>

      <h2 className=" text-gray-300 mb-3 text-2xl">Saved templates</h2>
      <div className="space-y-3">
        {templates.length === 0 ? (
          <div className="text-gray-500 text-regular">
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
                    className="text-gray-400 hover:text-green-500 cursor-pointer transition"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(startTemplate());
                    }}
                  />
                  <X
                    size={18}
                    className="text-gray-400 hover:text-red-500 cursor-pointer transition"
                    onClick={(e) => {
                      e.preventDefault();

                      dispatch(deleteTemplate(template.id));
                    }}
                  />
                  <ChevronRight
                    size={22}
                    className="text-gray-400 hover:text-blue-400 transition cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(loaddraftTemplate(template.id));
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
