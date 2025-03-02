import express from 'express';
import { SubjectController } from './subject.controller';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/bodyParser';

const route = express.Router();

route.post('/',
    multerUpload.single('image'),
    parseBody,
    SubjectController.createSubject);

route.get('/', SubjectController.getAllSubject);
// route.delete('/:id', );

export const SubjectRoute = route;
