
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();
const createGlossaryTerm = async () => {
    try {
        const projectId = process.env.PROJECT_ID;
        const accessToken = process.env.ACCESS_TOKEN;
        if (!projectId || !accessToken) {
            throw new Error('Please set PROJECT_ID and ACCESS_TOKEN in your .env file');
        }
        const response = await axios.post(
            `https://api.localazy.com/projects/${projectId}/glossary`,
            {
                description: 'Glossary description',
                translateTerm: true,
                caseSensitive: false,
                term: [
                    {
                        lang: 'en',
                        term: 'document',
                    },
                    {
                        lang: 'es',
                        term: 'documento',
                    }
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Glossary term created:', response.data);
    } catch (error) {
        console.error('Error creating glossary term:', error);
    }
};
createGlossaryTerm();