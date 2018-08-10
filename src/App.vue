<template>
    <router-view/>
</template>

<script>

    export default {
      sockets: {
        oddChange(data) {
          console.log('Received odd change', data)
          this.updateFragment('Odd', data)
        },
        updateMarket(data) {
            this.updateFragment('Market', data)
        },
        updateEvent(data) {
          this.updateFragment('Event', data)
        }
      },
      methods: {
        updateFragment(typename, updates) {
          const client = this.$apollo.getClient()
          const id = `${typename}:${updates.id}`
          const fields = Object.keys(updates).filter((key) => {
            return key !== 'eventId' && key !== 'marketId'
          })

          const fragment = this.gql(`
            fragment ${typename} on ${typename} {
              ${ fields.join('\n') }
            }
          `)

          const data = client.readFragment({ id, fragment })

          if (data) {
            fields.forEach((attr) => {
              if (attr !== 'eventId' && attr !== 'marketId') {
                data[attr] = updates[attr]
              }
            })
            console.log('Updating odd cache')
            client.writeFragment( {id, fragment, data })
          }
        }
      }
    }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
