import { Request } from '../../entities/request.entities.js';
import { Resumes } from '../../entities/resumes.entities.js';
import AppDataSource from '../../config/db.config.js';
const requestsOrm = AppDataSource.getRepository(Request);
const resumeOrm = AppDataSource.getRepository(Resumes);
export const RequestService = {
    async getAllRequests(req, res) {
        const requests = await requestsOrm.find({
            select: {
                idRequest: true,
                createdAt: true
            },
            order: {
                idRequest: 'desc'
            }
        });
        const response = {
            items: requests
        };
        return res.json(response);
    },
    async getRequestsById(req, res) {
        const { id } = req.params;
        const request = await requestsOrm.findOne({
            where: {
                idRequest: +id
            },
            relations: ['resumes']
        });
        const response = {
            idRequest: request?.idRequest,
            info: {
                createdAt: request?.createdAt,
                urlHh: request?.urlHh,
                prompt: request?.prompt
            },
            resumes: request?.resumes
        };
        return res.json(response);
    },
    async createRequests(resumes, urlHh, prompt) {
        // if (!resumes || !urlHh || !prompt)
        //    return res
        //       .status(400)
        //       .json({ message: 'Server: Ошибка при создании запроса. Обьязательные параметры не указаны' });
        if (!resumes)
            throw new Error('Резюме не найдены');
        try {
            const newRequest = new Request();
            newRequest.urlHh = urlHh;
            newRequest.prompt = prompt;
            const addedRequest = await requestsOrm.save(newRequest);
            const saveResumePromises = resumes.map(async (resume) => {
                const newResume = new Resumes();
                newResume.idResumeHh = resume.id;
                newResume.firstName = resume.firstName;
                newResume.lastName = resume.lastName;
                newResume.middleName = resume.middleName;
                newResume.age = resume.age;
                newResume.title = resume.title;
                newResume.totalExperience = resume.total_experience.months;
                newResume.urlResume = resume.url;
                newResume.scoreball = resume.scoreball;
                newResume.request = newRequest;
                await resumeOrm.save(newResume);
            });
            await Promise.all(saveResumePromises);
            const idRequest = addedRequest.idRequest;
            return { idRequest: idRequest };
        }
        catch (e) {
            console.log(e);
        }
    },
    async deleteRequestById(req, res) {
        const { id } = req.params;
        const result = await requestsOrm.delete({ idRequest: +id });
        // Проверка результата:
        if (result.affected === 1) {
            return res.status(204).send();
        }
        else {
            return res.status(404).json({ message: 'Server: Ошибка при удалении' });
        }
    }
};
