import express from 'express';
import { SubjectController } from './subject.controller';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/bodyParser';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const route = express.Router();

route.post('/',
    multerUpload.single('image'),
    parseBody,
    auth(USER_ROLE.admin, USER_ROLE.tutor),
    SubjectController.createSubject);

route.get('/findSubject', auth(), SubjectController.getTutorCreatedSubject);

route.get('/', SubjectController.getAllSubject);

route.patch('/:id',
    multerUpload.single('image'),
    parseBody,
    auth(USER_ROLE.admin, USER_ROLE.tutor),
    SubjectController.updateSubject
);

route.delete('/:id', auth(USER_ROLE.admin, USER_ROLE.tutor), SubjectController.deleteSubject);


export const SubjectRoute = route;
