export const updateCacheList = (list, data, pushNewItem = true) => {
  let itemIndex = list.findIndex(item => item.id === data.id)
  if (itemIndex > -1) {
    list.splice(itemIndex, 1, data)
  }

  if (itemIndex === -1 && pushNewItem) {
    return [...list, data]
  }

  return list
}
