
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();
const uploadSourceKeys = async () => {
  try {
    const projectId = process.env.PROJECT_ID;
    const accessToken = process.env.ACCESS_TOKEN;
    if (!projectId || !accessToken) {
      throw new Error('Please set PROJECT_ID and ACCESS_TOKEN in your .env file');
    }
    const response = await axios.post(
      `https://api.localazy.com/projects/${projectId}/import`,
      {
        files: [
          {
            name: 'en.json',
            content: {
              type: 'json',
              en: {
                "hello_world": "Hello, World!",
              }
            }
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Source keys uploaded:', response.data);
  } catch (error) {
    console.error('Error uploading source keys:', error);
  }
};
uploadSourceKeys();