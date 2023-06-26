using ShoppingCartApi.Data;
using ShoppingCartApi.Models;

namespace ShoppingCartApi.Services;

public class OrderService
{
    private readonly UnitOfWork _unitOfWork;
    public OrderService(
        UnitOfWork unitOfWork
    )
    {
        _unitOfWork = unitOfWork;
    }

    private string GenerateOrderNumber()
    {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var stringChars = new char[8];
        var random = new Random();

        for (int i = 0; i < stringChars.Length; i++)
        {
            stringChars[i] = chars[random.Next(chars.Length)];
        }

        return new String(stringChars);
    }

    public record CreateOrderRequest
    (string SessionId,
        string CustomerFirstName,
      string CustomerLastName,

    string CustomerEmail


    );




    public async Task<Order> CreateOrder(CreateOrderRequest request)
    {
        var cart = _unitOfWork.CartRepository.GetAll(
            c => c.CartItems
        ).Where(c => c.SessionId == request.SessionId).FirstOrDefault();

        if (cart == null)
        {
            throw new Exception("Cart not found");
        }
        if (cart.OrderId != null)
        {
            throw new Exception("Cart already has an order");
        }

        if (cart.CartItems.Count == 0)
        {
            throw new Exception("Cart is empty");
        }





        var order = new Order()
        {
            Number = GenerateOrderNumber(),
            DateCreated = DateTime.UtcNow,
            Status = OrderStatus.Pending,
            OrderItems = cart.CartItems.Select(ci =>
            {




                return new OrderItem()
                {
                    Name = ci.Name,
                    Description = ci.Description,
                    Price = ci.Price,
                    Quantity = ci.Quantity,

                };

            }).ToList(),
            Customer = new OrderCustomer()
            {
                FirstName = request.CustomerFirstName,
                LastName = request.CustomerLastName,
                Email = request.CustomerEmail,


            },


        };


        cart.Order = order;
        await _unitOfWork.CartRepository.Save(cart);

        await _unitOfWork.SaveChangesAsync();

        return order;
    }

    public record GetOrderRequest(int Id);

    public async Task<Order?> GetOrder(GetOrderRequest request)
    {
        var order = await _unitOfWork.OrderRepository.GetById(request.Id, o => o.OrderItems, o => o.Customer, o => o.Payment);



        return order;
    }

    public record GetOrdersRequest(string Email);

    public List<Order> GetOrders(GetOrdersRequest request)
    {
        var orders = _unitOfWork.OrderRepository.GetAll(
            o => o.OrderItems,
            o => o.Customer,
            o => o.Payment
        ).Where(o => o.Customer.Email == request.Email).ToList();

        return orders;
    }


    public record PayOrderRequest(int Id, string PaymentIntentId, string PaymentMethod);

    public async Task<Order> PayOrder(PayOrderRequest request)
    {
        var order = await _unitOfWork.OrderRepository.GetById(request.Id, o => o.OrderItems, o => o.Customer);

        if (order == null)
        {
            throw new Exception("Order not found");
        }

        order.Payment = new OrderPayment()
        {
            PaymentIntentId = request.PaymentIntentId,
            PaymentMethod = request.PaymentMethod,
            DatePaid = DateTime.UtcNow
        };

        order.Status = OrderStatus.Paid;

        await _unitOfWork.SaveChangesAsync();

        return order;
    }

    public record CancelOrderRequest(int Id);

    public async Task<Order> CancelOrder(CancelOrderRequest request)
    {
        var order = await _unitOfWork.OrderRepository.GetById(request.Id);

        if (order == null)
        {
            throw new Exception("Order not found");
        }

        order.Status = OrderStatus.Cancelled;

        await _unitOfWork.SaveChangesAsync();

        return order;
    }
}

