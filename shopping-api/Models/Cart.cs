namespace ShoppingCartApi.Models;

public class Cart : Entity
{
    public required string SessionId { get; set; }
    public List<CartItem> CartItems { get; set; } = new List<CartItem>();
    public Order? Order { get; set; }

    public int? OrderId { get; set; }

}

public class CartItem : Entity
{
    public int CartId { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public decimal Price { get; set; }




}

