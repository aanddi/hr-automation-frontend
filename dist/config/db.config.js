import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Resumes } from '../entities/resumes.entities.js';
import { Request } from '../entities/request.entities.js';
const entities = [Request, Resumes];
dotenv.config();
const type = () => {
    const typeDb = String(process.env.DATA_BASE_TYPE);
    if (typeDb === 'mysql')
        return 'mysql';
    else
        return 'postgres';
};
const AppDataSource = new DataSource({
    type: type(),
    database: process.env.DATA_BASE_NAME,
    host: process.env.DATA_BASE_HOST,
    port: Number(process.env.DATA_BASE_PORT) || 3306,
    username: process.env.DATA_BASE_USERNAME,
    password: process.env.DATA_BASE_PASSWORD,
    synchronize: true,
    entities: [...entities]
});
export default AppDataSource;
