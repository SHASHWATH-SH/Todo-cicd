// generate-tests.cjs
const fs = require("fs");
const path = require("path");
const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generateTests = async () => {
  const appPath = path.join(__dirname, "src", "App.js");
  if (!fs.existsSync(appPath)) {
    console.error("❌ App.js not found.");
    process.exit(1);
  }

  const appCode = fs.readFileSync(appPath, "utf-8");

  const prompt = `Write a complete test suite using Jest and React Testing Library for this React component:\n\n${appCode}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });

  const testCode = response.choices[0].message.content;

  const testDir = path.join(__dirname, "src", "__tests__");
  if (!fs.existsSync(testDir)) fs.mkdirSync(testDir, { recursive: true });

  fs.writeFileSync(path.join(testDir, "App.test.js"), testCode);
  console.log("✅ Test file written to src/__tests__/App.test.js");
};

generateTests().catch(console.error);
