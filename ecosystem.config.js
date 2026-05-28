module.exports = {
  apps: [
    {
      name: 'cazaustre-web',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/home/openclaw/.openclaw/workspace/cazaustre-web',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 3008,
      },
    },
  ],
};
