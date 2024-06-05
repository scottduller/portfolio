import clsx, { ClassValue } from 'clsx'

export const cn = (...classNames: ClassValue[]) => {
  return clsx(classNames)
}
