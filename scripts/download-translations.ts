
import axios from 'axios';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config();
const downloadTranslations = async () => {
    try {
        const projectId = process.env.PROJECT_ID;
        const accessToken = process.env.ACCESS_TOKEN;
        if (!projectId || !accessToken) {
            throw new Error('Please set PROJECT_ID and ACCESS_TOKEN in your .env file');
        }
        const fileResponse = await axios.get(
            `https://api.localazy.com/projects/${projectId}/files`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                },
            }
        );
        const fileId = fileResponse.data[0].id;
        const languages = ['es', 'yo']; // Spanish and Yoruba language codes
        for (const lang of languages) {
            const response = await axios.get(
                `https://api.localazy.com/projects/${projectId}/files/${fileId}/download/${lang}`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                    },
                }
            );
            const translations = response.data;
            const outputPath = path.join(__dirname, `translations_${lang}.json`);
            fs.writeFileSync(outputPath, JSON.stringify(translations, null, 2));
            console.log(`Translations for ${lang} downloaded and saved to ${outputPath}`);
        }
    } catch (error) {
        console.error('Error downloading translations:', error);
    }
};
downloadTranslations();