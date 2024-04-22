const redis = require('redis');

const createRedisClient = () => {
  const redisClient = redis.createClient({
    password: 'zi4RAH5D3YqhRTvZ50Mld6LAZOQnuQ1n',
    socket: {
      host: 'redis-11233.c14.us-east-1-3.ec2.redns.redis-cloud.com',
      port: 11233
    }
  });

 const retryInterval = 5000; 

  const connect = () => {
    redisClient.connect()
      .then(() => {
        console.log('Connected to Redis');
      })
      .catch((error) => {
        console.error('Error connecting to Redis:', error);
        console.log(`Retrying connection to Redis in ${retryInterval / 1000} seconds...`);
        setTimeout(connect, retryInterval);
      });
  };

  connect();
  return redisClient;
};

// Create Redis client with connection retry logic
const redisClient = createRedisClient();

module.exports = redisClient;
