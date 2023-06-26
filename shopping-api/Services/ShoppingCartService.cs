


using ShoppingCartApi.Data;
using ShoppingCartApi.Models;

namespace ShoppingCartApi.Services;


public class ShoppingCartService
{
    private readonly UnitOfWork _unitOfWork;
    public ShoppingCartService(
        UnitOfWork unitOfWork
    )
    {
        _unitOfWork = unitOfWork;
    }


    public record UpdateOrCreateCartItemRequest(string SessionId, Product Product, int Quantity);
    public async Task UpdateOrCreateItemToCart(UpdateOrCreateCartItemRequest request)

    {
        var cart = _unitOfWork.CartRepository.GetAll(
           c => c.CartItems
        ).Where(c => c.SessionId == request.SessionId).FirstOrDefault();

        if (cart == null)
        {

            cart = new Cart()
            {
                SessionId = request.SessionId
            };
            await _unitOfWork.CartRepository.Save(cart);
        }

        var cartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == request.Product.Id);

        if (cartItem == null || request.Product.Id.HasValue)
        {
            cartItem = new CartItem()
            {

                ProductId = request.Product.Id.Value,
                Quantity = request.Quantity,
                Description = request.Product.Description,
                Name = request.Product.Name,
                Price = request.Product.Price

            };
            cart.CartItems.Add(cartItem);

        }
        else
        {
            cartItem.Quantity = request.Quantity;

        }

        await _unitOfWork.SaveChangesAsync();

    }

    public record DeleteCartItemRequest(string SessionId, int ProductId);
    public async Task DeleteItemFromCart(DeleteCartItemRequest request)
    {
        var cart = _unitOfWork.CartRepository.GetAll().Where(c => c.SessionId == request.SessionId).FirstOrDefault();

        if (cart == null)
        {
            return;
        }

        var cartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == request.ProductId);

        if (cartItem == null)
        {
            return;
        }
        else
        {
            cart.CartItems.Remove(cartItem);
        }
        await _unitOfWork.SaveChangesAsync();
    }




    public record GetCartResponse(List<CartItem> CartItems, decimal Total);

    public GetCartResponse GetCart(string sessionId)
    {

        var cart = _unitOfWork.CartRepository.GetAll(
              c => c.CartItems
        ).Where(c => c.SessionId == sessionId).FirstOrDefault();

        if (cart == null)
        {
            return new GetCartResponse(new List<CartItem>(), 0);
        }

        var cartItems = cart.CartItems.ToList();
        var total = cartItems.Sum(ci => ci.Quantity * ci.Price);

        return new GetCartResponse(cartItems, total);
    }



}

