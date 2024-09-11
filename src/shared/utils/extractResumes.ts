export const extractResumes = (text: string): object[] | null => {
    try {
        const cleanJsonString = text
            .replace(/```json\s*|\s*```/g, '') 
            .trim(); 

        const listCandidates = JSON.parse(cleanJsonString);

        if (Array.isArray(listCandidates)) {
            return listCandidates;
        } else {
            console.error('Parsed JSON is not an array:', listCandidates);
            return null;
        }
    } catch (error: any) {
        console.error('Error parsing JSON:', error.message);
        return null;
    }
};
