module.exports = {
  apps: [
    {
      name: "matgar_doom",

      exec_mode: "cluster",
      autorestart: true,
      watch: true,
      args: "start -p 7033",

      script: "node_modules/next/dist/bin/next",
      env: {
        NODE_ENV: "production",
        PORT: 7033,
      },
    },
  ],
};
