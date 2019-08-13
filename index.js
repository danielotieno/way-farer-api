// server to run the app
import logger from 'fancy-log'
import config from './server/config/config'
import start from './server'

const { port } = config
start().then(app => {
  app.listen(port, () => {
    logger.info(`app running on port ${port}`)
  })
})
