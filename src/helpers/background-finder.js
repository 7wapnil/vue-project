import { slug } from '@/helpers/strings'

export const DEFAULT_BACKGROUND_SPORTS = 'background-default-sports'
export const DEFAULT_BACKGROUND_ESPORTS = 'background-default-esports'

const loadBackgroundSource = (fileName) => {
  return require(`@/assets/images/introduction-area/${fileName}.png`)
}

export const findBackgroundSource = ({ name, route }) => {
  const fileName = `background-${slug(name)}`

  try {
    return loadBackgroundSource(fileName)
  } catch (e) {
    if (route === 'sports') {
      return loadBackgroundSource(DEFAULT_BACKGROUND_SPORTS)
    }
    return loadBackgroundSource(DEFAULT_BACKGROUND_ESPORTS)
  }
}
