const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");
const PORT = process.env.PORT || 3001;
const fs = require("fs");
const { Configuration } = require("openai");
const admin = require("firebase-admin");
const archiver = require("archiver");

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const serviceAccount = require("./service_account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "webappgenie1.appspot.com",
});

const bucket = admin.storage().bucket();

app.post("/generate-text", async (req, res) => {
  console.log("Received request:", req.body);

  const apiKey = req.body.apiKey;
  const inputData = JSON.parse(req.body.prompt);

  try {
    // Loop through pages and components and create files
    const componentFiles = [];
    const pageFiles = [];

    for (const page of inputData.appStruct) {
      let pageComponents = "";

      for (const component of page.components) {
        const componentPrompt = {
          ...inputData,
          appStruct: [{ ...page, components: [component] }],
        };

        const response = await callOpenAI(
          apiKey,
          JSON.stringify(componentPrompt)
        );
        console.log("OpenAI API response:", response);

        // Create component file with page name prefix
        const componentName =
          `${page.pageName}_${component.componentName}`.replace(/\s+/g, "");
        const componentFileName = `components/${componentName}.js`;
        componentFiles.push({ name: componentFileName, content: response });
        pageComponents += `import ${componentName} from "./${componentFileName}";\n`;
      }

      // Create page file
      const pageName = page.pageName.replace(/\s+/g, "");
      const pageFileName = `pages/${pageName}.js`;
      const pageContent = `${pageComponents}\nfunction ${pageName}() {\n  return (\n    <div>\n      {${page.components
        .map(
          (component) =>
            `<${page.pageName}_${component.componentName.replace(
              /\s+/g,
              ""
            )} />`
        )
        .join(
          "\n      "
        )}}\n    </div>\n  );\n}\n\nexport default ${pageName};`;
      pageFiles.push({ name: pageFileName, content: pageContent });
    }

    // Save the generated files to Firebase Storage and create a ZIP archive
    const allFiles = [...componentFiles, ...pageFiles];
    await saveFilesToFirebaseAndCreateZip(allFiles, res);
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    console.error("Error details:", error.response?.data);
    res.status(500).json({ message: "An error occurred", error });
  }
});

// ... (callOpenAI function)

async function saveFilesToFirebaseAndCreateZip(files, res) {
  // Save the generated files to Firebase Storage
  for (const fileData of files) {
    const file = bucket.file(fileData.name);
    const writeStream = file.createWriteStream();
    writeStream.write(fileData.content);
    writeStream.end();
    writeStream.on("error", (err) => {
      console.error("Error uploading file to Firebase Storage:", err);
      res.status(500).json({ message: "An error occurred", err });
    });
    await new Promise((resolve) => writeStream.on("finish", resolve));
  }

  // Create a ZIP archive containing the generated files
  const archive = archiver("zip");
  const zipFileName = "generatedWebApp.zip";
  const zipFile = bucket.file(zipFileName);
  const zipWriteStream = zipFile.createWriteStream();

  archive.pipe(zipWriteStream);

  for (const fileData of files) {
    archive.append(fileData.content, { name: fileData.name });
  }

  archive.finalize();

  zipWriteStream.on("error", (err) => {
    console.error("Error creating ZIP file:", err);
    res.status(500).json({ message: "An error occurred", err });
  });

  zipWriteStream.on("finish", async () => {
    console.log("ZIP file created successfully!");
    // Generate a download URL for the ZIP file
    const expires = Date.now() + 5 * 60 * 1000; // URL expires in 5 minutes
    const config = { action: "read", expires };
    const [url] = await zipFile.getSignedUrl(config);

    // Return the download URL to the client
    if (!res.headersSent) {
      res.status(200).json({ url });
    }
  });
}

async function callOpenAI(apiKey, prompt) {
  const give = `You are a front-end developer, using React 16 and React bootstrap and apexcharts. Given the following JSON object create the requested components. Use the give colors and the style as the apps color scheme use the colors respectively; accent, accent 2, neutral, main. Just give the code. Don't give an empty response: ${prompt}`;

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: give,
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  const content = response.data.choices[0].message.content;
  const extractedCode = extractCodeBetweenBackticks(content);
  return extractedCode;
}
function extractCodeBetweenBackticks(content) {
  const regex = /```([^`]+)```/s;
  const match = content.match(regex);
  const code = match ? match[1].trim() : "";

  // Remove the unnecessary characters
  const cleanCode = code.replace(/\\n/g, "\n").replace(/^"|"$/g, "");
  return cleanCode;
}
