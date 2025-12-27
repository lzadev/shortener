var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgress-db")
    .WithLifetime(ContainerLifetime.Persistent)
    .WithDataVolume("shorter-db");

var shortenerDb = postgres.AddDatabase("shorter-db");

builder.AddProject<Projects.Shortener_Api>("shortener-api")
    .WithReference(shortenerDb)
    .WaitFor(shortenerDb);

builder.Build().Run();
