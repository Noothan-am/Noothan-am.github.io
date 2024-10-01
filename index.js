const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Path to your repository (current directory)
const repoPath = ".";

// Function to generate random 10 days in October
const getRandomOctoberDays = () => {
  const days = [];
  while (days.length < 10) {
    const day = Math.floor(Math.random() * 31) + 1; // Random days from 1 to 31
    if (!days.includes(day)) {
      days.push(day);
    }
  }
  return days.sort((a, b) => a - b); // Sort days for better visualization
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

// Generate random days in October
const randomDays = getRandomOctoberDays();
console.log("Random October days:", randomDays);

// Generate commits for each random day in October
randomDays.forEach((day) => {
  const commitDate = new Date(2024, 9, day); // October is month 9 (zero-based index)
  const commitCount = Math.floor(Math.random() * 6) + 1; // Random commits from 1 to 6
  console.log(
    `Generating ${commitCount} commits on ${commitDate.toDateString()}`
  );
  generateRandomCommits(commitDate, commitCount);
});

console.log("Commit simulation for October completed.");
