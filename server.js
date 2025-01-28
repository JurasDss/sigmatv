const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();

const PORT = 3000;

// GitHub repo information
const GITHUB_API_URL = 'https://api.github.com';
const REPO_OWNER = 'EGLC-MtTOOLS'; // Replace with your GitHub username
const REPO_NAME = 'sigmatv'; // Replace with your repository name
const FILE_PATH = 'comments.json'; // Path to the comments file in the repo
const ACCESS_TOKEN = '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'; // Replace with your GitHub token

app.use(cors());
app.use(bodyParser.json());

// Fetch comments from GitHub
app.get('/comments', async (req, res) => {
    try {
        const response = await axios.get(`${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
            headers: {
                Authorization: `token ${ACCESS_TOKEN}`,
            },
        });

        const fileContent = Buffer.from(response.data.content, 'base64').toString('utf-8');
        res.json(JSON.parse(fileContent));
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).send('Could not fetch comments');
    }
});

// Save a new comment to GitHub
app.post('/comments', async (req, res) => {
    const { username, text } = req.body;

    if (!username || !text) {
        return res.status(400).send('Invalid comment data');
    }

    try {
        // Fetch the current file content
        const response = await axios.get(`${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
            headers: {
                Authorization: `token ${ACCESS_TOKEN}`,
            },
        });

        const comments = JSON.parse(Buffer.from(response.data.content, 'base64').toString('utf-8'));
        comments.push({ username, text });

        // Update the file content on GitHub
        const updatedContent = Buffer.from(JSON.stringify(comments, null, 2)).toString('base64');

        await axios.put(
            `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
            {
                message: 'Update comments.json',
                content: updatedContent,
                sha: response.data.sha,
            },
            {
                headers: {
                    Authorization: `token ${ACCESS_TOKEN}`,
                },
            }
        );

        res.status(201).send('Comment saved');
    } catch (error) {
        console.error('Error saving comment:', error);
        res.status(500).send('Could not save comment');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


