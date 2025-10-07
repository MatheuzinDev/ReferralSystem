import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export const createUser = async (data) => {
  return prisma.user.create({ data })
}


export const getUserById = async (id) => {
  return prisma.user.findUnique({ where: { id: Number(id) } })
}


export const getUserByEmail = async (email) => {
  return prisma.user.findUnique({ where: { email } })
}


export const updateUserPoints = async (id, points) => {
  return prisma.user.update({
    where: { id: Number(id) },
    data: { points },
  })
}
