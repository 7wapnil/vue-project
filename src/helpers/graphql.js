export const updateCacheList = (list, data, remove = false) => {
  let itemIndex = list.findIndex(item => item.id === data.id)

  if (itemIndex === -1) {
    if (!remove) list.unshift(data)
  } else {
    remove ? list.splice(itemIndex, 1) : list.splice(itemIndex, 1, data)
  }

  return list
}
