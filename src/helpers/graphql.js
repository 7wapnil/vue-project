export const updateCacheList = (list, data) => {
  let itemIndex = list.findIndex(item => item.id === data.id)
  if (itemIndex === -1) {
    return [...list, data]
  }

  list.splice(itemIndex, 1, data)

  return list
}
