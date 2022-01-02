module.exports = {
  apps: [
    {
      name: 'remix-app',
      autorestart: true,
      max_memory_restart: '1G',
      env_development: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
