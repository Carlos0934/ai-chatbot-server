namespace ShoppingCartApi.Data;

using Microsoft.EntityFrameworkCore;
using ShoppingCartApi.Models;

public class AppDbContext : DbContext
{


    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }

    public required DbSet<Cart> Carts { get; set; }
    public required DbSet<CartItem> CartItems { get; set; }
    public required DbSet<Order> Orders { get; set; }
    public required DbSet<OrderCustomer> OrderCustomers { get; set; }
    public required DbSet<OrderItem> OrderItems { get; set; }
    public required DbSet<OrderPayment> OrderPayments { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Cart>(entity =>
        {
            entity.ToTable("carts");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).ValueGeneratedOnAdd();
            entity.Property(e => e.SessionId).IsRequired();
            entity.HasMany(e => e.CartItems).WithOne().HasForeignKey(e => e.CartId);
        });

        modelBuilder.Entity<CartItem>(entity =>
        {
            entity.ToTable("cart_items");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).ValueGeneratedOnAdd();
            entity.Property(e => e.ProductId).IsRequired();
            entity.Property(e => e.Quantity).IsRequired();
            entity.Property(e => e.Name).IsRequired();
            entity.Property(e => e.Description).IsRequired();
            entity.Property(e => e.Price).IsRequired();
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.ToTable("orders");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).ValueGeneratedOnAdd();
            entity.Property(e => e.DateCreated).IsRequired();
            entity.Property(e => e.Status).IsRequired();
            entity.HasOne(e => e.Customer).WithOne().HasForeignKey<OrderCustomer>(e => e.OrderId);
            entity.HasMany(e => e.OrderItems).WithOne().HasForeignKey(e => e.OrderId);
            entity.HasOne(e => e.Payment).WithOne().HasForeignKey<OrderPayment>(e => e.OrderId);

        });

        modelBuilder.Entity<OrderCustomer>(entity =>
        {
            entity.ToTable("order_customers");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).ValueGeneratedOnAdd();
            entity.Property(e => e.FirstName).IsRequired();
            entity.Property(e => e.LastName).IsRequired();
            entity.Property(e => e.Email).IsRequired();
        });

        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.ToTable("order_items");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).ValueGeneratedOnAdd();
            entity.Property(e => e.Name).IsRequired();
            entity.Property(e => e.Description).IsRequired();
            entity.Property(e => e.Price).IsRequired();
            entity.Property(e => e.Quantity).IsRequired();
        });

        modelBuilder.Entity<OrderPayment>(entity =>
        {
            entity.ToTable("order_payments");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).ValueGeneratedOnAdd();
            entity.Property(e => e.PaymentMethod).IsRequired();
            entity.Property(e => e.PaymentIntentId).IsRequired();
            entity.Property(e => e.DatePaid).IsRequired();
        });






    }
}