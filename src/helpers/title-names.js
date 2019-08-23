export const getTitleName = (title) => {
  return (title.name || title.externalName)
}

export const getTitleShortName = (title) => {
  return (title.shortName || getTitleName(title))
}
