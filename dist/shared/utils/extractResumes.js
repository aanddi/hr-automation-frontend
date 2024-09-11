export const extractResumes = (text) => {
    try {
        const cleanJsonString = text
            .replace(/```json\s*|\s*```/g, '')
            .trim();
        const listCandidates = JSON.parse(cleanJsonString);
        if (Array.isArray(listCandidates)) {
            return listCandidates;
        }
        else {
            console.error('Parsed JSON is not an array:', listCandidates);
            return null;
        }
    }
    catch (error) {
        console.error('Error parsing JSON:', error.message);
        return null;
    }
};
