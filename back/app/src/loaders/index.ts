import { Application } from 'express'
import expressLoader from './express'

export default async ({ expressApp }: { expressApp: Application }) => {
  // express
  await expressLoader({ app: expressApp })
}
