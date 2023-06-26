namespace ShoppingCartApi.Models;


public enum OrderStatus
{
    Pending,
    Processing,
    Paid,
    Cancelled
}
public class Order : Entity
{
    public required string Number { get; set; }
    public decimal Total => OrderItems.Sum(x => x.Price * x.Quantity);
    public required OrderCustomer Customer { get; set; }
    public OrderPayment? Payment { get; set; }
    public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    public DateTime DateCreated { get; set; }
    public OrderStatus Status { get; set; }

}


public class OrderItem : Entity
{
    public int OrderId { get; set; }

    public required string Name { get; set; }
    public required string Description { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}

public class OrderCustomer : Entity
{
    public int OrderId { get; set; }

    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }


}

public class OrderPayment : Entity
{
    public int OrderId { get; set; }

    public required string PaymentMethod { get; set; }
    public required string PaymentIntentId { get; set; }
    public required DateTime DatePaid { get; set; }

}

