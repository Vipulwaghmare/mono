import InterviewAccordion, {
  TQueAccProps,
} from "@/components/interview-accordion";
import { MainWrapper } from "@/components/typography";
import { reactInterviews } from "./questions";

const ReactInterview = () => {
  return (
    <MainWrapper title="React Interview Questions">
      <div></div>
      <div>
        {reactInterviews.map((question: TQueAccProps) => (
          <InterviewAccordion key={question.question} {...question} />
        ))}
      </div>
    </MainWrapper>
  );
};

export default ReactInterview;
