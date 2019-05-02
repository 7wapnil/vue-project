export const build = (events) => {
  // console.log(events)
  const result = []
  // const sorted = []
  events.forEach(event => {
    const title = result.find(title => {
      console.log(title)
      console.log(event.title)

      // title.name === event.title.name
    })
    console.log(title)
  })
}
