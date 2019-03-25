import { slug } from '@/helpers/strings'

export const DEFAULT_BACKGROUND = 'arcanebet-default-background'

const loadBackgroundSource = (fileName) => {
  return require(`@/assets/images/introduction-area/${fileName}.png`)
}

export const findBackgroundSource = ({ name }) => {
  const fileName = `background-${slug(name)}`

  try {
    return loadBackgroundSource(fileName)
  } catch (e) {
    return loadBackgroundSource(DEFAULT_BACKGROUND)
  }
}
