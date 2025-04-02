using Bookstore.API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var env = builder.Environment;
var dbPath = Path.Combine(env.WebRootPath, "Bookstore.sqlite");

builder.Services.AddDbContext<BookstoreContext>(options =>
    options.UseSqlite($"Data Source={dbPath}")
);

// builder.Services.AddDbContext<BookstoreContext>(options =>
//     options.UseSqlite(builder.Configuration.GetConnectionString("BookstoreConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy(name:"AllowFrontend",
        configurePolicy: policy =>
        {
            policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");



app.UseAuthorization();

app.MapControllers();

app.Run();
