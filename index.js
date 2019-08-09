// server to run the app
import logger from 'fancy-log'
import config from './server/config/config'
import app from './server'

const { port } = config
app.listen(port, () => {
  logger.info(`app running on port ${port}`)
})
