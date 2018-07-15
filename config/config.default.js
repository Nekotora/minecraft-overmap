module.exports = {
  secret: "nichijou",
  db: {
    development: {
      username: "root",
      password: "",
      database: "overmap_dev",
      host: "127.0.0.1",
      dialect: "mysql",
      logging: true
    },
    test: {
      username: "root",
      password: "",
      database: "overmap_test",
      host: "127.0.0.1",
      dialect: "mysql",
      logging: true
    },
    production: {
      username: "root",
      password: "",
      database: "overmap",
      host: "127.0.0.1",
      dialect: "mysql",
      logging: false
    }
  }
}
