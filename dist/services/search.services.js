export const SearchService = {
    async getSearch(req, res) {
        const prompt = req.body;
        // здесь пишем запросы и к gpt и к hh потом (на первое время, потом может разобьем)
        try {
            return res.json(prompt);
        }
        catch (error) {
            res.status(500).json({ message: 'Ошибка' });
        }
    }
};
