import { CircleArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className="font-semibold text-gray-500 underline underline-offset-[10px] hover:text-black flex gap-4 mb-10"
        onClick={() => navigate(-1)}
      >
        <CircleArrowLeft />
        Back
      </button>
    </div>
  );
};

export default BackButton;
