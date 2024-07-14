const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const PYTHON_PORT = 5000;

app.get('/', (req, res) => {
    res.send('Hi AI is running in JavaScript!');
});

app.post('/chat', async (req, res) => {
    const userInput = req.body.message;

    try {
        // Call Python for AI response
        const pythonResponse = await axios.post(`http://localhost:${PYTHON_PORT}/chat`, { message: userInput });
        const responseText = pythonResponse.data.response;

        // Process input in C++
        exec(`./cpp/main "${userInput}"`, (error, stdout) => {
            if (error) {
                console.error(`Error executing C++: ${error}`);
                return res.json({ response: responseText });
            }

            const cppResponse = stdout.trim();

            // Process input in C
            exec(`./c/main "${userInput}"`, (error, stdout) => {
                if (error) {
                    console.error(`Error executing C: ${error}`);
                    return res.json({ response: responseText });
                }

                const cResponse = stdout.trim();

                // Process input in Rust
                exec(`./rust/main "${userInput}"`, (error, stdout) => {
                    if (error) {
                        console.error(`Error executing Rust: ${error}`);
                        return res.json({ response: responseText });
                    }

                    const rustResponse = stdout.trim();

                    res.json({ response: `${responseText} | ${cppResponse} | ${cResponse} | ${rustResponse}` });
                });
            });
        });
    } catch (err) {
        console.error(`Error: ${err}`);
        res.status(500).json({ response: 'Internal Server Error' });
    }
});

app.listen(3000, () => {
    console.log('Hi AI is running in JavaScript on port 3000');
});
