import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Invoice Creation
  if (req.method === 'POST') {
    const { recipientName, recipientAddress, description, lineItems, total, editable } = req.body.payload
    const post = await prisma.post.create({ data: { recipientName, recipientAddress, description, lineItems, total, editable } })
    res.status(201).json(post)
    // Get All Invoices
  } else if (req.method === 'GET') {
    const invoices = await prisma.post.findMany({})
    res.status(200).json(invoices)
  } else if (req.method === 'PUT'){
    const params = req.query
    const put = await prisma.post.update({
      where: { uuid: Number(params.uuid) },
      data: params
    })
    res.status(200).json(put)
    }
  else {
    res.status(405).end()
  }
}