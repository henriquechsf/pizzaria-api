import prismaClient from '../../prisma';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    const user = await prismaClient.user.findFirst({
      where: { email },
    });

    // validar se email existe
    if (!user) {
      throw new Error('User/password incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    // validar se a senha esta correta
    if (!passwordMatch) {
      throw new Error('User/password incorrect');
    }

    // gerar o token jwt
    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '1d',
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    };
  }
}

export { AuthUserService };
