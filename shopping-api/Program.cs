using Microsoft.EntityFrameworkCore;
using ShoppingCartApi.Data;
using ShoppingCartApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=shoppingcart.db"));
builder.Services.AddScoped(typeof(EFCoreRepository<>));
builder.Services.AddScoped<UnitOfWork>();
builder.Services.AddScoped<ShoppingCartService>();
builder.Services.AddScoped<OrderService>();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
