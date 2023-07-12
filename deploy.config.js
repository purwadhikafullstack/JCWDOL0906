module.exports = {
  apps: [
    {
      name: "JCWDOL-009-06", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 9006,
      },
      time: true,
    },
  ],
};
