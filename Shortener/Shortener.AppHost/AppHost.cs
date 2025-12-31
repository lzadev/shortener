var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgress-db")
    .WithHostPort(5432)
    .WithLifetime(ContainerLifetime.Persistent)
    .WithDataVolume("shorter-db");

var shortenerDb = postgres.AddDatabase("shorter-db");

var migrations = builder.AddProject<Projects.Shortener_MigrationService>("migrations")
    .WithReference(shortenerDb)
    .WaitFor(shortenerDb);

var redis = builder.AddRedis("redis")
    .WithDataVolume("redis-shorter-data")
    .WithPersistence(
        interval: TimeSpan.FromMinutes(5),
        keysChangedThreshold: 100);

var api = builder.AddProject<Projects.Shortener_Api>("shortener-api")
    .WithReference(shortenerDb)
    .WithReference(migrations)
    .WithReference(redis)
    .WaitFor(migrations);


builder.AddJavaScriptApp("shortener-frontend", "frontend")
    .WithReference(api)
    .WaitFor(api);

builder.Build().Run();
