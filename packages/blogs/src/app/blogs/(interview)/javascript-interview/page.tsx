import InterviewAccordion, {
  TQueAccProps,
} from "@/components/interview-accordion";
import { MainWrapper } from "@/components/typography";
import { jsQuestions } from "./questions";

const JavascriptInterview = () => {
  return (
    <MainWrapper title="Javascript Interview Questions">
      <div></div>
      <div>
        {jsQuestions.map((question: TQueAccProps) => (
          <InterviewAccordion key={question.question} {...question} />
        ))}
      </div>
    </MainWrapper>
  );
};

export default JavascriptInterview;
