
// Removed FeatureMenuBar import
import PersonalityQuiz from "@/components/PersonalityQuiz";
import { useNavigate } from "react-router-dom";

export default function PersonalityQuizPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* FeatureMenuBar removed from here */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 via-white to-pink-50">
        <PersonalityQuiz
          onComplete={() => navigate(-1)}
          onSkip={() => navigate(-1)}
        />
      </div>
    </>
  );
}
