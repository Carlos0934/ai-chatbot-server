
using ShoppingCartApi.Models;

namespace ShoppingCartApi.Data;


public class UnitOfWork : IDisposable
{

    private readonly AppDbContext Context;
    public UnitOfWork(AppDbContext context)
    {
        Context = context;
    }


    public EFCoreRepository<Order> OrderRepository => new EFCoreRepository<Order>(Context);
    public EFCoreRepository<OrderCustomer> OrderCustomerRepository => new EFCoreRepository<OrderCustomer>(Context);
    public EFCoreRepository<OrderItem> OrderItemRepository => new EFCoreRepository<OrderItem>(Context);
    public EFCoreRepository<OrderPayment> OrderPaymentRepository => new EFCoreRepository<OrderPayment>(Context);
    public EFCoreRepository<Cart> CartRepository => new EFCoreRepository<Cart>(Context);
    public EFCoreRepository<CartItem> CartItemRepository => new EFCoreRepository<CartItem>(Context);




    public async Task<int> SaveChangesAsync()
    {
        return await Context.SaveChangesAsync();
    }
    public void Dispose()
    {
        Context.Dispose();
    }
}