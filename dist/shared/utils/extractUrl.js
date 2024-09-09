export const extractUrl = (text) => {
    const pattern = /https:\/\/api\.hh\.ru\/[^\s]*/;
    const match = text.match(pattern);
    return match ? match[0] : null;
};
