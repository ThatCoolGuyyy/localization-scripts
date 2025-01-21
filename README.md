# Localization Automation

This repository includes TypeScript-based scripts for streamlining localization workflows using the [Localazy API](https://localazy.com/docs/api/introduction), handling tasks such as uploading source keys, downloading translations, managing glossaries, and handling duplicate strings.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ThatCoolGuyyy/localization-scripts.git
cd localization-scripts
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory with:
```bash
ACCESS_TOKEN=your_localazy_access_token
PROJECT_ID=your_localazy_project_id
```

## Available Commands

```bash
# Upload source keys
npm run upload-keys

# Download translations
npm run download-translations

# Create new glossary term
npm run create-new-glossary-term

# Manage duplicate strings
npm run link-duplicates
```