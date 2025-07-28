"use client";
import { useState } from "react";
import styles from "./accordion.module.css";

const DemoIcon = ({ open }: { open: boolean }) => (
  <svg
    className={open ? styles.iconOpen : styles.icon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const InterviewAccordion = ({
  question,
  answer,
}: {
  answer: string;
  question: string;
}) => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  return (
    <div className={styles.item}>
      <button
        className={styles.question}
        type="button"
        aria-expanded={open}
        aria-controls="accordion-answer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <DemoIcon open={open} />
        <span>{question}</span>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={checked}
          onChange={() => setChecked((prev) => !prev)}
          aria-label="Mark as reviewed"
          onClick={(e) => e.stopPropagation()}
        />
      </button>
      {open && (
        <div className={styles.answer} role="region" id="accordion-answer">
          {answer}
        </div>
      )}
    </div>
  );
};

export default InterviewAccordion;
