var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.Shortener_Api>("shortener-api");

builder.Build().Run();
