import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { createTmpTemplate } from "../../app/templatesSlice";

function Templates() {
  const templates = useSelector((state) => state.templates.templates);
  const dispatch = useDispatch();

  return (
    <div className="h-full bg-backgroundColor text-white px-4 py-6">
      <h1 className="text-center text-lg font-semibold mb-6">Templates</h1>

      <div className="flex justify-center mb-8">
        <Link
          to="/add-template"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-md shadow-md transition"
          onClick={() => dispatch(createTmpTemplate())}
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
              className="bg-primaryColor flex justify-between items-center px-4 py-3 rounded-md hover:bg-[#2c3a54] transition"
            >
              <span>{template.name}</span>
              <span className="text-gray-400">{">"}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Templates;
