const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Path to your repository (current directory)
const repoPath = ".";

// Helper function to check if a number is prime
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// Function to generate random days between a start and end date
const getRandomDaysInRange = (startDay, endDay) => {
  const days = [];
  while (days.length < 10) {
    const day = Math.floor(Math.random() * (endDay - startDay + 1)) + startDay;
    if (!days.includes(day)) {
      days.push(day);
    }
  }
  return days.sort((a, b) => a - b); // Sort for visualization
};

// Function to determine commit count based on the day
const getCommitCountForDay = (day) => {
  if (isPrime(day)) {
    return 1; // Prime days: 1 commit
  } else if (day % 2 === 0) {
    return Math.floor(Math.random() * 2) + 3; // Even days: 3-4 commits
  } else {
    return Math.floor(Math.random() * 3); // Odd days: 0-2 commits
  }
};

// Helper function to generate random commits
const generateRandomCommits = (date, commitCount) => {
  for (let i = 0; i < commitCount; i++) {
    const filePath = path.join(repoPath, `tempfile-${Date.now()}.txt`);
    fs.writeFileSync(filePath, `Commit on ${date.toDateString()} - ${i}`);
    execSync(`git add .`, { cwd: repoPath });
    execSync(
      `git commit -m "Simulated commit on ${date.toDateString()} (${
        i + 1
      }/${commitCount})" --date="${date.toISOString()}"`,
      { cwd: repoPath }
    );
    fs.unlinkSync(filePath);
  }
};

// Generate random days between November 18 and December 18
const randomDays = getRandomDaysInRange(18, 48); // Days 18 to 48 across Nov-Dec
console.log("Random selected days:", randomDays);

randomDays.forEach((day) => {
  const month = day <= 30 ? 19 : 19; // November (10) and December (11)
  const adjustedDay = day <= 30 ? day : day - 30; // Adjust for December
  const commitDate = new Date(2024, month, adjustedDay);
  const commitCount = getCommitCountForDay(adjustedDay);

  console.log(
    `Generating ${commitCount} commits on ${commitDate.toDateString()}`
  );
  generateRandomCommits(commitDate, commitCount);
});

console.log("Commit simulation for Nov 18 - Dec 18 completed.");
