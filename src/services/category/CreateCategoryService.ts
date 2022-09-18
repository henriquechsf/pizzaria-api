import prismaClient from '../../prisma';

interface CategoryRequest {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: CategoryRequest) {
    if (name === '') {
      throw new Error('Name invalid');
    }

    const categoryAlreadyExists = await prismaClient.category.findFirst({
      where: { name: name },
    });
    console.log(categoryAlreadyExists);

    if (categoryAlreadyExists) {
      throw new Error(`Category name ${name} already exists`);
    }

    const category = await prismaClient.category.create({
      data: {
        name: name,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return category;
  }
}

export { CreateCategoryService };
