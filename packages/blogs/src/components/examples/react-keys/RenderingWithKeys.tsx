"use client";
import useHighlightRender from "@/hooks/useHighlightRender";
import React, { useCallback } from "react";

type TUser = {
  userId: number;
  name: string;
  lastname: string;
  age: number;
  jobPosition: string;
};

// const generateRandomString = () => {
//   const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
//   let result = "";
//   for (let i = 0; i < 5; i++) {
//     result += letters.charAt(Math.floor(Math.random() * letters.length));
//   }
//   return result;
// };

function UserName({
  name,
  userId,
  age,
  jobPosition,
  lastname,
  onDelete,
}: {
  onDelete: (id: number) => void;
} & TUser) {
  const ref = useHighlightRender();
  return (
    <div style={{ width: "100%" }} ref={ref}>
      {name} {age} {jobPosition} {lastname}
      <button onClick={() => onDelete(userId)}>Delete</button>
    </div>
  );
}

export default function RenderingWithKeys() {
  const [users, setUsers] = React.useState<TUser[]>([
    {
      userId: 1,
      name: "John",
      lastname: "Smith",
      age: 28,
      jobPosition: "Software Engineer",
    },
    {
      userId: 2,
      name: "Jane",
      lastname: "Doe",
      age: 32,
      jobPosition: "Product Manager",
    },
    {
      userId: 3,
      name: "Bob",
      lastname: "Johnson",
      age: 45,
      jobPosition: "Data Scientist",
    },
    {
      userId: 4,
      name: "Alice",
      lastname: "Williams",
      age: 26,
      jobPosition: "UX Designer",
    },
    {
      userId: 5,
      name: "Charlie",
      lastname: "Brown",
      age: 35,
      jobPosition: "DevOps Engineer",
    },
    {
      userId: 6,
      name: "David",
      lastname: "Miller",
      age: 29,
      jobPosition: "Frontend Developer",
    },
    {
      userId: 7,
      name: "Emma",
      lastname: "Davis",
      age: 31,
      jobPosition: "Backend Developer",
    },
    {
      userId: 8,
      name: "Frank",
      lastname: "Garcia",
      age: 38,
      jobPosition: "System Architect",
    },
    {
      userId: 9,
      name: "Grace",
      lastname: "Rodriguez",
      age: 27,
      jobPosition: "QA Engineer",
    },
    {
      userId: 10,
      name: "Henry",
      lastname: "Wilson",
      age: 33,
      jobPosition: "Project Manager",
    },
    {
      userId: 11,
      name: "Ivy",
      lastname: "Martinez",
      age: 25,
      jobPosition: "UI Designer",
    },
    {
      userId: 12,
      name: "Jack",
      lastname: "Anderson",
      age: 40,
      jobPosition: "Tech Lead",
    },
    {
      userId: 13,
      name: "Kelly",
      lastname: "Taylor",
      age: 36,
      jobPosition: "Security Engineer",
    },
    {
      userId: 14,
      name: "Liam",
      lastname: "Thomas",
      age: 24,
      jobPosition: "Junior Developer",
    },
    {
      userId: 15,
      name: "Mia",
      lastname: "Moore",
      age: 30,
      jobPosition: "Full Stack Developer",
    },
    {
      userId: 16,
      name: "Noah",
      lastname: "Jackson",
      age: 34,
      jobPosition: "Mobile Developer",
    },
    {
      userId: 17,
      name: "Olivia",
      lastname: "Martin",
      age: 28,
      jobPosition: "Cloud Engineer",
    },
    {
      userId: 18,
      name: "Peter",
      lastname: "Lee",
      age: 42,
      jobPosition: "Solutions Architect",
    },
    {
      userId: 19,
      name: "Quinn",
      lastname: "Perez",
      age: 29,
      jobPosition: "API Developer",
    },
    {
      userId: 20,
      name: "Ryan",
      lastname: "Thompson",
      age: 31,
      jobPosition: "Database Admin",
    },
    {
      userId: 21,
      name: "Sarah",
      lastname: "White",
      age: 27,
      jobPosition: "DevOps Engineer",
    },
    {
      userId: 22,
      name: "Tom",
      lastname: "Harris",
      age: 35,
      jobPosition: "Software Engineer",
    },
    {
      userId: 23,
      name: "Uma",
      lastname: "Clark",
      age: 33,
      jobPosition: "Product Designer",
    },
    {
      userId: 24,
      name: "Victor",
      lastname: "Lewis",
      age: 39,
      jobPosition: "Tech Lead",
    },
    {
      userId: 25,
      name: "Wendy",
      lastname: "Robinson",
      age: 26,
      jobPosition: "Frontend Developer",
    },
    {
      userId: 26,
      name: "Xavier",
      lastname: "Walker",
      age: 32,
      jobPosition: "Backend Developer",
    },
    {
      userId: 27,
      name: "Yara",
      lastname: "Young",
      age: 28,
      jobPosition: "UX Designer",
    },
    {
      userId: 28,
      name: "Zack",
      lastname: "Allen",
      age: 30,
      jobPosition: "Full Stack Developer",
    },
    {
      userId: 29,
      name: "Ava",
      lastname: "King",
      age: 25,
      jobPosition: "Junior Developer",
    },
    {
      userId: 30,
      name: "Ben",
      lastname: "Wright",
      age: 37,
      jobPosition: "Senior Developer",
    },
  ]);
  const onDelete = useCallback((id: number) => {
    setUsers((prev) => prev.filter((user) => user.userId !== id));
  }, []);
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {users.map((user, index) => (
          <UserName key={index} {...user} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}
