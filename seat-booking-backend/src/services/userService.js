import prisma from '../config/db.js';

export async function getUsers() {
  return prisma.user.findMany();
}

export async function getUserById(id) {
  return prisma.user.findUnique({ where: { id: Number(id) } });
}

export async function createUser(data) {
  return prisma.user.create({ data });
}

export async function updateUser(id, data) {
  return prisma.user.update({ where: { id: Number(id) }, data });
}

export async function deleteUser(id) {
  await prisma.user.delete({ where: { id: Number(id) } });
  return true;
}
