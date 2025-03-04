import { ICategory } from './category.interface';
import { Category } from './category.module';

const createCategoryIntoDB = async (payload: ICategory) => {
  const result = await Category.create(payload);
  return result;
};

const allCategoryDataIntoDB = async () => {
  const result = await Category.find();
  return result;
};

const deleteCategoryDataIntoDB = async (id: string) => {
  const result = await Category.findByIdAndDelete({ _id: id });
  return result;
};

export const CategoryService = {
  createCategoryIntoDB,
  allCategoryDataIntoDB,
  deleteCategoryDataIntoDB,
};
