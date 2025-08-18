import ChevronBack from "@/components/reusable/ChevronBack";
import { useParams } from "react-router";
import H1 from "@/components/reusable/H1";

function ActiveTemplate() {
  const { activeTemplateId } = useParams();

  console.log(activeTemplateId);
  return (
    <div className="dvh-full overflow-y-auto bg-backgroundColor text-white px-6 py-8">
      <ChevronBack />

      <H1 variant="medium">Active Template</H1>

      {/* Template content will go here */}
    </div>
  );
}

export default ActiveTemplate;
