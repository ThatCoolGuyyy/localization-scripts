
import axios, { AxiosResponse } from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();
interface FileResponse { id: string; }
interface KeyData { id: string; key: string[]; value: string; }
interface KeysResponse { keys: KeyData[]; }

const getProjectFiles = async (projectId: string, accessToken: string): Promise<FileResponse[]> => {
    const response: AxiosResponse<FileResponse[]> = await axios.get(
        `https://api.localazy.com/projects/${projectId}/files`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return response.data;
};
const getFileKeys = async (projectId: string, fileId: string, language: string, accessToken: string): Promise<KeysResponse> => {
    const response: AxiosResponse<KeysResponse> = await axios.get(
        `https://api.localazy.com/projects/${projectId}/files/${fileId}/keys/${language}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return response.data;
};
const linkDuplicateKeys = async (projectId: string, sourceKeyId: string, targetKeyId: string, accessToken: string): Promise<void> => {
    await axios.post(
        `https://api.localazy.com/projects/${projectId}/links/${sourceKeyId}`,
        { keyId: targetKeyId },
        { headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json'} }
    );
};
const linkDuplicates = async (keyToLink: string) => {
    try {
        const projectId = process.env.PROJECT_ID;
        const accessToken = process.env.ACCESS_TOKEN;
        const sourceLanguage = 'en';
        if (!projectId || !accessToken) {
            throw new Error('Please set PROJECT_ID and ACCESS_TOKEN in your .env file');
        }
        // Step 1: Get project files
        const files = await getProjectFiles(projectId, accessToken);
        if (files.length < 2) {
            throw new Error('At least two source files are required to link duplicates');
        }
        const [firstFileId, secondFileId] = files.map(file => file.id);
        // Step 2: Get source keys from both files
        const [firstFileKeys, secondFileKeys] = await Promise.all([
            getFileKeys(projectId, firstFileId, sourceLanguage, accessToken),
            getFileKeys(projectId, secondFileId, sourceLanguage, accessToken),
        ]);
        // Step 3: Find keys to link
        const sourceKey = firstFileKeys.keys.find(key => key.key[0] === keyToLink);
        const targetKey = secondFileKeys.keys.find(key => key.key[0] === keyToLink);
        if (!sourceKey || !targetKey) {
            throw new Error(`Key "${keyToLink}" not found in both files`);
        }
        // Step 4: Link duplicate keys
        console.log(`Linking key "${keyToLink}" between files...`);
        await linkDuplicateKeys(projectId, sourceKey.id, targetKey.id, accessToken);
        console.log(`Successfully linked key "${keyToLink}"`);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API Error:', error.response?.data || error.message);
        } else {
            console.error('Unexpected error:', error);
        }
    }
};
linkDuplicates('hello_world');