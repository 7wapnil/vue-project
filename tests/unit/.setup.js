import '@/components/global-components'
import sinon from 'sinon'
import localStorage from './test-helpers/local-storage'
import fetch from 'unfetch'

global.sinon = sinon
global.localStorage = localStorage
global.fetch = fetch
