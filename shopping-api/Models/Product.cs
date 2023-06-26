namespace ShoppingCartApi.Models;

public class Product : Entity
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public decimal Price { get; set; }

}


public class Category : Entity
{
    public required string Name { get; set; }
    public required string Description { get; set; }

}