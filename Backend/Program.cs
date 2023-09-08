using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<DataService>();

builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Lol disable cors
app.UseCors(opts => opts.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.MapGet("/cooldudes", ([FromServices] DataService dataService) => dataService.GetAll())
.WithOpenApi();

app.MapPost("/add", ([FromServices] DataService dataService, [FromBody] CoolDude dude) => dataService.AddADude(dude))
.WithOpenApi();

app.MapDelete("/delete", ([FromServices] DataService dataService, [FromBody] int id) => dataService.DeleteADude(id))
.WithOpenApi();

app.Run();


public record CoolDude(int Id, string Name, bool IsCool);

public class DataService {
    private List<CoolDude> coolDudes{get;set;} = new();

    public List<CoolDude> GetAll() => coolDudes;

    public void AddADude(CoolDude dude) => coolDudes.Add(dude);

    public void DeleteADude(int Id)
    {
        var match = coolDudes.Find(x => x.Id == Id);
        if(match != null)
            coolDudes.Remove(match);
    }
}