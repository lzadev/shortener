var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgress-db")
    .WithLifetime(ContainerLifetime.Persistent)
    .WithDataVolume("shorter-db");

var shortenerDb = postgres.AddDatabase("shorter-db");

var migrations = builder.AddProject<Projects.Shortener_MigrationService>("migrations")
    .WithReference(shortenerDb)
    .WaitFor(shortenerDb);

builder.AddProject<Projects.Shortener_Api>("shortener-api")
    .WithReference(shortenerDb)
    .WithReference(migrations)
    .WaitFor(migrations);

builder.Build().Run();
