const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/dogs-rater_development",
      test: "postgres://postgres:postgres@localhost:5432/dogs-rater_test",
      e2e: "postgres://postgres:postgres@localhost:5432/dogs-rater_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
