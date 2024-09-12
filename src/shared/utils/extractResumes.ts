export const extractResumes = (text: string) => {
    const cleanedString = text.replace(/^\`\`\`json\s*/, '').replace(/\s*\`\`\`$/, '');

    const jsonObject = JSON.parse(cleanedString);

    return jsonObject;
};
